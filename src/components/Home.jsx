import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Home/Hero";
import Products from "./Home/Products";
import Loader from "./Loader";

function Home() {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <>
      {loading < 6 ? (
        <div className="flex items-center justify-center h-screen w-full ">
          <Loader />
        </div>
      ) : (
        ""
      )}
      <div className={`${loading < 6 ? "hidden" : ""}`}>
        <Navbar />
        <Hero loading={loading} setLoading={setLoading} />
        <Products />
      </div>
    </>
  );
}

export default Home;
