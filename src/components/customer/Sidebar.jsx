import { faBox, faBoxArchive, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-full w-[200px] py-10 px-6 bg-white shadow-md">
      <ul className="flex flex-col gap-5 text-[17px] text-cyan-600">
        <li>
          <Link className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBox} />
            <span>Mes produits</span>
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
            <span>Mon profil </span>
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
