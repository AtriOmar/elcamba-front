import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import ProductCard from "../Home/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
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
    <div className="mx-2 my-10 rounded-lg bg-white p-6 shadow-md">
      <div className="relative max-w-[700px] mx-auto mb-6 py-1.5 rounded-xl bg-sky-500">
        <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">Produits de '{categoryName}'</h3>
      </div>
      <div className="relative">
        <button
          id={`similar-next-` + categoryName}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center h-14 w-8 rounded-md bg-[rgb(0,0,0,.65)] hover:bg-[rgb(0,0,0,.8)] duration-150 disabled:opacity-25"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-white" />
        </button>
        <button
          id={`similar-prev-` + categoryName}
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
          class="mt-2 py-2 px-1"
          navigation-next-el={"#similar-next-" + categoryName}
          navigation-prev-el={"#similar-prev-" + categoryName}
        >
          {products.map((product) => (
            <swiper-slide key={product.id} class="w-fit h-auto">
              <ProductCard product={product} />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
}

export default SimilarProducts;
