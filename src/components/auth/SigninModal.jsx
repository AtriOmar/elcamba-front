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

const clientId = import.meta.env.VITE_CLIENT_ID;

export default function SigninModal({ show, hide }) {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const emailRef = useRef(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { email: input.email, password: input.password };

    try {
      const result = await axios.post("/login", user);
      setUser(result.data.user);
      hide();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogin(e) {
    try {
      const result = await axios.get("/login/google");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Transition.Root
      show={show}
      as={Fragment}
      beforeEnter={() => {
        emailRef.current?.focus();
      }}
    >
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={hide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <style>
          {`
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap");
          @import url("https://fonts.googleapis.com/css?family=Roboto:400");
          `}
        </style>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative sm:w-full sm:max-w-[500px] sm:my-8 py-20 px-6 rounded-[50px] bg-white text-left transform overflow-hidden shadow-xl transition-all">
                <button
                  type="button"
                  onClick={() => {
                    hide();
                  }}
                  className="absolute top-4 right-4"
                >
                  <XMarkIcon className="block h-8 w-8 text-black" aria-hidden="true" />
                </button>
                <header>
                  <Link className="flex justify-center items-center gap-1" to="/">
                    <img src="/logo.svg" alt="" className="h-8 -mt-1.5" />
                    <span className=" font-rubik font-bold text-2xl text-red-600">CHARYOUL</span>
                  </Link>
                  <h3 className="mt-4 font-semibold text-center text-2xl text-black">Connectez-vous</h3>
                </header>
                <form className="mt-10" onSubmit={handleSubmit}>
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={input.email}
                    className="py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
                    ref={emailRef}
                  />
                  <input
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={input.password}
                    className="mt-2 py-3 pl-4 pr-11 rounded-xl text-slate-900 text-xl outline-none focus:ring-2 focus:ring-cyan-300 border border-slate-300 w-full font-rubik"
                  />
                  <input
                    type="submit"
                    value="Se connecter"
                    className="w-full p-3 mt-6 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-xl text-white cursor-pointer transition duration-300"
                  />
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
                    href="http://localhost:5000/login/google"
                    className="flex items-center gap-2 w-fit mx-auto mt-3 py-2 px-2 border border-slate-300 rounded text-slate-700 text-sm font-roboto"
                  >
                    <img src={GoogleSvg} alt="" className="h-5" />
                    Se connecter avec Google
                  </a>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
