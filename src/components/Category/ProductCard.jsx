import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductCard({ product }) {
  return (
    <Link
      className="block w-[175px] overflow-hidden rounded-lg bg-white shadow-card1 transition-all duration-300 hover:scale-105 hover:shadow-card2"
      to={`/product/${product.id}`}
    >
      <div className="h-[175px] w-full border-b">
        <img src={`${BACKEND_URL}/uploads/${product.photos[0]}`} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="px-3 py-2">
        <h5 className="line-clamp-2 font-rubik text-[14px] font-normal capitalize text-slate-900">{product.name}</h5>
        <h5 className="ml-auto w-fit rounded-full bg-yellow-500 px-2 py-1 font-rubik font-normal capitalize text-white">
          {product.oldPrice ? <span className="mr-2 text-[11px] line-through">{product.oldPrice} DT</span> : ""}
          <span className="text-sm">{product.price} DT</span>
        </h5>
        <div className="mt-2 flex items-center gap-1 text-sky-800">
          <FontAwesomeIcon icon={faTruck} size="xs" />
          <p className="line-clamp-2 text-[11px]">{product.deliveryBody || "Non"}</p>
        </div>
        {product.address ? (
          <div className="flex items-center gap-1 text-sky-800">
            <FontAwesomeIcon icon={faLocationDot} size="xs" />
            <p className="line-clamp-2 text-[11px]">{product.address || ""}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
