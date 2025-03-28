import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductCard({ product }) {
  if (!product) return;
  return (
    <Link
      to={`/products/${product.id}`}
      className="block w-[125px] h-full rounded-lg bg-white shadow-card1 hover:shadow-card2 hover:scale-[1.02] duration-300 overflow-hidden"
    >
      <div className="h-[125px] w-full border-b">
        <img
          src={`${BACKEND_URL}/uploads/thumbnails/${product.photos?.[0]}`}
          // src={`${BACKEND_URL}/photo?path=${product.photos?.[0]}&size=200`}
          // src={`https://node.omaratri.online?url=${BACKEND_URL}/uploads/${product.photos?.[0]}&size=300`}
          alt={product?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-0.5 px-3">
        <h5 className="font-normal font-rubik text-slate-900 text-[12px] capitalize line-clamp-2">{product.name}</h5>
        <h5 className="flex flex-wrap items-end w-fit ml-auto px-2 py-0.5 rounded-full bg-red-500 font-normal font-rubik text-white capitalize">
          {Number(product?.salePrice) ? <span className="mr-1 text-[10px] line-through whitespace-nowrap">{Number(product?.price)} DT</span> : ""}
          <span className="ml-auto text-[12px] whitespace-nowrap">{Number(product?.salePrice) || Number(product?.price)} DT</span>
        </h5>
      </div>
    </Link>
  );
}

export default ProductCard;
