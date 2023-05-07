import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setSubCategories(res.data[0].SubCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="shrink-0 flex flex-col w-[180px] rounded-lg ring ring-red-500 overflow-hidden">
      <h4 className="py-1 bg-red-500 font-semibold text-lg text-center text-white">Catégories</h4>
      <ul className="peer flex flex-col grow justify- text-[15px]">
        {categories.map((category) => (
          <li key={category.id} className="flex grow " onMouseOver={() => setSubCategories(category.SubCategories)}>
            <Link to={`/category?c=${category.id}`} className="flex items-center w-full px-3 hover:bg-slate-100">
              <h6 className="capitalize">{category.name}</h6>
            </Link>
          </li>
        ))}
      </ul>
      <section
        className={`absolute top-0 left-[195px] z-10 hidden ${
          subCategories.length ? "peer-hover:flex hover:flex flex-col" : ""
        }  h-full w-[calc(100%_-_195px)] rounded-lg bg-white ring ring-red-500`}
      >
        <div className="py-2 px-3">
          <input
            type="text"
            className="block w-full max-w-[500px] mx-auto py-2 px-4 border rounded-lg outline-none"
            placeholder="Rechercher des catégories"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <ul className="flex flex-col flex-wrap content-start grow gap-y-3 gap-x-8 h-0 py-2 px-4">
          {subCategories.map((sub) => (
            <li className="first-letter:uppercase" key={sub.name}>
              <Link className="group hover:font-bold transition duration-300" to={`/category?s=${sub.id}`}>
                {filter ? reactStringReplace(sub.name, filter.trim(), (match) => <span className="font-bold">{match}</span>) : sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CategoriesList;
