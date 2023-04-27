import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  function updateProducts() {
    axios
      .get("/products/getAll")
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
    <div className="[&>div:nth-of-type(2n_+_1)>div:first-of-type]:bg-blue-500 [&>div:nth-of-type(2n)>div:first-of-type]:bg-red-500">
      {products.map((group) => (
        <div key={group[0].SubCategory.name}>
          <div className="relative mx-[200px] mt-5 py-1.5 rounded-xl">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-white"></div>
            <h3 className="relative z-10 w-fit mx-auto px-2 bg-inherit font-medium text-lg text-center text-white capitalize">{group[0].SubCategory.name}</h3>
          </div>

          <div className="flex flex-wrap gap-3 mt-1 p-1">
            {group.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
