import { faLocationDot, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Product({ product }) {
  if (!product) return;

  return (
    <Link
      className="block w-[140px] scr1000:w-[160px] max-w-[175px] grow overflow-hidden rounded-lg bg-white shadow-card1 transition-all duration-300 hover:scale-105 hover:shadow-card2"
      to={`/products/${product.id}`}
    >
      <div className="aspect-square w-full border-b">
        <img src={`${BACKEND_URL}/uploads/thumbnails/${product.photos[0]}`} alt={product.name} className="h-full w-full object-cover" />
        {/* <img src={`${BACKEND_URL}/photo?path=${product.photos[0]}&size=250`} alt={product.name} className="h-full w-full object-cover" /> */}
        {/* src={`https://node.omaratri.online?url=${BACKEND_URL}/uploads/${product.photos[0]}&size=250`} */}
      </div>
      <div className="px-3 py-2">
        <h5 className="line-clamp-2 font-rubik text-[14px] font-normal capitalize text-slate-900">{product.name}</h5>
        <h5 className="flex flex-wrap items-end ml-auto w-fit rounded-full bg-yellow-500 px-2 py-1 font-rubik font-normal capitalize text-white">
          {Number(product?.salePrice) ? <span className="mr-2 text-[11px] line-through whitespace-nowrap">{Number(product?.price)} DT</span> : ""}
          <span className="ml-auto text-sm whitespace-nowrap">{Number(product?.salePrice) || Number(product?.price)} DT</span>
        </h5>
        <div className="mt-2 flex items-center gap-1 text-sky-800">
          <FontAwesomeIcon icon={faTruck} size="xs" />
          <p className="line-clamp-2 text-[11px]">{product.delivery || "Non"}</p>
        </div>
        {product.address ? (
          <div className="flex items-center gap-1 text-sky-800">
            <FontAwesomeIcon icon={faLocationDot} size="xs" />
            <p className="line-clamp-2 text-[11px]">
              <span className="capitalize">{product.city}</span>, {product.address || ""}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default Product;
