import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../../utils/API";

export default function AddProductCmp() {
  const [picture, setPicture] = useState([]);

  const [allcheckbox, setAllcheckbox] = useState([]);

  const handleImage = (e) => {
    e.persist();
    setPicture({ image: e.target.files[0] });
  };

  const handleCheckbox = (e) => {
    e.persist();
    setAllcheckbox({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  function resetInput() {
    setInput({
      category_id: "",
      name: "",
      description: "",
      price: "",
      isLocal: false,
      zeroWaste: false,
      isNatural: "",
      recyclable: false,
    });
    setErrors([]);
  }
  const [Input, setInput] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    isLocal: false,
    zeroWaste: false,
    isNatural: "",
    recyclable: false,
  });

  const [errors, setErrors] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    API.getCategories().then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const itemSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", Input.category_id ? Input.category_id : 1);
    formData.append("name", Input.name);
    formData.append("description", Input.description);
    formData.append("price", Input.price ? Input.price : 0);
    formData.append("isLocal", allcheckbox.isLocal ? "1" : "0");
    formData.append("zeroWaste", allcheckbox.zeroWaste ? "1" : "0");
    formData.append("isNatural", allcheckbox.isNatural ? "1" : "0");
    formData.append("recyclable", allcheckbox.recyclable ? "1" : "0");
    API.postNewProduct(formData)
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
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            id="role"
            name="category_id"
            onChange={handleInput}
            value={Input.category_id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>Select Category</option>
            {categoryList.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <small className="bg-red-600">{errors?.category_id}</small>
        </div>

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
          <textarea
            placeholder="Description"
            name="description"
            onChange={handleInput}
            value={Input.description}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.description}</span>
        </div>
        <div>
          <input
            placeholder="Price"
            type="text"
            name="price"
            onChange={handleInput}
            value={Input.price}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.price}</span>
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
        <div className="flex gap-2">
          <label>isLocal</label>
          <input type="checkbox" name="isLocal" onChange={handleCheckbox} defaultChecked={allcheckbox.isLocal === 1 ? true : false} className="w-50 h-50" />
        </div>
        <div className="flex gap-2">
          <label>zeroWaste</label>
          <input type="checkbox" name="zeroWaste" onChange={handleCheckbox} defaultChecked={allcheckbox.zeroWaste === 1 ? true : false} className="w-50 h-50" />
        </div>
        <div className="flex gap-2">
          <label>isNatural</label>
          <input type="checkbox" name="isNatural" onChange={handleCheckbox} defaultChecked={allcheckbox.isNatural === 1 ? true : false} className="w-50 h-50" />
        </div>
        <div className="flex gap-2">
          <label>recyclable</label>
          <input
            type="checkbox"
            name="recyclable"
            onChange={handleCheckbox}
            defaultChecked={allcheckbox.recyclable === 1 ? true : false}
            className="w-50 h-50"
          />
        </div>
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Add Product
        </button>
      </form>
    </div>
  );
}
