import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";

export default function AddSousCategoryCmp() {
  const [Input, setInput] = useState({
    name: "",
    categId: "",
  });
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function main() {
      try {
        const res = await axios.get("/categories");
        setOptions(res.data.map((category) => ({ value: category.id, label: category.name })));
      } catch (err) {
        console.log(err);
      }
    }
    main();
  }, []);

  function resetInput() {
    setInput((input) => ({ ...input, name: "" }));
    setErrors([]);
  }

  function handleInput(e) {
    e.persist();
    setInput({ ...Input, [e.target.name]: e.target.value });
  }

  function itemSubmit(e) {
    e.preventDefault();

    const data = {
      name: Input.name,
      categId: Input.categId,
    };

    axios
      .post("/sub-categories/create", data)
      .then((res) => {
        Swal.fire("Success", res.data?.message, "success");
        console.log(res.data);
        resetInput();
      })
      .catch((err) => {
        const response = err.response;
        setErrors(response.data?.validation_errors);
      });
  }

  useEffect(() => {
    console.log(Input);
  }, [Input]);

  return (
    <div className="max-w-xl mx-auto h-100 flex justify-center items-center">
      <form className="flex flex-col gap-4 w-full" onSubmit={itemSubmit}>
        <div>
          <Select
            name="categories"
            options={options}
            placeholder="Categorie"
            onChange={(option) => {
              setInput((input) => ({ ...input, categId: option.value }));
            }}
            className="w-full focus:border-blue-600 rounded text-lg"
          />
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleInput}
            value={Input.name}
            className="block w-full mt-2 px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.name}</span>
        </div>
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Ajouter Sous-categorie
        </button>
      </form>
    </div>
  );
}
