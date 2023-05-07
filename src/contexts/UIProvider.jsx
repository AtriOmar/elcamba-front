import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";

const UIContext = React.createContext();

function UIProvider({ children }) {
  const [popups, setPopups] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000, inputMin: 0, inputMax: 5000 });
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    console.log("price range", priceRange);
    if (priceRange.min !== priceRange.inputMin || priceRange.max !== priceRange.inputMax) {
      setPriceRange((prev) => ({ ...prev, inputMin: prev.min, inputMax: prev.max }));
    }
  }, [priceRange.min, priceRange.max]);

  function addPopup(popup) {
    setPopups((prev) => [...prev, popup]);
  }

  const value = {
    popups,
    addPopup,
    priceRange,
    setPriceRange,
    filtering,
    setFiltering,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;

export function useUIContext() {
  return useContext(UIContext);
}
