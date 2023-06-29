import { faArrowDownShortWide, faArrowDownWideShort, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

// -------------------- options is an object like the react-select options ( { label: "", value: "" } ) --------------------

function Select({ value, onChange, options, position = "center" }) {
  const buttonRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (buttonRef.current?.getBoundingClientRect().bottom > window.innerHeight - 240) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }

      // if (!isOverflowing && buttonRef.current?.getBoundingClientRect().bottom > window.innerHeight - 200) {
      //   setIsOverflowing(true);
      // } else if (isOverflowing) {
      //   setIsOverflowing(false);
      // }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Popover className="relative w-full">
      <Popover.Button
        className={`w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1`}
        ref={buttonRef}
      >
        <p className="flex items-center justify-between gap-2 capitalize">
          {(options.find((el) => el.value === value) || options[0]).label}
          <FontAwesomeIcon icon={faChevronDown} size="sm" className="text-slate-400" />
        </p>
      </Popover.Button>

      <Popover.Panel
        className={`absolute ${
          position === "center" ? "left-1/2 w-full -translate-x-1/2" : position === "right" ? "left-0" : "right-0"
        } max-h-[220px] overflow-auto z-10 divide-y rounded-md bg-white p-1 shadow-card1 border-2 border-slate-300 ${
          isOverflowing ? "bottom-full mb-2" : "top-full mt-2"
        }`}
      >
        {({ close }) => (
          <ul className="divide-y w-full">
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
  );
}

export default Select;
