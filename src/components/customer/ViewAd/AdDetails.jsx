import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle, faHandHoldingDollar, faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Switch from "../../Switch";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline, trash } from "ionicons/icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useUIContext } from "../../../contexts/UIProvider";
import RingLoader from "../../RingLoader";
import formatDate from "../../../lib/formatDate";
import validator from "validator";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function isValidURL(urlString) {
  const options = {
    require_protocol: true,
    protocols: ["http", "https"],
  };

  return validator.isURL(urlString, options);
}

function AdDetails({ ad, fetchAd }) {
  const { addPopup } = useUIContext();
  const [sending, setSending] = useState({ status: false, url: false });
  const [input, setInput] = useState({ url: ad?.url });

  async function updateUrl() {
    if (sending.url) return;

    if (input.url && !isValidURL(input.url)) {
      addPopup({ type: "danger", text: "Veuillez entrer un lien valide" });
      return;
    }

    const data = {
      id: ad.id,
      url: input.url,
    };

    setSending((prev) => ({ ...prev, url: true }));
    try {
      await axios.put("/ads/updateById", data);

      fetchAd();

      addPopup({
        type: "success",
        text: "Publicité modifiée avec succés",
        lastFor: 2000,
      });
    } catch (err) {
      console.log(err);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
        lastFor: 2000,
      });
    }
    setSending((prev) => ({ ...prev, url: false }));
  }

  async function toggleStatus() {
    if (sending.status) return;

    const data = {
      id: ad.id,
    };
    if (ad.active === 1) {
      data.active = 2;
    } else if (ad.active === 2) {
      data.active = 1;
    } else return;

    setSending((prev) => ({ ...prev, status: true }));
    try {
      await axios.put("/ads/updateById", data);

      fetchAd();

      addPopup({
        type: "success",
        text: "Publicité modifiée avec succés",
        lastFor: 2000,
      });
    } catch (err) {
      console.log(err);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
        lastFor: 2000,
      });
    }
    setSending((prev) => ({ ...prev, status: false }));
  }

  if (!ad) return;

  return (
    <div className="">
      {/* ------------------------- photo ----------------------------- */}
      <section className="flex flex-col scr1000:flex-row gap-4 items-start">
        <article className="scr1000:sticky top-20 shrink-0 w-full scr1000:w-2/5 min-w-[200px] max-w-[400px] mx-auto">
          {
            <img
              src={`${BACKEND_URL}/uploads/${ad?.photo ? "ads/" + ad?.photo : ad?.Product?.photos?.[0]}`}
              alt=""
              className="w-full border-2 border-slate-200 rounded-lg "
            />
          }
        </article>
        {/* ---------------------------- Ad details ---------------------------- */}
        <article className="grow w-full scr1000:w-auto">
          {/*  ---------------------------- Suspended ---------------------------- */}
          {ad.active === 0 ? (
            <div className="mt-2 py-3 px-4 rounded text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              Cette publicité est suspendue, contactez nous pour plus d'informations
            </div>
          ) : (
            ""
          )}
          {/*  ---------------------------- Ad type ---------------------------- */}
          <h2 className="mt-4 text-2xl font-bold capitalize text-sky-600">
            {ad.Product ? (
              <>
                Produit:
                <br />
                {ad.Product.name}
              </>
            ) : (
              "Affiche:"
            )}
          </h2>
          {/*  ---------------------------- Pay button ---------------------------- */}
          {!ad.paid ? (
            <Link
              to={`/payment/${ad.token}`}
              target="_blank"
              className="flex items-center gap-4 w-fit mt-1  py-1.5 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            >
              <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
              Payer
            </Link>
          ) : (
            ""
          )}
          {/*  ---------------------------- Toggle status button ---------------------------- */}
          <div className="flex items-center flex-wrap gap-x-4">
            {ad.paid && new Date(ad.expiresAt) > new Date() ? (
              <div className="relative mt-1">
                {ad.active === 2 ? (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit  py-1.5 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Désactiver
                  </button>
                ) : ad.active === 1 ? (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit   py-1.5 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Activer
                  </button>
                ) : (
                  ""
                )}
                {sending.status ? (
                  <i className="absolute right-0.5 top-1/2 -translate-y-1/2">
                    <RingLoader color="white" width="20" />
                  </i>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {/* <button className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300">
              <IonIcon icon={trash} className="text-2xl" aria-hidden="true" />
              Supprimer
            </button> */}
          </div>
          {ad.type !== 0 ? (
            <>
              {/*  ---------------------------- url input ---------------------------- */}
              <p className="mt-2 font-medium text-sky-700">Lien:</p>
              <div className="relative flex flex-col scr600:flex-row gap-2 mr-5">
                <input
                  value={input.url}
                  onChange={(e) => setInput((prev) => ({ ...prev, url: e.target.value }))}
                  type="text"
                  className="grow px-3 py-1 border border-slate-400 rounded"
                  placeholder="Lien"
                />
                <div className="relative flex gap-2 w-fit">
                  <button
                    className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed duration-150"
                    onClick={updateUrl}
                    disabled={ad.url === input.url}
                  >
                    Enregistrer
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm"
                    onClick={() => {
                      setInput((prev) => ({ ...prev, url: ad?.url }));
                    }}
                  >
                    Annuler
                  </button>
                  {sending.url ? (
                    <i className="absolute -right-6 top-1/2 -translate-y-1/2">
                      <RingLoader color="black" />
                    </i>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/*  ---------------------------- Frame ---------------------------- */}
              <p className="mt-4 font-medium text-sky-700">Cadre:</p>
              <div className="flex justify-center gap-8 mb-2">
                <div className={`${ad.type === 4 ? "text-slate-400" : "border-b-2 border-blue-500"} font-medium text-lg`}>Page d'acceuil</div>
                <div className={`${ad.type === 4 ? "border-b-2 border-blue-500" : "text-slate-400"} font-medium text-lg`}>Aléatoire</div>
              </div>
              {ad.type === 4 ? (
                <div className={`w-full max-w-[500px] grid place-items-center mx-auto aspect-[2/1] ring-blue-500 border rounded-lg hover:bg-slate-100 ring-2`}>
                  <div className="">
                    <p>Page d'acceuil</p>
                    <p>Page de détails produit</p>
                    <p>Page des produits</p>
                    <p className="mt-2 text-center font-medium">2:1</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-1 w-full">
                  <div className={`w-[15.38%] border rounded-lg bg-slate-500`}></div>
                  <div className="flex flex-col gap-1 w-[46.15%]">
                    <div
                      className={`w-full grid place-items-center  aspect-[2/1] ring-blue-500 border rounded-lg duration-150 ${ad.type === 1 ? "ring-2" : ""}`}
                    >
                      2:1
                    </div>
                    <div className={`grow w-full border rounded-lg bg-slate-500`}></div>
                  </div>
                  <div className={`grid gap-1 w-[38.46%]`}>
                    <div className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg duration-150 ${ad.type === 2 ? "ring-2" : ""}`}>
                      1:1
                    </div>
                    <div className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg duration-150 ${ad.type === 2 ? "ring-2" : ""}`}>
                      1:1
                    </div>
                    <div
                      className={`aspect-[2/1] grid place-items-center col-span-2 ring-blue-500 border rounded-lg duration-150 ${
                        ad.type === 3 ? "ring-2" : ""
                      }`}
                    >
                      2:1
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
          {/*  ---------------------------- Details ---------------------------- */}
          <p className="mt-10 font-medium text-sky-700">Référence:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.id}</p>
          <p className="mt-2 font-medium text-sky-700">Référence de paiement:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.token}</p>
          <p className="mt-2 font-medium text-sky-700">Date de création:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.createdAt)}</p>
          <p className="mt-2 font-medium text-sky-700">Dernière modification:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.updatedAt)}</p>
          <p className="mt-2 font-medium text-sky-700">Active:</p>
          <Switch checked={ad.active === 2 && new Date(ad.expiresAt) > new Date()} disabled={true} />
          <p className="mt-2 font-medium text-sky-700">Payé:</p>
          <Switch checked={!!ad.paid} disabled={true} />
          {ad.paid ? (
            <>
              <p className="mt-2 font-medium text-sky-700">Payé le:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.paid)}</p>
              <p className="mt-2 font-medium text-sky-700">Début:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.startsAt)}</p>
              <p className="mt-2 font-medium text-sky-700">Fin:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.expiresAt)}</p>
            </>
          ) : (
            ""
          )}
          <p className="mt-2 font-medium text-sky-700">Durée:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.duration} Jour(s)</p>
          <p className="mt-2 font-medium text-sky-700">Montant totale:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.amount} DT</p>
        </article>
      </section>
    </div>
  );
}

export default AdDetails;
