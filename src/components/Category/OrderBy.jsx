import React, { useState } from "react";
import Select, { components } from "react-select";

const options = [
  {
    label: "Nom",
    value: "name",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Prix",
    value: "price",
  },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "2.25rem",
    borderRadius: "0.25rem 0 0 0.25rem",
    border: "1px solid #CBD5E0",
    backgroundColor: "#EDF2F7",
    paddingLeft: "0.5rem",
    outline: "none",
    transition: "all 150ms",
    "&:hover": {
      backgroundColor: "#E2E8F0",
    },
    "&:focus": {
      ringWidth: "1px",
      ringColor: "#CBD5E0",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: () => ({
    display: "none",
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

const Option = ({ children, ...props }) => (
  <div>
    <components.Option {...props}>{children}</components.Option>
    <div className="border-b border-gray-200"></div>
  </div>
);

function OrderBy() {
  const [input, setInput] = useState({
    orderBy: "price",
    order: "asc",
  });

  return (
    <div>
      <p className="">Trier par:</p>
      <Select
        name="order"
        options={options}
        placeholder="Trier"
        onChange={(option) => {
          setInput((input) => ({ ...input, orderBy: option.value }));
        }}
        className="h-9 rounded focus:border active:border-slate-300"
        styles={customStyles}
        defaultValue={options[0]}
        isSearchable={false}
        components={{ Option }}
      />
    </div>
  );
}

export default OrderBy;
