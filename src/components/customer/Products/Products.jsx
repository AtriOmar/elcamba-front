import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import { useAuthContext } from "../../../contexts/AuthProvider";
import SelectCategory from "./SelectCategory";
import Loader from "../../Loader";
import { useQuery } from "@tanstack/react-query";

async function fetchProducts(filter, user) {
  const res = await axios.get("/products/getAll", {
    params: {
      userId: user.id,
      limit: filter.limit,
      orderBy: filter.orderBy,
      order: filter.order,
      search: filter.search,
      active: filter.active,
    },
  });

  return res.data;
}

function Products() {
  // const [products, setProducts] = useState([]);
  const { user, setUser } = useAuthContext();
  const swiperElRef = useRef(null);
  // const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    limit: 20,
    orderBy: "createdAt",
    order: "desc",
    search: "",
    active: "all",
  });
  const {
    data: products,
    isLoading: loading,
    isRefetching: fetching,
    refetch: updateProducts,
  } = useQuery({
    queryKey: ["my-products", filter],
    queryFn: () => fetchProducts(filter, user),
    keepPreviousData: true,
    networkMode: "always",
  });
  // const [fetching, setFetching] = useState(false);
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

  useEffect(() => {
    function handleSlideChange(e, swiper) {
      const activeIndex = swiper.swiper.activeIndex;
      const activeElements = document.querySelectorAll(activeIndex === 0 ? ".my-products-container *" : ".add-product-container *");
      const blurElements = document.querySelectorAll(activeIndex === 0 ? ".add-product-container *" : ".my-products-container *");

      activeElements.forEach((element) => {
        if (!element.getAttribute("data-disabled")) element.removeAttribute("disabled");
      });
      blurElements.forEach((element) => {
        if (!element.getAttribute("data-disabled")) element.setAttribute("disabled", true);
      });
    }

    const swiper = swiperElRef.current;

    swiper?.addEventListener("slidechange", (e) => handleSlideChange(e, swiper));

    return () => {
      swiper?.removeEventListener("slidechange", handleSlideChange);
    };
  }, [loading]);

  useEffect(() => {
    if (filter.limit === observing.current) return;

    if (products?.length !== filter.limit) return;

    observing.current = filter.limit;

    const elements = document.querySelectorAll(".product-container");

    const el = elements[elements.length - 5];
    if (el) observer.current.observe(el);
  }, [products]);

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-2 scr1200:mx-2 py-6 px-3 scr1200:px-6 rounded-lg bg-white shadow-md">
      <div className="w-full overflow-hidden">
        <swiper-container ref={swiperElRef} auto-height="true">
          <swiper-slide class="swiper-no-swiping ">
            <div className="my-products-container">
              <MyProducts swiperRef={swiperElRef} products={products} fetching={fetching} filter={filter} setFilter={setFilter} />
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-no-swiping ">
            <div className="add-product-container">
              <AddProduct swiperRef={swiperElRef} updateProducts={updateProducts} />
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Products;
