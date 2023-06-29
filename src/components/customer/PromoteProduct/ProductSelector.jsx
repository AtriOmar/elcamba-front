import { faArrowDownShortWide, faArrowDownWideShort, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

// -------------------- options is an array of products --------------------
// -------------------- value is the selected product  --------------------

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductSelector({ value, onChange, options, position = "center" }) {
  const buttonRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (buttonRef.current?.getBoundingClientRect().bottom > window.innerHeight - 240) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Popover className="relative w-full">
      <Popover.Button
        className={`w-full resize-none rounded border border-slate-300 px-2 py-1.5 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1`}
        ref={buttonRef}
      >
        <p className="flex items-center justify-between gap-2 ">
          {/* {(options.find((el) => el.id === value) || options[0]).name} */}
          {value ? <span className="text-left line-clamp-4">{value?.name}</span> : <span className="text-slate-500">Produit</span>}
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
            {options?.length ? (
              options.map((option) => (
                <li className="" key={option?.id}>
                  <button
                    className="flex items-center gap-2 font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                    onClick={() => {
                      onChange(option);
                      close();
                    }}
                  >
                    <img className="w-10 h-10 object-contain rounded-md" src={`${BACKEND_URL}/uploads/${option?.photos?.[0]}`} alt="" />
                    <p className="text-left line-clamp-4">{option?.name}</p>
                  </button>
                </li>
              ))
            ) : (
              <li className="">
                <button
                  onClick={close}
                  className="flex items-center gap-2 font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                >
                  Aucun produit
                </button>
              </li>
            )}
          </ul>
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default ProductSelector;
