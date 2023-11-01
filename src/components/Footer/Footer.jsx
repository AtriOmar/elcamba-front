import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUIContext } from "../../contexts/UIProvider";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  const { settings } = useUIContext();

  return (
    <div className="w-full">
      <div className="relative w-full mx-auto px-8 py-10 bg-slate-500/25  before:absolute before:inset-0 before:bg-[url(./assets/images/agriculture.jpg) before:bg-cover before:bg-center before:z-[-1]">
        <section className="px-8 scr1000:px-20 py-10 rounded-lg grid grid-cols-1 scr600:grid-cols-2 scr1100:grid-cols-4 gap-6 relative bg-slate-100 ">
          <div>
            <h3 className="pb-4 font-poppins font-semibold text-xl text-teal-500 uppercase">ELCAMBA</h3>
            <ul className="flex flex-col gap-2">
              {settings?.map((setting) =>
                Object.keys(SETTINGS_ICONS).includes(setting.name) ? (
                  <li key={setting.id} className="group">
                    {setting.name === "address" ? (
                      <div href={setting.value} className="grid grid-cols-[30px_1fr] items-center">
                        <span className="w-6 h-6 rounded-[50%] flex items-center justify-center bg-teal-500 transition duration-300">
                          {SETTINGS_ICONS[setting.name]}
                        </span>
                        <span className="text-sm">{setting.value}</span>
                      </div>
                    ) : setting.name === "mail" ? (
                      <a href={"mailto:" + setting.value} className="grid grid-cols-[30px_1fr] items-center" target="_blank">
                        <span className="w-6 h-6 rounded-[50%] flex items-center justify-center bg-teal-500 group-hover:bg-teal-600 transition duration-300">
                          {SETTINGS_ICONS[setting.name]}
                        </span>
                        <span className="text-sm group-hover:text-blue-500 duration-300">{setting.value}</span>
                      </a>
                    ) : setting.name === "phone" ? (
                      <a href={"tel:" + setting.value} className="grid grid-cols-[30px_1fr] items-center" target="_blank">
                        <span className="w-6 h-6 rounded-[50%] flex items-center justify-center bg-teal-500 group-hover:bg-teal-600 transition duration-300">
                          {SETTINGS_ICONS[setting.name]}
                        </span>
                        <span className="text-sm group-hover:text-blue-500 duration-300">{setting.value}</span>
                      </a>
                    ) : (
                      <a href={setting.value} className="grid grid-cols-[30px_1fr] items-center" target="_blank">
                        <span className="w-6 h-6 rounded-[50%] flex items-center justify-center bg-teal-500 group-hover:bg-teal-600 transition duration-300">
                          {SETTINGS_ICONS[setting.name]}
                        </span>
                        <span className="text-sm group-hover:text-blue-500 duration-300">{setting.value.slice(setting.value.indexOf("//") + 2)}</span>
                      </a>
                    )}
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
          <div className="">
            <h3 className="pb-4 font-bold text-xl text-teal-500 uppercase">Accés rapide</h3>
            <ul className=" font-semibold text-[15px]">
              {usefulLinks.map((element) => (
                <li key={element.text} className="text-black hover:text-slate-600 transition duration-300">
                  <Link to={element.path}>{element.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h3 className="pb-4 font-bold text-xl text-teal-500 uppercase">Espace client</h3>
            <ul className=" font-semibold text-[15px]">
              {customerLinks.map((element) => (
                <li key={element.text} className="text-black hover:text-slate-600 transition duration-300">
                  <Link to={element.path}>{element.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img src="logo.svg" alt="ELCAMBA logo" className="w-full max-w-[300px]" />
          </div>
        </section>
      </div>
    </div>
  );
}

const usefulLinks = [
  {
    text: "Accueil",
    path: "/",
  },
  {
    text: "S'inscrire",
    path: "/register",
  },
  {
    text: "Réint. mot de passe",
    path: "/reset-password",
  },
  {
    text: "Tous les produits",
    path: "/products",
  },
];
const customerLinks = [
  {
    text: "Mes produits",
    path: "/customer/products",
  },
  {
    text: "Mes publicités",
    path: "/customer/promote/manage",
  },
  {
    text: "Promouvoir un Produit",
    path: "/customer/promote/product",
  },
  {
    text: "Promouvoir une affiche",
    path: "/customer/promote/poster",
  },
  {
    text: "Mes discussions",
    path: "/customer/chat",
  },
  {
    text: "Mon profile",
    path: "/customer/profile",
  },
];

const SETTINGS_ICONS = {
  facebook: <FontAwesomeIcon icon={faFacebookF} className="text-white" size="sm" />,
  twitter: <FontAwesomeIcon icon={faTwitter} className="text-white" size="sm" />,
  youtube: <FontAwesomeIcon icon={faYoutube} className="text-white" size="sm" />,
  linkedin: <FontAwesomeIcon icon={faLinkedinIn} className="text-white" size="sm" />,
  instagram: <FontAwesomeIcon icon={faInstagram} className="text-white" size="sm" />,
  address: <FontAwesomeIcon icon={faLocationDot} className="text-white" size="sm" />,
  mail: <FontAwesomeIcon icon={faEnvelope} className="text-white" size="sm" />,
  phone: <FontAwesomeIcon icon={faPhone} className="text-white" size="sm" />,
};
