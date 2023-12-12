import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Popup from "../components/Popup";
import { useUIContext } from "../contexts/UIProvider";
import { ScrollRestoration } from "react-router-dom";
import { useChatContext } from "../contexts/ChatProvider";
import ConversationBubble from "../components/ConversationBubble";
import { useAuthContext } from "../contexts/AuthProvider";
import { Helmet } from "react-helmet-async";

function Layout() {
  const { popups, mobileNavbarOpen, setMobileNavbarOpen } = useUIContext();
  const location = useLocation();
  const { openConversations, unread, setPreTitle, preTitle } = useChatContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("ELCAMBA");

  useEffect(() => {
    if (mobileNavbarOpen) {
      setMobileNavbarOpen(false);
    }
  }, [location]);

  useEffect(() => {
    if (!user) {
      if (preTitle) {
        setPreTitle("(_) ");
        setTimeout(() => {
          setPreTitle("");
        }, 100);
      }
      return;
    }

    setPreTitle("(_) ");
    setTimeout(() => {
      setPreTitle(unread ? `(${unread}) ` : "");
    }, 100);
  }, [unread, location, user]);

  // useEffect(() => {
  //   document.title = title;
  //   return () => {
  //     document.title = "ELCAMBA";
  //   };
  // }, [title]);

  return (
    <div className={`${location?.pathname.startsWith("/admin") ? "" : "bg-agriculture"}`}>
      <Helmet>
        <title>{preTitle}ELCAMBA</title>
        {/* <title>{unread ? `(${unread})` : ""} ELCAMBA</title> */}
      </Helmet>
      <ScrollRestoration getKey={(location) => (location.pathname === "/products" ? location.pathname : location.key)} />
      <Outlet />
      {user && openConversations?.length ? (
        <div
          className={`${
            location?.pathname.startsWith("/customer/chat") ? "hidden" : "block"
          } fixed bottom-5 right-5 z-[100] flex flex-col gap-3 py-4 px-2 bg-white/90 rounded-lg shadow-lg`}
        >
          {openConversations.map((conv) => (
            <ConversationBubble conversation={conv} key={conv.id} />
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="w-[300px] fixed bottom-5 left-5 z-[100] flex flex-col gap-3">
        {popups.map((popup, index) => (
          <Popup key={index} {...popup} />
        ))}
      </div>
    </div>
  );
}

export default Layout;
