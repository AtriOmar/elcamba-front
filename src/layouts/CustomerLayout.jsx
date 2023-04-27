import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/customer/Sidebar";

function CustomerLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <section className="flex grow overflow-auto">
        <article>
          <Sidebar />
        </article>
        <article className="grow overflow-auto p-2">
          <Outlet />
        </article>
      </section>
    </div>
  );
}

export default CustomerLayout;
