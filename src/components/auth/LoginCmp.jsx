import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import axios from "axios";

export default function LoginCmp() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("/login/status")
      .then((res) => {
        if (res.data.user?.accessId) {
          navigate("/admin");
        }
        if (res.data.user?.type == "visitor") {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    if (loginInput.email == "") {
      setErrors((errors) => [...errors, "L'Email ne peut pas etre vide"]);
    }
    if (loginInput.password == "") {
      setErrors((errors) => [...errors, "Le Mot de passe ne peut pas etre vide"]);
    } else
      try {
        const res = await API.postUserLogin({ email: loginInput.email, password: loginInput.password });
        if (res.data.user.type != "visitor") {
          navigate("/admin");
        }
      } catch (err) {
        const response = err?.response;
        console.log(response);
        if (response.status == 401) setErrors((errors) => [...errors, "Email ou mot de passe Incorrect"]);
      }
  };

  if (loading) {
    return loading;
  }

  return (
    <div className="max-w-xl mx-auto flex justify-center items-center bg-[#1F2937]">
      <form className="flex flex-col shadow-lg px-10 py-5 gap-4 w-full" onSubmit={handleSubmit}>
        {errors?.map((error, index) => (
          <div key={index} className="text-red-500 flex items-center justify-center gap-2">
            <IonIcon icon={warningOutline} className="text-xl" /> {error}
          </div>
        ))}

        <div>
          <input
            placeholder="email"
            type="email"
            name="email"
            onChange={handleInput}
            value={loginInput.email}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div>
          <input
            placeholder="Mot de passe"
            type="password"
            name="password"
            onChange={handleInput}
            value={loginInput.password}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <Link className="text-blue-500" to="/authentication/simple/reset-password">
          Forgot your password?
        </Link>
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Login
        </button>
        <hr />
        <div className="text-center text-white">
          <button className="bg-[#2E7817] px-5 py-2 rounded-xl font-bold">S'inscrire</button>
        </div>
      </form>
    </div>
  );
}
