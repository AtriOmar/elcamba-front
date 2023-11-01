import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Loader from "../Loader";
import { useLocation, useNavigate } from "react-router";
import { useUIContext } from "../../contexts/UIProvider";
import { useSearchParams } from "react-router-dom";
import parseQuery from "../../lib/parseQuery";
import Sidebar from "../Sidebar";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    networkMode: "always",
  });
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    if (!ads[0]?.length) {
      refetch();
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

      <div className={`${adsLoading || productsLoading ? "hidden" : ""}`}>
        <Helmet>
          <title>ELCAMBA</title>
        </Helmet>
        <Sidebar />
        <Hero ads={ads} />
        <Products productsLoading={productsLoading} setProductsLoading={setProductsLoading} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
