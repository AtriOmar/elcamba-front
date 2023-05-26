import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

const clientId = import.meta.env.VITE_CLIENT_ID;

function MyProducts({ setPage, swiperRef, products }) {
  // console.log(swiper);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5 pr-0.5">
        <h3 className="font-medium text-lg">Mes produits</h3>
        <button
          className="py-2 px-4 rounded-lg bg-red-500 text-white"
          onClick={() => {
            swiperRef.current?.swiper.slideTo(1);
          }}
        >
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
          <div className="grid grid-cols-[minmax(130px,150px)_minmax(200px,1fr)_160px_100px_100px]">
            <div className="col-spa-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Photo</div>
            <div className="col-spa-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Nom</div>
            <div className="col-spa-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Categorie</div>
            <div className="col-spa-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Prix ancien</div>
            <div className="col-spa-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Prix</div>
          </div>

          {products.map((product) => (
            <Link
              to={`/customer/products/${product.id}`}
              className="grid grid-cols-[minmax(130px,150px)_minmax(200px,1fr)_160px_100px_100px] hover:bg-slate-100 duration-150"
              key={product.id}
            >
              <div className="px-6 py-4">
                <img
                  className="w-full aspect-square rounded-lg object-contain "
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.photos?.[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-sm text-gray-500">{product.SubCategory.name}</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-sm text-gray-500">{product.oldPrice !== 0 ? product.oldPrice + " DT" : "-"}</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-sm text-gray-500">{product.price} DT</div>
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
