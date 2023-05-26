import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import CategoriesList from "./Hero/CategoriesList";
import ProductCard from "./Hero/ProductCard";
import PremiumProducts from "./Hero/PremiumProducts";
import AdsSlider from "./Hero/AdsSlider";

function Hero({ setLoading }) {
  return (
    <div className="mt-6 px-4">
      <div className="relative flex gap-2 w-fit m-auto py-4 px-4 rounded-xl bg-white shadow-md">
        <CategoriesList setLoading={setLoading} />
        <section className="flex flex-col justify-between w-[600px] ml-1">
          <article className="w-full h-[300px] border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={1} setLoading={setLoading} />
          </article>
          <article className="w-full h-[220px] border border-slate-200 rounded-lg">
            <PremiumProducts setLoading={setLoading} />
          </article>
        </section>
        <section className="flex flex-col justify-between w-[450px]">
          <article className="grid grid-cols-2 justify-between h-[260px]">
            <div className="w-[220px] border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={2} setLoading={setLoading} />
            </div>
            <div className="w-[220px] border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={2} setLoading={setLoading} />
            </div>
          </article>
          <article className="grid grid-cols-1 h-[260px] mt-1 border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={3} setLoading={setLoading} />
          </article>
        </section>
      </div>
    </div>
  );
}

export default Hero;
