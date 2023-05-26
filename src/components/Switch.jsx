import React from "react";

function Switch({ checked, setChecked, disabled }) {
  return (
    <label className={`relative inline-flex items-center ${disabled ? "" : "cursor-pointer"}`}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        disabled={disabled}
        onChange={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }

          setChecked((prev) => !prev);
        }}
      />
      <div
        className={`w-11 h-6 peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
          checked ? "bg-green-500 after:translate-x-full after:border-white" : "bg-red-400"
        }`}
      ></div>
    </label>
  );
}

export default Switch;
