import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ProductCard({ product }) {
  return (
    <div className="w-[125px] rounded-lg bg-white shadow-card1 overflow-hidden">
      <div className="h-[125px] w-full border-b">
        <img src={`http://localhost:5000/uploads/${product.photos[0]}`} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="py-2 px-3">
        <h5 className="font-normal font-rubik text-slate-900 text-[12px] capitalize line-clamp-3">{product.name}</h5>
        <h5 className="w-fit ml-auto py-1 px-2 rounded-full bg-yellow-500 font-normal font-rubik text-white capitalize">
          {product.oldPrice ? <span className="mr-2 text-[11px] line-through">{product.oldPrice} DT</span> : ""}
          <span className="text-sm">{product.price} DT</span>
        </h5>
      </div>
    </div>
  );
}

export default ProductCard;
