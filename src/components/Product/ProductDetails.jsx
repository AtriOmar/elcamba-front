import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import formatPath from "../../lib/formatPath";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLocationDot, faMessage, faPhone, faStar, faStarHalfStroke, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductDetails({ product, path }) {
  const navigate = useNavigate();

  return (
    <div className="m-2 rounded-lg bg-white p-6 shadow-md">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 text-black hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="sm" className="" />
        <h2 className=" font-semibold capitalize">Retour</h2>
      </button>
      <section className="flex flex-col scr800:flex-row gap-4 items-start">
        <article className="scr800:sticky top-[64px] shrink-0 w-full scr800:w-2/5 scr800:min-w-[300px] max-w-[500px] mx-auto">
          <swiper-container class="rounded-lg border-2 border-slate-200" no-swiping="false" thumbs-swiper=".product-thumbs">
            {product?.photos?.map?.((photo, index) => (
              <swiper-slide key={index} class="relative h-auto w-full">
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="h-full w-full object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
          <swiper-container slides-per-view="auto" space-between="10" class="product-thumbs w-fit p-2">
            {product?.photos?.map?.((photo, index) => (
              <swiper-slide
                key={index}
                class=" w-fit rounded-md opacity-60 ring-2 ring-slate-200 transition-all duration-300 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:ring-red-500 [&.swiper-slide-thumb-active]:ring-offset-1"
              >
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="aspect-square h-14 cursor-pointer rounded-md object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
        </article>
        <article className="grow">
          {formatPath(path, "font-medium text-sm flex-wrap")}
          <h2 className="mt-4 text-2xl font-bold capitalize text-sky-600">{product?.name}</h2>
          <p className="w-fit mt-10 px-2 py-1 rounded-lg bg-yellow-500 font-rubik font-normal capitalize text-white">
            {product?.oldPrice ? <span className="mr-2 text-xs line-through">{Number(product?.salePrice)} DT</span> : ""}
            <span className="text-base">{Number(product?.price)} DT</span>
          </p>
          <p className="mt-10 font-medium text-sky-700">Description:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{product?.description}</p>
          <div className="flex flex-col scr600:flex-row scr800:flex-col scr1100:flex-row items-start scr600:items-center scr800:items-start scr1100:items-center gap-4 mt-10 max-w-[700px]">
            <div className="flex flex-col gap-2 grow">
              <p className="font-medium text-sky-700">Vendeur:</p>
              <p className="flex items-center gap-3">
                {product?.User?.picture ? (
                  <img
                    src={`${BACKEND_URL}/uploads/profile-pictures/${product?.User?.picture}`}
                    alt="Profile picture"
                    className="w-[40px] aspect-square rounded-[50%] border object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-[38px] text-sky-700" />
                )}
                {product?.User?.username}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                className="grid grid-cols-[20px_1fr] items-center gap-4 py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-600 text-white duration-300"
                to={"/customer/chat/" + product?.User?.id}
              >
                <FontAwesomeIcon icon={faMessage} className="text-white" />
                Contacter le vendeur
              </Link>
              {product?.User?.phone ? (
                <a
                  className="grid grid-cols-[20px_1fr] items-center gap-4 py-2 px-10 rounded-lg bg-sky-500 hover:bg-sky-600 text-white duration-300"
                  href={`tel:${product?.User?.phone}`}
                >
                  <FontAwesomeIcon icon={faPhone} className="text-white" />
                  <span className="text-center">{product?.User?.phone}</span>
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* <p className="mt-10 font-medium text-sky-700">Adresse:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faLocationDot} size="1x" className="text-sky-700" />
            <span className="first-letter:uppercase">
              {product?.city}, {product?.address}
            </span>
          </p> */}
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
            {product?.delivery || "Non"}
          </p>
        </article>
      </section>
    </div>
  );
}

export default ProductDetails;
