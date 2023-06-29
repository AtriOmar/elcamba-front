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
import validator from "validator";
import Loader from "../../Loader";
import Select from "./Select";

const PRICES = {
  1: "prix affiche 1",
  2: "prix affiche 2",
  3: "prix affiche 3",
  4: "prix affiche 4",
};

function isValidURL(urlString) {
  const options = {
    require_protocol: true,
    protocols: ["http", "https"],
  };

  return validator.isURL(urlString, options);
}

export default function PromotePoster() {
  const [settings, setSettings] = useState(null);
  const [input, setInput] = useState({
    duration: 1,
    type: 1,
    photo: null,
    url: "",
  });

  const amount = useMemo(
    () => (input.photo ? input.duration * (Number(settings[PRICES[input.type]]) || 0) : 0),
    [input.type, input.duration, input.photo, settings]
  );
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchSettings() {
    try {
      const res = await axios.get("/settings/getAll");

      const obj = {};
      res.data?.forEach((el) => (obj[el.name] = el.value));

      setSettings(obj);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  async function createPayment() {
    if (sending) return;

    if (!input?.photo) {
      setError("Veuillez choisir une affiche");
      return;
    }

    if (input.url && !isValidURL(input.url)) {
      setError("Veuillez entrer un lien valide");
      return;
    }

    setSending(true);

    try {
      const formData = new FormData();
      formData.append("photo", input.photo);
      formData.append("duration", input.duration);
      formData.append("type", input.type);
      formData.append("amount", amount);
      formData.append("url", input.url);
      const res = await axios.post("/ads/createPosterPayment", formData);
      console.log("create poster payment", res.data);
      window.open(`/payment/${res.data}`, "_blank");
      navigate("/customer/promote/manage");
    } catch (err) {
      setError("Une erreur s'est produite");
      console.log(err);
    }
    setSending(false);
  }

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-2 scr1000:mx-2 py-6 px-3 scr1000:px-6 pb-20 rounded-lg bg-white shadow-md">
      <div className="max-w-[800px]">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/customer/promote/manage">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-sky-600 hover:text-sky-900 duration-300" />
          </Link>
          <h2 className=" text-2xl font-bold capitalize text-sky-600">Promouvoir affiche:</h2>
        </div>
        {/* <h3 className="mt-10 mb-2 font-medium text-xl text-center ">Page d'acceuil</h3> */}
        <div className="flex justify-center gap-8 mt-10 mb-4">
          <button
            onClick={() => setInput((prev) => ({ ...prev, type: 1 }))}
            className={`${input.type === 4 ? "text-slate-400" : "border-b-2 border-blue-500"} font-medium text-xl`}
          >
            Page d'acceuil
          </button>
          <button
            onClick={() => setInput((prev) => ({ ...prev, type: 4 }))}
            className={`${input.type === 4 ? "border-b-2 border-blue-500" : "text-slate-400"} font-medium text-xl`}
          >
            Aléatoire
          </button>
        </div>
        <TypeSelect input={input} setInput={setInput} />
        <section className="flex flex-col scr600:flex-row gap-x-10 mt-10">
          <article className="grow">
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Affiche:</p>
            <PosterSelect input={input} setInput={setInput} />
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Durée:</p>
            {/* <DurationSelect input={input} setInput={setInput} /> */}
            <Select
              options={Array(DAYS)
                .fill(0)
                .map((el, index) => ({ value: index + 1, label: index + 1 + " jour(s)" }))}
              onChange={(option) => setInput((prev) => ({ ...prev, duration: option.value }))}
              value={input.duration}
              position="center"
            />
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">
              Lien <span className="text-slate-500 text-xs">(optionnel)</span>:
            </p>
            <input
              type="text"
              className="w-full resize-none rounded border focus:ring-1 focus:ring-blue-600 border-slate-300 px-3 py-1.5 outline-0 transition-all duration-150"
              placeholder="https://www.example.com/john-doe?page=1"
              value={input.url}
              onChange={(e) => setInput((prev) => ({ ...prev, url: e.target.value }))}
            />
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

const DAYS = 14;
