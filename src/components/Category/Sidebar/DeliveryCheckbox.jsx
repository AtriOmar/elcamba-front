import React from "react";
import { useSearchParams } from "react-router-dom";

export default function DeliveryCheckbox() {
  const [params, setParams] = useSearchParams();

  return (
    <div className="">
      <label className="flex items-center gap-2 hover:bg-slate-100 text-sm font-medium text-gray-900 cursor-pointer">
        <input
          checked={params.get("delivery") === "y" ? true : false}
          onChange={(e) => {
            // setParams((prev) => ({ ...parseQuery(prev), delivery: prev.get("delivery") === "y" ? "n" : "y" }));
            if (params.get("delivery") === "y") {
              params.delete("delivery");
              setParams(params);
            } else {
              params.set("delivery", "y");
              setParams(params);
            }
          }}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-1"
        />
        Disponible
      </label>
    </div>
  );
}
