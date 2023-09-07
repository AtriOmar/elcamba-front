import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoginCmp from "./LoginCmp";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import GoogleSvg from "../../assets/images/google.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useUIContext } from "../../contexts/UIProvider";
import { IonIcon } from "@ionic/react";
import { cloudyNightSharp, eyeOffOutline, eyeOutline } from "ionicons/icons";
import RingLoader from "../RingLoader";
import EmailLogo from "../../assets/images/email.png";
import bcrypt from "bcryptjs";

const clientId = import.meta.env.VITE_CLIENT_ID;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function SigninModal() {
  const { user, setUser } = useAuthContext();
  const { addPopup } = useUIContext();
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const emailRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [sending, setSending] = useState(false);
  const [code, setCode] = useState({ input: "", hash: "" });

  function handleInput(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function sendVerificationEmail(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (!input.username.trim().length || !input.email.trim().length || !input.password.trim().length || !input.confirmPassword.trim().length) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (input.password !== input.confirmPassword) {
      setError("Veuillez confirmer votre mot de passe correctement");
      return;
    }

    const data = {
      name: input.username,
      email: input.email,
    };

    setSending(true);
    try {
      const res = await axios.post("/users/sendVerificationEmail", data);

      setCode((prev) => ({ ...prev, hash: res.data }));
    } catch (err) {
      setSending(false);
      const message = err.response?.data;

      if (message === "email already used") {
        setError("Cet email est déja utilisé");
        return;
      }

      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (code?.input?.trim().length !== 6) {
      setError("Le code doit être à 6 chiffres");
      return;
    }

    const match = await bcrypt.compare(code.input, code.hash);

    if (!match) {
      setError("Veuillez vérifier votre code");
      return;
    }

    const user = { username: input.username, email: input.email, password: input.password };

    setSending(true);
    try {
      const result = await axios.post("/users/create", user);

      setUser(result.data);
      addPopup({
        type: "success",
        text: "Compte crée avec success",
        lastFor: 2000,
      });
      navigate("/");
    } catch (err) {
      setSending(false);
      const message = err.response?.data;
      if (message === "email already used") {
        setError("Cet email est déja utilisé");
        return;
      }

      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  if (code?.hash) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative scr600:w-full scr600:max-w-[500px] py-14 px-6 scr600:rounded-[50px] bg-white text-left transform overflow-hidden shadow-xl transition-all">
          <header>
            <Link className="flex justify-center items-center gap-1" to="/">
              <img src="/logo.svg" alt="" className="h-20" />
            </Link>
            <h3 className="mt-4 font-semibold text-center text-2xl text-black">Créez un compte</h3>
          </header>
          <p className="mt-10 font-medium text-center text-black">
            <img src={EmailLogo} alt="" className="w-10 mx-auto" />
            Un code a été envoyé à '{input.email}',
            <br />
            veuillez vérifier votre boîte de réception et entrer le code.
          </p>
          <form className="mt-4" onSubmit={handleSubmit}>
            <input
              placeholder="######"
              type="text"
              name="code"
              onChange={(e) => {
                if (Number(e.target.value) >= 0 && e.target.value.length <= 6) setCode((prev) => ({ ...prev, input: e.target.value }));
              }}
              value={code.input}
              className="py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
            />
            {error && (
              <div className="mt-2 py-3 px-4 rounded-xl text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
                <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
                {error}
              </div>
            )}
            <div className="relative mt-6">
              <input
                type="submit"
                value="S'inscrire"
                className="w-full p-3 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-xl text-white cursor-pointer transition duration-300"
              />
              {sending ? (
                <i className="absolute right-2 top-1/2 -translate-y-1/2">
                  <RingLoader color="white" />
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-between px-3">
              <Link to="/reset-password" className="text-blue-500 hover:underline">
                Mot de passe oublié ?
              </Link>
              <Link to="/" className="text-blue-500 hover:underline">
                Page d'acceuil
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative scr600:w-full scr600:max-w-[500px] py-14 px-6 scr600:rounded-[50px] bg-white text-left transform overflow-hidden shadow-xl transition-all">
        <header>
          <Link className="flex justify-center items-center gap-1" to="/">
            <img src="/logo.svg" alt="" className="h-20" />
          </Link>
          <h3 className="mt-4 font-semibold text-center text-2xl text-black">Créez un compte</h3>
        </header>
        <form className="mt-10" onSubmit={sendVerificationEmail}>
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            name="username"
            onChange={handleInput}
            value={input.username}
            className="py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleInput}
            value={input.email}
            className="mt-2 py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
            ref={emailRef}
          />
          <div className="relative mt-2">
            <input
              placeholder="Mot de passe"
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleInput}
              value={input.password}
              className="py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
            />
            <i
              className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center cursor-pointer"
              onClick={() => setPasswordVisible((visibility) => !visibility)}
            >
              {passwordVisible ? <IonIcon icon={eyeOutline} className="text-2xl" /> : <IonIcon icon={eyeOffOutline} className="text-2xl" />}
            </i>
          </div>
          <input
            placeholder="Confirmer mot de passe"
            type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            onChange={handleInput}
            value={input.confirmPassword}
            className="mt-2 py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
          />
          {error && (
            <div className="mt-2 py-3 px-4 rounded-xl text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              {error}
            </div>
          )}
          <div className="relative mt-6">
            <input
              type="submit"
              value="S'inscrire"
              className="w-full p-3 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-xl text-white cursor-pointer transition duration-300"
            />
            {sending ? (
              <i className="absolute right-2 top-1/2 -translate-y-1/2">
                <RingLoader color="white" />
              </i>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between px-3">
            <Link to="/reset-password" className="text-blue-500 hover:underline">
              Mot de passe oublié ?
            </Link>
            <Link to="/" className="text-blue-500 hover:underline">
              Page d'acceuil
            </Link>
          </div>
          <div className="relative mx-4 mt-5">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-slate-900"></div>
            <h3 className="relative z-10 w-fit mx-auto px-2 bg-white font-medium text-lg text-center text-slate-900 capitalize">ou</h3>
          </div>
          {/* <div className="w-fit mx-auto mt-3">
                    <GoogleLogin onSuccess={handleSuccess} />
                  </div> */}
          {/* <button type="button" onClick={handleLogin}>
                    login
                  </button> */}
          <a
            href={`${BACKEND_URL}/login/google`}
            className="flex items-center gap-2 w-fit mx-auto mt-3 py-2 px-2 border border-slate-300 rounded text-slate-700 text-scr600 font-roboto"
          >
            <img src={GoogleSvg} alt="" className="h-5" />
            Se connecter avec Google
          </a>
        </form>
      </div>
    </div>
  );
}
