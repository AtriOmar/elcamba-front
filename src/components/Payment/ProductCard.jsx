import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductCard({ order }) {
  return (
    <article className="">
      <p className="mt-2 font-medium text-sky-700">Produit:</p>
      <div className="flex items-center gap-2 mt-1">
        <img className="w-28 h-28 rounded-md object-contain" src={`${BACKEND_URL}/uploads/${order.Product.photos[0]}`} alt="" />
        <div className="">
          <h2 className="max-w-[500px] font-medium text-sky-700 line-clamp-4">{order.Product.name}</h2>
          <h2 className="text-slate-700">Référence: {order.Product.id}</h2>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
