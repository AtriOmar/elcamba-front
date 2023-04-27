import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Register from "./components/auth/Register";
import Products from "./components/admin/product/Products";
import Categories from "./components/admin/category/Categories";
import Users from "./components/admin/users/Users";
import News from "./components/admin/news/News";
import Partners from "./components/admin/partner/Partners";
import AuthProvider from "./contexts/AuthProvider";
import SubCategories from "./components/admin/subCategory/SubCategory";
import axios from "axios";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./components/Products";
import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  [
    // {
    //   path: "/",
    //   element: <App />,
    //   children: [
    {
      path: "admin",
      element: <PrivateRoute component={AdminLayout} aId={2} />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "partners",
          element: <Partners />,
        },
        {
          path: "sub-categories",
          element: <SubCategories />,
        },
      ],
    },
    {
      path: "admin-login",
      element: <Login />,
    },
    {
      // path: "",
      // element: <Layout />,
      // children: [
      //   {
      //     path: "login",
      //     element: <Login />,
      //   },
      //   {
      //     path: "register",
      //     element: <Register />,
      //   },
      //   {
      //     path: "",
      //     element: <Home />,
      //   },
      // ],
      path: "",
      element: <Home />,
    },
    {
      path: "customer",
      element: <PrivateRoute component={CustomerLayout} />,
      children: [
        {
          path: "products",
          element: <CustomerProducts />,
        },
      ],
    },
  ]
  //   },
  // ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="192818518763-fstmrcbsdarbabvv1i9q4692nlpvpm4f.apps.googleusercontent.com">
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
