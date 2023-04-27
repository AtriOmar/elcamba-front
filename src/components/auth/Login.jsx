import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";

export default function Login() {
  const { user, setUser } = useAuthContext();
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
    API.getLoginStatus()
      .then((res) => {
        if (res.data.user?.accessId) {
          navigate("/admin");
        }
        if (res.data.user?.type == "visitor") {
          setLoading(false);
        }
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await API.postUserLogin({ email: loginInput.email, password: loginInput.password });
      if (res.data.user.type != "visitor") {
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return loading;
  }

  return (
    <div className="max-w-xl mx-auto h-[80vh] flex justify-center items-center">
      <form className="flex flex-col shadow-lg p-10 gap-4 w-full" onSubmit={handleSubmit}>
        <h5 className="text-center font-bold text-3xl mb-3">Login</h5>
        <div>
          <input
            placeholder="email"
            type="email"
            name="email"
            onChange={handleInput}
            value={loginInput.email}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-500">{errors.email}</span>
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
          <span className="text-red-500">{errors.password}</span>
        </div>
        <Link className="text-blue-500" to="/authentication/simple/forgot-password">
          Forgot your password?
        </Link>
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Login
        </button>
        <hr />
        <div className="text-center">
          Or{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
