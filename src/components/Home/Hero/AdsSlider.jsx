import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function shuffleArray(arr) {
  let shuffledArr = arr.slice(); // create a copy of the original array
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    // swap each element with a random element before it
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}

function AdsSlider({ type = 1, ads }) {
  const swiperRef = useRef();

  return (
    <>
      {ads.length ? (
        <swiper-container
          ref={swiperRef}
          slides-per-view="1"
          // navigation="true"
          pagination="true"
          pagination-clickable="true"
          class="w-0 h-0 min-w-full min-h-full"
          autoplay-delay="8000"
          autoplay-disable-on-interaction="false"
        >
          {shuffleArray(ads).map((ad) => (
            <swiper-slide key={ad.id} class="w-full h-full">
              {ad.url ? (
                <a href={ad.url || ""} target="_blank">
                  <img src={`${BACKEND_URL}/uploads/abc/${ad.photo}`} alt="" className="w-full h-full object-cover" />
                </a>
              ) : (
                <img src={`${BACKEND_URL}/uploads/abc/${ad.photo}`} alt="" className="w-full h-full object-cover" />
              )}
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <div className="flex items-center justify-center flex-col gap-2 w-full h-full bg-teal-100">
          <img src="/logo.svg" alt="" className="h-16" />
        </div>
      )}
    </>
  );
}

export default AdsSlider;
