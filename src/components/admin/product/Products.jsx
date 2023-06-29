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

export default function Products() {
  const [products, setProducts] = useState([]);
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    limit: 20,
    orderBy: "createdAt",
    order: "desc",
    search: "",
  });
  const [fetching, setFetching] = useState(false);
  // console.log(swiper);
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
  const observing = useRef(0);

  function updateSearch() {
    setFilter((prev) => ({ ...prev, search }));
  }

  const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 1000);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  async function updateProducts() {
    setFetching(true);
    try {
      const res = await axios.get("/products/getAll", {
        params: {
          id: user.id,
          limit: filter.limit,
          orderBy: filter.orderBy,
          order: filter.order,
          search: filter.search,
        },
      });

      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setFetching(false);
  }

  useEffect(() => {
    updateProducts();
  }, [filter]);

  useEffect(() => {
    if (filter.limit === observing.current) return;

    if (products.length !== filter.limit) return;

    observing.current = filter.limit;

    const elements = document.querySelectorAll(".product-container");

    const el = elements[elements.length - 5];
    if (el) observer.current.observe(el);
  }, [products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full rounded-lg pt-3 bg-white  shadow-card1">
      <h5 className="px-3 py-3">Produits ( {products?.length || 0} )</h5>
      <div className="flex flex-wrap gap-x-4 scr1000:gap-x-10 px-3 gap-2 mb-4">
        <div>
          <p className="font-medium text-slate-900">Trier par:</p>
          <SortProducts filter={filter} setFilter={setFilter} />
        </div>
        <div className="w-full scr500:w-[300px]">
          <p className="font-medium text-slate-900">Recherche:</p>
          <div className={`flex border border-sky-600 rounded-lg overflow-hidden`}>
            <input
              type="text"
              className="grow py-1 px-4 outline-none"
              placeholder="Rechercher des produits"
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
      {products?.length ? (
        <>
          <div className="hidden scr800:grid grid-cols-[50px_minmax(70px,90px)_minmax(120px,2fr)_160px_170px_120px]  border-b border-slate-400 font-medium text-sm uppercase">
            <div className="px-6 py-3 tracking-wider">ID</div>
            <div className="px-6 py-3 tracking-wider">Photo</div>
            <div className="px-6 py-3 tracking-wider">Nom</div>
            <div className="px-6 py-3 tracking-wider">Vendeur</div>
            <div className="px-6 py-3 tracking-wider">Créé le</div>
            <div className="px-6 py-3 tracking-wider">Actions</div>
          </div>

          {products.map((product) => (
            <div
              to={`/customer/products/${product?.id}`}
              className="product-container grid items-center grid-cols-[90px_1fr] scr800:grid-cols-[50px_minmax(70px,90px)_minmax(120px,2fr)_160px_170px_120px] border-b  hover:bg-slate-100 duration-150"
              key={product?.id}
            >
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">ID:</p>
                <p className="text-sm text-gray-900">{product?.id}</p>
              </div>
              <div className="order-[-1] scr800:order-none px-1 scr800:px-3 py-1 scr800:py-2 row-span-5 scr800:row-span-1">
                <img
                  className="sticky top-0 w-full aspect-square border rounded-lg object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product?.photos?.[0]}`}
                  alt={product?.name}
                />
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Nom:</p>
                <p className="text-sm text-gray-900">
                  {product?.name}
                  {product?.active === 0 ? <FontAwesomeIcon icon={faBan} className="ml-2 text-red-500" /> : ""}
                </p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Vendeur:</p>
                <p className="text-sm text-gray-900">{product?.User?.username}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Créé le:</p>
                {/* <p className="text-sm text-gray-500">{product?.SubCategory.name}</p> */}
                <p className="text-sm text-gray-900">{formatDate(product?.createdAt)}</p>
              </div>
              <div className="flex gap-2 px-2 scr800:px-6 py-1">
                <Link className="btn p-0" to={`/admin/products/${product?.id}`}>
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
