import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function PremiumProducts({ setLoading }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/ads/getRandom", {
          params: {
            type: 0,
            limit: 20,
          },
        });
        console.log(res.data);
        setAds(res.data);
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
      class="h-full p-1"
      autoplay-delay="5000"
      autoplay-disable-on-interaction="false"
    >
      {ads.map((ad) => (
        <swiper-slide key={ad.id} class="w-fit h-auto">
          <ProductCard product={ad.Product} />
        </swiper-slide>
      ))}
    </swiper-container>
  );
}

export default PremiumProducts;
