import { Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import API from "../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { IonIcon } from "@ionic/react";
import { helpCircleOutline, logOutOutline, megaphoneOutline } from "ionicons/icons";
import { useUIContext } from "../../contexts/UIProvider";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function CustomerDropdown({ path = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { addPopup } = useUIContext();

  async function handleLogout() {
    // localStorage.removeItem("ELCAMBA_token");
    // axios.defaults.headers.common["Authorization"] = null;
    // await axios.get("/logout");
    // setUser(null);
    // addPopup({
    //   type: "success",
    //   text: "Déconnecté avec succés",
    //   lastFor: 4000,
    // });
    // navigate("/");

    axios
      .get("/logout")
      .then((res) => {
        setUser(res.data.user);
        addPopup({
          type: "success",
          text: "Déconnecté avec succés",
          lastFor: 4000,
        });
        navigate("/");
      })
      .catch((err) => {
        addPopup({
          type: "danger",
          text: "Une erreur s'est produite",
          lastFor: 4000,
        });
      });
  }

  function handleMouseEnter(e) {
    setIsOpen(true);
  }

  function handleMouseLeave() {
    setIsOpen(false);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
      <button
        className={`relative flex items-center gap-1  font-open font-normal transition duration-300 before:w-full before:h-[20px] before:absolute before:top-[95%] ${
          isOpen ? "before:block" : "before:hidden"
        }  text-slate-800`}
        ref={dropdownRef}
      >
        {user?.picture ? (
          <img
            src={`${BACKEND_URL}/uploads/profile-pictures/${user?.picture}`}
            alt="Profile picture"
            className="w-[32px] aspect-square rounded-[50%] border object-cover"
          />
        ) : (
          <UserCircleIcon className="h-7" />
        )}
        <span className="hidden scr500:block">{user?.username}</span>
        {/* <FontAwesomeIcon icon={faChevronDown} className={`ml-2 text-sm transition duration-300 ${isOpen ? "-rotate-180" : ""}`} /> */}
        <ChevronDownIcon className={` h-5 transition duration-300 ${isOpen ? "-rotate-180" : ""}`} />
      </button>

      <Transition
        show={isOpen}
        enter="transition duration-300"
        enterFrom="translate-y-[30px] opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-300"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-[30px] opacity-0"
      >
        <ul className="absolute top-full right-0 translate-y-[10px] w-max max-w-[200px] p-2 rounded shadow-card1 bg-white text-[15px] list-none">
          <li className="">
            <Link to="/customer/products" className="grid grid-cols-[25px_1fr] items-center hover:bg-slate-100 p-2 rounded-lg">
              <FontAwesomeIcon icon={faRectangleList} className="" />
              Mes produits
            </Link>
          </li>
          <li className="">
            <Link to="/customer/promote/manage" className="grid grid-cols-[25px_1fr] items-center hover:bg-slate-100 p-2 rounded-lg">
              <IonIcon icon={megaphoneOutline} className="text-xl" aria-hidden="true" />
              Mes publicités
            </Link>
          </li>
          <li className="">
            <Link to="/customer/chat" className="grid grid-cols-[25px_1fr] items-center hover:bg-slate-100 p-2 rounded-lg">
              <FontAwesomeIcon icon={faMessage} className="" />
              Mes discussions
            </Link>
          </li>
          <li className="">
            <Link to="/customer/profile/info" className="grid grid-cols-[25px_1fr] items-center hover:bg-slate-100 p-2 rounded-lg">
              <FontAwesomeIcon icon={faUser} className="" />
              Mes compte
            </Link>
          </li>
          <li className="">
            <Link to="/customer/chat/0" className="grid grid-cols-[25px_1fr] items-center hover:bg-slate-100 p-2 rounded-lg">
              <IonIcon icon={helpCircleOutline} className="text-xl -ml-1" aria-hidden="true" />
              Service Client
            </Link>
          </li>
          <li className="">
            <button onClick={handleLogout} className="grid grid-cols-[25px_1fr] items-center hover:bg-slate-100 p-2 rounded-lg">
              <IonIcon icon={logOutOutline} className="text-xl" />
              Déconnecter
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  );
}

export default CustomerDropdown;
