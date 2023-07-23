import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar";

function ClientLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="pt-[55px]"></div>
      <article
        className={`grow grid grid-cols-1 scroll-smooth customer-page-container ${
          location?.pathname === "/"
            ? ""
            : location?.pathname.startsWith("/products")
            ? "scr900:ml-[250px]"
            : location?.pathname.startsWith("/customer")
            ? "scr1200:ml-[250px]"
            : "scr1000:ml-[250px]"
        }`}
      >
        <Outlet />
      </article>
    </div>
  );
}

export default ClientLayout;
