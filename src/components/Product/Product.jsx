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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function fetchProduct(id) {
  const res = await axios.get("/products/getById", {
    params: {
      id,
      view: "true",
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
    newPath[0] = { name: product?.SubCategory?.Category?.name, path: `/products?c=${product?.SubCategory?.Category?.id}` };
    newPath[1] = { name: product?.SubCategory?.name, path: `/products?s=${product?.SubCategory?.id}` };
    newPath[2] = { name: product?.name, path: `/products/${product?.id}` };

    return newPath;
  }, [product]);
  const [ads, setAds] = useState([]);

  async function fetchAds() {
    try {
      const res = await axios.get("/abc/getByType", {
        params: {
          type: 4,
          limit: 2,
        },
      });

      setAds(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAds();
  }, []);

  console.log("ads", ads);

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center w-full py-20 px-20 rounded-lg bg-white shadow-md">
        <div className="">
          <img className="w-[150px] mx-auto " src={sad} alt="" />
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas le produit demandé</h3>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'acceuil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grow">
      <Helmet>
        <title>{product.name} | CHARYOUL</title>
      </Helmet>
      <ProductDetails product={product} path={path} />
      {ads?.length ? (
        <div className="grid scr1000:grid-cols-2 gap-1">
          <Link className="w-full" to={ads[0].url} target="_blank">
            <img src={`${BACKEND_URL}/uploads/abc/${ads[0].photo}`} className="max-w-[500px] mx-auto w-full rounded-lg aspect-[2/1] object-cover" alt="" />
          </Link>
          <Link className="hidden scr1000:block w-full" to={ads[1].url} target="_blank">
            <img src={`${BACKEND_URL}/uploads/abc/${ads[1].photo}`} className="max-w-[500px] mx-auto w-full rounded-lg aspect-[2/1] object-cover" alt="" />
          </Link>
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
