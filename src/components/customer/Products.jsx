import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import AddProduct from "./Products/AddProduct";
import MyProducts from "./Products/MyProducts";
import { useAuthContext } from "../../contexts/AuthProvider";
import SelectCategory from "./Products/SelectCategory";

function Products() {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const { user, setUser } = useAuthContext();
  const swiperElRef = useRef(null);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   swiperElRef.current.swiper.slideTo(page);
  // }, [page]);

  function updateProducts() {
    axios
      .get("/products/getByUserId", {
        params: {
          id: user.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        // const productsObj = {};
        // res.data.forEach((product) => {
        //   productsObj[product.SubCategory.name]?.push(product) || (productsObj[product.SubCategory.name] = [product]);
        // });
        // console.log(productsObj);
        // setProducts(Object.values(productsObj));
        setProducts(res.data);
      })
      .catch(console.log);
  }

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <div className=" p-6 rounded-lg bg-white shadow-md">
      <SelectCategory show={showSelectCategory} setShow={setShowSelectCategory} setCategory={setCategory} />
      <div className="w-full overflow-hidden">
        <swiper-container ref={swiperElRef} auto-height="true">
          <swiper-slide class="swiper-no-swiping">
            <MyProducts setPage={setPage} swiper={swiperElRef.current?.swiper} products={products} />
          </swiper-slide>
          <swiper-slide class="swiper-no-swiping">
            <AddProduct
              setPage={setPage}
              swiper={swiperElRef.current?.swiper}
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
