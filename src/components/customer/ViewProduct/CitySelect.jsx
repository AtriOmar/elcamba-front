import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Select, { components } from "react-select";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useSearchParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    border: "1px solid #334155",
    outline: "none",
    transition: "all 150ms",
    "&:hover": {},
    "&:focus": {},
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: "rubik",
    marginBottom: "1px",
    width: "100%",
    borderRadius: "0.375rem",
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
    color: "#1A202C",
    transition: "background-color 150ms",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#EDF2F7",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    backgroundColor: "white",
    padding: "0.25rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 2px #CBD5E0;",
  }),

  menuList: (provided) => ({
    ...provided,
    borderTopWidth: "0",
    borderBottomWidth: "0",
  }),
};

// -----------------------------------------
// for enabling the search
// change the option object so it becomes {label: product.name, value:product.id}
// then in the Option component, fetch the data of the product and render it
// the data is already fetched of course, you should change the structure of the dataSet
const Option = ({ children, ...props }) => {
  return (
    <div>
      <components.Option {...props}>
        <span className="capitalize">{children}</span>
      </components.Option>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

const SingleValue = ({ children, ...props }) => {
  return (
    <components.SingleValue {...props}>
      <span className="capitalize">{children}</span>
    </components.SingleValue>
  );
};

const options = [
  { label: "ariana", value: "ariana" },
  { label: "béja", value: "béja" },
  { label: "ben arous", value: "ben arous" },
  { label: "bizerte", value: "bizerte" },
  { label: "gabes", value: "gabes" },
  { label: "gafsa", value: "gafsa" },
  { label: "jendouba", value: "jendouba" },
  { label: "kairouan", value: "kairouan" },
  { label: "kasserine", value: "kasserine" },
  { label: "kebili", value: "kebili" },
  { label: "la manouba", value: "la manouba" },
  { label: "le kef", value: "le kef" },
  { label: "mahdia", value: "mahdia" },
  { label: "médenine", value: "médenine" },
  { label: "monastir", value: "monastir" },
  { label: "nabeul", value: "nabeul" },
  { label: "sfax", value: "sfax" },
  { label: "sidi bouzid", value: "sidi bouzid" },
  { label: "siliana", value: "siliana" },
  { label: "sousse", value: "sousse" },
  { label: "tataouine", value: "tataouine" },
  { label: "tozeur", value: "tozeur" },
  { label: "tunis", value: "tunis" },
  { label: "zaghouan", value: "zaghouan" },
];

export default function CitySelect({ input, setInput }) {
  return (
    <div className="">
      <Select
        name="order"
        options={options}
        placeholder="Ville"
        onChange={(option) => {
          setInput((prev) => ({
            ...prev,
            city: option.value,
          }));
        }}
        className="h-9 rounded pr-2 active:border-slate-300 "
        styles={customStyles}
        // styles={customStyles}
        value={{ label: input.city, value: input.city }}
        components={{
          Option,
          SingleValue,
        }}
      />
    </div>
  );
}
