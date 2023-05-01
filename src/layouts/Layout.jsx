import React from "react";
import { Outlet } from "react-router";
import Popup from "../components/Popup";
import { useUIContext } from "../contexts/UIProvider";

function Layout() {
  const { popups } = useUIContext();

  return (
    <>
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
