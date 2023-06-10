import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthProvider";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUIContext } from "../../../../contexts/UIProvider";
import CitySelect from "./CitySelect";
import RingLoader from "../../../RingLoader";
import deepEqual from "deep-equal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProfileInfo() {
  const { user } = useAuthContext();
  const { setUser } = useAuthContext();
  const [sending, setSending] = useState([false, false]);

  const [picture, setPicture] = useState(user.picture);
  const { addPopup } = useUIContext();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    username: user.username,
    city: user.city,
    address: user.address,
    phone: user.phone,
  });

  function resetInfo() {
    setInput({
      username: user.username,
      city: user.city,
      address: user.address,
      phone: user.phone,
    });
    setEdit(false);
  }

  function resetPicture() {
    setPicture(user.picture);
  }

  useEffect(() => {
    resetPicture();

    resetInfo();
  }, [user]);

  async function handlePictureChange(e) {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image")) {
      file.id = uuidv4().toString();
      setPicture(file);
    }
  }

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function updateInfo() {
    const data = {
      username: input.username,
      city: input.city,
      address: input.address,
      phone: input.phone,
    };

    setSending((prev) => [prev[0], true]);
    try {
      const res = await axios.put("/users/updateInfo", data);

      setUser(res.data);
      addPopup({
        type: "success",
        text: "Informations modifiés avec succés",
        lastFor: 2000,
      });

      setSending((prev) => [prev[0], false]);
    } catch (err) {
      setSending((prev) => [prev[0], false]);
      console.log(err?.response?.data);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
        lastFor: 2000,
      });
    }
  }

  async function updatePicture() {
    const formData = new FormData();

    formData.append("picture", picture);

    setSending((prev) => [true, prev[1]]);
    try {
      const res = await axios.post("/users/updatePicture", formData);

      setUser(res.data);
      addPopup({
        type: "success",
        text: "Photo modifiée avec succés",
        lastFor: 2000,
      });
      setSending((prev) => [false, prev[1]]);
    } catch (err) {
      setSending((prev) => [false, prev[1]]);
      console.log(err?.response?.data);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
        lastFor: 2000,
      });
    }
  }

  return (
    <div className="mt-4 max-w-[500px]">
      <h2 className="self-start text-2xl font-bold capitalize text-sky-600">Mon profile:</h2>
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Photo de profile:</label>

      <div className="relative w-full max-w-[250px]">
        {picture ? (
          <div className="w-full aspect-square border border-slate-300 rounded-[50%] overflow-hidden">
            <button
              type="button"
              className="absolute -right-2 -top-2"
              onClick={() => {
                setPicture(null);
              }}
            >
              <i className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 hover:bg-red-600 duration-150 ">
                <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
              </i>
            </button>
            <img
              src={typeof picture === "string" ? `${BACKEND_URL}/uploads/profile-pictures/${picture}` : URL.createObjectURL(picture)}
              alt="profile picture"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <UserCircleIcon className="w-full text-slate-400" />
        )}
        <label className="absolute bottom-0 right-0 px-2 py-1 border border-slate-400 rounded-lg bg-white hover:bg-slate-100 text-[15px] duration-300 cursor-pointer">
          <input type="file" onChange={handlePictureChange} hidden />
          Importer
        </label>
      </div>
      <div className={`${picture !== user.picture ? "flex" : "hidden"} gap-2 relative w-fit mt-2`}>
        <button className="px-2 py-1 rounded-lg bg-blue-500 text-white text-sm" onClick={updatePicture}>
          Enregistrer
        </button>
        <button className="px-2 py-1 rounded-lg bg-red-500 text-white text-sm" onClick={resetPicture}>
          Annuler
        </button>
        {sending[0] ? (
          <i className="absolute -right-8 top-1/2 -translate-y-1/2">
            <RingLoader color="black" />
          </i>
        ) : (
          ""
        )}
      </div>

      <label className="block relative mt-3 text-base font-semibold text-slate-700">Nom d'utilisateur:</label>
      {edit ? (
        <input
          name="username"
          id="username"
          rows="4"
          placeholder="Votre adresse"
          className="w-full rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
          onChange={handleInput}
          value={input.username}
        ></input>
      ) : (
        <p className="capitalize">{user.username}</p>
      )}
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Ville:</label>
      {edit ? <CitySelect input={input} setInput={setInput} /> : <p className="capitalize">{user.city || "Non spécifié"}</p>}

      <label className="block relative mt-3 text-base font-semibold text-slate-700">Adresse:</label>
      {edit ? (
        <textarea
          name="address"
          id="address"
          rows="4"
          placeholder="Votre adresse"
          className="w-full resize-none rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
          onChange={handleInput}
          value={input.address || ""}
        ></textarea>
      ) : (
        <p>{user.address || "Non spécifié"}</p>
      )}
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Numéro de téléphone:</label>
      {edit ? (
        <input
          name="phone"
          id="phone"
          rows="4"
          placeholder="Numéro de téléphone"
          className="w-full rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
          onChange={handleInput}
          value={input.phone || ""}
        ></input>
      ) : (
        <p>{user.phone || "Non spécifié"}</p>
      )}
      {edit ? (
        <div className={`relative flex gap-2 w-fit mt-2`}>
          <button
            className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={updateInfo}
            disabled={(() => {
              const obj = {
                username: user.username,
                city: user.city,
                address: user.address,
                phone: user.phone,
              };
              return deepEqual(obj, input);
            })()}
          >
            Enregistrer
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm" onClick={resetInfo}>
            Annuler
          </button>
          {sending[1] ? (
            <i className="absolute -right-8 top-1/2 -translate-y-1/2">
              <RingLoader color="black" />
            </i>
          ) : (
            ""
          )}
        </div>
      ) : (
        <button
          className="flex items-center gap-2 w-fit mt-4  py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-sm text-white duration-300"
          onClick={() => {
            setEdit(true);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="lg" />
          Modifier
        </button>
      )}
    </div>
  );
}
