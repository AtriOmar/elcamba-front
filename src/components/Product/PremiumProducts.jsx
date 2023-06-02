import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import ProductCard from "../Home/Hero/ProductCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PremiumProducts() {
  const [ads, setAds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState([]);
  const { id } = useParams();

  async function fetchProduct() {
    try {
      const res = await axios.get("/ads/getRandom", {
        params: {
          // limit: 20,
          type: "product",
        },
      });

      setAds(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-2 my-10 rounded-lg bg-white p-6 shadow-md">
      <div className="relative max-w-[700px] mx-auto mb-6 py-1.5 rounded-xl bg-red-500">
        <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">Produits promus</h3>
      </div>
      <swiper-container
        slides-per-view="auto"
        slides-per-group="3"
        space-between="10"
        navigation="true"
        class="w-full h-full py-1"
        autoplay-delay="5000"
        autoplay-disable-on-interaction="false"
      >
        {ads.map((ad) => (
          <swiper-slide key={ad.id} class="w-fit h-auto">
            <ProductCard product={ad.Product} />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export default PremiumProducts;
