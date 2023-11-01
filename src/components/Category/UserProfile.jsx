import { faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile({ user }) {
  return (
    <div className="flex flex-col mt-2 scr900:mx-2 py-6 px-3 scr900:px-6 rounded-lg bg-white shadow-md">
      <div className="grid scr600:grid-cols-[250px_1fr] scr1200:grid-cols-[250px_1fr_300px] gap-10">
        <div className="relative scr600:row-span-2 scr1200:row-span-auto">
          {user.picture ? (
            <div className="w-full aspect-square border border-slate-300 rounded-[50%] overflow-hidden">
              <img src={`${BACKEND_URL}/uploads/profile-pictures/${user.picture}`} alt="profile picture" className="w-full h-full object-cover" />
            </div>
          ) : (
            <UserCircleIcon className="w-full text-slate-400" />
          )}
        </div>
        <div>
          <h2 className="mt-4 text-2xl font-bold capitalize text-sky-600">{user.username}</h2>
          <label className="block relative mt-3 text-base font-semibold text-slate-700">Ville:</label>
          <p className="capitalize">{user.city || "Non spécifié"}</p>

          <label className="block relative mt-2 text-base font-semibold text-slate-700">Adresse:</label>
          <p>{user.address || "Non spécifié"}</p>
          <label className="block relative mt-2 text-base font-semibold text-slate-700">Numéro de téléphone:</label>
          <p>{user.phone || "Non spécifié"}</p>
          <label className="block relative mt-2 text-base font-semibold text-slate-700">Nombre de produits:</label>
          <p>{user.productsCount || 0}</p>
          <label className="block relative mt-2 text-base font-semibold text-slate-700">Nombre de produits vendus:</label>
          <p>{user.soldProductsCount || 0}</p>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <Link
            className="grid grid-cols-[20px_1fr] items-center gap-4 py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-600 text-white duration-300"
            to={"/customer/chat/" + user?.id}
          >
            <FontAwesomeIcon icon={faMessage} className="text-white" />
            <span className="text-center">Contacter le vendeur</span>
          </Link>
          {user?.phone ? (
            <a
              className="grid grid-cols-[20px_1fr] items-center gap-4 py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-600 text-white duration-300"
              href={`tel:${user?.phone}`}
            >
              <FontAwesomeIcon icon={faPhone} className="text-white" />
              <span className="text-center">{user?.phone}</span>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
