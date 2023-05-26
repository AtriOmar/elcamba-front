import { faArrowDownShortWide, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

function SortProducts({ input, setInput }) {
  const buttonRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!isOverflowing && buttonRef.current?.getBoundingClientRect().bottom > window.innerHeight - 120) {
        setIsOverflowing(true);
      } else if (isOverflowing && buttonRef.current?.getBoundingClientRect().bottom < window.innerHeight - 120) {
        setIsOverflowing(false);
      }
    }

    const element = document.querySelector(".category-layout");
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`relative flex w-fit`}>
      <Popover className="relative">
        <Popover.Button
          className={`h-9 rounded-l border border-slate-300 border-r-slate-300 bg-slate-100 px-2 outline-0 ring-inset transition-all duration-150 hover:bg-slate-200 focus:ring-1 [&[aria-expanded='true']]:bg-slate-200`}
          ref={buttonRef}
        >
          <div>
            <p className="">{names[input.orderBy]}</p>
          </div>
        </Popover.Button>

        <Popover.Panel
          className={`absolute left-1/2 w-fit -translate-x-1/2 divide-y rounded-md bg-white p-1 shadow-card1 ring-2 ring-slate-300 ${
            isOverflowing ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {({ close }) => (
            <ul className="divide-y">
              <li className="">
                <button
                  className="font-cera mb-px w-full rounded-lg px-4 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                  onClick={() => {
                    setInput((prev) => ({ ...prev, orderBy: "price" }));
                    close();
                  }}
                >
                  Prix
                </button>
              </li>
              <li className="">
                <button
                  className="font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                  onClick={() => {
                    setInput((prev) => ({ ...prev, orderBy: "createdAt" }));
                    close();
                  }}
                >
                  Date
                </button>
              </li>
              <li className="">
                <button
                  className="font-cera mt-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                  onClick={() => {
                    setInput((prev) => ({ ...prev, orderBy: "name" }));
                    close();
                  }}
                >
                  Nom
                </button>
              </li>
            </ul>
          )}
        </Popover.Panel>
      </Popover>
      <button
        className="flex items-center rounded-r border border-l-0 border-slate-300 bg-slate-100 px-2 outline-0 ring-inset transition-all duration-150 hover:bg-slate-200 focus:ring-1"
        onClick={() => setInput((prev) => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }))}
      >
        {input.order === "asc" ? <FontAwesomeIcon icon={faArrowDownShortWide} size="sm" /> : <FontAwesomeIcon icon={faArrowDownWideShort} size="sm" />}
      </button>
    </div>
  );
}

export default SortProducts;

const names = {
  name: "Nom",
  price: "Prix",
  createdAt: "Date",
};
