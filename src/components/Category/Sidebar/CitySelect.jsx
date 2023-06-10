import React from "react";
import { useSearchParams } from "react-router-dom";

export default function CitySelect() {
  const [params, setParams] = useSearchParams();

  return (
    <ul className="max-h-[200px] overflow-y-auto">
      <li className="">
        <label className="flex items-center gap-2 hover:bg-slate-100 text-sm font-medium text-gray-900 cursor-pointer">
          <input
            checked={!params.get("cities") ? true : false}
            onChange={(e) => {
              // setParams((prev) => ({ ...parseQuery(prev), delivery: prev.get("delivery") === "y" ? "n" : "y" }));
              if (params.get("cities")) {
                params.delete("cities");
                setParams(params);
              }
            }}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-1"
          />
          Tous
        </label>
      </li>
      {options.map((city, i) => (
        <li className="" key={city}>
          <label className="flex items-center gap-2 hover:bg-slate-100 text-sm font-medium text-gray-900 capitalize cursor-pointer">
            <input
              checked={
                params
                  .get("cities")
                  ?.split("-")
                  .includes(i + "")
                  ? true
                  : false
              }
              onChange={(e) => {
                // setParams((prev) => ({ ...parseQuery(prev), delivery: prev.get("delivery") === "y" ? "n" : "y" }));
                const newCities = params.get("cities")?.split("-") || [];
                if (newCities?.includes(i + "")) {
                  const filtered = newCities.filter((el) => el !== i + "");
                  params.set("cities", filtered.join("-"));
                  setParams(params);
                } else {
                  newCities?.push(i);
                  params.set("cities", newCities.join("-"));
                  setParams(params);
                }
              }}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-1"
            />
            {city}
          </label>
        </li>
      ))}
    </ul>
  );
}

const options = [
  "ariana",
  "béja",
  "ben arous",
  "bizerte",
  "gabes",
  "gafsa",
  "jendouba",
  "kairouan",
  "kasserine",
  "kebili",
  "la manouba",
  "le kef",
  "mahdia",
  "médenine",
  "monastir",
  "nabeul",
  "sfax",
  "sidi bouzid",
  "siliana",
  "sousse",
  "tataouine",
  "tozeur",
  "tunis",
  "zaghouan",
];
