import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditPartnerCmp(props) {
  const [Input, setInput] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.toedit) {
      setInput(props.toedit);
      setLoading(false);
    }
  }, [props.toedit]);

  const handleInput = (e) => {
    e.persist();
    setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const updateItem = (e) => {
    e.preventDefault();
    const data = {
      title: Input.title,
      content: Input.content,
    };
    axios
      .put(`/update-partners/${props.toedit.id}`, data)
      .then((res) => {
        Swal.fire("Success", res.data.message, "success");
        setErrors([]);
      })
      .catch((err) => {
        const response = err.response;
        if (response?.status === 422) {
          Swal.fire("All Fields are mandatory", "", "error");
          setErrors(response.data.errors);
        } else if (response?.status === 404) {
          Swal.fire("Error", response.data.message, "error");
        }
      });
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="max-w-xl mx-auto h-100 flex justify-center items-center">
      <form className="flex flex-col gap-4 w-full" onSubmit={updateItem}>
        <div>
          <input
            placeholder="Title"
            type="text"
            name="title"
            onChange={handleInput}
            value={Input.title}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.title}</span>
        </div>
        <div>
          <textare
            placeholder="Content"
            name="content"
            onChange={handleInput}
            value={Input.content}
            className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <span className="text-red-600">{errors?.content}</span>
        </div>
        <button type="submit" className="self-center w-[50%] bg-blue-500 hover:bg-blue-700 rounded-full py-3 text-white font-bold">
          Edit Partner
        </button>
      </form>
    </div>
  );
}
