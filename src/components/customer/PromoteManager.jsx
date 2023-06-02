import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Switch from "../Switch";
import SortProducts from "./PromoteManager/SortProducts";
import AdsPerPage from "./PromoteManager/AdsPerPage";
import AdStatus from "./PromoteManager/AdStatus";
import AdType from "./PromoteManager/AdType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateDropdown from "./PromoteManager/CreateDropdown";
import circleDollar from "../../assets/images/dollar-circle-delete.svg";
import RingLoader from "../RingLoader";

function PromoteManager() {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState({
    type: "all",
    status: "all",
    order: "desc",
    orderBy: "startsAt",
    adsPerPage: 50,
  });
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    async function fetchAds() {
      if (!loading) setLoading(2);
      const result = await axios.get("/ads/getByUserId", {
        params: {
          ...filter,
        },
      });

      console.log(result.data);
      setAds(result.data);
      setLoading(0);
    }

    fetchAds();
  }, [filter]);

  console.log(filter);

  return (
    <div className="p-6 pb-20 rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="mb-8 text-2xl font-bold capitalize text-sky-600">Vos publicités:</h2>
        <CreateDropdown />
      </div>
      <div className="flex gap-x-10 mb-4">
        <div>
          <p className="font-medium text-slate-900">Trier par:</p>
          <SortProducts input={filter} setInput={setFilter} />
        </div>
        <div>
          <p className="font-medium text-slate-900">Publicités/page:</p>
          <AdsPerPage input={filter} setInput={setFilter} />
        </div>
        <div>
          <p className="font-medium text-slate-900">État:</p>
          <AdStatus input={filter} setInput={setFilter} />
        </div>
        <div>
          <p className="font-medium text-slate-900">Type:</p>
          <AdType input={filter} setInput={setFilter} />
        </div>
        {loading === 2 ? (
          <div className="self-center">
            <RingLoader color="black" />
          </div>
        ) : (
          ""
        )}
      </div>
      {ads.length ? (
        <>
          <div className="grid grid-cols-[minmax(100px,110px)_minmax(120px,1fr)_minmax(160px,1fr)_minmax(140px,1fr)_160px] bg-sky-600 font-medium text-white uppercase ">
            <div className="col-spa-1 px-6 py-3 text-left text-xs tracking-wider">Photo</div>
            <div className="col-spa-3 px-6 py-3 text-left text-xs tracking-wider">Type</div>
            <div className="col-spa-1 px-6 py-3 text-left text-xs tracking-wider">Début</div>
            <div className="col-spa-1 px-6 py-3 text-left text-xs tracking-wider">Fin</div>
            <div className="col-spa-1 px-6 py-3 text-left text-xs tracking-wider">Active</div>
          </div>

          {ads.map((ad) => (
            <Link
              to={`/customer/promote/${ad.id}`}
              className="grid grid-cols-[minmax(100px,110px)_minmax(120px,1fr)_minmax(160px,1fr)_minmax(140px,1fr)_160px] hover:bg-slate-100 duration-150"
              key={ad.id}
            >
              <div className="px-6 py-4">
                <img
                  className="w-full aspect-square border rounded-lg object-contain "
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${ad.type === 0 ? ad.Product.photos[0] : "ads/" + ad.photo}`}
                  alt={ad.name}
                />
              </div>
              <div className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{ad.type === 0 ? "Produit" : "Affiche"}</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-sm font-medium text-gray-500">
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(ad.startsAt))}
                </div>
              </div>
              <div className="px-6 py-4">
                <div className={`text-sm font-medium ${new Date(ad.expiresAt) > new Date() ? "text-gray-500" : "text-red-500"}`}>
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(ad.expiresAt))}
                </div>
              </div>
              <div className="flex items-start gap-3 px-6 py-4">
                <div className={`text-sm`}>{<Switch disabled={true} checked={ad.active && new Date(ad.expiresAt) > new Date()} />}</div>
                {!ad.paid ? <img src={circleDollar} alt="To be paid" title="A payé" className="h-6 fill-red-500" /> : ""}
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="py-20 px-6 font-bold text-gray-500 text-2xl text-center">Vous n'avez aucune publicité</div>
      )}
    </div>
  );
}

export default PromoteManager;
