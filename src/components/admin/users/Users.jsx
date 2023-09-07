import React, { useEffect, useRef, useState } from "react";
import { useUIContext } from "../../../contexts/UIProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBan } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";
import axios from "axios";
import { PencilSquareIcon, TrashIcon, InboxIcon, Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loader from "../../Loader";
import { useDebouncedCallback } from "use-debounce";
import Select from "./Select";
import SortSelect from "./SortSelect";

export default function Users({ setActiveCategory }) {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [filter, setFilter] = useState({
    limit: 20,
    orderBy: "createdAt",
    order: "desc",
    search: "",
    role: 0,
  });
  const [search, setSearch] = useState("");
  const observer = useRef(
    new IntersectionObserver((entries, obs) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setFilter((prev) => ({ ...prev, limit: prev.limit + 20 }));
        obs.unobserve(entry.target);
      }
    })
  );
  const observing = useRef(0);

  async function fetchUsers() {
    if (fetching) return;

    setFetching(true);

    const data = {
      limit: filter.limit,
      search: filter.search,
      role: filter.role,
      orderBy: filter.orderBy,
      order: filter.order,
    };

    try {
      const res = await axios.get("/users/getAll", {
        params: {
          ...data,
        },
      });

      setUsers(res.data);
    } catch (err) {
      Swal.fire("Error", err?.response?.data.message, "error");
    }
    setFetching(false);
    if (loading) setLoading(false);
  }
  useEffect(() => {
    fetchUsers();
  }, [filter]);

  function updateSearch() {
    setFilter((prev) => ({ ...prev, search }));
  }

  const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 1000);

  useEffect(() => {
    debouncedUpdateSearch();
  }, [search]);

  useEffect(() => {
    if (filter.limit === observing.current) return;

    if (users.length !== filter.limit) return;

    observing.current = filter.limit;

    const elements = document.querySelectorAll(".user-container");

    const el = elements[elements.length - 5];
    if (el) observer.current.observe(el);
  }, [users]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full rounded-lg pt-3 bg-white shadow-card1">
      <div className="flex items-center justify-between rounded-t-lg p-3">
        <h5 className="mb-0 mb-3">Utilisateurs ( {users.length} )</h5>
      </div>
      <div className="flex flex-wrap gap-x-4 scr1000:gap-x-10 px-3 gap-2 mb-4">
        <div>
          <p className="font-medium text-slate-900">Role:</p>
          <Select position="right" options={ROLES_OPTIONS} value={filter.role} onChange={(value) => setFilter((prev) => ({ ...prev, role: value.value }))} />
        </div>
        <div>
          <p className="font-medium text-slate-900">Trier par:</p>
          <SortSelect
            position="right"
            options={ORDER_OPTIONS}
            value={filter.orderBy}
            onChange={(value) => setFilter((prev) => ({ ...prev, orderBy: value.value }))}
            onOrderChange={(value) => setFilter((prev) => ({ ...prev, order: value }))}
            order={filter.order}
          />
        </div>
        <div className="w-full scr500:w-[300px]">
          <p className="font-medium text-slate-900">Recherche:</p>
          <div className={`flex border border-sky-600 rounded-lg overflow-hidden`}>
            <input
              type="text"
              className="grow py-1 px-4 outline-none"
              placeholder="Rechercher des utilisateurs"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="flex items-center p-1 bg-sky-600" onClick={() => {}}>
              <MagnifyingGlassIcon className="h-7 w-7 text-white" />
            </button>
          </div>
        </div>
      </div>
      {users?.length ? (
        <>
          <div className="hidden scr800:grid grid-cols-[50px_2fr_3fr_120px_120px] border-b border-slate-400 font-medium uppercase">
            <div className="px-6 py-3 tracking-wider">ID</div>
            <div className="px-6 py-3 tracking-wider">Nom</div>
            <div className="px-6 py-3 tracking-wider">Email</div>
            <div className="px-6 py-3 tracking-wider">Rôle</div>
            <div className="px-6 py-3 tracking-wider">Actions</div>
          </div>

          {users?.map((user) => (
            <div
              className="user-container grid scr800:grid-cols-[50px_2fr_3fr_120px_120px] items-center py- scr800:py-0 border-b  hover:bg-slate-100 duration-150"
              key={user.id}
            >
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">ID:</p>
                <p className="text-gray-900">{user.id}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Nom:</p>
                <p className="text-gray-900">{user.username}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Email:</p>
                <p className="text-gray-900">
                  {user.email}
                  {!user.active ? <FontAwesomeIcon icon={faBan} className="ml-2 text-red-500" /> : ""}
                </p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Rôle:</p>
                <p className="text-gray-900">{ROLES[user.accessId]?.title}</p>
              </div>
              <div className="flex justify-center gap-2 px-2 scr800:px-6 py-1">
                <Link className="btn p-0" to={`/admin/users/${user.id}`}>
                  <Cog6ToothIcon className={"block h-8 w-8 text-slate-600"} aria-hidden="true" />
                </Link>
                {/* <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    deleteCategory(user);
                  }}
                >
                  <TrashIcon className={"block h-8 w-8 text-red-600"} aria-hidden="true" />
                </button> */}
                {/* <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    setToEdit(user);
                  }}
                >
                  <PencilSquareIcon className={"block h-8 w-8 text-blue-600"} aria-hidden="true" />
                </button> */}
              </div>
            </div>
          ))}
          {fetching ? (
            <div className="w-fit mx-auto py-8">
              <RingLoader color="#444" width="40" height="40" />
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="grow flex items-center flex-col justify-center py-20 px-6 font-bold text-gray-500 text-2xl text-center">
          <InboxIcon className="block h-20 w-20" aria-hidden="true" />
          Aucun utilisateur
        </div>
      )}
    </div>
  );
}

const ROLES = {
  1: { title: "Utilisateur", description: "Utilisateur normale, ne peut pas accéder à l'interface admin" },
  2: { title: "Gestionnaire de communauté", description: "Répondre au messages des clients" },
  3: {
    title: "Admin",
    description:
      "Gestionnaire de communauté + gérer les utilisateurs, catégories, produits, publicités, ... + ajouter et supprimer des gestionnaires de communauté",
  },
  4: { title: "Gérant", description: "Admin + ajouter et supprimer des admins" },
  5: { title: "Propriétaire", description: "Gérant + ajouter et supprimer des gérants" },
};

const ROLES_OPTIONS = [
  {
    value: 0,
    label: "Tous",
  },
  {
    value: 1,
    label: "Utilisateur",
  },
  {
    value: 2,
    label: "Gest. de comm.",
  },
  {
    value: 3,
    label: "Admin",
  },
  {
    value: 4,
    label: "Gérant",
  },
  {
    value: 5,
    label: "Propriétaire",
  },
];

const ORDER_OPTIONS = [
  {
    value: "createdAt",
    label: "Créé le",
  },
  {
    value: "username",
    label: "Nom",
  },
];
