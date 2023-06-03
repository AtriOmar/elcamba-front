import { faBox, faBoxArchive, faBoxOpen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useUIContext } from "../../contexts/UIProvider";

function Sidebar() {
  const { mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();

  return (
    <div
      className={`fixed top-0 left-0 scr1000:relative z-30 scr1000:z-0 h-full w-[200px] py-10 px-6 bg-white shadow-md duration-300 ${
        mobileNavbarOpen ? "" : "-translate-x-full scr1000:translate-x-0"
      }`}
    >
      <button className="scr1000:hidden absolute top-3 right-3" onClick={() => setMobileNavbarOpen(false)}>
        <FontAwesomeIcon icon={faXmark} className="text-black" />
      </button>
      <ul className="flex flex-col gap-5 text-[17px] text-cyan-600">
        <li>
          <Link className="flex gap-2 items-center" to={"/customer/products"}>
            <FontAwesomeIcon icon={faBox} />
            <span>Mes produits</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center" to={"/customer/promote/manage"}>
            <IonIcon icon={megaphoneOutline} className="text-xl" aria-hidden="true" />
            <span>Publicités</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBoxOpen} />
            <span>Mon compte</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBoxArchive} />
            <span>Mon panier</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBox} />
            <span>Mes discussions</span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBox} />
            <span>Mon </span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBox} />
            <span>Mes </span>
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBox} />
            <span>Mes </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
