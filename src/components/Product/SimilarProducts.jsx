import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import ProductCard from "../Home/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SimilarProducts({ categoryId, categoryName }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState([]);
  const { id } = useParams();

  async function fetchProduct() {
    try {
      const res = await axios.get("/products/getRandom", {
        params: {
          limit: 20,
          ...categoryId,
        },
      });

      setProducts(res.data);
    } catch (err) {}
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="scr800:mx-2 my-10 py-6 px-3 scr800:px-6 rounded-lg bg-white shadow-md">
      <Link
        className="block relative max-w-[700px] mx-auto mb-6 py-1.5 rounded-xl bg-sky-500"
        to={`/products?${categoryId.categoryId ? "c=" + categoryId.categoryId : "s=" + categoryId.subCategoryId}`}
      >
        <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">Produits de '{categoryName}'</h3>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-2 text-white text-xs hover:underline">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
      <div className="relative">
        <button
          id={`similar-next-` + (categoryId.categoryId || categoryId.subCategoryId)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center h-14 w-8 rounded-md bg-[rgb(0,0,0,.65)] hover:bg-[rgb(0,0,0,.8)] duration-150 disabled:opacity-25"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-white" />
        </button>
        <button
          id={`similar-prev-` + (categoryId.categoryId || categoryId.subCategoryId)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center h-14 w-8 rounded-md bg-[rgb(0,0,0,.65)] hover:bg-[rgb(0,0,0,.8)] duration-150 disabled:opacity-25"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
        </button>
        <swiper-container
          slides-per-view="auto"
          slides-per-group="3"
          space-between="10"
          navigation="true"
          autoplay-delay="5000"
          autoplay-disable-on-interaction="false"
          class="mt-2 px-1"
          navigation-next-el={"#similar-next-" + (categoryId.categoryId || categoryId.subCategoryId)}
          navigation-prev-el={"#similar-prev-" + (categoryId.categoryId || categoryId.subCategoryId)}
        >
          {products.map((product) => (
            <swiper-slide key={product.id} class="w-fit h-auto my-2 mx-1">
              <ProductCard product={product} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
}

export default SimilarProducts;
