import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

import AddProduct from "./Products/AddProduct";
import MyProducts from "./Products/MyProducts";
import { useAuthContext } from "../contexts/AuthProvider";

function Products() {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const { user, setUser } = useAuthContext();

  function updateProducts() {
    axios
      .get("/products/getByUserId", {
        params: {
          id: user.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        const productsObj = {};
        res.data.forEach((product) => {
          productsObj[product.SubCategory.name]?.push(product) || (productsObj[product.SubCategory.name] = [product]);
        });
        console.log(productsObj);
        setProducts(Object.values(productsObj));
      })
      .catch(console.log);
  }

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <div className="max-w-[1000px] p-6 rounded-lg bg-white shadow-md">
      <div className="w-full overflow-hidden">
        <section className={`flex ${page === 0 ? "" : "mr-[100%] ml-[-100%]"} transition-all duration-500`}>
          <article className="shrink-0 w-full">
            <MyProducts setPage={setPage} products={products} />
          </article>
          <article className="shrink-0 w-full">
            <AddProduct setPage={setPage} updateProducts={updateProducts} />
          </article>
        </section>
      </div>
    </div>
  );
}

export default Products;
