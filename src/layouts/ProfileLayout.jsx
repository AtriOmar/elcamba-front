import React, { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ProfileLayout() {
  const location = useLocation();
  const pos = useMemo(() =>
    location.pathname.includes("info") ? "translate-x-0" : location.pathname.includes("security") ? "translate-x-[calc(100%_+_30px)]" : ""
  );

  return (
    <div className="min-h-full my-2 scr1000:mx-2 py-6 px-3 scr1000:px-6 pb-20 rounded-lg bg-white shadow-md">
      <div className="relative grid grid-cols-2 gap-[30px] max-w-[500px] mx-auto">
        <Link
          className={`${location.pathname.includes("info") ? "active" : ""} border-b-2 hover:border-blue-500 text-center pb-3 duration-300`}
          to="/customer/profile/info"
        >
          Info
        </Link>
        <Link
          className={`${location.pathname.includes("security") ? "active" : ""} border-b-2 hover:border-blue-500 text-center pb-3 duration-300`}
          to="/customer/profile/security"
        >
          Sécurité
        </Link>
        <div className="absolute bottom-0 grid grid-cols-2 gap-[30px] w-full justify-center">
          <div className={`h-1 bg-blue-500 transition-all duration-300 ${pos}`}></div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
