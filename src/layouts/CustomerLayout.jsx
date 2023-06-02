import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/customer/Sidebar";

function CustomerLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <section className="flex grow overflow-auto">
        <article className="hidden scr1000:block">
          <Sidebar />
        </article>
        <article className="grow overflow-auto p-2 scroll-smooth">
          <Outlet />
        </article>
      </section>
    </div>
  );
}

export default CustomerLayout;
