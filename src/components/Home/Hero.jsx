import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import CategoriesList from "./Hero/CategoriesList";
import ProductCard from "./Hero/ProductCard";
import PremiumProducts from "./Hero/PremiumProducts";
import AdsSlider from "./Hero/AdsSlider";

function Hero() {
  return (
    <div className="mt-6 px-4">
      <div className="relative flex gap-3 h-[550px] max-w-w1300 w-full m-auto py-4 px-4 rounded-xl bg-white shadow-md">
        <CategoriesList />
        <section className="w-6/12">
          <article className="h-3/5 border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={1} />
          </article>
          <article className="h-2/5 mt-1 border border-slate-200 rounded-lg">
            <PremiumProducts />
          </article>
        </section>
        <section className="grow">
          <article className="grid grid-cols-2 gap-1 justify-between h-1/2">
            <div className="border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={2} />
            </div>
            <div className="border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={2} />
            </div>
          </article>
          <article className="grid grid-cols-1 h-1/2 mt-1 border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={3} />
          </article>
        </section>
      </div>
    </div>
  );
}

export default Hero;
