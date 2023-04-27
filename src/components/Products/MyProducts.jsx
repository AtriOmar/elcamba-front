import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import jwtDecode from "jwt-decode";

const clientId = import.meta.env.VITE_CLIENT_ID;

function MyProducts({ setPage, products }) {
  function handleResponse(response) {
    console.log(response.credential);
    console.log(jwtDecode(response.credential));
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-medium text-lg">Mes produits</h3>
        <button className="py-2 px-4 rounded-lg bg-red-500 text-white" onClick={() => setPage(1)}>
          Ajouter un produit
        </button>
      </div>
      {/* <div id="signIn" className="w-[100px]"></div> */}
      {products.map((group) => (
        <div key={group[0].SubCategory.name}>
          <h3 className="relative w-fit mx-auto mt-5 font-semibold text-2xl text-center text-sky-900 capitalize before:absolute before:top-1/2 before:right-[105%] before:-translate-y-1/2 before:w-[100px] before:h-[1.5px] before:rounded-l-[50%] before:bg-sky-900 after:absolute after:top-1/2 after:left-[105%] after:-translate-y-1/2 after:w-[100px] after:h-[1.5px] after:rounded-r-[50%] after:bg-sky-900 ">
            {group[0].SubCategory.name}
          </h3>
          <div className="flex flex-wrap gap-3 mt-1 p-1">
            {group.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyProducts;
