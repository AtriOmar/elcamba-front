import React, { useEffect, useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faExclamationTriangle, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SelectCategory from "./SelectCategory";
import { v4 as uuidv4 } from "uuid";
import { useUIContext } from "../../../contexts/UIProvider";
import useLocalStorage from "../../../lib/useLocalStorage";
import { useAuthContext } from "../../../contexts/AuthProvider";
import RingLoader from "../../RingLoader";
import { mdTransitionAnimation } from "@ionic/react";

const config = {
  onUploadProgress: (e) => {
    console.log(e);
  },
};

function AddProduct({ setPage, swiperRef, updateProducts, category, setShowSelectCategory }) {
  const [photos, setPhotos] = useState(null);
  const { user } = useAuthContext();
  const [input, setInput] = useLocalStorage("product-" + user.id, {
    name: "",
    category: null,
    oldPrice: "",
    price: "",
    description: "",
    delivery: false,
    deliveryBody: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const { addPopup } = useUIContext();

  function resetInput() {
    setPhotos(null);
    setInput({
      name: "",
      category: null,
      oldPrice: "",
      price: "",
      description: "",
      delivery: false,
      deliveryBody: "",
      address: "",
    });
  }

  function handleChange(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (category) setInput((prev) => ({ ...prev, category }));
  }, [category]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    if (!photos?.length) {
      setError("Vous devez choisir au moins une photo");
      return;
    }

    if (input.name.length < 8) {
      setError("La longueur du nom doit être supérieure à 8");
      return;
    }

    if (!input.category) {
      setError("Vous devez choisir une catégorie");
      return;
    }

    if (!input.price) {
      setError("Vous devez spécifier un prix");
      return;
    }

    if (input.description.length < 20) {
      setError("La longueur de la description doit être supérieure à 20");
      return;
    }

    if (input.address.length < 5) {
      setError("La longueur d'adresse doit être comprise entre 5 et 100");
      return;
    }

    error && setError("");

    const formData = new FormData();
    photos?.forEach((photo) => {
      formData.append(photo.id, photo);
    });
    formData.append("name", input.name);
    formData.append("subCategoryId", input.category.id);
    formData.append("oldPrice", input.oldPrice);
    formData.append("price", input.price);
    formData.append("description", input.description);
    formData.append("delivery", input.delivery);
    formData.append("deliveryBody", input.deliveryBody);
    formData.append("address", input.address);

    setSending(true);
    try {
      const result = await axios.post("/products/create", formData);
      updateProducts();
      console.log(result);
      addPopup({
        type: "success",
        text: "Produit ajouté avec success",
        lastFor: 2000,
      });
      resetInput();
      swiperRef.current?.swiper.slideTo(0);
    } catch (err) {
      console.log(err);
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
    }
    setSending(false);
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            swiperRef.current?.swiper.slideTo(0);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h3 className="text-lg font-medium">Ajouter un produit</h3>
      </div>
      <form action="" className="flex flex-col gap-2 scr1000:flex-row scr1000:gap-10" onSubmit={handleSubmit}>
        <article className="w-full scr1000:w-1/2 ">
          <div className="flex items-center gap-2">
            <label className="relative text-base text-slate-700">Photo(s):</label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <div className="relative h-[300px] w-[300px] rounded-lg border">
            <label
              htmlFor="photos"
              className={`absolute z-10 ${
                photos?.length ? "right-0 translate-x-[110%]" : "right-1/2 translate-x-1/2"
              } top-1/2 flex  h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-blue-500  shadow-md transition-all duration-300 hover:bg-blue-600`}
            >
              <FontAwesomeIcon icon={faPlus} className="text-white" size="2xl" />
            </label>
            <input
              type="file"
              name="photos"
              id="photos"
              hidden
              multiple
              onChange={(e) => {
                const files = e.target.files;
                console.log(files);
                const photosArr = [];
                for (let i = 0; i < files.length; i++) {
                  if (!files[i].type.startsWith("image")) continue;
                  files[i].id = uuidv4().toString();
                  photosArr.push(files[i]);
                }
                if (photosArr.length) setPhotos((prev) => [...(prev || []), ...photosArr]);
                e.target.value = "";
              }}
            />
            {photos?.length ? (
              <>
                {/* <img src={URL.createObjectURL(photos[0])} alt="" className="w-full h-full object-cover" /> */}
                <swiper-container pagination="true" pagination-clickable="true" class="h-full w-full" no-swiping="false">
                  {photos.map((photo, index) => (
                    <swiper-slide key={photo.id} className="relative h-full w-full">
                      <button
                        type="button"
                        className="absolute right-0 top-0"
                        onClick={() => {
                          setPhotos((prev) => prev.filter((currPhoto) => currPhoto.id !== photo.id));
                        }}
                      >
                        <i className="flex h-5 w-5 items-center justify-center rounded-[50%] bg-slate-500 bg-opacity-10">
                          <FontAwesomeIcon icon={faXmark} className="text-slate-700" />
                        </i>
                      </button>
                      <img src={URL.createObjectURL(photo)} alt="" className="h-full w-full object-contain" />
                    </swiper-slide>
                  ))}
                </swiper-container>
              </>
            ) : (
              <>
                <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <FontAwesomeIcon icon={faImage} className="text-slate-300" size="10x" />
                </i>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <h6 className="relative text-base font-semibold text-slate-900">Informations sur le produit:</h6>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <label htmlFor="name" className="relative text-base text-slate-700">
            Nom:
          </label>
          {/* <input type="text" className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0" placeholder="MSI Gaming GF63 Thin/ i7-11800H/ 16GO" /> */}

          <textarea
            name="name"
            id="name"
            // rows="2"
            placeholder="Nom du produit"
            className="w-full resize-none rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.name}
          ></textarea>
          <label htmlFor="categorie" className="relative mt-2 block text-base text-slate-700">
            Catégorie:
          </label>
          <button
            type="button"
            name="category"
            id="category"
            className={`w-full rounded-lg border border-slate-700 px-2 py-1 text-left outline-0 ${
              input.category ? "text-black" : "text-[#8e8e8e]"
            } capitalize ring-inset ring-blue-500 transition-all duration-150 focus:ring-1`}
            onClick={() => setShowSelectCategory(true)}
          >
            {input.category ? input.category.name : "Catégorie"}
          </button>
          <label htmlFor="oldPrice" className="relative mt-2 block text-base text-slate-700">
            Prix ancien (s'il y a un solde, sinon laissez vide):
          </label>
          <div className="flex max-w-[250px] rounded-lg duration-150">
            <input
              id="oldPrice"
              name="oldPrice"
              onChange={handleChange}
              value={input.oldPrice}
              type="number"
              className="hidden-arrows w-full rounded-l-lg border border-slate-700 border-r-slate-300 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
              placeholder="0000"
            />
            <span className="flex items-center rounded-r-lg border border-l-0 border-slate-700 px-3 py-[0.25rem]">DT</span>
          </div>
          <label htmlFor="price" className="relative mt-2 block text-base text-slate-700">
            Prix:
          </label>
          <div className="flex max-w-[250px] rounded-lg duration-150">
            <input
              id="price"
              name="price"
              onChange={handleChange}
              value={input.price}
              type="number"
              className="hidden-arrows w-full rounded-l-lg border border-slate-700 border-r-slate-300 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
              placeholder="0000"
            />
            <span className="flex items-center rounded-r-lg border border-l-0 border-slate-700 px-3 py-[0.25rem]">DT</span>
          </div>
        </article>
        <article className="w-full scr1000:w-1/2">
          <label htmlFor="description" className="relative text-base text-slate-700">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows="6"
            placeholder="Description du produit"
            className="w-full resize-none rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.description}
          ></textarea>
          <div className="flex items-center gap-2">
            <label className="relative text-base font-semibold text-slate-900">Livraison:</label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <div>
            <input type="radio" name="delivery" id="yes" onChange={() => setInput((prev) => ({ ...prev, delivery: true }))} />
            <label htmlFor="yes" className="mr-6">
              Oui
            </label>
            <input type="radio" name="delivery" id="no" onChange={() => setInput((prev) => ({ ...prev, delivery: false }))} defaultChecked />
            <label htmlFor="no">Non</label>
          </div>
          <label htmlFor="delivery" className={`relative text-base text-slate-700 ${input.delivery ? "" : "opacity-50"}`}>
            Prix et zone (de livraison):
          </label>
          <textarea
            disabled={!input.delivery}
            name="deliveryBody"
            id="deliveryBody"
            rows="6"
            placeholder="Prix et zone (de livraision)"
            className={`w-full resize-none rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1 ${
              input.delivery ? "" : "opacity-50"
            }`}
            onChange={handleChange}
            value={input.deliveryBody}
          ></textarea>
          <div className="flex items-center gap-2">
            <label htmlFor="adresse" className="relative text-base font-semibold text-slate-900">
              Adresse:
            </label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <textarea
            name="address"
            id="address"
            rows="4"
            placeholder="Votre adresse"
            className="w-full resize-none rounded-lg border border-slate-700 px-2 py-1 outline-0 ring-inset ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.address}
          ></textarea>
          {/* <div className="flex items-center gap-2">
            <label className="relative font-semibold text-base text-slate-900">Critères:</label>
            <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
        </div> */}
          {error && (
            <div className="flex w-full items-center gap-4 rounded-lg border border-red-500 bg-red-100 px-4 py-3 text-red-500">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              {error}
            </div>
          )}
          <div className="relative mt-2 mb-14">
            <input
              type="submit"
              value="Ajouter"
              className="w-full cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            />
            {sending ? (
              <i className="absolute right-1 top-1/2 -translate-y-1/2">
                <RingLoader color="white" />
              </i>
            ) : (
              ""
            )}
          </div>
        </article>
      </form>
    </>
  );
}

export default AddProduct;
