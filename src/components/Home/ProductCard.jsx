import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import removeZeros from "../../lib/removeZeros";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block w-[150px] scr1150:w-[175px] h-full rounded-lg bg-white shadow-card1 hover:shadow-card2 hover:scale-[1.02] duration-300 overflow-hidden"
    >
      <div className="aspect-square w-full border-b">
        <img src={`${BACKEND_URL}/photo?path=${product.photos?.[0]}&size=300`} alt={product?.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="py-2 px-3">
        <h5 className="font-normal font-rubik text-slate-900 text-[14px] capitalize line-clamp-2">{product.name}</h5>
        <h5 className="flex flex-wrap items-end w-fit ml-auto px-2 py-1 rounded-full bg-yellow-500 font-normal font-rubik text-white">
          {Number(product.salePrice) ? <span className="mr-2 text-[11px] line-through whitespace-nowrap">{Number(product.price)} DT</span> : ""}
          <span className="ml-auto text-[12px] whitespace-nowrap">{Number(product.salePrice) || Number(product.price)} DT</span>
        </h5>
        <div className="flex items-center gap-1 mt-2 text-sky-800">
          <FontAwesomeIcon icon={faTruck} size="xs" />
          <p className="text-[11px] line-clamp-2">{product.delivery || "Non"}</p>
        </div>
        {product.address ? (
          <div className="flex items-center gap-1 text-sky-800">
            <FontAwesomeIcon icon={faLocationDot} size="xs" />
            <p className="text-[11px] line-clamp-2">
              <span className="capitliaze">{product.city}</span>, {product.address || ""}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
