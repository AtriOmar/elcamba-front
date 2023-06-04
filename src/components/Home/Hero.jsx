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
    <div className="mt-2 scr1150:mt-6 scr1150:px-4 ">
      <div className="relative flex gap-1 w-full max-w-[800px] scr1150:max-w-none min-[1300px]:max-w-[1260px] min-[1450px]:max-w-[1400px] mx-auto py-4 px-0.5 scr1150:px-4 bg-white rounded-xl shadow-md">
        <CategoriesList setLoading={setLoading} />
        <div className="grow flex flex-col scr1150:flex-row gap-1 max-w-full">
          <section className="flex flex-col gap-1 justify-between scr1150:w-[55.55%] ">
            <article className="grid aspect-[2/1] border border-slate-200 rounded-lg bg-cover overflow-hidden">
              <AdsSlider type={1} setLoading={setLoading} />
            </article>
            <article className=" border border-slate-200 rounded-lg">
              <PremiumProducts setLoading={setLoading} />
            </article>
          </section>
          <section className="flex flex-col scr600:flex-row scr1150:flex-col justify-between gap-1 scr1150:w-[45.45%]">
            <article className="grid grid-cols-2 gap-1 h-fit w-full scr600:w-1/2 scr1150:w-full">
              <div className="aspect-square border border-slate-200 rounded-lg bg-cover overflow-hidden">
                <AdsSlider type={2} setLoading={setLoading} />
              </div>
              <div className="aspect-square border border-slate-200 rounded-lg bg-cover overflow-hidden">
                <AdsSlider type={2} setLoading={setLoading} />
              </div>
            </article>
            <article className="grid w-full scr600:w-1/2 scr1150:w-full aspect-[2/1] border border-slate-200 rounded-lg bg-cover overflow-hidden">
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
    </div>
  );
}

export default Hero;
