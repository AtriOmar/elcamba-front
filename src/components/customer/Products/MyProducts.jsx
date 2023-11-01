import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RingLoader from "../../RingLoader";
import SortProducts from "./SortProducts";
import formatDate from "../../../lib/formatDate";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import Switch from "../../Switch";
import CustomSelect from "./CustomSelect";
import SortSelect from "./SortSelect";

const clientId = import.meta.env.VITE_CLIENT_ID;

function MyProducts({ swiperRef, products, fetching, filter, setFilter }) {
  //
  const [search, setSearch] = useState("");

  function updateSearch() {
    setFilter((prev) => ({ ...prev, search }));
  }

  const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 1000);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  return (
    <div className="w-full pb-40">
      <div className="flex flex-col scr600:flex-row scr600:items-center justify-between gap-y-2 mb-8 pr-1.5">
        <h2 className="self-start text-2xl font-bold capitalize text-sky-600">Mes produits:</h2>
        <button
          className={`self-end flex gap-2 items-center px-4 py-2 border border-slate-300 rounded bg-green-500 hover:bg-green-600 outline-0 text-white transition-all duration-150 ring-green-700 ring-offset-2 focus:ring-2`}
          onClick={() => {
            swiperRef.current?.swiper.slideTo(1);
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
          Ajouter un produit
        </button>
      </div>
      <div className="flex flex-wrap gap-x-4 scr1000:gap-x-10 px-0.5 gap-2 mb-4">
        <div>
          <p className="font-medium text-slate-900">Trier par:</p>
          {/* <SortProducts filter={filter} setFilter={setFilter} /> */}
          <SortSelect
            position="center"
            options={ORDER_OPTIONS}
            value={filter.orderBy}
            onChange={(option) => setFilter((prev) => ({ ...prev, orderBy: option.value }))}
            onOrderChange={(value) => setFilter((prev) => ({ ...prev, order: value }))}
            order={filter.order}
          />
        </div>
        <div>
          <p className="font-medium text-slate-900">État:</p>
          <CustomSelect
            position="right"
            options={STATUS_OPTIONS}
            value={filter.active}
            onChange={(value) => setFilter((prev) => ({ ...prev, active: value.value }))}
          />
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
          <div className="hidden scr900:grid grid-cols-[minmax(100px,110px)_minmax(120px,2fr)_minmax(160px,1fr)_130px_130px_100px_100px] bg-sky-600 font-medium text-white text-xs text-left uppercase">
            <div className="col-spa-1 px-6 py-3 tracking-wider">Photo</div>
            <div className="col-spa-3 px-6 py-3 tracking-wider">Nom</div>
            <div className="col-spa-2 px-6 py-3 tracking-wider">Créé le</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Prix</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Prix soldé</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Visible</div>
            <div className="col-spa-1 px-6 py-3 tracking-wider">Vendu</div>
          </div>

          {products.map((product) => (
            <Link
              to={`/customer/products/${product.id}`}
              className="product-container grid grid-cols-[90px_1fr] scr900:grid-cols-[minmax(100px,110px)_minmax(120px,2fr)_minmax(160px,1fr)_130px_130px_100px_100px] py-2 scr900:py-0 [&:nth-of-type(2n+1)]:bg-gray-50 hover:!bg-slate-200 duration-150"
              key={product.id}
            >
              <div className="px-1 scr900:px-3 py-1 scr900:py-2 row-span-6 scr900:row-span-1">
                <img
                  className="sticky top-0 w-full aspect-square border rounded-lg object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/thumbnails/${product.photos?.[0]}`}
                  // src={`${import.meta.env.VITE_BACKEND_URL}/photo?path=${product.photos?.[0]}&size=150`}
                  // src={`https://node.omaratri.online?url=${import.meta.env.VITE_BACKEND_URL}/uploads/${product.photos?.[0]}&size=150`}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-[80px_1fr] scr900:grid-cols-1 px-2 scr900:px-6 py-1 scr900:py-4">
                <p className="scr900:hidden font-bold text-sm text-sky-700 uppercase">nom:</p>
                <p className="text-sm font-medium text-gray-900">
                  {product.name}
                  {product.active === 0 ? <FontAwesomeIcon icon={faBan} className="ml-2 text-red-500" /> : ""}
                </p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr900:grid-cols-1 px-2 scr900:px-6 py-1 scr900:py-4">
                <p className="scr900:hidden font-bold text-sm text-sky-700 uppercase">Créé le:</p>
                {/* <p className="text-sm text-gray-500">{product.SubCategory.name}</p> */}
                <p className="font-semibold text-sm text-gray-500">{formatDate(product.createdAt)}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr900:grid-cols-1 px-2 scr900:px-6 py-1 scr900:py-4">
                <p className="scr900:hidden font-bold text-sm text-sky-700 uppercase">prix:</p>
                <p className="font-semibold text-sm text-gray-500">{Number(product?.price)} DT</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr900:grid-cols-1 px-2 scr900:px-6 py-1 scr900:py-4">
                <p className="scr900:hidden font-bold text-sm text-sky-700 uppercase">solde:</p>
                <p className="font-semibold text-sm text-gray-500">{Number(product?.salePrice) !== 0 ? Number(product?.salePrice) + " DT" : "-"}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr900:grid-cols-1 px-2 scr900:px-6 py-1 scr900:py-4">
                <p className="scr900:hidden font-bold text-sm text-sky-700 uppercase">Visible:</p>
                <p className="font-semibold text-sm text-gray-500">
                  <Switch disabled={true} checked={product.active === 2} />
                </p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr900:grid-cols-1 px-2 scr900:px-6 py-1 scr900:py-4">
                <p className="scr900:hidden font-bold text-sm text-sky-700 uppercase">Vendu:</p>
                <p className="font-semibold text-sm text-gray-500">
                  <Switch disabled={true} checked={product.sold} />
                </p>
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
        <div className="py-20 px-6 font-bold text-gray-500 text-2xl text-center">Aucun produit</div>
      )}
    </div>
  );
}

export default MyProducts;

const STATUS_OPTIONS = [
  {
    value: "all",
    label: "Tous",
  },
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "Inactive",
  },
];

const ORDER_OPTIONS = [
  {
    value: "createdAt",
    label: "Créé le",
  },
  {
    value: "name",
    label: "Nom",
  },
];
