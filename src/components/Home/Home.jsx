import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Loader from "../Loader";
import { useLocation, useNavigate } from "react-router";
import { useUIContext } from "../../contexts/UIProvider";
import { Link, useSearchParams } from "react-router-dom";
import parseQuery from "../../lib/parseQuery";
import Sidebar from "../Sidebar";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import sad from "../../assets/images/sad.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";

async function fetchProducts() {
  const res = await axios.get("/products/getByEachCategory", {
    params: {
      limit: 15,
      active: 2,
      sold: false,
    },
  });
  return res.data;
}

async function fetchAds() {
  const res = await axios.get("/abc/getByEachType", {
    params: {
      limit: 5,
    },
  });
  return res.data;
}
function Home() {
  const [params, setParams] = useSearchParams();
  const { addPopup } = useUIContext();
  const {
    isLoading: adsLoading,
    error,
    refetch,
    data: ads = [[], [], [], []],
  } = useQuery({
    queryKey: ["home-ads"],
    queryFn: fetchAds,
    enabled: false,
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["home-products"],
    queryFn: fetchProducts,
    enabled: false,
  });

  useEffect(() => {
    if (!ads[0]?.length) {
      refetch();
    }
    if (!products?.length) {
      refetchProducts();
    }
  }, []);

  useEffect(() => {
    const connected = params.get("connected");

    if (connected) {
      addPopup({
        type: "success",
        text: "Connected avec succés",
        lastFor: 4000,
      });

      setParams(
        (prev) => {
          const { connected, ...rest } = parseQuery(prev);

          return rest;
        },
        { replace: true }
      );
    }
  }, []);

  return (
    <>
      {adsLoading || productsLoading ? (
        <div className="grid place-items-center">
          <Loader />
        </div>
      ) : (
        ""
      )}

      {!products?.length && !productsLoading ? (
        <>
          <div className="grid place-items-center m-2 py-10 px-10 rounded-lg bg-white/75 shadow-md">
            <div className="">
              <img className="w-[150px] mx-auto " src={sad} alt="" />
              <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Une erreur s'est produite, Veuillez réessayer plus tard</h3>
              <h3 className="mt-2 font-medium text-slate-900 text-xl text-center ">Cela peut être une erreur de connexion internet</h3>
              <button
                className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
                onClick={refetchProducts}
              >
                <FontAwesomeIcon icon={faRefresh} size="lg" />
                Réessayer
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div className={`${adsLoading || productsLoading || !products?.length ? "hidden" : ""}`}>
        <Helmet>
          <title>ELCAMBA</title>
        </Helmet>
        <Sidebar />
        <Hero ads={ads} />
        <Products products={products} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
