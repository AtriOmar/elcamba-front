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

function Products() {
  const [products, setProducts] = useState([]);
  const { user, setUser } = useAuthContext();
  const swiperElRef = useRef(null);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    limit: 20,
    orderBy: "createdAt",
    order: "desc",
    search: "",
  });
  const [fetching, setFetching] = useState(false);

  // useEffect(() => {
  //   swiperElRef.current.swiper.slideTo(page);
  // }, [page]);

  useEffect(() => {
    function handleSlideChange(e, swiper) {
      const activeIndex = swiper.swiper.activeIndex;
      const activeElements = document.querySelectorAll(activeIndex === 0 ? ".my-products-container *" : ".add-product-container *");
      const blurElements = document.querySelectorAll(activeIndex === 0 ? ".add-product-container *" : ".my-products-container *");

      activeElements.forEach((element) => {
        element.removeAttribute("disabled");
      });
      blurElements.forEach((element) => {
        element.setAttribute("disabled", true);
      });
    }

    const swiper = swiperElRef.current;

    swiper?.addEventListener("slidechange", (e) => handleSlideChange(e, swiper));

    return () => {
      swiper?.removeEventListener("slidechange", handleSlideChange);
    };
  }, [loading]);

  async function updateProducts() {
    setFetching(true);
    try {
      const res = await axios.get("/products/getByUserId", {
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
    function handleScroll(e) {
      if (fetching || products.length < filter.limit) return;
      if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 500) {
        console.log("it is");

        setFilter((prev) => ({ ...prev, limit: prev.limit + 20 }));
      }
    }

    const container = document.querySelector(".customer-page-container");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetching, products, filter]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" py-6 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <SelectCategory show={showSelectCategory} setShow={setShowSelectCategory} setCategory={setCategory} />
      <div className="w-full overflow-hidden">
        <swiper-container ref={swiperElRef} auto-height="true">
          <swiper-slide class="swiper-no-swiping ">
            <div className="my-products-container">
              <MyProducts swiperRef={swiperElRef} products={products} fetching={fetching} filter={filter} setFilter={setFilter} />
            </div>
          </swiper-slide>
          <swiper-slide class="swiper-no-swiping ">
            <div className="add-product-container">
              <AddProduct swiperRef={swiperElRef} updateProducts={updateProducts} category={category} setShowSelectCategory={setShowSelectCategory} />
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Products;
