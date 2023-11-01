import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoginCmp from "./LoginCmp";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import GoogleSvg from "../../assets/images/google.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useUIContext } from "../../contexts/UIProvider";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeOutline, shieldCheckmark } from "ionicons/icons";
import RingLoader from "../RingLoader";

const clientId = import.meta.env.VITE_CLIENT_ID;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    if (success) navigate("/");

    error && setError("");

    if (!input.password || !input.confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (input.password !== input.confirmPassword) {
      setError("Veuillez confirmer votre mot de passe correctement");
      return;
    }

    setSending(true);
    try {
      const result = await axios.post("/users/resetPassword", { token, password: input.password });

      setSuccess(true);
    } catch (err) {
      setSending(false);
      const message = err.response?.data;
      if (message === "invalid or expired token") {
        setError("Votre lien est invalide ou expiré, veuillez obtenir un autre");
        return;
      }

      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative scr600:w-full scr600:max-w-[500px] py-28 px-6 scr600:rounded-[50px] bg-white text-left transform overflow-hidden shadow-xl transition-all">
        <header>
          <Link className="flex justify-center items-center gap-1" to="/">
            <img src="/logo.svg" alt="" className="h-20 " />
          </Link>
          <h3 className="mt-4 font-semibold text-center text-2xl text-black">Réintialiser votre mot de passe</h3>
        </header>
        <form className="mt-10" onSubmit={handleSubmit}>
          {!success ? (
            <>
              <div className="relative mt-2">
                <input
                  placeholder="Mot de passe"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
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
                name="password"
                onChange={(e) => setInput((prev) => ({ ...prev, confirmPassword: e.target.value }))}
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
                  value="Réintialiser"
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
                <Link to="/register" className="text-blue-500 hover:underline">
                  Créer un nouveau compte ?
                </Link>
                <Link to="/" className="text-blue-500 hover:underline">
                  Page d'accueil
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="max-w-[400px] mx-auto font-medium text-center text-lg text-black">
                <IonIcon icon={shieldCheckmark} className="block mx-auto mb-2 text-4xl text-blue-500" />
                Votre mot de passe a été réintialisé avec success.
              </p>
              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-6 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
                autoFocus
              >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                Retourner à l'accueil
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
