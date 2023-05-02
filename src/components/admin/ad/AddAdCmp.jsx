import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddAdCmp() {
  const [picture, setPicture] = useState([]);

  const [allcheckbox, setAllcheckbox] = useState([]);

  const handleCheckbox = (e) => {
    e.persist();
    setAllcheckbox({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  function resetInput() {
    setInput({
      photo: null,
      name: "",
      type: "",
      duration: "",
    });
    setErrors([]);
  }
  const [input, setInput] = useState({
    photo: null,
    name: "",
    type: "",
    duration: "",
  });

  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const itemSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", input.photo);
    formData.append("name", input.name);
    formData.append("type", input.type);
    formData.append("duration", input.duration);
    axios
      .post("/ads/create", formData)
      .then((res) => {
        Swal.fire("Success", res.data.message, "success");
        resetInput();
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        setErrors(response?.data.errors);
      });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className="max-w-xl mx-auto h-100 flex justify-center items-center">
      <form className="flex flex-col gap-2 w-full" encType="mutlipart/form-data" onSubmit={itemSubmit}>
        <input
          placeholder="Type"
          type="number"
          name="type"
          onChange={handleInput}
          value={input.type}
          className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hidden-arrows"
        />
        <input
          placeholder="Nom"
          type="text"
          name="name"
          onChange={handleInput}
          value={input.name}
          className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
        <input
          placeholder="Durée (en jours)"
          type="number"
          name="duration"
          onChange={handleInput}
          value={input.duration}
          className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hidden-arrows"
        />
        {/* <label
          htmlFor="photo"
          className={`flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500 hover:bg-blue-600  shadow-md cursor-pointer transition-all duration-300`}
        >
          <FontAwesomeIcon icon={faPlus} className="text-white" size="2xl" />
        </label> */}
        <input
          type="file"
          name="photo"
          id="photo"
          // hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file.type.startsWith("image")) {
              setInput((prev) => ({ ...prev, photo: file }));
            }
            e.target.value = "";
          }}
        />
        {input.photo?.name || ""}
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Ajouter
        </button>
      </form>
    </div>
  );
}
