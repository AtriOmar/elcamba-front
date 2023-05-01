import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/admin/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Register from "./components/auth/Register";
import Products from "./components/admin/product/Products";
import Categories from "./components/admin/category/Categories";
import Users from "./components/admin/users/Users";
import AuthProvider from "./contexts/AuthProvider";
import SubCategories from "./components/admin/subCategory/SubCategory";
import axios from "axios";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./components/customer/Products";
import UIProvider from "./contexts/UIProvider";
import Layout from "./layouts/Layout";
import { register } from "swiper/element/bundle";

register();

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
            path: "sub-categories",
            element: <SubCategories />,
          },
        ],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UIProvider>
      <RouterProvider router={router} />
    </UIProvider>
  </AuthProvider>
);
