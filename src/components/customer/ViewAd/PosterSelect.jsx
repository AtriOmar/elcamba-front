import { faImage, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
const RATIO = {
  1: "600/300",
  2: "220/260",
  3: "455/260",
};

function PosterSelect({ input, setInput }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file?.type?.startsWith("image")) {
      file.id = uuidv4().toString();
      setInput((prev) => ({ ...prev, photo: file }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`relative w-full rounded-lg border ${input.photo ? "" : "cursor-pointer"}`}
      style={{ aspectRatio: RATIO[input.type] }}
      {...(input.photo ? {} : getRootProps())}
    >
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-blue-500 bg-opacity-75 font-bold text-white ${
          isDragActive ? "" : "hidden"
        }`}
      >
        Déposer le fichier
      </div>
      {input.photo ? (
        ""
      ) : (
        <>
          <span
            className={`absolute z-10 right-1/2 translate-x-1/2 top-1/2 flex  h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-blue-500  shadow-md transition-all duration-300 hover:bg-blue-600`}
          >
            <FontAwesomeIcon icon={faPlus} className="text-white" size="2xl" />
            <p className="absolute top-[120%] font-medium text-lg">{RATIO[input.type].replace("/", ":")}</p>
          </span>
        </>
      )}
      <input
        {...getInputProps()}
        type="file"
        name="poster"
        id="poster"
        hidden
        // onChange={(e) => {
        //   const file = e.target.files[0];
        //   console.log(file);
        //   if (file?.type?.startsWith("image")) {
        //     file.id = uuidv4().toString();
        //     setInput((prev) => ({ ...prev, photo: file }));
        //   }
        //   e.target.value = "";
        // }}
      />
      {input.photo ? (
        <>
          {/* <img src={URL.createObjectURL(photos[0])} alt="" className="w-full h-full object-cover" /> */}
          <div className="relative h-full w-full">
            <button
              type="button"
              className="absolute -right-2 -top-2"
              onClick={() => {
                setInput((prev) => ({ ...prev, photo: null }));
              }}
            >
              <i className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 hover:bg-red-600 duration-150 ">
                <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
              </i>
            </button>
            <img src={URL.createObjectURL(input.photo)} alt="" className="h-full w-full rounded-lg object-cover" />
          </div>
        </>
      ) : (
        <>
          <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FontAwesomeIcon icon={faImage} className="text-slate-300" size="10x" />
          </i>
        </>
      )}
    </div>
  );
}

export default PosterSelect;
