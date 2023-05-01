import { Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";

function SelectCategory({ show, setShow, category, setCategory }) {
  const [unmount, setUnmount] = useState(true);

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setActive(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (show) setUnmount(false);

    function detectEscape(e) {
      if (e.code === "Escape") {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("keydown", detectEscape);

      return () => document.removeEventListener("keydown", detectEscape);
    }
  }, [show]);

  if (unmount) return false;

  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-hidden z-[1000] ${show ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`bg-black ${
          show ? "opacity-50" : "opacity-0 "
        } animate-[fade_300ms] w-full h-screen absolute top-0 right-0 cursor-pointer transition duration-300 `}
        onClick={() => setShow(false)}
      ></div>
      <Transition
        as={Fragment}
        show={show}
        appear={true}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
        afterLeave={() => {
          setUnmount(true);
        }}
      >
        <section className="flex w-[600px] rounded-2xl bg-white overflow-hidden ">
          <article className="w-1/3">
            <ul className="divide-y text-sm capitalize font-medium">
              {categories.map((categ, index) => (
                <li key={categ.name} className={`py-2 px-4 ${active === index ? "bg-slate-100" : "border-r"}`} onMouseEnter={() => setActive(index)}>
                  {categ.name}
                </li>
              ))}
            </ul>
          </article>
          <article className="grow py-2 px-2 bg-slate-100 text-sm overflow-x-scroll scrollbar1">
            <ul className="flex flex-col flex-wrap h-[600px] font-medium">
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
            </ul>
          </article>
        </section>
      </Transition>
    </div>
  );
}

export default SelectCategory;
