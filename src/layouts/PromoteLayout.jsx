import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";

function PromoteLayout() {
  const location = useLocation();
  const pos = useMemo(() =>
    location.pathname.includes("manage")
      ? "translate-x-0"
      : location.pathname.includes("product")
      ? "translate-x-[calc(100%_+_30px)]"
      : location.pathname.includes("poster")
      ? "translate-x-[calc((100%_+_30px)_*_2)]"
      : ""
  );

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      {/* <div className="relative grid grid-cols-3 gap-[30px] max-w-[600px] mx-auto">
        <Link className="border-b-2 hover:border-blue-500 text-center pb-3 duration-300" to="/customer/promote/manage">
          Gérer
        </Link>
        <Link className="border-b-2 hover:border-blue-500 text-center pb-3 duration-300" to="/customer/promote/product">
          Produits
        </Link>
        <Link className="border-b-2 hover:border-blue-500 text-center pb-3 duration-300" to="/customer/promote/poster">
          Publicités
        </Link>
        <div className="absolute bottom-0 grid grid-cols-3 gap-[30px] w-full justify-center">
          <div className={`h-1 bg-blue-500 transition-all duration-300 ${pos}`}></div>
        </div>
      </div> */}
      <Outlet />
    </div>
  );
}

export default PromoteLayout;
