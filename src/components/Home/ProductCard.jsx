import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductCard({ product }) {
  return (
    <div className="w-[175px] h-full rounded-lg bg-white shadow-card1 overflow-hidden">
      <div className="h-[175px] w-full border-b">
        <img src={`${BACKEND_URL}/uploads/${product.photos[0]}`} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="py-2 px-3">
        <h5 className="font-normal font-rubik text-slate-900 text-[14px] capitalize line-clamp-2">{product.name}</h5>
        <h5 className="w-fit ml-auto py-1 px-2 rounded-full bg-yellow-500 font-normal font-rubik text-white capitalize">
          {product.oldPrice ? <span className="mr-2 text-[11px] line-through">{product.oldPrice} DT</span> : ""}
          <span className="text-sm">{product.price} DT</span>
        </h5>
        <div className="flex items-center gap-1 mt-2 text-sky-800">
          <FontAwesomeIcon icon={faTruck} size="xs" />
          <p className="text-[11px] line-clamp-2">{product.deliveryBody || "Non"}</p>
        </div>
        <div className="flex items-center gap-1 text-sky-800">
          <FontAwesomeIcon icon={faLocationDot} size="xs" />
          <p className="text-[11px] line-clamp-2">{product.address || ""}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
