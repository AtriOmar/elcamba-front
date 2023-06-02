import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useUIContext } from "../../contexts/UIProvider";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router";
import Loader from "../Loader";
// import EditProduct from "./ViewAd/EditProduct";
import AdDetails from "./ViewAd/AdDetails";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ViewAd() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState("");
  const { addPopup } = useUIContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAd = useCallback(async () => {
    if (!loading) setLoading(true);
    try {
      const res = await axios.get("/ads/getById", {
        params: {
          id,
        },
      });

      console.log(res.data);
      setAd(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  });

  useEffect(() => {
    fetchAd();
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
      <Link to="/customer/promote/manage" className="flex items-center gap-2 mb-4 text-black hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="sm" className="" />
        <h2 className=" font-semibold capitalize">Gérer</h2>
      </Link>
      <AdDetails ad={ad} fetchAd={fetchAd} />
      {/* <div className="w-full h-px my-20 bg-sky-500"></div> */}
      {/* <EditProduct ad={product} /> */}
    </div>
  );
}

export default ViewAd;
