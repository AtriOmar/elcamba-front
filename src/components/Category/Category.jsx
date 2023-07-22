import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import sad from "../../assets/images/sad.png";
import { useUIContext } from "../../contexts/UIProvider";
import { useDebouncedCallback } from "use-debounce";
import PageNavigation from "./PageNavigation";
import OrderBy from "./OrderBy";
import SortProducts from "./SortProducts";
import Loader from "../Loader";
import formatPath from "../../lib/formatPath";
import parseQuery from "../../lib/parseQuery";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Sidebar from "./Sidebar/Sidebar";
import PremiumProductCard from "./PremiumProductCard";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Select from "./Select";
import SortSelect from "./SortSelect";

let prevPage = null;

async function fetchAds() {
  const res = await axios.get("/abc/getByType", {
    params: {
      limit: 5,
      type: 0,
      active: true,
    },
  });
  return res?.data;
}

function Products() {
  const { priceRange, setPriceRange, setFiltering } = useUIContext();
  const firstRender = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState([]);
  const [title, setTitle] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    productsPerPage: 25,
    orderBy: "name",
    order: "asc",
  });
  const [search, setSearch] = useState("");
  const { data: ads = [] } = useQuery({
    queryKey: ["category-ads", 5, 0],
    queryFn: fetchAds,
    networkMode: "always",
  });

  async function fetchProducts() {
    setFiltering(true);
    console.log("fetching");
    const queryObj = parseQuery(searchParams);

    try {
      const res = await axios.get("/products/getByCategoryId", {
        params: {
          categoryId: queryObj.c,
          subCategoryId: queryObj.s,
          min: queryObj.min,
          max: queryObj.max,
          page: queryObj.page,
          limit: queryObj.ppp,
          orderBy: queryObj.sort,
          order: queryObj.order,
          delivery: queryObj.delivery,
          cities: queryObj.cities || "all",
          search: queryObj.search?.trim(),
        },
      });

      setProducts(res.data.products);
      console.log("fmldsqmjlfjsmdqfjdsf", res.data.subCategory?.name || res.data.category?.name || "Tous les produits");
      setTitle(res.data.subCategory?.name || res.data.category?.name || "Tous les produits");

      if (res.data.category)
        setPath(() => {
          const newPath = [];
          if (queryObj.c) newPath[0] = { name: res.data.category?.name, path: `/products?c=${res.data.category?.id}` };
          if (queryObj.s) newPath[1] = { name: res.data?.subCategory?.name, path: `/products?s=${res.data.subCategory?.id}` };

          return newPath;
        });

      setCount(res.data.count);
    } catch (err) {
      // if (err.response?.data === "category not found" || err.response?.data === "invalid data") {
      setTitle("error");
      // }
    }
    setLoading(false);
    setFiltering(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [searchParams, filter]);

  function updateSearch() {
    if (search) {
      if (typeof searchParams.get("search") !== search) {
        searchParams.set("search", search);
        setSearchParams(searchParams);
      }
    } else if (typeof searchParams.get("search") !== "undefined") {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }

  const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 1000);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  function updatePrice() {
    if (priceRange.min >= priceRange.max) return;

    setSearchParams((prev) => ({ ...parseQuery(prev), min: priceRange.min, max: priceRange.max }));
  }

  const updatePriceDebounced = useDebouncedCallback(updatePrice, 1000);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const params = parseQuery(searchParams);

      if (params.search) setSearch(params.search);

      if (params.min || params.max) {
        if ((params.min || 0) <= (params.max || 5000)) {
          setPriceRange((prev) => ({ ...prev, min: Number(params.min) || 0, max: Number(params.max) || 5000 }));
        } else {
          setSearchParams((prev) => {
            const { min, max, ...rest } = parseQuery(prev);
            return { ...rest };
          });
        }
      }
      return;
    }

    updatePriceDebounced();
  }, [priceRange]);

  // useEffect(() => {
  //   if (prevPage === null || prevPage === searchParams.get("page")) return;

  //   setSearchParams((prev) => {
  //     prev.set("page", 1);
  //     return prev;
  //   });

  //   prevPage = searchParams.get("page");
  // }, [searchParams]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (title === "error") {
    return (
      <>
        <Sidebar />
        <div className="my-2 scr900:mx-2 py-6 px-3 scr900:px-6 flex flex-col items-center justify-center rounded-lg bg-white shadow-md">
          <img src={sad} alt="" className="mx-auto w-48 py-10" />
          <h2 className="text-center text-3xl font-bold text-slate-900">La catégorie demandée n'est pas trouvée.</h2>

          {formatPath(path, "justify-center mt-8 font-bold text-2xl")}
        </div>
      </>
    );
  }

  const filters = (
    <div className="mt-6 flex flex-wrap gap-x-10">
      <div>
        <p className="font-medium text-slate-900">Il existe {count} produit(s)</p>
        <PageNavigation searchParams={searchParams} setSearchParams={setSearchParams} count={count} filter={filter} />
      </div>
      {/* <OrderBy /> */}
      <div>
        <p className="font-medium text-slate-900">Produits/page:</p>
        <Select
          position="center"
          options={PPP_OPTIONS}
          value={{ label: searchParams.get("ppp") || "25", value: searchParams.get("ppp") || "25" }}
          onChange={(value) =>
            setSearchParams((prev) => {
              prev.set("ppp", value.value);
              return prev;
            })
          }
          formatSelectedOption={(option) => <>{option.label} Produits</>}
        />
      </div>
      <div>
        <p className="font-medium text-slate-900">Trier par:</p>
        {/* <SortProducts input={filter} setInput={setFilter} /> */}
        <SortSelect
          position="right"
          options={ORDER_OPTIONS}
          // value={filter.orderBy}
          value={{ label: ORDER_OPTIONS.find((el) => el.value === searchParams.get("sort"))?.label || "Nom", value: searchParams.get("sort") || "name" }}
          onChange={(value) =>
            setSearchParams((prev) => {
              prev.set("sort", value.value);
              return prev;
            })
          }
          onOrderChange={(value) =>
            setSearchParams((prev) => {
              prev.set("order", value);
              return prev;
            })
          }
          // onChange={(value) => setFilter((prev) => ({ ...prev, orderBy: value.value }))}
          order={searchParams.get("order") || "asc"}
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
    </div>
  );

  return (
    <>
      <Sidebar />
      <Helmet>
        <title>{title} | CHARYOUL</title>
      </Helmet>
      <div className="min-h-full flex flex-col my-2 scr900:mx-2 py-6 px-3 scr900:px-6 rounded-lg bg-white shadow-md">
        <h2 className="text-2xl font-bold capitalize text-slate-900">{title}</h2>
        {formatPath(path)}
        {filters}
        {products.length ? (
          <div className="mt-2 flex flex-wrap gap-3 p-1">
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                {index % 10 === 0 ? <PremiumProductCard product={ads[Math.floor(index / 10) % ads.length]?.Product} /> : ""}
                <ProductCard product={product} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="grow grid place-items-center px-6 py-20 text-center text-2xl font-bold text-gray-500">Aucun produit avec ces critères</div>
        )}
        {filters}
      </div>
    </>
  );
}

export default Products;

const PPP_OPTIONS = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
];

const ORDER_OPTIONS = [
  {
    value: "name",
    label: "Nom",
  },
  {
    value: "price",
    label: "Prix",
  },
  {
    value: "date",
    label: "Créé le",
  },
];
