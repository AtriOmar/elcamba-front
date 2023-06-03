import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/customer/Sidebar";

function CustomerLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <section className="flex grow overflow-auto">
        <article className="">
          <Sidebar />
        </article>
        <article className="grow overflow-auto py-2 scr1000:px-2 scroll-smooth">
          <Outlet />
        </article>
      </section>
    </div>
  );
}

export default CustomerLayout;
