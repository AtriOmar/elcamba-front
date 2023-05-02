import axios from "axios";
import React, { useEffect, useState } from "react";

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

function AdsSlider({ type = 1 }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("/ads/getByType", {
        params: {
          type,
        },
      })
      .then((res) => {
        setAds(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [type]);

  return (
    <>
      {ads.length ? (
        <swiper-container
          slides-per-view="1"
          // navigation="true"
          pagination="true"
          pagination-clickable="true"
          class="w-full h-full"
          autoplay-delay="5000"
          autoplay-disable-on-interaction="false"
        >
          {shuffleArray(ads).map((ad) => (
            <swiper-slide key={ad.id} class="w-full h-full">
              <img src={`${BACKEND_URL}/uploads/ads/${ad.photo}`} alt="" className="w-full h-full object-cover" />
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <div className="flex items-center justify-center flex-col gap-2 w-full h-full bg-red-100">
          <img src="/logo.svg" alt="" className="h-10" />
          <span className=" font-rubik font-bold text-2xl text-red-600">CHARYOUL</span>
        </div>
      )}
    </>
  );
}

export default AdsSlider;
