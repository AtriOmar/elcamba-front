import React, { useEffect, useMemo, useRef, useState } from "react";
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

export default function DeleteCategory({ show, hide, category, afterLeave }) {
  const [input, setInput] = useState(-1);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);
  const { categories: fullCategories } = useUIContext();
  const categories = useMemo(() => fullCategories.filter((cat) => cat.id !== category?.id), [fullCategories, category]);

  useEffect(() => {
    setInput(-1);
  }, [category]);

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

    if (sending) return;

    setSending(true);

    try {
      const res = await axios.delete("/categories/deleteById", {
        params: {
          id: category.id,
          transferTo: input,
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
          <p className="mb-1 font-medium text-base text-sky-900">A qu'elle catégorie voulez-vous transférer les sous-catégories de "{category?.name}":</p>
          <Select
            options={[{ value: -1, label: "Selectionnez une catégorie" }, ...categories?.map((cat) => ({ value: cat.id, label: cat.name }))]}
            onChange={(option) => setInput(option.value)}
            value={{ value: input, label: categories.find((cat) => cat.id === input)?.name || "Selectionnez une catégorie" }}
            position="center"
          />
          <div className="mt-5"></div>
          <input type="radio" name="deleteAll" id="deleteAll" onChange={() => setInput(-2)} checked={input === -2} />
          <label htmlFor="deleteAll" className="ml-1 text-sm font-medium text-red-700">
            Supprimer tous les sous-catégories et les produits de "{category?.name}"
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
            disabled={input === -1}
            className={`${
              input === -1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 cursor-pointer"
            } w-full bg-red-600  focus:ring ring-slate-300 outline-none rounded-lg py-2 text-white font-bold`}
            ref={inputRef}
          >
            Supprimer "{category?.name}"
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
