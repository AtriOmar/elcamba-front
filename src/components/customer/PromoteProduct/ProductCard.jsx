import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProductCard({ product }) {
  return (
    <article className="flex items-center gap-2 mt-3">
      <img className="w-28 h-28 rounded-md object-contain" src={`${BACKEND_URL}/uploads/${product.photos[0]}`} alt="" />
      <div className="py-4">
        <h2 className="font-medium text-sky-700">{product.name}</h2>
        <h2 className="text-slate-700">Référence: {product.id}</h2>
      </div>
    </article>
  );
}

export default ProductCard;
