import React, { useEffect, useState } from "react";
import { useUIContext } from "../../../contexts/UIProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";
import axios from "axios";
import { PencilSquareIcon, TrashIcon, InboxIcon } from "@heroicons/react/24/outline";
import EditCategory from "./EditCategory";
import AddSubCategory from "./AddSubCategory";
import EditSubCategory from "./EditSubCategory";
import Loader from "../../Loader";
import DeleteSubCategory from "./DeleteSubCategory";

export default function SubCategories({ activeCategory, setActiveCategory }) {
  const [subCategories, setSubCategories] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addSubCategoryOpen, setAddSubCategoryOpen] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const { categories, refetchCategories } = useUIContext();

  async function deleteCategory(sub) {
    try {
      const swalResult = await Swal.fire({
        title: "Supprimer catégorie",
        text: `Voulez vous supprimer la catégorie "${sub.name}" ?`,
        showDenyButton: true,
        confirmButtonText: "Supprimer",
        denyButtonText: `Annuler`,
        confirmButtonColor: "#df4759",
        denyButtonColor: "#d9e2ef",
      });
      if (swalResult.isConfirmed) {
        const res = await axios.delete("/sub-categories/deleteById", {
          params: {
            id: sub.id,
          },
        });
        Swal.fire("Success", "Sous-catégorie supprimé avec succés", "success");
        fetchSubCategories();
      }
    } catch (err) {
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
  }

  async function fetchSubCategories() {
    if (!activeCategory) return;

    setFetching(true);
    try {
      const res = await axios.get("/sub-categories/getByCategId", { params: { id: activeCategory?.id } });

      setSubCategories(res.data);
    } catch (err) {
      Swal.fire("Error", err?.response?.data.message, "error");
    }
    setFetching(false);
    if (loading) setLoading(false);
  }
  useEffect(() => {
    if (activeCategory) {
      fetchSubCategories();

      return () => {
        setLoading(true);
        setSubCategories([]);
      };
    }
  }, [activeCategory?.id]);

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full rounded-lg pt-3 bg-white shadow-card1">
      <AddSubCategory
        show={addSubCategoryOpen}
        hide={() => setAddSubCategoryOpen(false)}
        afterLeave={() => {
          fetchSubCategories();
          refetchCategories();
        }}
        categoryId={activeCategory?.id}
      />
      <EditSubCategory
        show={toEdit !== null}
        hide={() => setToEdit(null)}
        subCategory={toEdit}
        afterLeave={() => {
          fetchSubCategories();
          refetchCategories();
        }}
      />
      <DeleteSubCategory
        show={toDelete !== null}
        hide={() => setToDelete(null)}
        subCategory={toDelete}
        afterLeave={() => {
          fetchSubCategories();
          refetchCategories();
        }}
      />
      <div className="flex scr600:items-center justify-between flex-col scr600:flex-row rounded-t-lg p-3">
        <div className="mb-0 mb-3">
          <button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 hover:text-slate-700 duration-300">
            <FontAwesomeIcon icon={faArrowLeft} size="1x" className="hover:scale-125 duration-300" />
            <p className="font-medium">Retour</p>
          </button>
          <h5 className="capitalize">
            Catégorie:<span className="font-medium"> {activeCategory?.name}</span>
          </h5>
          <h5 className="">Sous-catégories ( {subCategories.length} )</h5>
        </div>
        <button
          type="button"
          className="self-end w-fit px-4 py-2 border border-slate-300 rounded bg-blue-500 hover:bg-blue-600 outline-0 text-white transition-all duration-150 ring-blue-700 ring-offset-2 focus:ring-2"
          onClick={() => {
            setAddSubCategoryOpen(true);
          }}
        >
          Ajouter une sous-catégorie
        </button>
      </div>
      {subCategories?.length ? (
        <>
          <div className="hidden scr800:grid grid-cols-[50px_1fr_160px] border-b border-slate-400 font-medium uppercase">
            <div className="px-6 py-3 tracking-wider">ID</div>
            <div className="px-6 py-3 tracking-wider">Nom</div>
            <div className="px-6 py-3 tracking-wider">Actions</div>
          </div>

          {subCategories?.map((sub) => (
            <div className="grid scr800:grid-cols-[50px_1fr_160px] items-center py- scr800:py-0 border-b  hover:bg-slate-100 duration-150" key={sub.id}>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">ID:</p>
                <p className="text-gray-900">{sub.id}</p>
              </div>
              <div className="grid grid-cols-[80px_1fr] scr800:grid-cols-1 px-2 scr800:px-6 py-1 scr800:py-4">
                <p className="scr800:hidden font-bold text-sm text-sky-700 uppercase">Nom:</p>
                <p className="text-gray-900">{sub.name}</p>
              </div>
              <div className="flex gap-2 px-2 scr800:px-6 py-1">
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    setToDelete(sub);
                  }}
                >
                  <TrashIcon className={"block h-8 w-8 text-red-600"} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    setToEdit(sub);
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
        <div className=" grow flex items-center flex-col justify-center py-20 px-6 font-bold text-gray-500 text-2xl text-center">
          <InboxIcon className="block h-20 w-20" aria-hidden="true" />
          Aucune sous-catégorie
        </div>
      )}
    </div>
  );
}
