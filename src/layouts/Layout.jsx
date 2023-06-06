import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Popup from "../components/Popup";
import { useUIContext } from "../contexts/UIProvider";
import { ScrollRestoration } from "react-router-dom";

function Layout() {
  const { popups, mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();
  const location = useLocation();

  useEffect(() => {
    if (mobileNavbarOpen) {
      setMobileNavbarOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <div className="w-[300px] fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
        {popups.map((popup, index) => (
          <Popup key={index} {...popup} />
        ))}
      </div>
    </>
  );
}

export default Layout;
