import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import formatDate from "../../../lib/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../../contexts/AuthProvider";
import Swal from "sweetalert2";
import RingLoader from "../../RingLoader";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import Loader from "../../Loader";
import sad from "../../../assets/images/sad.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user: mainUser } = useAuthContext();
  const [role, setRole] = useState(1);
  const [sending, setSending] = useState({ role: false, status: false });
  const [open, setOpen] = useState(false);

  async function updateRole() {
    const data = {
      id: user.id,
      role,
    };

    setSending((prev) => ({ ...prev, role: true }));
    try {
      const res = await axios.put("/users/updateRole", data);

      setUser(res.data);

      Swal.fire("Success", "Rôle modifié avec succés", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Erreur", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, role: false }));
  }

  async function fetchUser() {
    try {
      const res = await axios.get("/users/getById", {
        params: {
          id: id,
        },
      });

      setUser(res.data);
      setRole(res.data.accessId);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  async function toggleStatus() {
    const data = {
      id: user.id,
    };

    setSending((prev) => ({ ...prev, status: true }));
    try {
      const res = await axios.put("/users/toggleStatus", data);

      setUser(res.data);

      console.log(res.data);

      Swal.fire("Success", "Modifié avec succés", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Erreur", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, status: false }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-white shadow-md">
        <img src={sad} alt="" className="mx-auto w-48 py-10" />
        <h2 className="text-center text-xl scr600:text-3xl font-bold text-slate-900">L'utilisateur demandé n'est pas trouvée.</h2>
      </div>
    );
  }

  return (
    <div className="rounded-lg py-3 px-4 bg-white shadow-card1">
      <div className="mt-4 max-w-[500px]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-slate-700 duration-300">
          <FontAwesomeIcon icon={faArrowLeft} size="1x" className="hover:scale-125 duration-300" />
          <p className="font-medium">Retour</p>
        </button>
        <h2 className="self-start text-2xl font-bold capitalize text-sky-600">
          Profile: <span>{user.username}</span>
        </h2>
        {mainUser.accessId > user.accessId ? (
          <>
            {/* <label className="block relative mt-3 text-base font-semibold text-slate-700">Rôle:</label> */}
            <Accordion open={open} icon={Info()} title="Descriptions des rôles">
              <AccordionHeader
                className={`w-fit flex gap-4 relative pb-0 text-base font-semibold text-slate-700 ${open ? "border-b" : "border-0"}`}
                onClick={() => setOpen((prev) => !prev)}
              >
                Rôle:
              </AccordionHeader>
              <AccordionBody className={`pl-4 py-1 text-xs`}>
                <ul className="divide-y">
                  {Object.values(ROLES).map((curr) => (
                    <li key={curr.title}>
                      <p className="font-medium capitalize">{curr.title}:</p>
                      <p>{curr.description}</p>
                    </li>
                  ))}
                </ul>
              </AccordionBody>
            </Accordion>

            <select
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              name="roles"
              id="roles"
              className="w-full rounded-lg border border-slate-700 px-2 py-2 text-left outline-0 focus:ring-1 ring-blue-500"
            >
              {Array(mainUser.accessId - 1)
                .fill(0)
                .map((_, i) => (
                  <option value={i + 1} className="capitalize" key={i}>
                    {ROLES[i + 1]?.title}
                  </option>
                ))}
            </select>

            <div className={`${role !== user.accessId ? "flex" : "hidden"} gap-2 relative w-fit mt-2`}>
              <button className="px-2 py-1 rounded-lg bg-blue-500 text-white text-sm" onClick={updateRole}>
                Enregistrer
              </button>
              <button className="px-2 py-1 rounded-lg bg-red-500 text-white text-sm" onClick={() => setRole(user.accessId)}>
                Annuler
              </button>
              {sending.role ? (
                <i className="absolute -right-8 top-1/2 -translate-y-1/2">
                  <RingLoader color="black" />
                </i>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          ""
        )}
        {mainUser.accessId > user.accessId && mainUser.accessId > 2 ? (
          <div className="relative mt-4">
            {user.active ? (
              <button
                onClick={toggleStatus}
                className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300"
              >
                {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                Suspendre
              </button>
            ) : (
              <button
                onClick={toggleStatus}
                className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
              >
                {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                Activer
              </button>
            )}
            {sending.status ? (
              <i className="absolute right-1 top-1/2 -translate-y-1/2">
                <RingLoader color="white" />
              </i>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Photo de profile:</label>

        <div className="relative w-full max-w-[250px]">
          {user.picture ? (
            <div className="w-full aspect-square border border-slate-300 rounded-[50%] overflow-hidden">
              <img src={`${BACKEND_URL}/uploads/profile-pictures/${user.picture}`} alt="profile picture" className="w-full h-full object-cover" />
            </div>
          ) : (
            <UserCircleIcon className="w-full text-slate-400" />
          )}
        </div>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Rôle:</label>
        <p className="font-medium capitalize">{ROLES[user.accessId].title}:</p>
        <p>{ROLES[user.accessId].description}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Identifiant:</label>
        <p className="capitalize">{user.id}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Email:</label>
        <p className="">{user.email}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Date de création:</label>
        <p className="capitalize">{formatDate(user.createdAt)}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Dernière modification:</label>
        <p className="capitalize">{formatDate(user.updatedAt)}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Nom d'utilisateur:</label>
        <p className="capitalize">{user.username}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Ville:</label>
        <p className="capitalize">{user.city || "Non spécifié"}</p>

        <label className="block relative mt-3 text-base font-semibold text-slate-700">Adresse:</label>
        <p>{user.address || "Non spécifié"}</p>
        <label className="block relative mt-3 text-base font-semibold text-slate-700">Numéro de téléphone:</label>
        <p>{user.phone || "Non spécifié"}</p>
      </div>
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

const Info = () => (
  <svg
    className={`text-blue-600 flex-shrink-0 inline w-6 h-6 transition duration-300`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    ></path>
  </svg>
);
