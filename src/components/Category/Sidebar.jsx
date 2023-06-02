import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PriceSlider from "../PriceSlider";
import { useUIContext } from "../../contexts/UIProvider";
import RingLoader from "../RingLoader";

function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { priceRange, setPriceRange, filtering } = useUIContext();

  // useEffect(() => {
  //   if (
  //     (searchParams.get("min") !== priceRange.min || searchParams.get("max") !== priceRange.max) &&
  //     Number(searchParams.get("min")) < Number(searchParams.get("max"))
  //   ) {
  //     setPriceRange({
  //       min: Number(searchParams.get("min")) || 0,
  //       max: Number(searchParams.get("max")) || 5000,
  //       inputMin: Number(searchParams.get("min")) || 0,
  //       inputMax: Number(searchParams.get("max")) || 5000,
  //     });
  //   }
  // }, [searchParams]);

  return (
    <div className="hidden scr900:block h-full w-[250px] py-10 px-4 bg-white font-medium text-lg shadow-md">
      <h3 className="flex items-center gap-2 font-semibold text-xl text-slate-900">
        <FontAwesomeIcon icon={faFilter} />
        Filtrer
        {filtering ? <RingLoader /> : ""}
      </h3>
      <h4 className="mt-2 text-slate-700">Prix</h4>
      <div className="px-2">
        <PriceSlider />
      </div>
      <section className="flex justify-between">
        <div className="flex mt-1 rounded-md text-sm duration-150">
          <input
            id="min"
            name="min"
            type="number"
            className="w-[50px] py-1 px-1 border border-slate-700 border-r-slate-300 rounded-l outline-0 focus:ring-1 ring-inset ring-blue-500 transition-all duration-150 hidden-arrows"
            placeholder="0000"
            value={priceRange.inputMin}
            onChange={(e) => {
              if (e.target.value >= 0 && e.target.value < priceRange.inputMax)
                setPriceRange((prev) => ({ ...prev, inputMin: e.target.value, min: Number(e.target.value) }));
              else if (e.target.value >= 0) setPriceRange((prev) => ({ ...prev, inputMin: e.target.value }));
            }}
          />
          <span className="flex items-center px-1 border border-l-0 border-slate-700 rounded-r text-xs">DT</span>
        </div>
        <div className="flex mt-1 rounded-md text-sm duration-150">
          <input
            id="max"
            name="max"
            type="number"
            className="w-[50px] py-1 px-1 border border-slate-700 border-r-slate-300 rounded-l outline-0 focus:ring-1 ring-inset ring-blue-500 transition-all duration-150 hidden-arrows"
            placeholder="0000"
            value={priceRange.inputMax}
            onChange={(e) => {
              if (e.target.value <= 5000 && e.target.value > priceRange.inputMin)
                setPriceRange((prev) => ({ ...prev, inputMax: e.target.value, max: Number(e.target.value) }));
              else if (e.target.value <= 5000) setPriceRange((prev) => ({ ...prev, inputMax: e.target.value }));
            }}
          />
          <span className="flex items-center px-1 border border-l-0 border-slate-700 rounded-r text-xs">DT</span>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
