import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Switch from "../../Switch";
import AdsPerPage from "./AdsPerPage";
import AdStatus from "./AdStatus";
import AdType from "./AdType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateDropdown from "./CreateDropdown";
import circleDollar from "../../../assets/images/dollar-circle-delete.svg";
import RingLoader from "../../RingLoader";
import Loader from "../../Loader";
import SortAds from "./SortAds";
import formatDate from "../../../lib/formatDate";

function PromoteManager() {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState({
    type: "all",
    status: "all",
    order: "desc",
    orderBy: "startsAt",
    limit: 20,
  });
  const [loading, setLoading] = useState(1);
  const [fetching, setFetching] = useState(false);

  console.log(filter);
  console.log(fetching);
  useEffect(() => {
    async function fetchAds() {
      if (!loading) setLoading(2);
      setFetching(true);
      const result = await axios.get("/ads/getByUserId", {
        params: {
          ...filter,
        },
      });

      console.log(result.data);
      setAds(result.data);
      setLoading(0);
      setFetching(false);
    }

    fetchAds();
  }, [filter]);

  useEffect(() => {
    function handleScroll(e) {
      if (fetching || ads.length < filter.limit) return;
      if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 500) {
        console.log("it is");
        setFilter((prev) => ({ ...prev, limit: prev.limit + 20 }));
      }
    }

    const container = document.querySelector(".customer-page-container");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetching, ads, filter.limit]);

  if (loading === 1) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-6 px-3 scr1000:px-6 pb-20 rounded-lg bg-white shadow-md">
      <div className="flex flex-col scr600:flex-row scr600:items-center justify-between gap-y-2 mb-8">
        <h2 className="self-start text-2xl font-bold capitalize text-sky-600">Mes publicités:</h2>
        <div className="self-end">
          <CreateDropdown />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 scr1000:gap-x-10 gap-2 mb-4">
        <div>
          <p className="font-medium text-slate-900">Trier par:</p>
          <SortAds input={filter} setInput={setFilter} />
        </div>
        {/* <div>
          <p className="font-medium text-slate-900">Publicités/page:</p>
          <AdsPerPage input={filter} setInput={setFilter} />
        </div> */}
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
          <div className="hidden scr800:grid grid-cols-[minmax(100px,110px)_minmax(120px,1fr)_minmax(160px,1fr)_minmax(140px,1fr)_160px] bg-sky-600 font-medium text-white text-xs text-left uppercase ">
            <div className="col-spa-1 px-6 py-3 tracking-wider">Photo</div>
            <div className="col-spa-3 px-6 py-3 tracking-wider">Type</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Début</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Fin</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Active</div>
          </div>

          {ads.map((ad) => (
            <Link
              to={`/customer/promote/${ad.id}`}
              className="grid grid-cols-[90px_1fr] scr800:grid-cols-[minmax(100px,110px)_minmax(120px,1fr)_minmax(160px,1fr)_minmax(140px,1fr)_160px] py-2 scr800:py-0 [&:nth-of-type(2n+1)]:bg-gray-50 hover:bg-slate-100 duration-150"
              key={ad.id}
            >
              <div className="px-1 scr800:px-3 py-1 scr800:py-2 row-span-4 scr800:row-span-1">
                <img
                  className="sticky top-0 w-full aspect-square border rounded-lg object-contain "
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${ad.type === 0 ? ad.Product.photos[0] : "ads/" + ad.photo}`}
                  alt={ad.name}
                />
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">type:</p>
                <p className="text-sm font-medium text-gray-900">{ad.type === 0 ? "Produit" : "Affiche"}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">début:</p>
                <p className="text-sm font-medium text-gray-500">{formatDate(ad.startsAt)}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">fin:</p>
                <p className={`text-sm font-medium ${new Date(ad.expiresAt) > new Date() ? "text-gray-500" : "text-red-500"}`}>{formatDate(ad.expiresAt)}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">active:</p>
                <div className="flex items-start gap-3">
                  <div className={``}>{<Switch disabled={true} checked={ad.active && new Date(ad.expiresAt) > new Date()} />}</div>
                  {!ad.paid ? <img src={circleDollar} alt="To be paid" title="A payé" className="h-6 fill-red-500" /> : ""}
                </div>
              </div>
            </Link>
          ))}
          {fetching ? (
            <div className="w-fit mx-auto py-8">
              <RingLoader color="#444" width="40" height="40" />
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="py-20 px-6 font-bold text-gray-500 text-2xl text-center">Vous n'avez aucune publicité</div>
      )}
    </div>
  );
}

export default PromoteManager;
