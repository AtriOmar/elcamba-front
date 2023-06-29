import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faExclamationTriangle, faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Switch from "../../Switch";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline, trash } from "ionicons/icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import formatDate from "../../../lib/formatDate";
import { useUIContext } from "../../../contexts/UIProvider";
import axios from "axios";
import RingLoader from "../../RingLoader";
import { Tooltip } from "react-tooltip";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductDetails({ product, fetchProduct }) {
  const { addPopup } = useUIContext();
  const [sending, setSending] = useState({ status: false, sold: false });

  async function toggleStatus() {
    if (sending.status) return;

    const data = {
      id: product.id,
    };
    if (product.active === 1) {
      data.active = 2;
    } else if (product.active === 2) {
      data.active = 1;
    }
    setSending((prev) => ({ ...prev, status: true }));
    try {
      const res = await axios.put("/products/updateById", data);

      fetchProduct();

      addPopup({
        type: "success",
        text: "Modifié avec succés",
      });
    } catch (err) {
      console.log(err);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
    }
    setSending((prev) => ({ ...prev, status: false }));
  }

  async function toggleSold() {
    const data = {
      id: product.id,
      sold: !product.sold,
    };

    setSending((prev) => ({ ...prev, sold: true }));
    try {
      const res = await axios.put("/products/updateById", data);

      fetchProduct();

      addPopup({
        type: "success",
        text: "Modifié avec succés",
      });
    } catch (err) {
      console.log(err);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
    }
    setSending((prev) => ({ ...prev, sold: false }));
  }

  if (!product) return;

  return (
    <div className="">
      {/* ------------------------- photos swiper ----------------------------- */}
      <section className="flex flex-col scr1000:flex-row gap-4 items-start">
        <article className="scr1000:sticky top-10 shrink-0 w-full scr1000:w-2/5 min-w-[200px] max-w-[400px] mx-auto">
          <swiper-container class="rounded-lg border-2 border-slate-200" no-swiping="false" thumbs-swiper=".product-thumbs">
            {product?.photos?.map((photo, index) => (
              <swiper-slide key={index} class="relative h-auto w-full">
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="h-full w-full object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
          <swiper-container navigation="true" slides-per-group="4" slides-per-view="auto" space-between="10" class="product-thumbs w-fit p-2">
            {product?.photos?.map((photo, index) => (
              <swiper-slide
                key={index}
                class=" w-fit rounded-md opacity-60 ring-2 ring-slate-200 transition-all duration-300 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:ring-red-500 [&.swiper-slide-thumb-active]:ring-offset-1"
              >
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="aspect-square h-14 cursor-pointer rounded-md object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
        </article>
        {/* ---------------------------- product details ---------------------------- */}
        <article className="grow w-full scr1000:w-auto">
          {/*  ---------------------------- Suspended alert ---------------------------- */}
          {product.active === 0 ? (
            <div className="mt-2 py-3 px-4 rounded text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              Ce produit est suspendu, contactez nous pour plus d'informations
            </div>
          ) : (
            ""
          )}
          <h2 className="mt-4 text-2xl font-bold capitalize text-sky-600">{product.name}</h2>
          {/*  ---------------------------- modification buttons ---------------------------- */}
          <div className="fle items-center flex-wrap gap-x-4">
            <button
              className="flex items-center gap-4 w-fit mt-1  py-1.5 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
              onClick={() => {
                document.querySelector("#edit-product").scrollIntoView();
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="lg" />
              Modifier
            </button>
            <Link
              to={`/customer/promote/product?p=${product.id}`}
              className="flex items-center gap-4 w-fit mt-1  py-1.5 px-6 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            >
              <IonIcon icon={megaphoneOutline} className="text-2xl" aria-hidden="true" />
              Promouvoir
            </Link>
            {/* <button className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300">
              <IonIcon icon={trash} className="text-2xl" aria-hidden="true" />
              Supprimer
            </button> */}
            {/*  ---------------------------- Toggle sold button ---------------------------- */}
            <div className="relative mt-1 w-fit">
              {product.sold ? (
                <button
                  onClick={toggleSold}
                  className="flex items-center gap-4 w-fit  py-1.5 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white duration-300"
                >
                  {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                  Marquer non vendu
                </button>
              ) : (
                <button
                  onClick={toggleSold}
                  className="flex items-center gap-4 w-fit  py-1.5 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white duration-300"
                >
                  {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                  Marquer vendu
                </button>
              )}
              {sending.sold ? (
                <i className="absolute right-0.5 top-1/2 -translate-y-1/2">
                  <RingLoader color="white" />
                </i>
              ) : (
                ""
              )}
            </div>
            <div className="relative mt-1 w-fit">
              {product.active === 2 ? (
                <button
                  onClick={toggleStatus}
                  className="flex items-center gap-4 w-fit  py-1.5 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white duration-300"
                >
                  {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                  Rendre non active
                </button>
              ) : product.active === 1 ? (
                <button
                  onClick={toggleStatus}
                  className="flex items-center gap-4 w-fit  py-1.5 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white duration-300"
                >
                  {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                  Rendre active
                </button>
              ) : (
                ""
              )}
              {sending.status ? (
                <i className="absolute right-0.5 top-1/2 -translate-y-1/2">
                  <RingLoader color="white" />
                </i>
              ) : (
                ""
              )}
            </div>
          </div>
          {/*  ---------------------------- other details ---------------------------- */}
          <p className="mt-10 font-medium text-sky-700">Référence:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{product.id}</p>
          <p className="mt-2 font-medium text-sky-700">Date de création:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(product.createdAt)}</p>
          <p className="mt-2 font-medium text-sky-700">Dernière modification:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(product.updatedAt)}</p>
          <p className="mt-2 font-medium text-sky-700">Visible:</p>
          <Switch checked={product.active === 2} disabled={true} />
          <p className="mt-2 font-medium text-sky-700">Vendu:</p>
          <Switch checked={product.sold} disabled={true} />
          <p className="w-fit mt-10 px-2 py-1 rounded-lg bg-yellow-500 font-rubik font-normal capitalize text-white">
            {product.salePrice ? <span className="mr-2 text-xs line-through">{Number(product?.price)} DT</span> : ""}
            <span className="text-base">{Number(product?.salePrice) || Number(product?.price)} DT</span>
          </p>
          <p className="mt-10 font-medium text-sky-700">
            Nombre de vues:
            <i id="views-info" className="ml-2">
              <Info />
            </i>
          </p>
          <Tooltip
            anchorSelect={`#views-info`}
            content={<div className="max-w-[300px]">Le nombre de personnes ayant cliqué sur le produit (ouvert la page produit)</div>}
            place="right"
          />
          <p className="max-w-[700px] whitespace-pre-wrap">{product.views}</p>
          <p className="mt-2 font-medium text-sky-700">Description:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{product.description}</p>
          <p className="mt-10 font-medium text-sky-700">Ville:</p>
          <p className="flex items-center gap-2 max-w-[700px] capitalize">
            <FontAwesomeIcon icon={faLocationDot} size="1x" className="text-sky-700" />
            {product.city}
          </p>
          <p className="mt-2 font-medium text-sky-700">Adresse:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faLocationDot} size="1x" className="text-sky-700" />
            {product.address}
          </p>
          <p className="mt-2 font-medium text-sky-700">Livraison:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faTruck} size="1x" className="text-sky-700" />
            {product.delivery || "Non"}
          </p>
        </article>
      </section>
    </div>
  );
}

export default ProductDetails;

const Info = () => (
  <svg
    className={`text-blue-600 flex-shrink-0 inline w-6 h-6 transition duration-300`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    ></path>
  </svg>
);
