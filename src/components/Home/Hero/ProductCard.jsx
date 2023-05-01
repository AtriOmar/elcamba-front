import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ProductCard({ product }) {
  return (
    <div className="w-[125px] h-full rounded-lg bg-white shadow-card1 overflow-hidden">
      <div className="h-[125px] w-full border-b">
        <img src={`http://localhost:5000/uploads/${product.photos[0]}`} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="py-0.5 px-3">
        <h5 className="font-normal font-rubik text-slate-900 text-[12px] capitalize line-clamp-2">{product.name}</h5>
        <h5 className="w-fit ml-auto px-2 rounded-full bg-red-500 font-normal font-rubik text-white capitalize">
          {product.oldPrice ? <span className="mr-1 text-[10px] line-through">{product.oldPrice} DT</span> : ""}
          <span className="text-[12px]">{product.price} DT</span>
        </h5>
      </div>
    </div>
  );
}

export default ProductCard;
