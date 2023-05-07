import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function PremiumProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/getRandom", {
        params: {
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
    <swiper-container
      slides-per-view="auto"
      slides-per-group="3"
      space-between="10"
      navigation="true"
      class="w-full h-full py-1"
      autoplay-delay="5000"
      autoplay-disable-on-interaction="false"
    >
      {products.map((product) => (
        <swiper-slide key={product.id} class="w-fit h-auto">
          <ProductCard product={product} />
        </swiper-slide>
      ))}
    </swiper-container>
  );
}

export default PremiumProducts;
