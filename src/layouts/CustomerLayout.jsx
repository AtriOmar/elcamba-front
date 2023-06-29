import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/customer/Sidebar";

function CustomerLayout() {
  return (
    <section className="flex grow overflow-auto">
      {/* <article className="">
        <Sidebar />
      </article> */}
      <article className="grow overflow-auto py-2 scr1000:px-2 scr1000:ml-[250px] scroll-smooth customer-page-container">
        <Outlet />
      </article>
    </section>
  );
}

export default CustomerLayout;
