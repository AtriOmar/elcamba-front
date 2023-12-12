import React from "react";
import sad from "../assets/images/sad.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Error() {
  return (
    <div className="bg-agriculture pt-[100px]">
      <Navbar />
      <div className="grid place-items-center  m-2 py-10 px-10 rounded-lg bg-white shadow-md">
        <div className="">
          <img className="w-[150px] mx-auto " src={sad} alt="" />
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas la page demandée</h3>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
