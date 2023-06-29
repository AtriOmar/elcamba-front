import React from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";

export default function Dashboard() {
  const { user, setUser } = useAuthContext();
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-12 gap-4">
        {user.accessId >= 3 ? (
          <>
            <Link
              className="col-span-4 shadow-lg rounded-lg p-6 hover:bg-slate-200/75 duration-150 flex flex-col items-center justify-center"
              to="/admin/users"
            >
              <UsersIcon className="block h-10 w-10 flex-start" aria-hidden="true" /> Utilisateurs
            </Link>
            <Link
              className="col-span-4 shadow-lg rounded-lg p-6 hover:bg-slate-200/75 duration-150 flex flex-col items-center justify-center"
              to="/admin/categories"
            >
              <TagIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
              Catégories
            </Link>
            <Link
              className="col-span-4 shadow-lg rounded-lg p-6 hover:bg-slate-200/75 duration-150 flex flex-col items-center justify-center"
              to="/admin/products"
            >
              <ListBulletIcon className="block h-10 w-10 flex-start" aria-hidden="true" />
              Produits
            </Link>
            <Link className="col-span-4 shadow-lg rounded-lg p-6 hover:bg-slate-200/75 duration-150 flex flex-col items-center justify-center" to="/admin/ads">
              {/* <FontAwesomeIcon icon={} className="block h-10 w-10 flex-start" aria-hidden="true" /> */}
              <IonIcon icon={megaphoneOutline} className="text-4xl" aria-hidden="true" />
              Publicités
            </Link>
            <Link
              className="col-span-4 shadow-lg rounded-lg p-6 hover:bg-slate-200/75 duration-150 flex flex-col items-center justify-center"
              to="/admin/settings"
            >
              {/* <FontAwesomeIcon icon={} className="block h-10 w-10 flex-start" aria-hidden="true" /> */}
              <Cog6ToothIcon className={"block h-10 w-10"} aria-hidden="true" />
              Paramètres
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
