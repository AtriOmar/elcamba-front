import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function PremiumProducts({ setLoading }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/products/getRandom", {
          params: {
            limit: 20,
          },
        });
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading((prev) => prev + 1);
    }
    fetchProducts();
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
