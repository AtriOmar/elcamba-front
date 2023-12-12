import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../Loader";
import sad from "../../assets/images/sad.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";
import ProductCard from "./ProductCard";
import PosterCard from "./PosterCard";
import formatDate from "../../lib/formatDate";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Payment() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(1);
  const [status, setStatus] = useState(undefined);

  async function handlePayment(event) {
    //
    if (event.data.event_id === "paymee.complete") {
      setLoading(2);
      const res = await axios.get(`/abc/pay`, {
        params: {
          token,
        },
      });

      setStatus(res.data);
      setLoading(0);
    }
  }

  useEffect(() => {
    async function fetchOrder() {
      if (!loading) setLoading(1);
      try {
        const res = await axios.get("/abc/getByToken", {
          params: {
            token,
          },
        });

        setOrder(res.data);
      } catch (err) {}
      setLoading(0);
      window.addEventListener("message", handlePayment);
    }
    fetchOrder();
  }, []);

  if (loading === 1) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="py-20 px-20 rounded-lg bg-white shadow-md">
          <img className="w-[150px] mx-auto " src={sad} alt="" />
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas la commande demandé</h3>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-[500px] my-6 scr1000:mx-6 py-12 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
        <h3 className="font-medium text-sky-700 text-xl text-center ">Détails du commande</h3>
        {order.type === 0 ? <ProductCard order={order} /> : <PosterCard order={order} />}
        <p className="flex gap-3 mt-6">
          <span className="font-medium text-sky-700">Durée:</span>
          <span>{order.duration} Jours</span>
        </p>
        <p className="flex gap-3 mt-2">
          <span className="font-medium text-sky-700">Montant:</span>
          <span>{order.amount} DT</span>
        </p>
        {order.url ? (
          <p className="flex gap-3 mt-2">
            <span className="font-medium text-sky-700">Lien:</span>
            <a href={order.url} target="_blank" className="text-blue-500 underline">
              {order.url}
            </a>
          </p>
        ) : (
          ""
        )}
        <div className="w-full my-10  h-px bg-sky-700"></div>
        {order.paid ? (
          <>
            <p className="flex gap-3 mt-2">
              <span className="font-medium text-sky-700">Payé le:</span>
              <span>{formatDate(order.paid)}</span>
            </p>
            <p className="flex gap-3 mt-2">
              <span className="font-medium text-sky-700">Début:</span>
              <span>{formatDate(order.startsAt)}</span>
            </p>
            <p className="flex gap-3 mt-2">
              <span className="font-medium text-sky-700">Fin:</span>
              <span>{formatDate(order.expiresAt)}</span>
            </p>
          </>
        ) : status === undefined ? (
          <div className="relative w-full max-w-full">
            <div className={`${loading === 2 ? "invisible" : ""}`}>
              <h3 className="text-center font-bold text-lg text-slate-900">Payer</h3>
              <iframe src={`https://sandbox.paymee.tn/gateway/${order.token}`} className="w-[500px] max-w-full h-[500px] mx-auto"></iframe>
            </div>
            {loading === 2 ? (
              <i className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ColorRing
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{ marginLeft: "auto" }}
                  wrapperClass="blocks-wrapper"
                  colors={["#0F172A"]}
                />
              </i>
            ) : (
              ""
            )}
          </div>
        ) : status === true ? (
          <p className="font-bold text-lg text-center text-green-600">Paiement effectué avec success</p>
        ) : (
          <p className="font-bold text-lg text-center text-red-600">Paiement échoué</p>
        )}
        <Link
          to="/"
          className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default Payment;
