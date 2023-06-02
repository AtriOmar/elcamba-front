import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Select, { components } from "react-select";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useSearchParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

// -----------------------------------------
// for enabling the search
// change the option object so it becomes {label: product.name, value:product.id}
// then in the Option component, fetch the data of the product and render it
// the data is already fetched of course, you should change the structure of the dataSet
const CustomOption = ({ children, products, ...props }) => {
  const product = products.find((product) => product.id === props.value);
  return (
    <div>
      <components.Option {...props}>
        <div className="flex">
          <img className="w-10 h-10 object-contain" src={`${BACKEND_URL}/uploads/${product.photos?.[0]}`} alt="" />
          <div>{product.name}</div>
        </div>
      </components.Option>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

const SingleValue = ({ children, ...props }) => <components.SingleValue {...props}>{children}</components.SingleValue>;

function ProductSelect({ product, setProduct }) {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/products/getByUserId", {
          params: {
            id: user.id,
          },
        });
        setProducts(res.data);
        const id = searchParams.get("p");

        if (id) {
          setProduct(res.data.find((product) => product.id === Number(id)));
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
  }, []);

  const options = useMemo(
    () =>
      products.map((curr) => ({
        label: curr.name,
        value: curr.id,
      })),
    [products]
  );

  return (
    <div className="max-w-[700px]">
      <Select
        name="order"
        options={options}
        placeholder="Produit"
        onChange={(option) => {
          setProduct(products.find((product) => product.id === option.value));
        }}
        className="h-9 rounded focus:border active:border-slate-300"
        // styles={customStyles}
        defaultValue={options[0]}
        value={product ? { label: product?.name, value: product?.id } : null}
        components={{
          Option: ({ children, ...props }) => (
            <CustomOption {...props} products={products}>
              {children}
            </CustomOption>
          ),
        }}
      />
    </div>
  );
}

export default ProductSelect;
