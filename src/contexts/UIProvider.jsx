import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";

const UIContext = React.createContext();

function UIProvider({ children }) {
  const [popups, setPopups] = useState([]);

  function addPopup(popup) {
    setPopups((prev) => [...prev, popup]);
  }

  const value = {
    popups,
    addPopup,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;

export function useUIContext() {
  return useContext(UIContext);
}
