import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./Category/ProductCard";
import sad from "../assets/images/sad.png";
import { MagnifyingGlass } from "react-loader-spinner";
import { useUIContext } from "../contexts/UIProvider";
import { useDebouncedCallback } from "use-debounce";

function formatPath(path, className = "font-medium mt-2 ") {
  const jsxPath = (
    <div className={`flex gap-2 capitalize ${className}`}>
      <div className="flex gap-1">
        <span className="text-slate-600">{`>`}</span>
        <Link to="/" className="hover:underline focus:underline">
          Acceuil
        </Link>
      </div>

      {path.map(([name, link]) => (
        <div key={name} className="flex gap-1">
          <span className="text-slate-600">{`>`}</span>
          <Link to={link} className="hover:underline focus:underline">
            {name}
          </Link>
        </div>
      ))}
    </div>
  );
  return jsxPath;
}

function Products() {
  const { priceRange, setPriceRange, setFiltering } = useUIContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(null);
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState([]);
  const [title, setTitle] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    productsPerPage: 10,
  });

  async function fetchProducts() {
    setFiltering(true);
    console.log("fetching");
    const queryObj = {};
    for (let p of searchParams) {
      queryObj[p[0]] = p[1];
    }

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
        },
      });

      setProducts(res.data.products);

      setTitle(res.data.subCategory?.name || res.data.category?.name || "categorie");

      setPath(() => {
        const newPath = [];
        newPath[0] = [res.data.category.name, `/category?c=${res.data.category.id}`];
        if (queryObj.s) newPath[1] = [res.data.subCategory.name, `/category?s=${res.data.subCategory.id}`];

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
  }, [searchParams]);

  function updatePrice() {
    if (priceRange.min >= priceRange.max) return;

    setSearchParams((prev) => {
      const queryObj = {};
      for (let p of prev) {
        queryObj[p[0]] = p[1];
      }

      return { ...queryObj, min: priceRange.min, max: priceRange.max };
    });
  }

  const updatePriceDebounced = useDebouncedCallback(updatePrice, 1000);

  useEffect(() => {
    updatePriceDebounced();
  }, [priceRange]);

  useEffect(() => {
    console.log(query);
  }, [query]);

  function pages() {
    const arr = [];
    const pagesNb = Math.floor(count / filter.productsPerPage) + 1;
    for (let i = 1; i <= pagesNb; i++) {
      arr.push(
        <button
          key={i}
          className={`flex items-center justify-center w-9 h-9 border rounded-md ${
            (Number(query.page) || 1) === i ? "!bg-slate-300" : "bg-slate-100"
          } hover:bg-slate-200 text-slate-700 duration-300`}
          onClick={() => setSearchParams({ ...query, page: i })}
        >
          {i}
        </button>
      );
    }
    return arr;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  if (title === "error") {
    return (
      <div className=" p-20 rounded-lg bg-white shadow-md">
        <img src={sad} alt="" className="w-48 py-10 mx-auto" />
        <h2 className="font-bold text-3xl text-slate-900 text-center">La catégorie demandée n'est pas trouvée.</h2>

        {formatPath(path, "justify-center mt-8 font-bold text-2xl")}
      </div>
    );
  }

  return (
    <div className=" p-6 rounded-lg bg-white shadow-md">
      <h2 className="font-bold text-2xl text-slate-900 capitalize">{title}</h2>
      {formatPath(path)}
      <p className="mt-8">Il existe {count} produit(s)</p>
      <section className="flex gap-1">
        <button
          className={`flex items-center justify-center w-9 h-9 border rounded-md bg-slate-100 font-medium text-slate-700 text-xl duration-300 ${
            (Number(query.page) || 1) <= 1 ? "cursor-not-allowed" : "hover:bg-slate-200"
          }`}
          onClick={() => {
            if ((Number(query.page) || 1) > 1) setSearchParams({ ...query, page: (Number(query.page) || 1) - 1 });
          }}
        >
          {`<`}
        </button>
        {pages()}

        <button
          className={`flex items-center justify-center w-9 h-9 border rounded-md bg-slate-100 font-medium text-slate-700 text-xl duration-300 ${
            (Number(query.page) || 1) >= Math.floor(count / filter.productsPerPage) + 1 ? "cursor-not-allowed" : "hover:bg-slate-200"
          }`}
          onClick={() => {
            if ((Number(query.page) || 1) < Math.floor(count / filter.productsPerPage) + 1) setSearchParams({ ...query, page: (Number(query.page) || 1) + 1 });
          }}
        >
          {`>`}
        </button>
      </section>
      {products.length ? (
        <div className="flex flex-wrap gap-3 mt-2 p-1">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="py-20 px-6 font-bold text-gray-500 text-2xl text-center">Aucun produit avec ces critères</div>
      )}
    </div>
  );
}

export default Products;
