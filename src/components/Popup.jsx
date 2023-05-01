import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

const COLORS = {
  success: "bg-green-600",
  info: "bg-sky-700",
  danger: "bg-red-600",
};

function Popup({ type = "info", text = "hello", lastFor = 4000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    setTimeout(() => setShow(false), lastFor);
  }, []);
  return (
    <Transition
      show={show}
      enter="transition duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`w-full rounded-lg p-4 text-white font-medium flex items-center gap-3 shadow-[0_0_10px_rgba(0,0,0,.4)] ${COLORS[type]}`}>
        <svg className="flex-shrink-0 inline w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="break-anywhere">{text}</p>
      </div>
    </Transition>
  );
}

export default Popup;
