import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHandHoldingDollar, faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Switch from "../../Switch";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline, trash } from "ionicons/icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useUIContext } from "../../../contexts/UIProvider";
import RingLoader from "../../RingLoader";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function AdDetails({ ad, fetchAd }) {
  const { addPopup } = useUIContext();
  const [sending, setSending] = useState(false);

  async function toggleStatus() {
    if (sending) return;

    setSending(true);
    try {
      await axios.post("/ads/toggleStatus", { id: ad.id });
      addPopup({
        type: "success",
        text: "Publicité modifiée avec success",
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
    fetchAd();
    setSending(false);
  }

  return (
    <div className="">
      {/* ------------------------- photo ----------------------------- */}
      <section className="flex flex-col scr1000:flex-row gap-4 items-start">
        <article className="scr1000:sticky top-10 shrink-0 w-full scr1000:w-2/5 min-w-[200px] max-w-[400px] mx-auto">
          {
            <img
              src={`${BACKEND_URL}/uploads/${ad.photo ? "ads/" + ad.photo : ad.Product?.photos?.[0]}`}
              alt=""
              className="w-full border-2 border-slate-200 rounded-lg "
            />
          }
        </article>
        {/* ---------------------------- product details ---------------------------- */}
        <article className="grow w-full scr1000:w-auto">
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
          {!ad.paid ? (
            <Link
              to={`/payment/${ad.token}`}
              target="_blank"
              className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            >
              <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
              Payer
            </Link>
          ) : (
            ""
          )}
          <div className="flex items-center flex-wrap gap-x-4">
            {ad.paid && new Date(ad.expiresAt) > new Date() ? (
              <div className="relative mt-4">
                {ad.active ? (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Désactiver
                  </button>
                ) : (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Activer
                  </button>
                )}
                {sending ? (
                  <i className="absolute right-1 top-1/2 -translate-y-1/2">
                    <RingLoader color="white" />
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
          <p className="mt-10 font-medium text-sky-700">Référence:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.id}</p>
          <p className="mt-2 font-medium text-sky-700">Référence de paiement:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.token}</p>
          <p className="mt-2 font-medium text-sky-700">Date de création:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(ad.createdAt))}
          </p>
          <p className="mt-2 font-medium text-sky-700">Dernière modification:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(ad.updatedAt))}
          </p>
          <p className="mt-2 font-medium text-sky-700">Active:</p>
          <Switch checked={ad.active && new Date(ad.expiresAt) > new Date()} disabled={true} />
          <p className="mt-2 font-medium text-sky-700">Payé:</p>
          <Switch checked={!!ad.paid} disabled={true} />
          {ad.paid ? (
            <>
              <p className="mt-2 font-medium text-sky-700">Payé le:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(ad.paid))}
              </p>
              <p className="mt-2 font-medium text-sky-700">Début:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(ad.startsAt))}
              </p>
              <p className="mt-2 font-medium text-sky-700">Fin:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(ad.expiresAt))}
              </p>
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
