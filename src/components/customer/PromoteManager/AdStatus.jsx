import { faArrowDownShortWide, faArrowDownWideShort, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

function AdStatus({ input, setInput }) {
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

    // const element = document.querySelector(".category-layout");
    // element.addEventListener("scroll", handleScroll);

    // return () => {
    //   element.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <Popover className="relative w-fit">
      <Popover.Button
        className={`h-9 rounded border border-slate-300 bg-sky-600 px-2 outline-0 text-white transition-all duration-150 hover:bg-sky-700 focus:ring-1 ring-sky-800 ring-offset-1 [&[aria-expanded='true']]:bg-sky-700`}
        ref={buttonRef}
      >
        <p className="flex items-center gap-2">
          {names[input.status]}
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </p>
      </Popover.Button>

      <Popover.Panel
        className={`absolute left-1/2 w-fit -translate-x-1/2 z-10 divide-y rounded-md bg-white p-1 shadow-card1 ring-2 ring-slate-300 ${
          isOverflowing ? "bottom-full mb-2" : "top-full mt-2"
        }`}
      >
        {({ close }) => (
          <ul className="divide-y">
            <li className="">
              <button
                className="font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                onClick={() => {
                  setInput((prev) => ({ ...prev, status: "all" }));
                  close();
                }}
              >
                Tous
              </button>
            </li>
            <li className="">
              <button
                className="font-cera mt-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                onClick={() => {
                  setInput((prev) => ({ ...prev, status: "active" }));
                  close();
                }}
              >
                Active
              </button>
            </li>
            <li className="">
              <button
                className="font-cera mt-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                onClick={() => {
                  setInput((prev) => ({ ...prev, status: "inactive" }));
                  close();
                }}
              >
                Inactive
              </button>
            </li>
          </ul>
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default AdStatus;

const names = {
  all: "Tous",
  active: "Active",
  inactive: "Inactive",
};
