import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RingLoader from "../../RingLoader";
import SortProducts from "./SortProducts";
import formatDate from "../../../lib/formatDate";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Loader from "../../Loader";
import circleDollar from "../../../assets/images/dollar-circle-delete.svg";
import Switch from "../../Switch";
import AdType from "./AdType";
import AdStatus from "./AdStatus";

let observing = 0;

export default function Ads() {
  const [ads, setAds] = useState([]);
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    limit: 20,
    orderBy: "createdAt",
    order: "desc",
    search: "",
    type: "all",
    status: "all",
  });
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const observer = useRef(
    new IntersectionObserver((entries, obs) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setFilter((prev) => ({ ...prev, limit: prev.limit + 20 }));
        obs.unobserve(entry.target);
      }
    })
  );

  function updateSearch() {
    setFilter((prev) => ({ ...prev, search }));
  }

  const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 1000);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  console.log(filter);

  async function updateAds() {
    setFetching(true);
    try {
      const res = await axios.get("/abc/getAll", {
        params: {
          id: user.id,
          limit: filter.limit,
          orderBy: filter.orderBy,
          order: filter.order,
          search: filter.search,
          type: filter.type,
          active: filter.status === "active" ? true : filter.status === "inactive" ? false : undefined,
        },
      });

      console.log(res.data);
      setAds(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setFetching(false);
  }

  useEffect(() => {
    updateAds();
  }, [filter]);

  useEffect(() => {
    if (filter.limit === observing) return;

    if (ads.length !== filter.limit) return;

    observing = filter.limit;

    const elements = document.querySelectorAll(".ad-container");

    const el = elements[elements.length - 5];
    if (el) observer.current.observe(el);
  }, [ads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full rounded-lg pt-3 bg-white  shadow-card1">
      <h5 className="px-3 py-3">Publicités ( {ads?.length || 0} )</h5>
      <div className="flex flex-wrap gap-x-4 scr1000:gap-x-10 px-3 gap-2 mb-2">
        <div>
          <p className="font-medium text-slate-900">Trier par:</p>
          <SortProducts filter={filter} setFilter={setFilter} />
        </div>
        <div>
          <p className="font-medium text-slate-900">Type:</p>
          <AdType input={filter} setInput={setFilter} />
        </div>
        <div>
          <p className="font-medium text-slate-900">état:</p>
          <AdStatus input={filter} setInput={setFilter} />
        </div>
        <div className="w-full scr500:w-[300px]">
          <p className="font-medium text-slate-900">Recherche:</p>
          <div className={`flex border border-sky-600 rounded-lg overflow-hidden`}>
            <input
              type="text"
              className="grow py-1 px-4 outline-none"
              placeholder="Rechercher par utilisateur"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="flex items-center p-1 bg-sky-600" onClick={() => {}}>
              <MagnifyingGlassIcon className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
        {fetching ? (
          <div className="self-center">
            <RingLoader color="black" />
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="mt-4 font-medium text-sky-700 text-lg text-center">Types:</p>
      <section className="grid scr600:grid-cols-2 max-w-[1000px] w-full mx-auto px-2 mb-4">
        <article className="flex gap-1">
          <div className={`w-[15.38%] border rounded-lg bg-slate-500`}></div>
          <div className="flex flex-col gap-1 w-[46.15%]">
            <div className={`w-full grid place-items-center  aspect-[2/1] ring-blue-500 border rounded-lg duration-150 `}>
              <span className="grid place-items-center w-7 h-7 border border-slate-400 rounded-[50%]">1</span>
            </div>
            <div className={`grow w-full border rounded-lg bg-slate-500`}></div>
          </div>
          <div className={`grid gap-1 w-[38.46%]`}>
            <div className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg duration-150 `}>
              <span className="grid place-items-center w-7 h-7 border border-slate-400 rounded-[50%]">2</span>
            </div>
            <div className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg duration-150 `}>
              <span className="grid place-items-center w-7 h-7 border border-slate-400 rounded-[50%]">2</span>
            </div>
            <div className={`aspect-[2/1] grid place-items-center col-span-2 ring-blue-500 border rounded-lg duration-150 `}>
              <span className="grid place-items-center w-7 h-7 border border-slate-400 rounded-[50%]">3</span>
            </div>
          </div>
        </article>
        <article className={`grid place-items-center scr600:ml-auto aspect-[2/1] border rounded-lg`}>
          <div className="">
            {/* <p>Page d'acceuil</p>
            <p>Page de détails produit</p>
            <p>Page des produits</p> */}
            <p className="mt-2 text-center font-medium">
              <span className="grid place-items-center w-7 h-7 border border-slate-400 rounded-[50%]">4</span>
            </p>
          </div>
        </article>
      </section>
      {ads?.length ? (
        <>
          <div className="hidden scr800:grid grid-cols-[50px_minmax(70px,90px)_80px_1fr_170px_100px_120px]  border-b border-slate-400 font-medium text-sm uppercase">
            <div className="px-6 py-3 tracking-wider">ID</div>
            <div className="px-6 py-3 tracking-wider">Photo</div>
            <div className="px-6 py-3 tracking-wider">Type</div>
            <div className="px-6 py-3 tracking-wider">Créateur</div>
            <div className="px-6 py-3 tracking-wider">Créé le</div>
            <div className="px-6 py-3 tracking-wider">Active</div>
            <div className="px-6 py-3 tracking-wider">Actions</div>
          </div>

          {ads.map((ad) => (
            <div
              to={`/customer/abc/${ad.id}`}
              className="ad-container grid items-center grid-cols-[90px_1fr] scr800:grid-cols-[50px_minmax(70px,90px)_80px_1fr_170px_100px_120px] border-b  hover:bg-slate-100 duration-150"
              key={ad.id}
            >
              <div className="grid grid-cols-[85px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">ID:</p>
                <p className="text-sm text-gray-900">{ad.id}</p>
              </div>
              <div className="order-[-1] scr800:order-none px-1 scr800:px-3 py-1 scr800:py-2 row-span-6 scr800:row-span-1">
                <img
                  className="sticky top-0 w-full aspect-square border rounded-lg object-contain"
                  // src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${ad.type === 0 ? ad.Product?.photos?.[0] : "abc/" + ad.photo}`}
                  src={`${import.meta.env.VITE_BACKEND_URL}/photo?path=${ad.type === 0 ? ad.Product?.photos?.[0] : "abc/" + ad.photo}&size=150`}
                  alt={"Photo"}
                />
              </div>
              <div className="grid grid-cols-[85px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Type:</p>
                <p className="text-sm text-gray-900">
                  {ad.type}
                  {ad.active === 0 ? <FontAwesomeIcon icon={faBan} className="ml-2 text-red-500" /> : ""}
                </p>
              </div>
              <div className="grid grid-cols-[85px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Créateur:</p>
                <p className="text-sm text-gray-900">{ad?.User?.username}</p>
              </div>
              <div className="grid grid-cols-[85px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Créé le:</p>
                {/* <p className="text-sm text-gray-500">{product.SubCategory.name}</p> */}
                <p className="text-sm text-gray-900">{formatDate(ad.createdAt)}</p>
              </div>
              <div className="grid grid-cols-[85px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Active:</p>
                <div className="flex items-start gap-3">
                  <Switch disabled={true} checked={ad.active === 2 && new Date(ad.expiresAt) > new Date()} />
                  {!ad.paid ? <img src={circleDollar} alt="To be paid" title="A payé" className="h-6 fill-red-500" /> : ""}
                </div>
              </div>
              <div className="flex gap-2 px-2 scr800:px-6 py-1">
                <Link className="btn p-0" to={`/admin/ads/${ad.id}`}>
                  <Cog6ToothIcon className={"block h-8 w-8 text-slate-600"} aria-hidden="true" />
                </Link>
              </div>
            </div>
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
        <div className="py-20 px-6 font-bold text-gray-500 text-2xl text-center">Aucun produit</div>
      )}
    </div>
  );
}
