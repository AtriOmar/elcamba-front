import React, { useRef, useState } from "react";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";

export default function AddSubCategory({ show, hide, categoryId, afterLeave }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  function resetInput() {
    setInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    if (input.trim().length < 4) {
      setError("La longueur du nom doit être supérieure à 4");
      return;
    }

    const data = {
      categoryId,
      name: input,
    };

    setSending(true);
    try {
      const res = await axios.post("/sub-categories/create", data);

      Swal.fire("Success", "Sous-catégorie ajouté avec succés", "success");
      resetInput();
      setError("");
    } catch (err) {
      console.log(err);
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
      afterLeave={afterLeave}
    >
      <div className="flex justify-between bg-gray-50 pb-5 px-2">
        <h3 className="text-lg font-medium text-gray-900">Ajouter sous-catégorie</h3>
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
          <p className="mb-1 font-medium text-lg text-sky-900">Nom:</p>
          <input
            placeholder="Nom"
            type="text"
            name="name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            ref={inputRef}
          />
          {error && (
            <div className="mt-2 py-3 px-4 rounded text-red-500 bg-red-100 border border-red-500 w-full flex items-center gap-4">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              {error}
            </div>
          )}
        </div>
        <div className="relative w-full max-w-[300px] mx-auto">
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
            Ajouter sous-catégorie
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
