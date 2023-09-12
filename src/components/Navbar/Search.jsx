import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import UserCard from "./UserCard";
import RingLoader from "../RingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Search({ show, hide }) {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [fetching, setFetching] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (show) hide();
  }, [location]);

  async function fetchSearch() {
    if (!search || fetching) return;

    setFetching(true);

    try {
      const res = await axios.get("/search", {
        params: {
          search,
        },
      });

      setResult(res.data);
    } catch (err) {}
    setFetching(false);
  }

  const debouncedFetchSearch = useDebouncedCallback(fetchSearch, 1000);

  useEffect(() => {
    debouncedFetchSearch();
  }, [search]);

  return (
    <Modal
      show={show}
      hide={hide}
      dialogClassName="flex flex-col w-full scr600:max-w-[500px] h-screen scr600:max-h-[600px] py-16 scr600:py-10 px-3 scr600:px-6 scr600:rounded-[50px]"
      initialFocusRef={inputRef}
    >
      <button
        type="button"
        onClick={() => {
          hide();
        }}
        className="absolute top-4 right-4 scr600:hidden"
      >
        <XMarkIcon className="block h-8 w-8 text-black" aria-hidden="true" />
      </button>
      <div className={`shrink-0 relative flex items-stretch w-full border border-[#a5da24] rounded-lg text-left overflow-hidden`}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
          className="grow w-[300px] py-2 pl-4 pr-8 text-gray-500 outline-none cursor-text"
          placeholder="Rechercher dans ELCAMBA"
        />
        <span className="flex items-center p-1 bg-[#a5da24]">
          <MagnifyingGlassIcon className="h-7 w-7 text-green-600" />
        </span>
        {fetching ? (
          <div className="absolute top-1/2 -translate-y-1/2 right-9 w-fit mx-auto py-8">
            <RingLoader color="black" width="30" height="30" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="grow overflow-y-auto">
        {result ? (
          <>
            <div className="flex justify-between mt-4 font-semibold">
              <h3 className=" text-sky-800">Produits</h3>
              <Link to={`/products?search=${search}`} className="flex items-center gap-2 text-sky-800 text-sm hover:underline">
                Voir tout
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
            <ul className="space-y-2 pl-3 border-l border-slate-400">
              {result.products.length ? (
                result.products?.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))
              ) : (
                <li>Aucun produit trouvé</li>
              )}
            </ul>
            <h3 className="mt-4 font-semibold text-sky-800">Utilisateurs</h3>
            <ul className="space-y-2 pl-3 border-l border-slate-400">
              {result.users.length ? (
                result.users?.map((user) => (
                  <li key={user.id}>
                    <UserCard user={user} />
                  </li>
                ))
              ) : (
                <li>Aucun utilisteur trouvé</li>
              )}
            </ul>
            <h3 className="mt-4 font-semibold text-sky-800">Catégories</h3>
            <ul className="pl-3 border-l border-slate-400">
              {result.categories.length ? (
                result.categories?.map((categ) => (
                  <li key={categ.id}>
                    <Link to={`/products?c=${categ.id}`} className="font-semibold text-slate-700 text-sm capitalize hover:underline">
                      {categ.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>Aucune catégorie trouvé</li>
              )}
            </ul>
            <h3 className="mt-4 font-semibold text-sky-800">Sous-catégories</h3>
            <ul className="pl-3 border-l border-slate-400">
              {result.subCategories.length ? (
                result.subCategories?.map((sub) => (
                  <li key={sub.id} className="text-slate-700 text-sm capitalize">
                    <Link to={`/products?c=${sub.Category?.id}`} className="hover:underline">
                      {sub.Category?.name}
                    </Link>{" "}
                    {`>`}{" "}
                    <Link to={`/products?s=${sub.id}`} className="font-semibold hover:underline">
                      {sub.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>Aucune sous-catégorie trouvé</li>
              )}
            </ul>
          </>
        ) : (
          <p className="h-full flex items-center text-center">Rechercher des Produits, Utilisateurs, Catégories et Sous catégories</p>
        )}
      </div>
    </Modal>
  );
}
