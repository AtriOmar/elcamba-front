import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserCard({ user }) {
  return (
    <Link
      // to={`/customer/chat/${user?.id}`}
      to={`/products?user=${user?.id}`}
      className="flex items-center gap-3 hover:bg-gray-100 duration-150"
    >
      {user?.picture ? (
        <img
          src={`${BACKEND_URL}/uploads/profile-pictures/${user?.picture}`}
          alt="Profile picture"
          className="shrink-0 w-[35px] aspect-square rounded-[50%] border object-cover bg-white"
        />
      ) : (
        <UserCircleIcon className="w-[35px] text-sky-700" />
      )}
      <h3 className="font-medium text-slate-700 capitalize">{user?.username}</h3>
    </Link>
  );
}
