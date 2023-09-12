import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import CustomerDropdown from "./CustomerDropdown";
import { useAuthContext } from "../../contexts/AuthProvider";
import SigninModal from "../auth/SigninModal";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { useUIContext } from "../../contexts/UIProvider";
import Search from "./Search";
import { useChatContext } from "../../contexts/ChatProvider";

function Navbar() {
  const { user, setUser } = useAuthContext();
  const [signinModalOpen, setSigninModalOpen] = useState(false);
  const { setMobileNavbarOpen, setFilterSidebarOpen, searchOpen, setSearchOpen } = useUIContext();
  const location = useLocation();
  const { conversations } = useChatContext();
  const unread = useMemo(
    () => conversations?.reduce((total, conv) => (conv.seen === "both" || conv?.seen === user.id + "" ? total : total + 1), 0),
    [conversations]
  );

  return (
    <header className="shrink-0 fixed w-full top-0 left-0 z-[20] flex items-center h-[55px] px-4 bg-white shadow-md">
      <Search show={searchOpen} hide={() => setSearchOpen(false)} />
      <SigninModal show={signinModalOpen} hide={() => setSigninModalOpen(false)} />
      <div className="flex items-center justify-between w-full max-w-w1300 mx-auto">
        <div
          className={`flex gap-4 ${
            location?.pathname?.startsWith("/products")
              ? ""
              : location?.pathname === "/"
              ? "min-[1350px]:hidden"
              : location?.pathname?.startsWith("/customer")
              ? "scr1200:hidden"
              : "hidden"
          }`}
        >
          <button
            className={`${
              location?.pathname === "/"
                ? "min-[1350px]:hidden"
                : location?.pathname?.startsWith("/customer")
                ? "scr1200:hidden"
                : location?.pathname?.startsWith("/products")
                ? ""
                : "scr1000:hidden"
            } block`}
            onClick={() => {
              setMobileNavbarOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} className="text-black" />
          </button>
          <button
            className={`${location?.pathname?.startsWith("/products") ? "scr900:hidden" : "hidden"}`}
            onClick={() => {
              setFilterSidebarOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        <Link className="flex items-center gap-1" to="/">
          <img src="/logo_name.svg" alt="" className="h-8" />
          <img src="/logo_icon.svg" alt="" className="h-8" />
        </Link>
        <button className={`hidden scr800:flex items-stretch border border-[#a5da24] rounded-lg text-left overflow-hidden`} onClick={() => setSearchOpen(true)}>
          <div className="w-[300px] py-2 px-4 text-gray-500 outline-none cursor-text">Rechercher dans ELCAMBA</div>
          <span className="flex items-center p-1 bg-[#a5da24]">
            <MagnifyingGlassIcon className="h-7 w-7 text-green-600" />
          </span>
        </button>
        <div className="flex items-center gap-4">
          {user ? (
            <Link className="relative" to={`/customer/chat`}>
              <FontAwesomeIcon icon={faMessage} className="text-sky-700" size="lg" />
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 grid place-items-center w-4 h-4 rounded-[50%] bg-red-500 text-white text-xs ">
                {unread}
              </span>
            </Link>
          ) : (
            ""
          )}
          {user?.username ? (
            <CustomerDropdown />
          ) : (
            <button
              className={`relative flex items-center gap-1 font-open font-normal transition duration-300 before:w-full before:h-[20px] before:absolute before:top-[95%]  text-slate-800`}
              onClick={() => {
                setSigninModalOpen(true);
              }}
            >
              <UserCircleIcon className="h-7" />
              <span className="hidden scr500:block">Se connecter</span>
              {/* <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-sm transition duration-300 ${isOpen ? "-rotate-180" : ""}`} /> */}
            </button>
          )}
          {/* <ShoppingCartIcon className="h-6" /> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
