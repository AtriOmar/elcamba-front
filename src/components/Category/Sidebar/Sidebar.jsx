import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PriceFilter from "./PriceFilter";
import { useUIContext } from "../../../contexts/UIProvider";
import RingLoader from "../../RingLoader";
import parseQuery from "../../../lib/parseQuery";
import DeliveryCheckbox from "./DeliveryCheckbox";
import CitySelect from "./CitySelect";

function Sidebar() {
  const { filtering, filterSidebarOpen, setFilterSidebarOpen } = useUIContext();
  const [params, setParams] = useSearchParams();

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
    <div
      className={`fixed top-0 left-0 scr900:relative z-30 scr900:z-0 h-full w-full scr500:w-[250px] py-10 px-3 bg-white font-medium text-lg shadow-md transition duration-300 ${
        filterSidebarOpen ? "" : "-translate-x-full scr900:translate-x-0"
      }`}
    >
      <button className="scr1000:hidden absolute top-3 right-3" onClick={() => setFilterSidebarOpen(false)}>
        <FontAwesomeIcon icon={faXmark} className="text-black" size="lg" />
      </button>
      <h3 className="flex items-center gap-2 font-semibold text-xl text-slate-900">
        <FontAwesomeIcon icon={faFilter} />
        Filtrer
        {filtering ? <RingLoader /> : ""}
      </h3>
      <h4 className="mt-2 text-slate-700">Prix</h4>
      <PriceFilter />
      <h4 className="mt-2 text-slate-700">Livraision</h4>
      <DeliveryCheckbox />
      <h4 className="mt-2 text-slate-700">Ville</h4>
      <CitySelect />
    </div>
  );
}

export default Sidebar;
