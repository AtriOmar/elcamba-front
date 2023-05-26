import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUIContext } from "../../contexts/UIProvider";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router";
import Loader from "../Loader";
import EditProduct from "./ViewProduct/EditProduct";
import ProductDetails from "./ViewProduct/ProductDetails";

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
    <div className=" p-6 rounded-lg bg-white shadow-md">
      <ProductDetails product={product} />
      <div className="w-full h-px my-20 bg-sky-500"></div>
      <EditProduct product={product} />
    </div>
  );
}

export default ViewProduct;
