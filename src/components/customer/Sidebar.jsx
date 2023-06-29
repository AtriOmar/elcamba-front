import { faBox, faBoxArchive, faBoxOpen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUIContext } from "../../contexts/UIProvider";

function Sidebar() {
  const { mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-opacity-50 duration-300 cursor-pointer ${mobileNavbarOpen ? "bg-black" : "bg-transparent invisible"}`}
        onClick={() => setMobileNavbarOpen(false)}
      ></div>
      <div
        className={`fixed top-0 scr1000:top-[55px] z-30 scr1000:z-10 left-0 h-full w-full scr500:w-[250px] py-10 px-3 bg-white shadow-md transition duration-300 ${
          mobileNavbarOpen ? "" : "-translate-x-full scr1000:translate-x-0"
        }`}
      >
        <button className="scr1000:hidden absolute top-3 right-3" onClick={() => setMobileNavbarOpen(false)}>
          <FontAwesomeIcon icon={faXmark} className="text-black" size="lg" />
        </button>
        <ul className="flex flex-col gap-1 text-[17px] text-cyan-600">
          <li>
            <Link
              className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                location?.pathname?.startsWith("/customer/products") ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
              }`}
              to={"/customer/products"}
            >
              <FontAwesomeIcon icon={faBox} />
              <span>Produits</span>
            </Link>
          </li>
          <li>
            <Link
              className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                location?.pathname?.startsWith("/customer/promote") ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
              }`}
              to={"/customer/promote/manage"}
            >
              <IonIcon icon={megaphoneOutline} className="text-xl" aria-hidden="true" />
              <span>Publicités</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customer/profile/info"
              className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                location?.pathname?.startsWith("/customer/profile/info") ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
              }`}
            >
              <FontAwesomeIcon icon={faBoxOpen} />
              <span>Mon compte</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                location?.pathname?.startsWith("/customer/panier") ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
              }`}
            >
              <FontAwesomeIcon icon={faBoxArchive} />
              <span>Mon panier</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customer/chat"
              className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                location?.pathname?.startsWith("/customer/chat") ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
              }`}
            >
              <FontAwesomeIcon icon={faBox} />
              <span>Discussions</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
