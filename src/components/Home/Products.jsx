import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);

  function updateProducts() {
    axios
      .get("/products/getAll")
      .then((res) => {
        console.log(res.data);
        const productsObj = {};
        res.data.forEach((product) => {
          productsObj[product.SubCategory.Category.name]?.push(product) || (productsObj[product.SubCategory.Category.name] = [product]);
        });
        console.log(productsObj);
        setProducts(Object.values(productsObj));
      })
      .catch(console.log);
  }

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <div className="px-1 [&>div:nth-of-type(2n_+_1)>div:first-of-type]:bg-amber-500 [&>div:nth-of-type(2n)>div:first-of-type]:bg-blue-500">
      {products.map((group, index) => (
        <div key={group[0].SubCategory.Category.name}>
          <div className="relative max-w-[700px] mt-5 mx-auto py-1.5 rounded-xl">
            {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-white"></div> */}
            {/* <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">
              {group[0].SubCategory.Category.name}
            </h3> */}
            <div className="relative mx-auto rounded-xl">
              <h3 className="relative z-10 w-fit mx-auto px-2 font-medium text-lg text-center text-white capitalize">{group[0].SubCategory.Category.name}</h3>
            </div>
          </div>
          <div className="relative">
            <button
              id={`home-next-` + index}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center h-14 w-8 rounded-md bg-[rgb(0,0,0,.65)] hover:bg-[rgb(0,0,0,.8)] duration-150 disabled:opacity-25"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-white" />
            </button>
            <button
              id={`home-prev-` + index}
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
              class="mt-2 py-2 px-"
              navigation-next-el={`#home-next-` + index}
              navigation-prev-el={`#home-prev-` + index}
            >
              {group.map((product) => (
                <swiper-slide key={product.id} class="w-fit h-auto">
                  <ProductCard product={product} />
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
