import { faArrowDownShortWide, faArrowDownWideShort, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";

// -------------------- options is an object like the react-select options ( { label: "", value: "" } ) --------------------

function SortSelect({
  value,
  onChange,
  options,
  position = "center",
  formatOption = (option) => option.label,
  formatSelectedOption = (option) => option.label,
  order,
  onOrderChange,
}) {
  const buttonRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  console.log(value, order);

  useEffect(() => {
    function handleScroll() {
      if (!isOverflowing && buttonRef.current?.getBoundingClientRect().bottom > window.innerHeight - 120) {
        setIsOverflowing(true);
      } else if (isOverflowing && buttonRef.current?.getBoundingClientRect().bottom < window.innerHeight - 120) {
        setIsOverflowing(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`relative flex w-50`}>
      <Popover className="relative">
        <Popover.Button
          className={`h-9 rounded-l border border-slate-300 border-r-slate-300 bg-sky-600 px-2 outline-0 text-white transition-all duration-150 hover:bg-sky-700 focus:ring-1 ring-sky-800 ring-offset-1 [&[aria-expanded='true']]:bg-sky-700`}
          ref={buttonRef}
        >
          <div>
            <p className="flex items-center gap-2">
              {formatSelectedOption(value)}
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </p>
          </div>
        </Popover.Button>

        <Popover.Panel
          className={`absolute ${
            position === "center" ? "left-1/2 w-fit -translate-x-1/2" : position === "right" ? "left-0" : "right-0"
          } z-10 divide-y rounded-md bg-white p-1 shadow-card1 ring-2 ring-slate-300 ${isOverflowing ? "bottom-full mb-1" : "top-full mt-1"}`}
        >
          {({ close }) => (
            <ul className="divide-y w-max">
              {options.map((option) => (
                <li className="" key={option.value}>
                  <button
                    className="font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                    onClick={() => {
                      onChange(option);
                      close();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Popover.Panel>
      </Popover>
      <button
        className="flex items-center rounded-r border border-l-0 border-slate-300 bg-sky-600 px-2 outline-0 text-white transition-all duration-150 hover:bg-sky-700 focus:ring-1 ring-sky-800 ring-offset-1"
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
      >
        {order === "asc" ? <FontAwesomeIcon icon={faArrowDownShortWide} size="sm" /> : <FontAwesomeIcon icon={faArrowDownWideShort} size="sm" />}
      </button>
    </div>
  );
}

export default SortSelect;
