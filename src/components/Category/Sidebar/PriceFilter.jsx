import React from "react";
import { useUIContext } from "../../../contexts/UIProvider";
import { useSearchParams } from "react-router-dom";
import PriceSlider from "../../PriceSlider";

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { priceRange, setPriceRange } = useUIContext();

  return (
    <>
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
    </>
  );
}
