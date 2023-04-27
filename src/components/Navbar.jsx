import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import CustomerDropdown from "./Navbar/CustomerDropdown";
import { useAuthContext } from "../contexts/AuthProvider";
import SigninModal from "./auth/SigninModal";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useAuthContext();
  const [signinModalOpen, setSigninModalOpen] = useState(false);

  return (
    <header className="relative z-[10] px-4 bg-white shadow-md">
      <SigninModal show={signinModalOpen} hide={() => setSigninModalOpen(false)} />
      <div className="flex items-center justify-between max-w-w1300 m-auto py-1">
        <Link className="flex items-center gap-1" to="/">
          <img src="/logo.svg" alt="" className="h-8 -mt-1.5" />
          <span className=" font-rubik font-bold text-2xl text-red-600">CHARYOUL</span>
        </Link>
        <div className="flex border border-amber-300 rounded-lg overflow-hidden">
          <input type="text" className="w-[300px] py-2 px-4 outline-none" placeholder="Rechercher dans CHARYOUL" />
          <button className="flex items-center p-1 bg-amber-300" onClick={() => {}}>
            <MagnifyingGlassIcon className="h-7 w-7 text-amber-700" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          {user?.username ? (
            <CustomerDropdown />
          ) : (
            <button
              className={`relative flex items-center gap-1 py-2 font-open font-normal transition duration-300 before:w-full before:h-[20px] before:absolute before:top-[95%]  text-slate-800`}
              onClick={() => {
                setSigninModalOpen(true);
              }}
            >
              <UserCircleIcon className="h-6" />
              Se connecter
              {/* <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-sm transition duration-300 ${isOpen ? "-rotate-180" : ""}`} /> */}
            </button>
          )}
          <ShoppingCartIcon className="h-6" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
