import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Category/Sidebar/Sidebar";

function CategoryLayout() {
  return (
    <section className="flex grow overflow-auto">
      <article>
        <Sidebar />
      </article>
      <article className="grow overflow-auto py-2 scr800:px-2 category-layout">
        <Outlet />
      </article>
    </section>
  );
}

export default CategoryLayout;
