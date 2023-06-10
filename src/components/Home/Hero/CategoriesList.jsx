import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { useUIContext } from "../../../contexts/UIProvider";
import normalized from "../../../lib/normalized";

function CategoriesList({}) {
  const { categories } = useUIContext();
  const [subCategories, setSubCategories] = useState([]);
  const [active, setActive] = useState(-1);
  const [filter, setFilter] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setSubCategories(categories[0]?.SubCategories || []);
  }, [categories]);

  return (
    <div className="shrink-0 hidden min-[1350px]:flex flex-col w-[190px] rounded-lg border-4 border-sky-600 overflow-hidden" onMouseLeave={() => setActive(-1)}>
      <h4 className="py-1 bg-sky-600 font-semibold text-lg text-center text-white">Catégories</h4>
      <ul className="peer flex flex-col grow justify- text-[15px]">
        {categories.map((category, index) => (
          <li
            key={category.id}
            className="flex grow "
            onMouseEnter={() => {
              setSubCategories(category.SubCategories);
              setActive(index);
              inputRef.current?.focus();
            }}
          >
            <Link to={`/products?c=${category.id}`} className={`flex items-center w-full px-3 ${active === index ? "bg-slate-200" : ""}`}>
              <h6 className="capitalize">{category.name}</h6>
            </Link>
          </li>
        ))}
      </ul>
      <section
        className={`absolute top-0 left-[208px] z-20 hidden ${
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
            ref={inputRef}
          />
        </div>
        <ul className="flex flex-col flex-wrap content-start grow gap-y-3 gap-x-8 h-0 py-2 px-4">
          {subCategories.map((sub) => (
            <li
              className={`first-letter:uppercase duration-300 ${new RegExp(normalized(filter.trim()), "i").test(normalized(sub?.name)) ? "" : "scale-[0]"}`}
              key={sub.name}
            >
              <Link className="py-2 px-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition duration-300" to={`/products?s=${sub.id}`}>
                {/* {filter ? reactStringReplace(sub.name, filter.trim(), (match) => <span className="font-bold">{match}</span>) : sub.name} */}
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CategoriesList;
