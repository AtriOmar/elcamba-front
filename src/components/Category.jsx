import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./Category/ProductCard";
import sad from "../assets/images/sad.png";
import { useUIContext } from "../contexts/UIProvider";
import { useDebouncedCallback } from "use-debounce";
import PageNavigation from "./Category/PageNavigation";
import OrderBy from "./Category/OrderBy";
import SortProducts from "./Category/SortProducts";
import ProductsPerPage from "./Category/ProductsPerPage";
import Loader from "./Loader";
import formatPath from "../lib/formatPath";
import parseQuery from "../lib/parseQuery";

function Products() {
  const { priceRange, setPriceRange, setFiltering } = useUIContext();
  const firstRender = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(null);
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState([]);
  const [title, setTitle] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    productsPerPage: 10,
    orderBy: "name",
    order: "asc",
  });

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  async function fetchProducts() {
    setFiltering(true);
    console.log("fetching");
    const queryObj = parseQuery(searchParams);

    if (JSON.stringify(queryObj) !== JSON.stringify(query)) {
      setQuery(queryObj);
    }

    if ((!queryObj.c && !queryObj.s) || (isNaN(queryObj.c) && isNaN(queryObj.s))) {
      setTitle("error");
      setLoading(false);
      setFiltering(false);
      return;
    }

    try {
      const res = await axios.get("/products/getByCategoryId", {
        params: {
          categoryId: queryObj.c,
          subCategoryId: queryObj.s,
          min: queryObj.min,
          max: queryObj.max,
          page: queryObj.page,
          limit: filter.productsPerPage,
          orderBy: filter.orderBy,
          order: filter.order,
        },
      });

      setProducts(res.data.products);

      setTitle(res.data.subCategory?.name || res.data.category?.name || "categorie");

      setPath(() => {
        const newPath = [];
        newPath[0] = { name: res.data.category.name, path: `/category?c=${res.data.category.id}` };
        if (queryObj.s) newPath[1] = { name: res.data.subCategory.name, path: `/category?s=${res.data.subCategory.id}` };

        return newPath;
      });

      setCount(res.data.count);
    } catch (err) {
      if (err.response?.data === "category not found" || err.response?.data === "invalid data") {
        setTitle("error");
      }
    }
    setLoading(false);
    setFiltering(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [searchParams, filter]);

  function updatePrice() {
    if (priceRange.min >= priceRange.max) return;

    setSearchParams((prev) => ({ ...parseQuery(prev), min: priceRange.min, max: priceRange.max }));
  }

  const updatePriceDebounced = useDebouncedCallback(updatePrice, 1000);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const params = parseQuery(searchParams);

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

  useEffect(() => {
    console.log(query);
  }, [query]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (title === "error") {
    return (
      <div className=" rounded-lg bg-white p-20 shadow-md">
        <img src={sad} alt="" className="mx-auto w-48 py-10" />
        <h2 className="text-center text-3xl font-bold text-slate-900">La catégorie demandée n'est pas trouvée.</h2>

        {formatPath(path, "justify-center mt-8 font-bold text-2xl")}
      </div>
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
        <ProductsPerPage input={filter} setInput={setFilter} />
      </div>
      <div>
        <p className="font-medium text-slate-900">Trier par:</p>
        <SortProducts input={filter} setInput={setFilter} />
      </div>
    </div>
  );

  return (
    <div className=" rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold capitalize text-slate-900">{title}</h2>
      {formatPath(path)}
      {filters}
      {products.length ? (
        <div className="mt-2 flex flex-wrap gap-3 p-1">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-20 text-center text-2xl font-bold text-gray-500">Aucun produit avec ces critères</div>
      )}
      {filters}
    </div>
  );
}

export default Products;
