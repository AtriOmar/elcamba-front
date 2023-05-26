import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router";
import formatPath from "../lib/formatPath";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMessage, faStar, faStarHalfStroke, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductDetails from "./Product/ProductDetails";
import PremiumProducts from "./Product/PremiumProducts";
import SimilarProducts from "./Product/SimilarProducts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState([]);
  const { id } = useParams();

  async function fetchProduct() {
    const res = await axios.get("/products/getById", {
      params: {
        id,
      },
    });
    console.log(res.data);
    setProduct(res.data);

    setPath(() => {
      const newPath = [];
      newPath[0] = { name: res.data.SubCategory.Category.name, path: `/category?c=${res.data.SubCategory.Category.id}` };
      newPath[1] = { name: res.data.SubCategory.name, path: `/category?s=${res.data.SubCategory.id}` };
      newPath[2] = { name: res.data.name, path: `/product/${res.data.id}` };

      return newPath;
    });

    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="">
      <Navbar />
      <ProductDetails product={product} path={path} />
      <PremiumProducts />
      <SimilarProducts categoryId={{ categoryId: product.SubCategory.Category.id }} categoryName={product.SubCategory.Category.name} />
      <SimilarProducts categoryId={{ subCategoryId: product.SubCategory.id }} categoryName={product.SubCategory.name} />
    </div>
  );
}

export default Product;
