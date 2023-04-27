import React from "react";
import Navbar from "./Navbar";
import Hero from "./Home/Hero";
import Products from "./Home/Products";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
    </div>
  );
}

export default Home;
