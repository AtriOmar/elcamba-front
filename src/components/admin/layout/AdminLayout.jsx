import React from "react";
import { Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <Sidebar />
      <div className="grid grow content ml-0 lg:ml-[250px] pt-[5rem] lg:px-[1rem] pb-[1rem]">
        <Outlet />
      </div>
    </div>
  );
}
