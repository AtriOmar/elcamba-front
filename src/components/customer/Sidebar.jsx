import { faBox, faBoxArchive, faBoxOpen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useUIContext } from "../../contexts/UIProvider";

function Sidebar() {
  const { mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();

  return (
    <div
      className={`fixed top-0 left-0 scr1000:relative z-30 scr1000:z-0 h-full w-[200px] py-10 px-3 bg-white shadow-md duration-300 ${
        mobileNavbarOpen ? "" : "-translate-x-full scr1000:translate-x-0"
      }`}
    >
      <button className="scr1000:hidden absolute top-3 right-3" onClick={() => setMobileNavbarOpen(false)}>
        <FontAwesomeIcon icon={faXmark} className="text-black" />
      </button>
      <ul className="flex flex-col gap-1 text-[17px] text-cyan-600">
        <li>
          <NavLink
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
            to={"/customer/products"}
          >
            <FontAwesomeIcon icon={faBox} />
            <span>Mes produits</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
            to={"/customer/promote/manage"}
          >
            <IonIcon icon={megaphoneOutline} className="text-xl" aria-hidden="true" />
            <span>Publicités</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
          >
            <FontAwesomeIcon icon={faBoxOpen} />
            <span>Mon compte</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
          >
            <FontAwesomeIcon icon={faBoxArchive} />
            <span>Mon panier</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
          >
            <FontAwesomeIcon icon={faBox} />
            <span>Mes discussions</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
          >
            <FontAwesomeIcon icon={faBox} />
            <span>Mon </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
          >
            <FontAwesomeIcon icon={faBox} />
            <span>Mes </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-2 rounded-lg duration-200 ${
                isActive ? "bg-slate-200 shadow-xl bg-opacity-[.86]" : "hover:bg-slate-100 hover:shadow-md"
              }`
            }
          >
            <FontAwesomeIcon icon={faBox} />
            <span>Mes </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
