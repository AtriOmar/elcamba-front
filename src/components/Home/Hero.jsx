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
    <div className="mt-2 scr1150:mt-6 scr1150:px-4 [&_*]:box-content box-content">
      <div className="relative flex flex-col scr1150:flex-row gap-2 scr1150:w-fit m-auto py-4 px-0.5 scr1150:px-4 rounded-xl bg-white shadow-md">
        <CategoriesList setLoading={setLoading} />
        <section className="flex flex-col justify-between  scr1150:w-[600px]">
          <article className="grid aspect-[2/1] border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={1} setLoading={setLoading} />
          </article>
          <article className="scr1150:aspect-[600/220] border border-slate-200 rounded-lg">
            <PremiumProducts setLoading={setLoading} />
          </article>
        </section>
        <section className="grid grid-cols-2 scr600:grid-cols-4 scr1150:grid-cols-2 gap-2 w-full scr1150:w-[450px]">
          <div className="aspect-[220/260] border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={2} setLoading={setLoading} />
          </div>
          <div className="aspect-[220/260] border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={2} setLoading={setLoading} />
          </div>
          <article className="col-span-2 aspect-[450/260] border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={3} setLoading={setLoading} />
          </article>
        </section>
        {/* <section className="flex flex-col justify-between w-[450px]">
          <article className="grid grid-cols-2 gap-2 justify-between aspect-[450/260]">
            <div className="aspect-[220/260] h-full border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={2} setLoading={setLoading} />
            </div>
            <div className="w-[220px aspect-[220/260] h-full border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={2} setLoading={setLoading} />
            </div>
          </article>
          <article className="grid grid-cols-1 h-[260px] mt-1 border border-slate-200 rounded-lg bg-cover overflow-hidden">
            <AdsSlider type={3} setLoading={setLoading} />
          </article>
        </section> */}
      </div>
    </div>
  );
}

export default Hero;
