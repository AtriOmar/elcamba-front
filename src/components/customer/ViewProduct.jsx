import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUIContext } from "../../contexts/UIProvider";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router";
import Loader from "../Loader";
import EditProduct from "./ViewProduct/EditProduct";
import ProductDetails from "./ViewProduct/ProductDetails";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addPopup } = useUIContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) setLoading(true);

    async function fetchProduct() {
      try {
        const res = await axios.get("/products/getById", {
          params: {
            id,
          },
        });
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-6 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <Link to="/customer/products" className="flex items-center gap-2 mb-4 text-black hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="sm" className="" />
        <h2 className=" font-semibold capitalize">Mes produits</h2>
      </Link>
      <ProductDetails product={product} />
      <div className="w-full h-px my-20 bg-sky-500"></div>
      <EditProduct product={product} />
    </div>
  );
}

export default ViewProduct;
