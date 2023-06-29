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
import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useUIContext } from "../../contexts/UIProvider";
import { IonIcon } from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import EmailLogo from "../../assets/images/email.png";
import RingLoader from "../RingLoader";

const clientId = import.meta.env.VITE_CLIENT_ID;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ResetPasswordRequest() {
  const { user, setUser } = useAuthContext();
  const { addPopup } = useUIContext();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (!email) {
      setError("Veuillez spécifier un email");
      return;
    }

    setSending(true);
    try {
      const result = await axios.post("/users/sendResetEmail", { email });
      console.log(result.data);
      setSent(true);
    } catch (err) {
      setSending(false);
      const message = err.response?.data;
      if (message === "user not found") {
        setError("Cet email n'est pas associé à aucun compte");
        return;
      }

      setError("Une erreur s'est produite");
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative scr600:w-full scr600:max-w-[500px] py-28 px-6 scr600:rounded-[50px] bg-white text-left transform overflow-hidden shadow-xl transition-all">
        <header>
          <Link className="flex justify-center items-center gap-1" to="/">
            <img src="/logo.svg" alt="" className="h-8 -mt-1.5" />
            <span className=" font-rubik font-bold text-2xl text-red-600">CHARYOUL</span>
          </Link>
          <h3 className="mt-4 font-semibold text-center text-2xl text-black">Réintialiser votre mot de passe</h3>
        </header>
        {!sent ? (
          <>
            <form className="mt-10" onSubmit={handleSubmit}>
              <input
                placeholder="Email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-2 py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
                ref={emailRef}
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
                  Page d'acceuil
                </Link>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="mt-10 font-medium text-center text-black">
              <img src={EmailLogo} alt="" className="w-10 mx-auto" />
              Un e-mail a été envoyé à '{email}',
              <br />
              veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.
            </p>
            <Link
              to="/"
              className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-6 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              Retourner à l'acceuil
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
