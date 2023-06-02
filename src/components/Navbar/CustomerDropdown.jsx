import { Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import API from "../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { IonIcon } from "@ionic/react";
import { logOutOutline, megaphoneOutline } from "ionicons/icons";

function CustomerDropdown({ path = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuthContext();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  function handleLogout() {
    API.getLoggedOut()
      .then((res) => {
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
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
        <UserCircleIcon className="h-7" />
        {user?.username}
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
        <ul className="absolute top-full left-[-20px] translate-y-[10px] w-max max-w-[200px] p-2 rounded shadow bg-white text-[15px] list-none">
          {/* <li>
            <Link to="/customer/products">Mes produits</Link>
          </li> */}
          <li className="">
            <Link to="/customer/products" className="flex gap-2 items-center hover:bg-slate-100 p-2 rounded-lg">
              <FontAwesomeIcon icon={faRectangleList} className="" />
              Mes produits
            </Link>
          </li>
          <li className="">
            <Link to="/customer/promote/manage" className="flex gap-2 items-center hover:bg-slate-100 p-2 rounded-lg">
              <IonIcon icon={megaphoneOutline} className="text-xl" aria-hidden="true" />
              Mes publicités
            </Link>
          </li>
          <li className="">
            <button onClick={handleLogout} className="flex gap-2 items-center w-full p-2  hover:bg-slate-100 rounded-lg">
              <IonIcon icon={logOutOutline} className="text-xl" />
              Déconnecter
            </button>
          </li>
        </ul>
        {/* <ul className="absolute mt-2 px-4 py-3 rounded-lg bg-white w-60 shadow-lg">
          <li className="flex gap-3 items-center hover:bg-slate-100 p-2 rounded-lg">
            <FontAwesomeIcon icon={faUserGear} className="text-slate-500" />
            Manage your account
          </li>
        </ul>
        <div className="w-full h-px bg-slate-300 rounded-[50%] my-2"></div> */}
        {/* <button className="flex items-center w-full gap-3 text-center hover:bg-slate-100 p-2 rounded-lg">
          <LogoutIcon className="text-slate-500" />
          Log out
        </button> */}
      </Transition>
    </div>
  );
}

export default CustomerDropdown;
