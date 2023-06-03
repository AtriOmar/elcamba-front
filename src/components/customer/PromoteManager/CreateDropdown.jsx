import { faArrowDownShortWide, faArrowDownWideShort, faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function CreateDropdown() {
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
        className={`flex gap-2 items-center h-9 rounded border border-slate-300 bg-green-500 px-2 outline-0 ring-inset text-white transition-all duration-150 hover:bg-green-600 focus:ring-1 [&[aria-expanded='true']]:bg-green-600 `}
        ref={buttonRef}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
        Créer
      </Popover.Button>

      <Popover.Panel
        className={`absolute left-1/2 w-fit -translate-x-1/2 z-10 divide-y rounded-md bg-white p-1 shadow-card1 ring-2 ring-slate-300 ${
          isOverflowing ? "bottom-full mb-2" : "top-full mt-2"
        }`}
      >
        {({ close }) => (
          <ul className="divide-y">
            <li className="">
              <Link
                to="/customer/promote/product"
                className="block font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
              >
                Produit
              </Link>
            </li>
            <li className="">
              <Link
                to="/customer/promote/poster"
                className="block font-cera mt-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
              >
                Affiche
              </Link>
            </li>
          </ul>
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default CreateDropdown;
