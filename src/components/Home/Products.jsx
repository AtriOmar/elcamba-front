import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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
      {products.map((group) => (
        <div key={group[0].SubCategory.Category.name}>
          <div className="relative mx-[200px] mt-5 py-1.5 rounded-xl">
            {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-white"></div> */}
            <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">
              {group[0].SubCategory.Category.name}
            </h3>
          </div>

          <swiper-container
            slides-per-view="auto"
            slides-per-group="3"
            space-between="10"
            navigation="true"
            autoplay-delay="5000"
            autoplay-disable-on-interaction="false"
            class="mt-2 py-2 px-1"
          >
            {group.map((product) => (
              <swiper-slide key={product.id} class="w-fit h-auto">
                <ProductCard product={product} />
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      ))}
    </div>
  );
}

export default Products;
