import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Loader from "../Loader";
import { useLocation, useNavigate } from "react-router";
import { useUIContext } from "../../contexts/UIProvider";
import { useSearchParams } from "react-router-dom";
import parseQuery from "../../lib/parseQuery";
import Sidebar from "./Sidebar";

function Home() {
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const { addPopup } = useUIContext();

  useEffect(() => {
    const connected = params.get("connected");
    if (connected) {
      addPopup({
        type: "success",
        text: "Connected avec succés",
        lastFor: 4000,
      });
      setParams((prev) => {
        const { connected, ...rest } = parseQuery(prev);
        console.log(rest);
        return rest;
      });
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full ">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <div className={`${loading ? "hidden" : ""}`}>
        <Sidebar />
        <Hero loading={loading} setLoading={setLoading} />
        <Products />
      </div>
    </>
  );
}

export default Home;
