import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUIContext } from "../../contexts/UIProvider";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function fetchAds() {
  const res = await axios.get("/abc/getAll", { params: { type: 4, limit: 10, active: 2, orderBy: "random" } });

  return res.data;
}

function Products({ products }) {
  const {
    data: ads = [],
    isLoading: adsLoading,
    refetch: refetchAds,
  } = useQuery({
    queryKey: ["ads", { type: 4, limit: 10, active: 2 }],
    queryFn: fetchAds,
    enabled: false,
  });

  useEffect(() => {
    if (!ads?.length) {
      refetchAds();
    }
  }, []);

  return (
    <div className="px-1">
      {products.map((group, index) => (
        <React.Fragment key={group.category.name}>
          {index % 3 === 0 && index !== 0 && ads?.length > 0 ? (
            <div className="grid scr1000:grid-cols-2 gap-1">
              {ads[(index / 3) % ads.length].url ? (
                <Link className="w-full" to={ads[(index / 3) % ads.length].url} target="_blank">
                  <img
                    src={`${BACKEND_URL}/uploads/abc/${ads[(index / 3) % ads.length].photo}`}
                    className="max-w-[800px] mx-auto w-full rounded-lg aspect-[2/1] object-cover"
                    alt=""
                  />
                </Link>
              ) : (
                <div className="w-full">
                  <img
                    src={`${BACKEND_URL}/uploads/abc/${ads[(index / 3) % ads.length].photo}`}
                    className="max-w-[800px] mx-auto w-full rounded-lg aspect-[2/1] object-cover"
                    alt=""
                  />
                </div>
              )}
              {ads[((index / 3) % ads.length) + 1].url ? (
                <Link className="hidden scr1000:block w-full" to={ads[((index / 3) % ads.length) + 1].url} target="_blank">
                  <img
                    src={`${BACKEND_URL}/uploads/abc/${ads[((index / 3) % ads.length) + 1].photo}`}
                    className="max-w-[800px] mx-auto w-full rounded-lg aspect-[2/1] object-cover"
                    alt=""
                  />
                </Link>
              ) : (
                <div className="hidden scr1000:block w-full">
                  <img
                    src={`${BACKEND_URL}/uploads/abc/${ads[((index / 3) % ads.length) + 1].photo}`}
                    className="max-w-[800px] mx-auto w-full rounded-lg aspect-[2/1] object-cover"
                    alt=""
                  />
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          <div>
            <div className="relative max-w-[700px] mt-5 mx-auto py-1.5 rounded-xl" style={{ backgroundColor: group.category.color }}>
              {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-white"></div> */}
              {/* <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">
              {group[0].SubCategory.Category.name}
            </h3> */}
              <div className="relative mx-auto rounded-xl">
                <h3 className="z-10 w-fit mx-auto px-2 font-medium text-lg text-center text-white capitalize">{group.category.name}</h3>
                <Link
                  to={`/products?c=${group.category.id}`}
                  className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-2 text-white text-xs hover:underline"
                >
                  Voir tout
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
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
                {group.products.map((product) => (
                  <swiper-slide key={product.id} class="w-fit h-auto">
                    <ProductCard product={product} />
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Products;
