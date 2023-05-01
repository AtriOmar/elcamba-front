import React from "react";
import {
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
  MapPinIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user, setUser } = useAuthContext();
  return (
    <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-row lg:flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow bg-gray-800 text-white">
      <Link to="/" className="flex flex-row gap-4 p-4 no-underline">
        {/* <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" /> */}

        <span>CHARYOUL</span>
      </Link>
      <Link to="/admin/" className="flex flex-row gap-4 p-4 no-underline">
        <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Home</span>
      </Link>
      {user.accessId == 3 ? (
        <>
          <Link to="/admin/users" className="flex flex-row gap-4 p-4 no-underline">
            <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Users</span>
          </Link>

          <Link to="/admin/categories" className="flex flex-row gap-4 p-4 no-underline">
            <TagIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Categories</span>
          </Link>
          <Link to="/admin/sub-categories" className="flex flex-row gap-4 p-4 no-underline">
            <TagIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Sous-categories</span>
          </Link>

          <Link to="/admin/products" className="flex flex-row gap-4 p-4 no-underline">
            <ListBulletIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
            <span>Products</span>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
