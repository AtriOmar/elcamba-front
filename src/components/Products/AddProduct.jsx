import React, { useEffect, useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SelectCategory from "./SelectCategory";
import { register } from "swiper/element/bundle";
import { v4 as uuidv4 } from "uuid";

register();

const config = {
  onUploadProgress: (e) => {
    console.log(e);
  },
};

function AddProduct({ setPage, updateProducts }) {
  const [input, setInput] = useState({
    photos: null,
    name: "",
    category: "",
    oldPrice: "",
    price: "",
    description: "",
    delivery: false,
    deliveryBody: "",
    address: "",
  });

  const [showSelectCategory, setShowSelectCategory] = useState(false);

  function handleChange(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    input.photos?.forEach((photo) => {
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

    try {
      const result = await axios.post("/products/create", formData);
      updateProducts();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <SelectCategory show={showSelectCategory} setShow={setShowSelectCategory} setCategory={(categ) => setInput((prev) => ({ ...prev, category: categ }))} />
      <div className="flex items-center gap-4">
        <button onClick={() => setPage(0)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h3 className="font-medium text-lg">Ajouter un produit</h3>
      </div>
      <form action="" className="flex flex-col scr1000:flex-row gap-2 scr1000:gap-10" onSubmit={handleSubmit}>
        <article className="w-full scr1000:w-1/2 ">
          <div className="flex items-center gap-2">
            <label className="relative text-base text-slate-700">Photo(s):</label>
            <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
          </div>
          <div className="relative w-[300px] h-[300px] border rounded-lg">
            <label
              htmlFor="photos"
              className={`absolute z-10 ${
                input.photos?.length ? "right-0 translate-x-[110%]" : "right-1/2 translate-x-1/2"
              } top-1/2 -translate-y-1/2  flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500 hover:bg-blue-600  shadow-md cursor-pointer transition-all duration-300`}
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
                if (photosArr.length) setInput((prev) => ({ ...prev, photos: [...(prev.photos || []), ...photosArr] }));
                e.target.value = "";
              }}
            />
            {input.photos?.length ? (
              <>
                {/* <img src={URL.createObjectURL(input.photos[0])} alt="" className="w-full h-full object-cover" /> */}
                <swiper-container pagination="true" class="w-full h-full">
                  {input.photos.map((photo, index) => (
                    <swiper-slide key={index} className="relative w-full h-full">
                      <button
                        type="button"
                        className="absolute top-0 right-0"
                        onClick={() => {
                          setInput((prev) => ({ ...prev, photos: prev.photos.filter((currPhoto) => currPhoto.id !== photo.id) }));
                        }}
                      >
                        <i className="flex items-center justify-center h-5 w-5 rounded-[50%] bg-slate-500 bg-opacity-10">
                          <FontAwesomeIcon icon={faXmark} className="text-slate-700" />
                        </i>
                      </button>
                      <img src={URL.createObjectURL(photo)} alt="" className="w-full h-full object-contain" />
                    </swiper-slide>
                  ))}
                </swiper-container>
              </>
            ) : (
              <>
                <i className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <FontAwesomeIcon icon={faImage} className="text-slate-300" size="10x" />
                </i>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <h6 className="relative font-semibold text-base text-slate-900">Informations sur le produit:</h6>
            <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
          </div>
          <label htmlFor="name" className="relative text-base text-slate-700">
            Nom:
          </label>
          {/* <input type="text" className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0" placeholder="MSI Gaming GF63 Thin/ i7-11800H/ 16GO" /> */}

          <textarea
            name="name"
            id="name"
            // rows="2"
            placeholder="PC PORTABLE MSI GAMING GF65 THIN 10UE / I7 10È GÉN / 16 GO + SAC À DOS MSI OFFERT"
            className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0 resize-none"
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
            className={`w-full py-1 px-2 border border-slate-700 rounded-lg text-left ${input.category ? "text-black" : "text-[#8e8e8e]"}`}
            onClick={() => setShowSelectCategory(true)}
          >
            {input.category ? input.category.name : "Informatique > Ordinateur portable"}
          </button>
          <label htmlFor="oldPrice" className="relative mt-2 block text-base text-slate-700">
            Ancien prix (s'il y a un solde, sinon laissez vide):
          </label>
          <input
            id="oldPrice"
            name="oldPrice"
            onChange={handleChange}
            value={input.oldPrice}
            type="text"
            className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0"
            placeholder="3,999 DT"
          />
          <label htmlFor="price" className="relative mt-2 block text-base text-slate-700">
            Prix:
          </label>
          <input
            id="price"
            name="price"
            onChange={handleChange}
            value={input.price}
            type="text"
            className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0"
            placeholder="3,899 DT"
          />
        </article>
        <article className="w-full scr1000:w-1/2">
          <label htmlFor="description" className="relative text-base text-slate-700">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows="6"
            placeholder='Ecran 15.6" Full HD 144 Hz - Processeur Intel Core i7-10750H, up to 5 GHz, 12 Mo de mémoire cache - Mémoire 16 Go - Disque 512 Go SSD M.2- Carte graphique Nvidia GeForce RTX 2060, 6 Go de mémoire dédiée - Clavier rétroéclairé - Wifi - Bluetooth - USB 3.2 Type-C - 3x USB 3.2 - HDMI - RJ45 - Webcam HD - Garantie 2 ans'
            className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0 resize-none"
            onChange={handleChange}
            value={input.description}
          ></textarea>
          <div className="flex items-center gap-2">
            <label className="relative font-semibold text-base text-slate-900">Livraison:</label>
            <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
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
            rows="2"
            placeholder="Gratuit à sfax,&#10;7dt pour toute la tunisie."
            className={`w-full py-1 px-2 border border-slate-700 rounded-lg outline-0 resize-none ${input.delivery ? "" : "opacity-50"}`}
            onChange={handleChange}
            value={input.deliveryBody}
          ></textarea>
          <div className="flex items-center gap-2">
            <label htmlFor="adresse" className="relative font-semibold text-base text-slate-900">
              Adresse:
            </label>
            <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
          </div>
          <textarea
            name="address"
            id="address"
            rows="4"
            placeholder="Route Bouzayen km 8.5,&#10;Sfax,&#10;au prés du marché de voitures."
            className="w-full py-1 px-2 border border-slate-700 rounded-lg outline-0 resize-none"
            onChange={handleChange}
            value={input.address}
          ></textarea>
          {/* <div className="flex items-center gap-2">
            <label className="relative font-semibold text-base text-slate-900">Critères:</label>
            <div className="grow h-[.5px] rounded-[50%] bg-slate-400"></div>
        </div> */}
          <input
            type="submit"
            value="Ajouter"
            className="w-full py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition duration-300"
          />
        </article>
      </form>
    </>
  );
}

export default AddProduct;
