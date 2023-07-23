import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/admin/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home/Home";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Register from "./components/auth/Register";
import Products from "./components/admin/product/Products";
import Categories from "./components/admin/category/Categories";
import Users from "./components/admin/users/Users";
import AuthProvider from "./contexts/AuthProvider";
import SubCategories from "./components/admin/subCategory/SubCategory";
import axios from "axios";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./components/customer/Products/Products";
import UIProvider from "./contexts/UIProvider";
import Layout from "./layouts/Layout";
import { register } from "swiper/element/bundle";
import Ads from "./components/admin/ad/Ads";
import ResetPasswordRequest from "./components/auth/ResetPasswordRequest";
import ResetPassword from "./components/auth/ResetPassword";
import Category from "./components/Category/Category";
import CategoryLayout from "./layouts/CategoryLayout";
import Product from "./components/Product/Product";
import ViewProduct from "./components/customer/ViewProduct/ViewProduct";
import PromoteProduct from "./components/customer/PromoteProduct/PromoteProduct";
import PromoteLayout from "./layouts/PromoteLayout";
import PromoteManager from "./components/customer/PromoteManager/PromoteManager";
import PromotePoster from "./components/customer/PromotePoster/PromotePoster";
import Payment from "./components/Payment/Payment";
import ViewAd from "./components/customer/ViewAd/ViewAd";
import Chat from "./components/customer/Chat/Chat";
import ChatDashboard from "./components/customer/Chat/ChatDashboard";
import ChatProvider from "./contexts/ChatProvider";
import ClientLayout from "./layouts/ClientLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileInfo from "./components/customer/Profile/ProfileInfo/ProfileInfo";
import ProfileSecurity from "./components/customer/Profile/ProfileSecurity/ProfileSecurity";
import ManageCategories from "./components/admin/category/ManageCategories";
import User from "./components/admin/users/User";
import AdminProduct from "./components/admin/product/Product";
import AdminAd from "./components/admin/ad/Ad";
import Settings from "./components/admin/Settings/Settings";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            path: "products/:id",
            element: <AdminProduct />,
          },
          {
            path: "categories",
            element: <ManageCategories />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <User />,
          },
          // {
          //   path: "sub-categories",
          //   element: <SubCategories />,
          // },
          {
            path: "ads",
            element: <Ads />,
          },
          {
            path: "ads/:id",
            element: <AdminAd />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "",
        element: <ClientLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "products",
            element: <Category />,
          },
          // {
          //   path: "products",
          //   element: <CategoryLayout />,
          //   children: [
          //   ],
          // },
          {
            path: "products/:id",
            element: <Product />,
          },
          {
            path: "customer",
            element: <PrivateRoute component={Outlet} />,
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
              {
                path: "profile",
                element: <ProfileLayout />,
                children: [
                  {
                    path: "info",
                    element: <ProfileInfo />,
                  },
                  {
                    path: "security",
                    element: <ProfileSecurity />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "payment/:token",
        element: <Payment />,
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
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Helmet>
        <title>ELCAMBA</title>
      </Helmet>
      <AuthProvider>
        <ChatProvider>
          <UIProvider>
            <RouterProvider router={router} />
          </UIProvider>
        </ChatProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
