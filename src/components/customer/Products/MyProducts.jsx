import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const clientId = import.meta.env.VITE_CLIENT_ID;

function MyProducts({ setPage, swiperRef, products }) {
  // console.log(swiper);

  return (
    <div className="w-full">
      <div className="flex flex-col scr600:flex-row scr600:items-center justify-between gap-y-2 mb-8 pr-1.5">
        <h2 className="self-start text-2xl font-bold capitalize text-sky-600">Mes produits:</h2>
        <button
          className={`self-end flex gap-2 items-center px-4 py-2 border border-slate-300 rounded bg-green-500 hover:bg-green-600 outline-0 text-white transition-all duration-150 ring-green-700 ring-offset-2 focus:ring-2`}
          onClick={() => {
            swiperRef.current?.swiper.slideTo(1);
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
          Ajouter un produit
        </button>
      </div>
      {/* <div id="signIn" className="w-[100px]"></div> */}
      {products.length ? (
        // products.map((group) => (
        //   <div key={group[0].SubCategory.name}>
        //     <h3 className="relative w-fit mx-auto mt-5 font-semibold text-2xl text-center text-sky-900 capitalize before:absolute before:top-1/2 before:right-[105%] before:-translate-y-1/2 before:w-[100px] before:h-[1.5px] before:rounded-l-[50%] before:bg-sky-900 after:absolute after:top-1/2 after:left-[105%] after:-translate-y-1/2 after:w-[100px] after:h-[1.5px] after:rounded-r-[50%] after:bg-sky-900 ">
        //       {group[0].SubCategory.name}
        //     </h3>
        //     <div className="flex flex-wrap gap-3 mt-1 p-1">
        //       {group.map((product) => (
        //         <ProductCard product={product} key={product.id} />
        //       ))}
        //     </div>
        //   </div>
        // ))
        <>
          <div className="hidden scr800:grid grid-cols-[minmax(100px,110px)_minmax(120px,2fr)_minmax(160px,1fr)_160px_160px] bg-sky-600 font-medium text-white text-xs text-left uppercase">
            <div className="col-spa-1 px-6 py-3 tracking-wider">Photo</div>
            <div className="col-spa-3 px-6 py-3 tracking-wider">Nom</div>
            <div className="col-spa-2 px-6 py-3 tracking-wider">Categorie</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Prix ancien</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Prix</div>
          </div>

          {products.map((product) => (
            <Link
              to={`/customer/products/${product.id}`}
              className="grid grid-cols-[90px_1fr] scr800:grid-cols-[minmax(100px,110px)_minmax(120px,2fr)_minmax(160px,1fr)_160px_160px] py-2 scr800:py-0 [&:nth-of-type(2n+1)]:bg-gray-50 hover:bg-slate-100 duration-150"
              key={product.id}
            >
              <div className="px-1 scr800:px-3 py-1 scr800:py-2 row-span-4 scr800:row-span-1">
                <img
                  className="sticky top-0 w-full aspect-square border rounded-lg object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.photos?.[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">nom:</p>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">catég:</p>
                <p className="text-sm text-gray-500">{product.SubCategory.name}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">prix anc:</p>
                <p className="text-sm text-gray-500">{product.oldPrice !== 0 ? product.oldPrice + " DT" : "-"}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">prix:</p>
                <p className="text-sm text-gray-500">{product.price} DT</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="py-20 px-6 font-bold text-gray-500 text-2xl text-center">Vous n'avez aucun produit à vendre</div>
      )}
    </div>
  );
}

export default MyProducts;
