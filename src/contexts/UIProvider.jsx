import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";
import { useLocation } from "react-router";

const UIContext = React.createContext();

function UIProvider({ children }) {
  const [popups, setPopups] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000, inputMin: 0, inputMax: 5000 });
  const [filtering, setFiltering] = useState(false);
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  useEffect(() => {
    if (mobileNavbarOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, [mobileNavbarOpen]);

  useEffect(() => {
    console.log(filterSidebarOpen);
  }, [filterSidebarOpen]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("/categories/getAll");
        console.log(res.data);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleResize(e) {
      if (
        mobileNavbarOpen &&
        ((window.location.pathname === "/" && window.innerWidth > 1350) || (window.location.pathname !== "/" && window.innderWidth > 1000))
      ) {
        setMobileNavbarOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileNavbarOpen]);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") {
        setMobileNavbarOpen(false);
      }
    }

    if (mobileNavbarOpen) {
      document.addEventListener("keydown", handleKeydown);

      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [mobileNavbarOpen]);

  useEffect(() => {
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
    mobileNavbarOpen,
    setMobileNavbarOpen,
    categories,
    filterSidebarOpen,
    setFilterSidebarOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;

export function useUIContext() {
  return useContext(UIContext);
}
