import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Switch from "../../Switch";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline, trash } from "ionicons/icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductDetails({ product }) {
  return (
    <div className="">
      {/* ------------------------- photos swiper ----------------------------- */}
      <section className="flex flex-col scr1000:flex-row gap-4 items-start">
        <article className="scr1000:sticky top-10 shrink-0 w-full scr1000:w-2/5 min-w-[200px] max-w-[400px] mx-auto">
          <swiper-container class="rounded-lg border-2 border-slate-200" no-swiping="false" thumbs-swiper=".product-thumbs">
            {product.photos.map((photo, index) => (
              <swiper-slide key={index} class="relative h-auto w-full">
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="h-full w-full object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
          <swiper-container navigation="true" slides-per-group="4" slides-per-view="auto" space-between="10" class="product-thumbs w-fit p-2">
            {product.photos.map((photo, index) => (
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
          <h2 className="mt-4 text-2xl font-bold capitalize text-sky-600">{product.name}</h2>
          <div className="flex items-center flex-wrap gap-x-4">
            <button
              className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
              onClick={() => {
                document.querySelector("#edit-product").scrollIntoView();
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="lg" />
              Modifier
            </button>
            <Link
              to={`/customer/promote/product?p=${product.id}`}
              className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            >
              <IonIcon icon={megaphoneOutline} className="text-2xl" aria-hidden="true" />
              Promouvoir
            </Link>
            <button className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300">
              <IonIcon icon={trash} className="text-2xl" aria-hidden="true" />
              Supprimer
            </button>
          </div>
          <p className="mt-10 font-medium text-sky-700">Date de création:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(product.createdAt))}
          </p>
          <p className="mt-2 font-medium text-sky-700">Dernière modification:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(product.updatedAt))}
          </p>
          <p className="mt-2 font-medium text-sky-700">Visible:</p>
          <Switch checked={product.visible} disabled={true} />
          <p className="mt-2 font-medium text-sky-700">Vendu:</p>
          <Switch checked={product.sold} disabled={true} />
          <p className="w-fit mt-10 px-2 py-1 rounded-lg bg-yellow-500 font-rubik font-normal capitalize text-white">
            {product.oldPrice ? <span className="mr-2 text-xs line-through">{product.oldPrice} DT</span> : ""}
            <span className="text-base">{product.price} DT</span>
          </p>
          <p className="mt-10 font-medium text-sky-700">Description:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{product.description}</p>
          <p className="mt-10 font-medium text-sky-700">Adresse:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faLocationDot} size="1x" className="text-sky-700" />
            {product.address}
          </p>
          <p className="mt-2 font-medium text-sky-700">Livraison:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faTruck} size="1x" className="text-sky-700" />
            {product.deliveryBody || "Non"}
          </p>
        </article>
      </section>
    </div>
  );
}

export default ProductDetails;
