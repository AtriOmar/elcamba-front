import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import CategoriesList from "./Hero/CategoriesList";
import { register } from "swiper/element";
import ProductCard from "./Hero/ProductCard";

register();

function Hero() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/getLatest", {
        query: {
          limit: 20,
        },
      })
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-6 px-4">
      <div className="flex gap-3 h-[550px] max-w-w1300 w-full m-auto py-4 px-4 rounded-xl bg-white shadow-md">
        <CategoriesList />
        <section className="w-6/12">
          <article className="h-3/5 border border-slate-200 rounded-lg bg-[url(./assets/images/ad1.jpg)] bg-cover"></article>
          <article className="h-2/5 mt-1 border border-slate-200 rounded-lg bg-[url(./assets/images/ad2.jpg) bg-cover">
            <swiper-container
              slides-per-view="auto"
              slides-per-group="3"
              space-between="10"
              pagination="true"
              pagination-clickable="true"
              class="w-full h-full"
            >
              {products.map((product) => (
                <swiper-slide key={product.id} class="w-fit">
                  <ProductCard product={product} />
                </swiper-slide>
              ))}
            </swiper-container>
          </article>
        </section>
        <section className="grow">
          <article className="flex gap-1 justify-between h-1/2">
            <div className="w-1/2 border border-slate-200 rounded-lg bg-[url(./assets/images/ad3.jpg)] bg-cover"></div>
            <div className="w-1/2 border border-slate-200 rounded-lg bg-[url(./assets/images/ad2.jpg)] bg-cover"></div>
          </article>
          <article className="h-1/2 mt-1 border border-slate-200 rounded-lg bg-[url(./assets/images/ad1.jpg)] bg-cover"></article>
        </section>
      </div>
    </div>
  );
}

export default Hero;
