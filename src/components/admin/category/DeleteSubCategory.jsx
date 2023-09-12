import React, { useEffect, useRef, useState } from "react";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";
import { BlockPicker, SwatchesPicker } from "react-color";
import Select from "./Select";
import { useUIContext } from "../../../contexts/UIProvider";

export default function DeleteSubCategory({ show, hide, subCategory, afterLeave }) {
  const [input, setInput] = useState({ category: -1, subCategory: -1 });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);
  const { categories } = useUIContext();

  useEffect(() => {
    setInput({ category: -1, subCategory: -1 });
  }, [subCategory]);

  function resetInput() {
    hide();
  }

  async function handleSubmt(e) {
    e.preventDefault();

    if (sending) return;

    const data = {
      id: category.id,
      name: input?.name,
      color: input?.color,
    };

    setSending(true);
    try {
      const res = await axios.put("/categories/updateById", data);

      Swal.fire("Success", "Catégorie ajouté avec succés", "success");
      //   resetInput();
      setError("");
    } catch (err) {
      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    setError("");

    if (sending) return;

    console.log("sending");
    setSending(true);

    try {
      const res = await axios.delete("/sub-categories/deleteById", {
        params: {
          id: subCategory.id,
          transferTo: input.subCategory,
        },
      });

      Swal.fire("Success", "Catégorie supprimée avec succés", "success");
    } catch (err) {
      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  return (
    <Modal
      show={show}
      hide={hide}
      dialogClassName="w-full scr600:max-w-[500px] h-fit my-auto py-10 px-4 rounded-[50px]"
      initialFocusRef={inputRef}
      afterLeave={() => {
        afterLeave();
        setError("");
      }}
    >
      <div className="flex justify-between bg-gray-50 pb-5 px-2">
        <h3 className="text-lg font-medium text-gray-900">Supprimer catégorie</h3>
        <button
          type="button"
          onClick={() => {
            hide();
          }}
        >
          <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div>
          <p className="mb-1 font-medium text-base text-sky-900">A qu'elle sous-catégorie voulez-vous transférer les produites de "{subCategory?.name}":</p>
          <p className="mt-2 font-medium text-base">Catégorie:</p>

          <Select
            options={[{ value: -1, label: "Selectionnez une catégorie" }, ...categories?.map((cat) => ({ value: cat.id, label: cat.name }))]}
            onChange={(option) => setInput((prev) => ({ subCategory: -1, category: option.value }))}
            value={{ value: input.category, label: categories.find((cat) => cat.id === input.category)?.name || "Selectionnez une catégorie" }}
            position="center"
          />
          <p className="mt-2 font-medium text-base ">Sous-catégorie:</p>
          <Select
            options={[
              { value: -1, label: "Selectionnez une sous-catégorie" },
              ...(categories
                .find((cat) => cat.id === input.category)
                ?.SubCategories?.filter((sub) => sub.id !== subCategory?.id)
                ?.map((sub) => ({ value: sub.id, label: sub.name })) || []),
            ]}
            onChange={(option) => setInput((prev) => ({ ...prev, subCategory: option.value }))}
            value={{
              value: input.subCategory,
              label:
                categories.find((cat) => cat.id === input.category)?.SubCategories?.find((sub) => sub.id === input.subCategory)?.name ||
                "Selectionnez une catégorie",
            }}
            position="center"
          />
          <div className="mt-5"></div>
          <input type="radio" name="deleteAll" id="deleteAll" onChange={() => setInput({ category: -1, subCategory: -2 })} checked={input.subCategory === -2} />
          <label htmlFor="deleteAll" className="ml-1 text-sm font-medium text-red-700">
            Supprimer tous les produits de "{subCategory?.name}"
          </label>
          {error && (
            <div className="mt-2 py-3 px-4 rounded text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              {error}
            </div>
          )}
        </div>
        <div className="relative w-full max-w-[300px] mx-auto">
          <button
            type="submit"
            disabled={input.subCategory === -1}
            className={`${
              input.subCategory === -1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 cursor-pointer"
            } w-full bg-red-600  focus:ring ring-slate-300 outline-none rounded-lg py-2 text-white font-bold`}
            ref={inputRef}
          >
            Supprimer "{subCategory?.name}"
          </button>
          {sending ? (
            <i className="absolute right-2 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </div>
      </form>
    </Modal>
  );
}
