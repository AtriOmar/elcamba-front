import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

function CategoriesList({ setLoading }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [active, setActive] = useState(-1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("/categories");
        console.log(res.data);
        setCategories(res.data);
        setSubCategories(res.data[0].SubCategories);
      } catch (err) {
        console.log(err);
      }
      setLoading((prev) => prev + 1);
    }
    fetchCategories();
  }, []);

  return (
    <div
      className="shrink-0 hidden min-[1350px]:flex flex-col w-[180px] rounded-lg border-4 border-slate-400 overflow-hidden"
      onMouseLeave={() => setActive(-1)}
    >
      <h4 className="py-1 bg-slate-400 font-semibold text-lg text-center text-white">Catégories</h4>
      <ul className="peer flex flex-col grow justify- text-[15px]">
        {categories.map((category, index) => (
          <li
            key={category.id}
            className="flex grow "
            onMouseEnter={() => {
              setSubCategories(category.SubCategories);
              setActive(index);
            }}
          >
            <Link to={`/category?c=${category.id}`} className={`flex items-center w-full px-3 ${active === index ? "bg-slate-200" : ""}`}>
              <h6 className="capitalize">{category.name}</h6>
            </Link>
          </li>
        ))}
      </ul>
      <section
        className={`absolute top-0 left-[208px] z-10 hidden ${
          subCategories.length ? "peer-hover:flex hover:flex flex-col" : ""
        }  h-full w-[calc(100%_-_208px)] rounded-lg bg-white shadow-card2`}
      >
        <div className="absolute left-0 -translate-x-full w-2 h-full bg-transparent"></div>
        <div className="py-2 px-3">
          <input
            type="text"
            className="block w-full max-w-[500px] mx-auto py-2 px-4 border border-slate-400 rounded-lg outline-none"
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
