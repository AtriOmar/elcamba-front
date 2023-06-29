import React from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="flex items-center gap-2 hover:bg-gray-100 duration-150">
      <img className="shrink-0 w-11 h-11 object-contain border rounded-md" src={`${BACKEND_URL}/uploads/${product.photos?.[0]}`} alt="" />
      <p className="font-medium text-sm text-slate-700 line-clamp-4 capitalize">{product.name}</p>
    </Link>
  );
}
