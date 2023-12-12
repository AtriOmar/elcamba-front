import React, { useEffect, useMemo, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { useParams } from "react-router";
import formatPath from "../../lib/formatPath";
import { UserIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import PremiumProducts from "./PremiumProducts";
import SimilarProducts from "./SimilarProducts";
import sad from "../../assets/images/sad.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ClientJS } from "clientjs";
import CryptoJS from "crypto-js";
import { useChatContext } from "../../contexts/ChatProvider";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const client = new ClientJS();
const fingerprint = client.getFingerprint() + "";
const fingerprintToken = CryptoJS.AES.encrypt(fingerprint, import.meta.env.VITE_FINGERPRINT_PASSWORD).toString();

async function fetchProduct(id) {
  const res = await axios.get("/products/getById", {
    params: {
      id,
      view: "true",
      fingerprintToken,
    },
  });
  return res.data;
}

export default function Product() {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    networkMode: "always",
  });
  const path = useMemo(() => {
    const newPath = [];
    newPath[0] = { name: "Produits", path: "/products" };
    newPath[1] = { name: product?.SubCategory?.Category?.name, path: `/products?c=${product?.SubCategory?.Category?.id}` };
    newPath[2] = { name: product?.SubCategory?.name, path: `/products?s=${product?.SubCategory?.id}` };
    newPath[3] = { name: product?.name, path: `/products/${product?.id}` };

    return newPath;
  }, [product]);
  const [ads, setAds] = useState([]);
  const { preTitle } = useChatContext();

  async function fetchAds() {
    try {
      const res = await axios.get("/abc/getByType", {
        params: {
          type: 4,
          limit: 2,
          active: true,
        },
      });

      setAds(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    fetchAds();
  }, []);

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="grid place-items-center m-2 py-10 px-10 rounded-lg bg-white shadow-md">
        <div className="">
          <img className="w-[150px] mx-auto " src={sad} alt="" />
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas le produit demandé</h3>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grow">
      <Helmet>
        {/* <title>
          {unread ? `(${unread})` : ""} {product.name} | ELCAMBA
        </title> */}
        <title>
          {preTitle}
          {product.name} | ELCAMBA
        </title>
        <meta name="og:title" content={`${product.name} | ELCAMBA`} />
        <meta name="og:image" content={`${BACKEND_URL}/uploads/${product?.photos?.[0]}`} />
      </Helmet>
      <ProductDetails product={product} path={path} />
      {ads?.length ? (
        <div className="grid scr1000:grid-cols-2 gap-1">
          {ads[0]?.url ? (
            <Link className="w-full" to={ads[0].url} target="_blank">
              <img src={`${BACKEND_URL}/uploads/abc/${ads[0].photo}`} className="max-w-[500px] mx-auto w-full rounded-lg aspect-[2/1] object-cover" alt="" />
            </Link>
          ) : (
            <div className="w-full">
              <img src={`${BACKEND_URL}/uploads/abc/${ads[0].photo}`} className="max-w-[500px] mx-auto w-full rounded-lg aspect-[2/1] object-cover" alt="" />
            </div>
          )}
          {ads[1]?.url ? (
            <Link className="w-full" to={ads[1].url} target="_blank">
              <img src={`${BACKEND_URL}/uploads/abc/${ads[1].photo}`} className="max-w-[500px] mx-auto w-full rounded-lg aspect-[2/1] object-cover" alt="" />
            </Link>
          ) : (
            <div className="w-full">
              <img src={`${BACKEND_URL}/uploads/abc/${ads[1].photo}`} className="max-w-[500px] mx-auto w-full rounded-lg aspect-[2/1] object-cover" alt="" />
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <SimilarProducts categoryId={{ categoryId: product?.SubCategory?.Category?.id }} categoryName={product?.SubCategory?.Category?.name} />
      <PremiumProducts />
      <SimilarProducts categoryId={{ subCategoryId: product?.SubCategory?.id }} categoryName={product?.SubCategory?.name} />
    </div>
  );
}
