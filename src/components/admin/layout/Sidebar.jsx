import React, { useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
  MapPinIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import { useUIContext } from "../../../contexts/UIProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const { user, setUser } = useAuthContext();
  const location = useLocation();
  const { adminNavbarOpen, setAdminNavbarOpen } = useUIContext();

  useEffect(() => {
    if (adminNavbarOpen) setAdminNavbarOpen(false);
  }, [location]);

  return (
    <div
      className={`${
        adminNavbarOpen ? "translate-x-0" : "-translate-x-full"
      } sidebar z-30 max-w-[300px] mt-[4rem] fixed lg:translate-x-0 w-full lg:w-[250px] flex flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow bg-gray-800 text-white duration-300`}
    >
      <button className={`lg:hidden absolute top-3 right-3 z-10`} onClick={() => setAdminNavbarOpen(false)}>
        <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
      </button>
      <Link to="/" className="flex flex-row gap-4 p-4 no-underline">
        {/* <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" /> */}

        <span>ELCAMBA</span>
      </Link>
      <Link to="/admin" className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname === "/admin" ? "bg-gray-700" : ""}`}>
        <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Acceuil</span>
      </Link>
      {user.accessId >= 3 ? (
        <>
          <Link to="/admin/users" className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname?.startsWith("/admin/users") ? "bg-gray-700" : ""}`}>
            <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Utilisateurs</span>
          </Link>

          <Link
            to="/admin/categories"
            className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname?.startsWith("/admin/categories") ? "bg-gray-700" : ""}`}
          >
            <TagIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Catégories</span>
          </Link>

          <Link
            to="/admin/products"
            className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname?.startsWith("/admin/products") ? "bg-gray-700" : ""}`}
          >
            <ListBulletIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Produits</span>
          </Link>
          <Link to="/admin/ads" className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname?.startsWith("/admin/ads") ? "bg-gray-700" : ""}`}>
            <IonIcon icon={megaphoneOutline} className="text-2xl" aria-hidden="true" />
            <span>Publicités</span>
          </Link>
          <Link
            to="/admin/settings"
            className={`flex flex-row gap-4 p-4 duration-150 ${location?.pathname?.startsWith("/admin/settings") ? "bg-gray-700" : ""}`}
          >
            <Cog6ToothIcon className={"block h-6 w-6 text-white"} aria-hidden="true" />
            <span>Paramètres</span>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
