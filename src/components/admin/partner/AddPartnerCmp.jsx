import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../../utils/API";

export default function AddPartnerCmp() {
  const [picture, setPicture] = useState([]);

  const handleImage = (e) => {
    e.persist();
    setPicture({ image: e.target.files[0] });
  };

  function resetInput() {
    setInput({
      name: "",
      email: "",
      tel: "",
    });
    setErrors([]);
  }
  const [Input, setInput] = useState({
    name: "",
    email: "",
    tel: "",
  });

  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const itemSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("name", Input.name);
    formData.append("email", Input.email);
    formData.append("tel", Input.tel);
    API.postNewPartner(formData)
      .then((res) => {
        Swal.fire("Success", res.data.message, "success");
        resetInput();
      })
      .catch((err) => {
        const response = err.response;
        setErrors(response.data.errors);
      });
  };

  return (
    <div className="max-w-xl mx-auto h-100 flex justify-center items-center">
      <form className="flex flex-col gap-4 w-full" encType="mutlipart/form-data" onSubmit={itemSubmit}>
        <div>
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleInput}
            value={Input.name}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.name}</span>
        </div>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="text"
            onChange={handleInput}
            value={Input.email}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.email}</span>
        </div>
        <div>
          <input
            placeholder="Tel"
            name="tel"
            type="text"
            onChange={handleInput}
            value={Input.tel}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.tel}</span>
        </div>
        <div>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
            id="file_input"
            type="file"
            onChange={handleImage}
          />
          <span className="text-red-600">{errors?.image}</span>
        </div>
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Add Partner
        </button>
      </form>
    </div>
  );
}
