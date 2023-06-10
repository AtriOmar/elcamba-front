import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUIContext } from "../../../contexts/UIProvider";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router";
import Loader from "../../Loader";
import EditProduct from "./EditProduct";
import ProductDetails from "./ProductDetails";
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
  const { user } = useAuthContext();

  async function fetchProduct() {
    if (!loading) setLoading(true);
    try {
      const res = await axios.get("/products/getById", {
        params: {
          id,
        },
      });

      console.log("data", res.data);

      if (!res.data) {
        addPopup({
          type: "danger",
          text: "Produit non trouvé",
        });
        navigate("/customer/products");
      } else if (res.data?.userId !== user.id) {
        addPopup({
          type: "danger",
          text: "Non autorisé",
        });
        navigate("/customer/products");
      } else {
        setProduct(res.data);
        setLoading(false);
      }
    } catch (err) {
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
      navigate("/customer/products");
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) return;

  return (
    <div className="py-6 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 text-black hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="sm" className="" />
        <h2 className=" font-semibold capitalize">Retour</h2>
      </button>
      <ProductDetails product={product} />
      <div className="w-full h-px my-20 bg-sky-500"></div>
      <EditProduct product={product} fetchProduct={fetchProduct} />
    </div>
  );
}

export default ViewProduct;
