import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";

const UIContext = React.createContext();

async function fetchSettings() {
  const res = await axios.get("/settings/getAll");

  return res.data;
}

async function fetchCategories() {
  const res = await axios.get("/categories/getAll");

  return res.data;
}

function UIProvider({ children }) {
  const [popups, setPopups] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000, inputMin: 0, inputMax: 5000, minValue: 0, maxValue: 5000 });
  const [filtering, setFiltering] = useState(false);
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminNavbarOpen, setAdminNavbarOpen] = useState(false);
  const { data: categories = [], refetch: refetchCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: false,
    networkMode: "always",
  });
  const { data: settings, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    enabled: false,
    networkMode: "always",
  });

  useEffect(() => {
    if (!settings) {
      refetch();
    }
    if (!categories?.length) {
      refetchCategories();
    }
  }, []);

  useEffect(() => {
    if (mobileNavbarOpen || filterSidebarOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, [mobileNavbarOpen, filterSidebarOpen]);

  useEffect(() => {
    if (mobileNavbarOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, [mobileNavbarOpen]);

  useEffect(() => {}, [filterSidebarOpen]);

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
    refetchCategories,
    filterSidebarOpen,
    setFilterSidebarOpen,
    searchOpen,
    setSearchOpen,
    adminNavbarOpen,
    setAdminNavbarOpen,
    settings,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;

export function useUIContext() {
  return useContext(UIContext);
}
