import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import AddProduct from "./Products/AddProduct";
import MyProducts from "./Products/MyProducts";
import { useAuthContext } from "../../contexts/AuthProvider";
import SelectCategory from "./Products/SelectCategory";
import Loader from "../Loader";

function Products() {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const { user, setUser } = useAuthContext();
  const swiperElRef = useRef(null);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   swiperElRef.current.swiper.slideTo(page);
  // }, [page]);

  async function updateProducts() {
    setLoading(true);
    try {
      const res = await axios.get("/products/getByUserId", {
        params: {
          id: user.id,
        },
      });

      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    updateProducts();

    return () => {
      setProducts([]);
    };
  }, []);

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
          <swiper-slide class="swiper-no-swiping">
            <MyProducts setPage={setPage} swiperRef={swiperElRef} products={products} />
          </swiper-slide>
          <swiper-slide class="swiper-no-swiping">
            <AddProduct
              setPage={setPage}
              swiperRef={swiperElRef}
              updateProducts={updateProducts}
              category={category}
              setShowSelectCategory={setShowSelectCategory}
            />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  );
}

export default Products;
