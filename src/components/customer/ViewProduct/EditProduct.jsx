import React, { useEffect, useMemo, useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faExclamationTriangle, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUIContext } from "../../../contexts/UIProvider";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Switch from "../../Switch";
import RingLoader from "../../RingLoader";
import CitySelect from "./CitySelect";
import deepEqual from "deep-equal";
import Select from "./Select";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function EditProduct({ product, fetchProduct }) {
  const [photos, setPhotos] = useState([...(product.photos || [])]);
  const [input, setInput] = useState({
    name: product.name,
    category: product.SubCategory?.Category?.id,
    subCategory: product.SubCategory?.id,
    salePrice: product.salePrice,
    price: product.price,
    description: product.description,
    delivery: !!product.delivery,
    deliveryBody: product.delivery,
    city: product.city,
    address: product.address,
    // visible: product.visible,
    // sold: product.sold,
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const { addPopup, categories } = useUIContext();
  const navigate = useNavigate();

  function handleChange(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    if (!photos?.length) {
      setError("Vous devez choisir au moins une photo");
      return;
    }

    if (input.name.length < 4) {
      setError("La longueur du nom doit être supérieure à 4");
      return;
    }

    if (input.subCategory === -1) {
      setError("Vous devez choisir une catégorie et une sous-catégorie");
      return;
    }

    if (!input.price) {
      setError("Vous devez spécifier un prix");
      return;
    }

    if (input.description.length < 6) {
      setError("La longueur de la description doit être supérieure à 6");
      return;
    }

    if (input.address.length < 3) {
      setError("La longueur d'adresse doit être comprise entre 3 et 100");
      return;
    }

    error && setError("");

    const formData = new FormData();
    const photosArr = [];
    photos?.forEach((photo) => {
      if (typeof photo === "string") photosArr.push(photo);
      else formData.append(photo.id, photo);
    });

    formData.append("id", product.id);
    formData.append("photos", JSON.stringify(photosArr));
    formData.append("name", input.name);
    formData.append("subCategoryId", input.subCategory);
    formData.append("salePrice", input.salePrice);
    formData.append("price", input.price);
    formData.append("description", input.description);
    if (input.delivery) {
      formData.append("delivery", input.deliveryBody);
    } else {
      formData.append("delivery", "");
    }
    formData.append("city", input.city);
    formData.append("address", input.address);
    // formData.append("visible", input.visible);
    // formData.append("sold", input.sold);

    setSending(true);

    try {
      const res = await axios.post("/products/update", formData);

      fetchProduct();
      addPopup({
        type: "success",
        text: "Produit modifié avec succés",
        lastFor: 2000,
      });
      // navigate("/products");
      setSending(false);
    } catch (err) {
      setSending(false);

      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
    }
  }

  const photosSwiper = useMemo(
    () =>
      photos?.length ? (
        <swiper-container pagination="true" pagination-clickable="true" class="h-full w-full">
          {photos.map((photo, index) => (
            <swiper-slide key={Math.random()} class="relative h-full w-full rounded overflow-hidden">
              <button
                type="button"
                className="absolute right-0 top-0"
                onClick={() => {
                  setPhotos((prev) => prev.filter((currPhoto) => (typeof photo === "string" && currPhoto !== photo) || currPhoto.id !== photo.id));
                }}
              >
                <i className="flex h-5 w-5 items-center justify-center rounded-[50%] bg-slate-500 bg-opacity-10">
                  <FontAwesomeIcon icon={faXmark} className="text-slate-700" />
                </i>
              </button>
              <img
                src={typeof photo === "string" ? `${BACKEND_URL}/uploads/${photo}` : URL.createObjectURL(photo)}
                alt=""
                className="h-full w-full object-contain"
              />
            </swiper-slide>
          ))}
        </swiper-container>
      ) : (
        <>
          <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FontAwesomeIcon icon={faImage} className="text-slate-300" size="10x" />
          </i>
        </>
      ),
    [photos]
  );

  if (!product) return;

  return (
    <>
      <div className="flex items-center gap-4" id="edit-product">
        <h3 className="text-lg font-medium">Modifier produit:</h3>
      </div>
      <form action="" className="flex flex-col gap-2 scr1000:flex-row scr1000:gap-10 mt-2" onSubmit={handleSubmit}>
        <article className="w-full scr1000:w-1/2 ">
          {/*  ---------------------------- toggle visible and sold buttons ---------------------------- */}
          {/* <div className="flex mt-2">
            <div>
              <p className=" font-medium text-sky-700">Visible:</p>
              <Switch checked={input.visible} setChecked={(value) => setInput((prev) => ({ ...prev, visible: value }))} />
            </div>
            <div className="ml-10 pl-10 border-l-2 border-slate-300">
              <p className=" font-medium text-sky-700">Vendu:</p>
              <Switch checked={input.sold} setChecked={(value) => setInput((prev) => ({ ...prev, sold: value }))} />
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            <label className="relative font-medium text-sky-700">Photo(s):</label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <div className="relative h-[300px] w-[300px] rounded border">
            <label
              htmlFor="photos"
              className={`absolute z-10 ${
                photos?.length ? "right-0 translate-x-[110%]" : "right-1/2 translate-x-1/2"
              } top-1/2 flex  h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded bg-blue-500  shadow-md transition-all duration-300 hover:bg-blue-600`}
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
            {photosSwiper}
          </div>

          <div className="flex items-center gap-2">
            <h6 className="relative mt-2 text-base font-semibold text-sky-700">Informations sur le produit:</h6>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <label htmlFor="name" className="relative text-base text-slate-700">
            Nom:
          </label>
          {/* <input type="text" className="w-full py-1 px-2 border border-slate-400 rounded outline-0" placeholder="MSI Gaming GF63 Thin/ i7-11800H/ 16GO" /> */}

          <textarea
            name="name"
            id="name"
            // rows="2"
            placeholder="Nom du produit"
            className="w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.name}
          ></textarea>
          {/* <label htmlFor="categorie" className="relative mt-2 block text-base text-slate-700">
            Catégorie:
          </label>
          <button
            type="button"
            name="category"
            id="category"
            className={`w-full rounded border border-slate-400 px-2 py-1 text-left outline-0 ${
              input.category ? "text-black" : "text-[#8e8e8e]"
            } capitalize ring-blue-500 transition-all duration-150 focus:ring-1`}
            onClick={() => setShowSelectCategory(true)}
          >
            {input.category ? input.category.name : "Catégorie"}
          </button> */}
          <label htmlFor="category" className="relative mt-2 block text-base text-slate-700">
            Catégorie:
          </label>
          <Select
            options={[{ value: -1, label: "Selectionnez une catégorie" }, ...categories?.map((cat) => ({ value: cat.id, label: cat.name }))]}
            onChange={(option) => setInput((prev) => ({ ...prev, category: option.value }))}
            value={input.category}
            position="center"
          />
          {/*  ---------------------------- SubCategories ---------------------------- */}
          <label htmlFor="subCategory" className="relative mt-2 block text-base text-slate-700">
            Sous-catégorie
          </label>
          <Select
            options={[
              { value: -1, label: "Selectionnez une sous-catégorie" },
              ...(categories.find((cat) => cat.id === input.category)?.SubCategories?.map((sub) => ({ value: sub.id, label: sub.name })) || []),
            ]}
            onChange={(option) => setInput((prev) => ({ ...prev, subCategory: option.value }))}
            value={input.subCategory}
            position="center"
          />
          <label htmlFor="price" className="relative mt-2 block text-base text-slate-700">
            Prix:
          </label>
          <div className="flex max-w-[250px] rounded duration-150">
            <input
              id="price"
              name="price"
              onChange={handleChange}
              value={input.price}
              type="number"
              className="hidden-arrows w-full rounded-l-lg border border-slate-400 border-r-slate-300 px-2 py-1 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1"
              placeholder="0000"
            />
            <span className="flex items-center rounded-r-lg border border-l-0 border-slate-400 px-3 py-[0.25rem]">DT</span>
          </div>
          <label htmlFor="salePrice" className="relative mt-2 block text-base text-slate-700">
            Prix soldé (s'il y a un solde, sinon laissez vide):
          </label>
          <div className="flex max-w-[250px] rounded duration-150">
            <input
              id="salePrice"
              name="salePrice"
              onChange={handleChange}
              value={input.salePrice}
              type="number"
              className="hidden-arrows w-full rounded-l-lg border border-slate-400 border-r-slate-300 px-2 py-1 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1"
              placeholder="0000"
            />
            <span className="flex items-center rounded-r-lg border border-l-0 border-slate-400 px-3 py-[0.25rem]">DT</span>
          </div>
        </article>
        <article className="w-full scr1000:w-1/2">
          {/*  ---------------------------- description ---------------------------- */}
          <label htmlFor="description" className="relative text-base text-slate-700">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows="6"
            placeholder="Description du produit"
            className="w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.description}
          ></textarea>
          {/*  ---------------------------- delivery ---------------------------- */}
          <div className="flex items-center gap-2">
            <label className="relative text-base font-semibold text-sky-700">Livraison:</label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <div>
            <input type="radio" name="delivery" id="yes" onChange={() => setInput((prev) => ({ ...prev, delivery: true }))} checked={input.delivery === true} />
            <label htmlFor="yes" className="mr-6">
              Oui
            </label>
            <input
              type="radio"
              name="delivery"
              id="no"
              onChange={() => setInput((prev) => ({ ...prev, delivery: false }))}
              checked={input.delivery === false}
            />
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
            className={`w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1 ${
              input.delivery ? "" : "opacity-50"
            }`}
            onChange={handleChange}
            value={input.deliveryBody}
          ></textarea>
          {/*  ---------------------------- address ---------------------------- */}
          <div className="flex items-center gap-2">
            <label htmlFor="adresse" className="relative text-base font-semibold text-sky-700">
              Adresse:
            </label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <label htmlFor="description" className="relative text-base text-slate-700">
            Ville:
          </label>
          {/* <CitySelect input={input} setInput={setInput} /> */}
          <Select options={CITY_OPTIONS} onChange={(option) => setInput((prev) => ({ ...prev, city: option.value }))} value={input.city} position="center" />
          <label htmlFor="description" className="block relative mt-2 text-base text-slate-700">
            Adresse exacte:
          </label>
          <textarea
            name="address"
            id="address"
            rows="4"
            placeholder="Votre adresse"
            className="w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0 ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.address}
          ></textarea>
          {/* <div className="flex items-center gap-2">
        <label className="relative font-semibold text-base text-slate-900">Critères:</label>
        <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
    </div> */}
          {error && (
            <div className="flex w-full items-center gap-4 rounded border border-red-500 bg-red-100 px-4 py-3 text-red-500">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              {error}
            </div>
          )}
          <div className="flex flex-col scr800:flex-row gap-1 mt-2">
            <div className="relative w-full scr800:w-1/2">
              <input
                type="submit"
                value="Enregistrer"
                className={`w-full   cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={(() => {
                  if (!product) return true;
                  const obj = {
                    name: product.name,
                    category: { name: product.SubCategory?.Category?.name + " > " + product.SubCategory?.name, id: product.SubCategory?.id },
                    salePrice: product.salePrice,
                    price: product.price,
                    description: product.description,
                    delivery: !!product.delivery,
                    deliveryBody: product.delivery,
                    city: product.city,
                    address: product.address,
                    visible: product.visible,
                    sold: product.sold,
                  };
                  return deepEqual(obj, input);
                })()}
              />
              {sending ? (
                <i className="absolute right-1 top-1/2 -translate-y-1/2">
                  <RingLoader color="white" />
                </i>
              ) : (
                ""
              )}
            </div>
            <Link
              to={"/customer/products"}
              className="block w-full scr800:w-1/2 px-4 py-2 cursor-pointer rounded-full bg-red-600 hover:bg-red-700 text-white text-center transition duration-300 "
            >
              Annuler
            </Link>
          </div>
        </article>
      </form>
    </>
  );
}

export default EditProduct;

const CITY_OPTIONS = [
  { label: "ariana", value: "ariana" },
  { label: "béja", value: "béja" },
  { label: "ben arous", value: "ben arous" },
  { label: "bizerte", value: "bizerte" },
  { label: "gabes", value: "gabes" },
  { label: "gafsa", value: "gafsa" },
  { label: "jendouba", value: "jendouba" },
  { label: "kairouan", value: "kairouan" },
  { label: "kasserine", value: "kasserine" },
  { label: "kebili", value: "kebili" },
  { label: "la manouba", value: "la manouba" },
  { label: "le kef", value: "le kef" },
  { label: "mahdia", value: "mahdia" },
  { label: "médenine", value: "médenine" },
  { label: "monastir", value: "monastir" },
  { label: "nabeul", value: "nabeul" },
  { label: "sfax", value: "sfax" },
  { label: "sidi bouzid", value: "sidi bouzid" },
  { label: "siliana", value: "siliana" },
  { label: "sousse", value: "sousse" },
  { label: "tataouine", value: "tataouine" },
  { label: "tozeur", value: "tozeur" },
  { label: "tunis", value: "tunis" },
  { label: "zaghouan", value: "zaghouan" },
];
