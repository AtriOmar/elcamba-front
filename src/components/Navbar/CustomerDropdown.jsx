import { Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import API from "../../utils/API";

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
        className={`relative flex items-center gap-1 py-2 font-open font-normal transition duration-300 before:w-full before:h-[20px] before:absolute before:top-[95%] ${
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
        <ul className="w-max max-w-[200px] p-4 rounded shadow absolute top-full left-[-20px] bg-white translate-y-[10px] list-none">
          <li>
            <Link to="/customer/products">Mes produits</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Déconnecter</button>
          </li>
        </ul>
      </Transition>
    </div>
  );
}

export default CustomerDropdown;
