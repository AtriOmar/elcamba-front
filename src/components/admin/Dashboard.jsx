import React from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ListBulletIcon,
  MapPinIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { user, setUser } = useAuthContext();
  return (
    <div className="max-w-7xl mx-auto pt-5">
      <div className="grid grid-cols-12 gap-4">
        {user.accessId === 3 ? (
          <>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/users">
              <UsersIcon className="block h-10 w-10 flex-start" aria-hidden="true" /> Users
            </Link>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/fournisseurs">
              <TruckIcon className="block h-10 w-10 flex-start" aria-hidden="true" /> Fournisseurs
            </Link>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/categories">
              <TagIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
              Categories
            </Link>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/sub-categories">
              <TagIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
              Sous-categories
            </Link>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/products">
              {" "}
              <ListBulletIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
              Products
            </Link>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/partenaires">
              <UserGroupIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
              Partenaires
            </Link>
          </>
        ) : (
          <></>
        )}
        <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/applies">
          <PlusIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
          Applies
        </Link>
        <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/checks">
          <QuestionMarkCircleIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
          Checks
        </Link>
        <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/feedbacks">
          <ChatBubbleLeftRightIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
          Feedbacks
        </Link>
        <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/complaints">
          <ExclamationTriangleIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
          Complaints
        </Link>
        <Link className="col-span-4 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center" to="/admin/questions">
          <InformationCircleIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
          Questions
        </Link>
      </div>
    </div>
  );
}
