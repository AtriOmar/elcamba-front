import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthProvider";
import API from "../../utils/API";
import axios from "axios";
import Loader from "../Loader";
import { useUIContext } from "../../contexts/UIProvider";
import deepEqual from "deep-equal";

export default function PrivateRoute({ component: Component, aId = 1 }) {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const { addPopup } = useUIContext();

  const navigate = useNavigate();

  useEffect(() => {
    async function getStatus() {
      try {
        const res = await axios.get("/login/status");
        // if (res.data.user?.type == "visitor") {
        //   navigate("/login");
        // }
        if (!deepEqual(user, res.data.user)) setUser(res.data.user);
        if (!(res.data.user?.accessId >= aId)) {
          addPopup({
            type: "info",
            text: "Connectez-vous pour accéder à cette page",
            lastFor: 4000,
          });
          navigate(-1);
        } else {
          setLoading(false);
        }
      } catch (err) {}
    }

    getStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-w-screen flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <Component />;
}
