import { faBox, faBoxArchive, faBoxOpen, faChevronDown, faHouse, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { gridOutline, megaphoneOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUIContext } from "../../contexts/UIProvider";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import axios from "axios";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

function Sidebar() {
  const { mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();
  const location = useLocation();
  const [open, setOpen] = useState([0, -1]);
  const { categories } = useUIContext();

  useEffect(() => {
    if (!mobileNavbarOpen) {
      setOpen([0, -1]);
    }
  }, [mobileNavbarOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-opacity-50 duration-300 cursor-pointer ${mobileNavbarOpen ? "bg-black" : "bg-transparent invisible"}`}
        onClick={() => setMobileNavbarOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 min-[1350px]:hidden z-30 min-[1350px]:z-0 h-full w-full scr500:w-[300px] bg-white shadow-md duration-300 ${
          mobileNavbarOpen ? "" : "-translate-x-full min-[1350px]:translate-x-0"
        }`}
      >
        <button className="min-[1350px]:hidden absolute top-3 right-3 z-10" onClick={() => setMobileNavbarOpen(false)}>
          <FontAwesomeIcon icon={faXmark} className="text-black" size="lg" />
        </button>
        <div className="relative h-full py-10 px-3 overflow-y-auto">
          <ul className="flex flex-col gap-1 text-[17px] text-cyan-600 ">
            <li>
              <Link
                className={`grid grid-cols-[20px_1fr] gap-2 items-center py-3 px-3 rounded-lg duration-200 ${
                  location?.pathname === "/" ? "bg-slate-200 shadow-md bg-opacity-[.82]" : "hover:bg-slate-100 hover:shadow-md"
                }`}
                to={"/"}
              >
                <FontAwesomeIcon icon={faHouse} />
                <span>Acceuil</span>
              </Link>
            </li>
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
                <FontAwesomeIcon icon={faUser} />
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
                <FontAwesomeIcon icon={faHeart} />
                <span>Favoris</span>
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
            <li>
              <Accordion open={!!open[0]} icon={<FontAwesomeIcon icon={faChevronDown} className={`transition duration-300 ${open[0] ? "-rotate-180" : ""}`} />}>
                <AccordionHeader
                  className={`grid grid-cols-[20px_1fr_20px] gap-2 items-center py-3 px-3 rounded-lg font-normal text-[17px] duration-200 hover:bg-slate-100 hover:shadow-md ${
                    open[0] ? "border-b" : "border-0"
                  }`}
                  onClick={() => setOpen((prev) => [prev[0] === 0 ? 1 : 0, prev[1]])}
                >
                  <IonIcon icon={gridOutline} className="text-xl" aria-hidden="true" />
                  <span>Catégories</span>
                </AccordionHeader>
                <AccordionBody className={`px-3 py-2 font-open text-base text-slate-600`}>
                  <ul className="divide-y">
                    {categories.map((category, i) => (
                      <li key={category.id}>
                        {category.SubCategories.length ? (
                          <Accordion
                            open={open[1] === i}
                            icon={<FontAwesomeIcon icon={faChevronDown} className={`transition duration-300 ${open[1] === i ? "-rotate-180" : ""}`} />}
                          >
                            <AccordionHeader
                              className={`items-center py-2 px-2 rounded-lg font-medium text-[17px] text-cyan-800 duration-200 hover:bg-slate-100 hover:shadow-md ${
                                open[1] === i ? "border-b" : "border-0"
                              }`}
                              onClick={() => setOpen((prev) => [prev[0], prev[1] === i ? -1 : i])}
                            >
                              <Link to={`/products?c=${category.id}`} className="">
                                {category.name}
                              </Link>
                            </AccordionHeader>
                            <AccordionBody className={`px-2 py-2 font-open font-semibold text-base text-cyan-900`}>
                              <ul className="divide-y">
                                {category.SubCategories.map((sub, i) => (
                                  <li key={sub.id}>
                                    <Link
                                      to={`/products?s=${sub.id}`}
                                      className="block items-center py-1 px-2 rounded-lg text-[17px] duration-200 hover:bg-slate-100 hover:shadow-md"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionBody>
                          </Accordion>
                        ) : (
                          <Link
                            to={`/products?c=${category.id}`}
                            className="block items-center py-2 px-2 rounded-lg font-medium text-[17px] duration-200 hover:bg-slate-100 hover:shadow-md"
                            onClick={() => setMobileNavbarOpen(false)}
                          >
                            {category.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionBody>
              </Accordion>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
