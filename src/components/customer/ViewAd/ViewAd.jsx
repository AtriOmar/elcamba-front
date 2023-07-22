import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useUIContext } from "../../../contexts/UIProvider";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router";
import Loader from "../../Loader";
// import EditProduct from "./ViewAd/EditProduct";
import AdDetails from "./AdDetails";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

async function fetchAd(id, user) {
  const res = await axios.get("/abc/getById", {
    params: {
      id,
    },
  });

  if (!res.data) throw new Error("not found");

  if (res.data?.userId !== user.id) throw new Error("not authorized");

  return res.data;
}

function ViewAd() {
  const { id } = useParams();
  const { addPopup } = useUIContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const {
    data: ad,
    isLoading: loading,
    error,
    refetch: refetchAd,
  } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => fetchAd(id, user),
    networkMode: "always",
  });

  console.log("error", error);

  if (error?.message === "not found") {
    addPopup({
      type: "danger",
      text: "Produit non trouvé",
    });
    navigate("/customer/ads");
    return;
  }

  if (error?.message === "not authorized") {
    addPopup({
      type: "danger",
      text: "Non autorisé",
    });
    navigate("/customer/promote/manage");
    return;
  }

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-2 scr1000:mx-2 py-6 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 text-black hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="sm" className="" />
        <h2 className=" font-semibold capitalize">retour</h2>
      </button>
      <AdDetails ad={ad} fetchAd={refetchAd} />
    </div>
  );
}

export default ViewAd;
