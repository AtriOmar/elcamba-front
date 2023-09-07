import { Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";
import normalized from "../../../lib/normalized";
import Modal from "../../Modal";

function SelectCategory({ show, setShow, category, setCategory }) {
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    axios
      .get("/categories/getAll")
      .then((res) => {
        setCategories(res.data);
        setActive(0);
      })
      .catch((err) => {});
  }, []);

  return (
    <Modal show={show} hide={() => setShow(false)} dialogClassName="rounded-2xl">
      <section className="flex w-[600px] h-[500px] rounded-2xl bg-white overflow-hidden ">
        <article className="w-1/3 shrink-0">
          <ul className="divide-y text-sm capitalize font-medium">
            {categories.map((categ, index) => (
              <li key={categ.name} className={`py-2 px-4 ${active === index ? "bg-sky-100" : "border-r"}`} onMouseEnter={() => setActive(index)}>
                {categ.name}
              </li>
            ))}
          </ul>
        </article>
        <article className="grow py-2 px-2 bg-sky-100 text-sm overflow-y-auto scrollbar1">
          <div className="py-2 px-3">
            <input
              type="text"
              className="block w-full max-w-[500px] mx-auto py-2 px-4 border border-slate-400 rounded-lg outline-none"
              placeholder="Rechercher des catégories"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <ul className="flex flex-wrap grow gap-y-3 gap-x-8 h-0 py-2 px-4">
            {categories[active]?.SubCategories?.map((sub) => (
              <li className={`first-letter:uppercase ${new RegExp(normalized(filter.trim()), "i").test(normalized(sub?.name)) ? "" : "hidden"}`} key={sub.name}>
                <button
                  onClick={() => {
                    setCategory({ name: categories[active].name + " > " + sub.name, id: sub.id });
                    setShow(false);
                  }}
                  className="py-2 px-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition duration-300"
                >
                  {/* {filter ? reactStringReplace(sub.name, filter.trim(), (match) => <span className="font-bold">{match}</span>) : sub.name} */}
                  {sub.name}
                </button>
              </li>
            ))}
          </ul>
          {/* <ul className="flex flex-col flex-wrap h-[600px] font-medium">
              {categories[active].SubCategories.map((sub) => (
                <li key={sub.name} className="py-1 px-2 text-slate-700 hover:text-black transition duration-300">
                <button
                onClick={() => {
                  setCategory({ name: categories[active].name + " > " + sub.name, id: sub.id });
                  setShow(false);
                }}
                className="capitalize"
                >
                {sub.name}
                </button>
                </li>
                ))}
            </ul> */}
        </article>
      </section>
    </Modal>
  );
}

export default SelectCategory;
