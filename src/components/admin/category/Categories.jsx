import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../contexts/UIProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";
import axios from "axios";
import AddCategory from "./AddCategory";
import { PencilSquareIcon, TrashIcon, InboxIcon } from "@heroicons/react/24/outline";
import EditCategory from "./EditCategory";
import Loader from "../../Loader";

export default function Categories({ setActiveCategory }) {
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [toEdit, setToEdit] = useState(null);

  async function deleteCategory(category) {
    try {
      const swalResult = await Swal.fire({
        title: "Supprimer catégorie",
        text: `Voulez vous supprimer la catégorie "${category.name}" ?`,
        showDenyButton: true,
        confirmButtonText: "Supprimer",
        denyButtonText: `Annuler`,
        confirmButtonColor: "#df4759",
        denyButtonColor: "#d9e2ef",
      });
      if (swalResult.isConfirmed) {
        const res = await axios.delete("/categories/deleteById", {
          params: {
            id: category.id,
          },
        });
        Swal.fire("Success", "Catégorie supprimé avec succés", "success");
        fetchCategories();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
  }

  async function fetchCategories() {
    setFetching(true);
    try {
      const res = await axios.get("/categories/getAll");

      setCategories(res.data);
    } catch (err) {
      Swal.fire("Error", err?.response?.data.message, "error");

      console.log(err);
    }
    setFetching(false);
    if (loading) setLoading(false);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full rounded-lg pt-3 bg-white shadow-card1">
      <AddCategory show={addCategoryOpen} hide={() => setAddCategoryOpen(false)} afterLeave={fetchCategories} />
      <EditCategory show={toEdit !== null} hide={() => setToEdit(null)} category={toEdit} afterLeave={fetchCategories} />
      <div className="flex scr500:items-center justify-between flex-col scr500:flex-row rounded-t-lg p-3">
        <h5 className="mb-0 mb-3">Catégories ( {categories.length} )</h5>
        <button
          type="button"
          className="self-end w-fit px-4 py-2 border border-slate-300 rounded bg-blue-500 hover:bg-blue-600 outline-0 text-white transition-all duration-150 ring-blue-700 ring-offset-2 focus:ring-2"
          onClick={() => {
            setAddCategoryOpen(true);
          }}
        >
          Ajouter une catégorie
        </button>
      </div>
      {categories?.length ? (
        <>
          <div className="hidden scr800:grid grid-cols-[50px_1fr_330px] border-b border-slate-400 font-medium uppercase">
            <div className="px-6 py-3 tracking-wider">ID</div>
            <div className="px-6 py-3 tracking-wider">Nom</div>
            <div className="text-center px-6 py-3 tracking-wider">Actions</div>
          </div>

          {categories?.map((category) => (
            <div className="grid scr800:grid-cols-[50px_1fr_330px] items-center border-b  hover:bg-slate-100 duration-150" key={category.id}>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">ID:</p>
                <p className="text-gray-900">{category.id}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Nom:</p>
                <p className="text-gray-900">{category.name}</p>
              </div>
              <div className="flex gap-2 px-2 scr800:px-6 py-1">
                <button
                  onClick={() => setActiveCategory(category)}
                  className={` w-fit flex gap-2 items-center px-4 py-2 border border-slate-300 rounded bg-blue-500 hover:bg-blue-600 outline-0 text-white transition-all duration-150 ring-blue-700 ring-offset-2 focus:ring-2`}
                >
                  Sous-Catégories
                  <FontAwesomeIcon icon={faArrowRight} size="lg" />
                </button>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    deleteCategory(category);
                  }}
                >
                  <TrashIcon className={"block h-8 w-8 text-red-600"} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    setToEdit(category);
                  }}
                >
                  <PencilSquareIcon className={"block h-8 w-8 text-blue-600"} aria-hidden="true" />
                </button>
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
          Aucune catégorie
        </div>
      )}
    </div>
  );
}
