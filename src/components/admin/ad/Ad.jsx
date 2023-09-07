import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBan,
  faHandHoldingDollar,
  faLocationDot,
  faMessage,
  faPhone,
  faStar,
  faStarHalfStroke,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Loader from "../../Loader";
import formatDate from "../../../lib/formatDate";
import Switch from "../../Switch";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useUIContext } from "../../../contexts/UIProvider";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Product() {
  const { id } = useParams();
  const [ad, setAd] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [sending, setSending] = useState({ status: false, paid: false });
  const { addPopup } = useUIContext();

  async function fetchAds() {
    try {
      const res = await axios.get("/abc/getById", {
        params: {
          id,
        },
      });

      setAd(res.data);
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchAds();
  }, [id]);

  async function toggleStatus() {
    const data = {
      id: ad.id,
    };
    if (ad.active === 0) {
      data.active = 1;
    } else {
      data.active = 0;
    }
    setSending((prev) => ({ ...prev, status: true }));
    try {
      const res = await axios.put("/abc/updateById", data);

      setAd(res.data);

      Swal.fire("Success", "Modifié avec succés", "success");
    } catch (err) {
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, status: false }));
  }

  async function togglePaid() {
    const data = {
      id: ad.id,
    };
    if (!ad.paid) {
      data.paid = "now";
    }
    setSending((prev) => ({ ...prev, paid: true }));
    try {
      const res = await axios.put("/abc/updateById", data);

      setAd(res.data);

      Swal.fire("Success", "Modifié avec succés", "success");
    } catch (err) {
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, paid: false }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="rounded-lg py-3 px-4 bg-white shadow-card1">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="1x" className="hover:scale-125 duration-300" />
        <p className="font-medium">Retour</p>
      </button>
      {/* ------------------------- photos swiper ----------------------------- */}
      <section className="flex flex-col scr1000:flex-row gap-4 items-start mt-4">
        <article className="scr1000:sticky top-20 shrink-0 w-full scr1000:w-2/5 min-w-[200px] max-w-[400px] mx-auto">
          {
            <img
              src={`${BACKEND_URL}/uploads/${ad.photo ? "abc/" + ad.photo : ad.Product?.photos?.[0]}`}
              alt=""
              className="w-full border-2 border-slate-200 rounded-lg "
            />
          }
        </article>
        {/* ---------------------------- Ad details ---------------------------- */}

        <article className="grow w-full scr1000:w-auto">
          {/*  ---------------------------- Suspended alert ---------------------------- */}
          {ad.active === 0 ? (
            <div className="flex gap-2 items-center mt-4 font-medium text-xl text-red-500">
              <FontAwesomeIcon icon={faBan} className="" />
              Suspendu
            </div>
          ) : (
            ""
          )}
          {/*  ---------------------------- Ad type ---------------------------- */}
          <h2 className="mt-4 text-2xl font-bold capitalize text-slate-800">
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
          {/*  ---------------------------- Pay ---------------------------- */}
          {!ad.paid ? (
            <button
              onClick={togglePaid}
              className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            >
              <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
              Marquer payé
            </button>
          ) : (
            ""
          )}
          {/*  ---------------------------- Toggle status ---------------------------- */}
          <div className="flex items-center flex-wrap gap-x-4">
            {ad.paid && new Date(ad.expiresAt) > new Date() && user.accessId > ad.User.accessId && user.accessId > 2 ? (
              <div className="relative mt-4">
                {ad.active !== 0 ? (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Suspendre
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
                {sending.status ? (
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
          {/*  ---------------------------- Details ---------------------------- */}
          <p className="block relative mt-3 text-base font-semibold text-slate-700">ID:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.id}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Référence de paiement:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.token}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Date de création:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.createdAt)}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Dernière modification:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.updatedAt)}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Active:</p>
          <Switch checked={ad.active === 2 && new Date(ad.expiresAt) > new Date()} disabled={true} />
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Payé:</p>
          <Switch checked={!!ad.paid} disabled={true} />
          {ad.paid ? (
            <>
              <p className="block relative mt-3 text-base font-semibold text-slate-700">Payé le:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.paid)}</p>
              <p className="block relative mt-3 text-base font-semibold text-slate-700">Début:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.startsAt)}</p>
              <p className="block relative mt-3 text-base font-semibold text-slate-700">Fin:</p>
              <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(ad.expiresAt)}</p>
            </>
          ) : (
            ""
          )}
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Vendeur:</p>
          <p className="flex items-center gap-3">
            {ad.User?.picture ? (
              <img
                src={`${BACKEND_URL}/uploads/profile-pictures/${ad.User?.picture}`}
                alt="Profile picture"
                className="w-[40px] aspect-square rounded-[50%] border object-cover"
              />
            ) : (
              <UserCircleIcon className="w-[38px] text-sky-700" />
            )}
            {ad.User?.username}
            <Link className="" to={`/admin/users/${ad?.User?.id}`}>
              <Cog6ToothIcon className={"block h-8 w-8 text-slate-600"} aria-hidden="true" />
            </Link>
          </p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Durée:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.duration} Jour(s)</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Montant totale:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{ad.amount} DT</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Lien:</p>
          {ad.url ? (
            <a href={ad.url} target="_blank" className="text-blue-500 underline">
              {ad.url}
            </a>
          ) : (
            <p>Non spécifié</p>
          )}
        </article>
      </section>
    </div>
  );
}
