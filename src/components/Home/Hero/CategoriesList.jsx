import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="self-cente h-fit w-[180px] rounded-lg ring ring-amber-400 overflow-hidden">
      <h4 className=" py-1 bg-amber-400 font-semibold text-lg text-center text-white">Catégories</h4>
      <ul className="flex flex-col gap-2 px-3 py-2 text-[15px]">
        {categories.map((category) => (
          <li key={category.id}>
            <Link className="capitalize">{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;
