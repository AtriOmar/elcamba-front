import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TypeSelect from "./TypeSelect";
import DurationSelect from "../PromoteProduct/DurationSelect";
import PosterSelect from "./PosterSelect";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../../RingLoader";

const PRICES = {
  1: 12,
  2: 5,
  3: 8,
};

export default function PromotePoster() {
  const [input, setInput] = useState({
    duration: 1,
    type: 1,
    photo: null,
  });
  const amount = useMemo(() => (input.photo ? input.duration * PRICES[input.type] : 0), [input.type, input.duration]);
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function createPayment() {
    if (sending) return;

    if (!input?.photo) {
      setError("Veuillez choisir une affiche");
      return;
    }

    setSending(true);

    try {
      const formData = new FormData();
      formData.append("photo", input.photo);
      formData.append("duration", input.duration);
      formData.append("type", input.type);
      formData.append("amount", amount);
      const res = await axios.post("/ads/createPosterPayment", formData);
      console.log("create poster payment", res.data);
      // navigate(`/payment/${res.data}`);
      window.open(`/payment/${res.data}`, "_blank");
      // window.addEventListener("message", handlePayment);
      setSending(false);
    } catch (err) {
      setSending(false);
      console.log(err);
    }
  }

  return (
    <div className="py-6 px-3 scr1000:px-6 pb-20 rounded-lg bg-white shadow-md">
      <div className="max-w-[800px]">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/customer/promote/manage">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-sky-600 hover:text-sky-900 duration-300" />
          </Link>
          <h2 className=" text-2xl font-bold capitalize text-sky-600">Promouvoir affiche:</h2>
        </div>
        <h3 className="mt-10 mb-2 font-medium text-xl text-center ">Page d'acceuil</h3>
        <TypeSelect input={input} setInput={setInput} />
        <section className="flex flex-col scr600:flex-row gap-x-10 mt-10">
          <article className="grow">
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Affiche:</p>
            <PosterSelect input={input} setInput={setInput} />
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Durée:</p>
            <DurationSelect input={input} setInput={setInput} />
          </article>
          <article className="flex items-center justify-center shrink-0 flex-col w-full max-w-[200px] h-auto mt-8 py-6 border-2 border-slate-300 rounded-lg font-bold text-gray-800">
            <p>Prix:</p>
            <p>{amount} DT</p>
          </article>
        </section>
        {error && (
          <div className="flex w-full items-center gap-4 mt-4 px-4 py-3 border border-red-500 rounded-lg  bg-red-100  text-red-500">
            <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
            {error}
          </div>
        )}
        <div className="relative w-fit">
          <button
            className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            onClick={createPayment}
          >
            <IonIcon icon={megaphoneOutline} className="text-2xl" aria-hidden="true" />
            Promouvoir
          </button>
          {sending ? (
            <i className="absolute right-1 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
