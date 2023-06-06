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
import Ads from "./components/admin/ad/Ads";
import ResetPasswordRequest from "./components/auth/ResetPasswordRequest";
import ResetPassword from "./components/auth/ResetPassword";
import Category from "./components/Category.jsx";
import CategoryLayout from "./layouts/CategoryLayout";
import Product from "./components/Product";
import ViewProduct from "./components/customer/ViewProduct";
import PromoteProduct from "./components/customer/PromoteProduct";
import PromoteLayout from "./layouts/PromoteLayout";
import PromoteManager from "./components/customer/PromoteManager";
import PromotePoster from "./components/customer/PromotePoster";
import Payment from "./components/Payment";
import ViewAd from "./components/customer/ViewAd";
import Chat from "./components/customer/Chat/Chat";
import ChatDashboard from "./components/customer/Chat/ChatDashboard";
import ChatProvider from "./contexts/ChatProvider";

register();

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
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
          {
            path: "ads",
            element: <Ads />,
          },
        ],
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordRequest />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "category",
        element: <CategoryLayout />,
        children: [
          {
            path: "",
            element: <Category />,
          },
        ],
      },
      {
        path: "customer",
        element: <PrivateRoute component={CustomerLayout} />,
        children: [
          {
            path: "products",
            element: <CustomerProducts />,
          },
          {
            path: "products/:id",
            element: <ViewProduct />,
          },
          {
            path: "promote/manage",
            element: <PromoteManager />,
          },
          {
            path: "promote/product",
            element: <PromoteProduct />,
          },
          {
            path: "promote/poster",
            element: <PromotePoster />,
          },
          {
            path: "promote/:id",
            element: <ViewAd />,
          },
          {
            path: "chat/:id",
            element: <Chat />,
          },
          {
            path: "chat",
            element: <ChatDashboard />,
          },
        ],
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "payment/:token",
        element: <Payment />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChatProvider>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </ChatProvider>
  </AuthProvider>
);
