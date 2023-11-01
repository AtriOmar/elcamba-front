import React, { useEffect, useRef, useState } from "react";
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
import CitySelect from "./CitySelect";
import Select from "./Select";

const config = {
  onUploadProgress: (e) => {},
};

export default function AddProduct({ setPage, swiperRef, updateProducts }) {
  const [photos, setPhotos] = useState(null);
  const { user } = useAuthContext();
  const { addPopup, categories } = useUIContext();
  const swiperElRef = useRef(null);

  const [input, setInput] = useLocalStorage("product-" + user.id, {
    name: "",
    category: -1,
    subCategory: -1,
    salePrice: "",
    price: "",
    description: "",
    delivery: false,
    deliveryBody: "",
    address: user.address || "",
    city: user.city || "sfax",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  function resetInput() {
    setPhotos(null);
    setInput({
      name: "",
      category: -1,
      subCategory: -1,
      salePrice: "",
      price: "",
      description: "",
      delivery: false,
      deliveryBody: "",
      address: user.address || "",
      city: user.city || "sfax",
    });
  }

  function handleChange(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    setInput((prev) => ({ ...prev, subCategory: -1 }));
  }, [input.category]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    if (!photos?.length) {
      setError("Veuillez choisir au moins une photo");
      return;
    }

    if (input.name.length < 4) {
      setError("La longueur du nom doit être supérieure à 4");
      return;
    }

    if (input.subCategory === -1) {
      setError("Veuillez choisir une catégorie et une sous-catégorie");
      return;
    }

    if (!input.price) {
      setError("Veuillez spécifier un prix");
      return;
    }

    if (input.description.length < 6) {
      setError("La longueur de la description doit être supérieure à 6");
      return;
    }

    if (input.address.trim().length < 3) {
      setError("La longueur d'adresse doit être comprise entre 3 et 100");
      return;
    }

    error && setError("");

    const formData = new FormData();
    photos?.forEach((photo) => {
      formData.append(photo.id, photo);
    });
    formData.append("name", input.name);
    formData.append("subCategoryId", input.subCategory);
    formData.append("price", input.price);
    formData.append("salePrice", input.salePrice);
    formData.append("description", input.description);
    if (input.delivery) {
      formData.append("delivery", input.deliveryBody);
    } else {
      formData.append("delivery", "");
    }
    formData.append("city", input.city);
    formData.append("address", input.address);

    setSending(true);
    try {
      const result = await axios.post("/products/create", formData);
      updateProducts();

      addPopup({
        type: "success",
        text: "Produit ajouté avec success",
        lastFor: 2000,
      });
      resetInput();
      swiperRef.current?.swiper.slideTo(0);
      setSending(false);
    } catch (err) {
      setSending(false);

      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
    }
  }

  useEffect(() => {
    if (!swiperElRef.current) return;

    // Register Swiper web component

    // Object with parameters
    const params = {
      pagination: {
        clickable: true,
      },
      noSwiping: false,
    };

    // Assign it to swiper element
    Object.assign(swiperElRef.current, params);

    // initialize swiper
    swiperElRef.current.initialize();
  }, [photos]);

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
      <form action="" className="flex flex-col gap-2 scr1000:flex-row scr1000:gap-10 px-1" onSubmit={handleSubmit}>
        <article className="w-full scr1000:w-1/2 ">
          <div className="flex items-center gap-2">
            <label className="relative text-base font-semibold text-sky-700">Photo(s):</label>
            <div className="h-[.5px] grow rounded-[50%] bg-slate-400"></div>
          </div>
          <div className="relative h-[300px] w-[300px] border rounded">
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
            {photos?.length ? (
              <>
                {/* <img src={URL.createObjectURL(photos[0])} alt="" className="w-full h-full object-cover" /> */}
                <swiper-container
                  // pagination="true"
                  // pagination-clickable="true"
                  class="h-full w-full overflow-y-visible overflow-x-clip hey"
                  init="false"
                  ref={swiperElRef}
                  // no-swiping="false"
                >
                  {photos.map((photo, index) => (
                    <swiper-slide key={photo.id} class="relative h-full w-full">
                      <button
                        type="button"
                        className="absolute right-0 -top2"
                        onClick={() => {
                          setPhotos((prev) => prev.filter((currPhoto) => currPhoto.id !== photo.id));
                        }}
                      >
                        <i className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 hover:bg-red-600 duration-150 ">
                          <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
                        </i>
                      </button>
                      <img src={URL.createObjectURL(photo)} alt="" className="h-full w-full rounded object-contain" />
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
            <h6 className="relative text-base font-semibold text-sky-700">Informations sur le produit:</h6>
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
            className="w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.name}
          ></textarea>
          {/*  ---------------------------- Categories ---------------------------- */}
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
          {/*  ---------------------------- Price ---------------------------- */}
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
              className="hidden-arrows w-full rounded-l-lg border border-slate-400 border-r-slate-300 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1"
              placeholder="0000"
            />
            <span className="flex items-center rounded-r-lg border border-l-0 border-slate-400 px-3 py-[0.25rem]">DT</span>
          </div>
          <label htmlFor="oldPrice" className="relative mt-2 block text-base text-slate-700">
            Prix soldé (s'il y a un solde, sinon laissez vide):
          </label>
          <div className="flex max-w-[250px] rounded duration-150">
            <input
              id="salePrice"
              name="salePrice"
              onChange={handleChange}
              value={input.salePrice}
              type="number"
              className="hidden-arrows w-full rounded-l-lg border border-slate-400 border-r-slate-300 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1"
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
            className="w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.description}
          ></textarea>
          {/*  ---------------------------- delivery ---------------------------- */}
          <div className="flex items-center gap-2">
            <label className="relative text-base font-semibold text-sky-700">Livraison:</label>
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
            data-disabled={true}
            name="deliveryBody"
            id="deliveryBody"
            rows="6"
            placeholder="Prix et zone (de livraision)"
            className={`w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1 ${
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
            className="w-full resize-none rounded border border-slate-400 px-2 py-1 outline-0  ring-blue-500 transition-all duration-150 focus:ring-1"
            onChange={handleChange}
            value={input.address}
          ></textarea>
          {error && (
            <div className="flex w-full items-center gap-4 rounded border border-red-500 bg-red-100 px-4 py-3 text-red-500">
              <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
              {error}
            </div>
          )}
          <div className="relative mt-2 mb-20">
            <input
              type="submit"
              value="Ajouter"
              className="w-full px-4 py-2  rounded-full bg-blue-500 text-white transition duration-300 hover:bg-blue-600 cursor-pointer"
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
