import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function PremiumProducts({ ads }) {
  return (
    <div className="relative h-full">
      <button
        id="hero-premium-next"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center h-14 w-8 rounded-md bg-[rgb(0,0,0,.65)] hover:bg-[rgb(0,0,0,.8)] duration-150 disabled:opacity-25"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-white" />
      </button>
      <button
        id="hero-premium-prev"
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center h-14 w-8 rounded-md bg-[rgb(0,0,0,.65)] hover:bg-[rgb(0,0,0,.8)] duration-150 disabled:opacity-25"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
      </button>
      <swiper-container
        slides-per-view="auto"
        slides-per-group="3"
        space-between="10"
        navigation="true"
        class="h-full p-1"
        autoplay-delay="5000"
        autoplay-disable-on-interaction="false"
        navigation-next-el="#hero-premium-next"
        navigation-prev-el="#hero-premium-prev"
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
