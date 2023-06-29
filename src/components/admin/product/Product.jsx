import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan, faLocationDot, faMessage, faPhone, faStar, faStarHalfStroke, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Loader from "../../Loader";
import formatDate from "../../../lib/formatDate";
import Switch from "../../Switch";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useUIContext } from "../../../contexts/UIProvider";
import RingLoader from "../../RingLoader";
import Swal from "sweetalert2";
import sad from "../../../assets/images/sad.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [sending, setSending] = useState({ status: false, sold: false });
  const { addPopup } = useUIContext();

  async function fetchProduct() {
    try {
      const res = await axios.get("/products/getById", {
        params: {
          id,
        },
      });
      console.log("admin product", res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function toggleStatus() {
    const data = {
      id: product?.id,
    };
    if (product?.active === 0) {
      data.active = 1;
    } else {
      data.active = 0;
    }
    setSending((prev) => ({ ...prev, status: true }));
    try {
      const res = await axios.put("/products/updateById", data);

      setProduct(res.data);

      Swal.fire("Success", "Modifié avec succés", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, status: false }));
  }

  async function toggleSold() {
    const data = {
      id: product?.id,
      sold: !product?.sold,
    };

    setSending((prev) => ({ ...prev, sold: true }));
    try {
      const res = await axios.put("/products/updateById", data);

      setProduct(res.data);

      Swal.fire("Success", "Modifié avec succés", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Une erreur s'est produite", "error");
    }
    setSending((prev) => ({ ...prev, sold: false }));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center w-full py-20 px-20 rounded-lg bg-white shadow-md">
        <div className="">
          <img className="w-[150px] mx-auto " src={sad} alt="" />
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas le produit demandé</h3>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'acceuil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg py-3 px-4 bg-white shadow-card1">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-slate-700 duration-300">
        <FontAwesomeIcon icon={faArrowLeft} size="1x" className="hover:scale-125 duration-300" />
        <p className="font-medium">Retour</p>
      </button>
      {/* ------------------------- photos swiper ----------------------------- */}
      <section className="flex flex-col scr1000:flex-row gap-4 items-start mt-4">
        <article className="scr1000:sticky top-20 shrink-0 w-full scr1000:w-2/5 min-w-[200px] max-w-[400px] mx-auto">
          <swiper-container class="rounded-lg border-2 border-slate-200" no-swiping="false" thumbs-swiper=".product-thumbs">
            {product?.photos?.map((photo, index) => (
              <swiper-slide key={index} class="relative h-auto w-full">
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="h-full w-full object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
          <swiper-container slides-per-group="4" slides-per-view="auto" space-between="10" class="product-thumbs w-fit p-2">
            {product?.photos?.map((photo, index) => (
              <swiper-slide
                key={index}
                class=" w-fit rounded-md opacity-60 ring-2 ring-slate-200 transition-all duration-300 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:ring-red-500 [&.swiper-slide-thumb-active]:ring-offset-1"
              >
                <img src={`${BACKEND_URL}/uploads/${photo}`} alt="" className="aspect-square h-14 cursor-pointer rounded-md object-contain" />
              </swiper-slide>
            ))}
          </swiper-container>
        </article>
        {/* ---------------------------- product details ---------------------------- */}

        <article className="grow w-full scr1000:w-auto">
          {product?.active === 0 ? (
            <div className="flex gap-2 items-center mt-4 font-medium text-xl text-red-500">
              <FontAwesomeIcon icon={faBan} className="" />
              Suspendu
            </div>
          ) : (
            ""
          )}
          {user?.accessId > product?.User?.accessId && user?.accessId > 2 ? (
            <>
              <div className="relative mt-4 w-fit">
                {product?.active >= 1 ? (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Suspendre
                  </button>
                ) : (
                  <button
                    onClick={toggleStatus}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Activer
                  </button>
                )}
                {sending.status ? (
                  <i className="absolute right-1 top-1/2 -translate-y-1/2">
                    <RingLoader color="white" />
                  </i>
                ) : (
                  ""
                )}
              </div>
              <div className="relative mt-4 w-fit">
                {product?.sold ? (
                  <button
                    onClick={toggleSold}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Marquer non vendu
                  </button>
                ) : (
                  <button
                    onClick={toggleSold}
                    className="flex items-center gap-4 w-fit  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
                  >
                    {/* <FontAwesomeIcon icon={faPenToSquare} size="lg" /> */}
                    Marquer vendu
                  </button>
                )}
                {sending.sold ? (
                  <i className="absolute right-1 top-1/2 -translate-y-1/2">
                    <RingLoader color="white" />
                  </i>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
          <h2 className="mt-4 text-2xl font-bold capitalize text-slate-800">{product?.name}</h2>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">ID:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{product?.id}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Date de création:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(product?.createdAt)}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Dernière modification:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{formatDate(product?.updatedAt)}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Visible:</p>
          <Switch checked={product?.active === 2} disabled={true} />
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Vendu:</p>
          <Switch checked={product?.sold} disabled={true} />
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Vendeur:</p>
          <p className="flex items-center gap-3">
            {product?.User?.picture ? (
              <img
                src={`${BACKEND_URL}/uploads/profile-pictures/${product?.User?.picture}`}
                alt="Profile picture"
                className="w-[40px] aspect-square rounded-[50%] border object-cover"
              />
            ) : (
              <UserCircleIcon className="w-[38px] text-sky-700" />
            )}
            {product?.User?.username}
            <Link className="" to={`/admin/users/${product?.User?.id}`}>
              <Cog6ToothIcon className={"block h-8 w-8 text-slate-600"} aria-hidden="true" />
            </Link>
          </p>
          <p className="w-fit mt-10 px-2 py-1 rounded-lg bg-yellow-500 font-rubik font-normal capitalize text-white">
            {product?.salePrice ? <span className="mr-2 text-xs line-through">{Number(product?.price)} DT</span> : ""}
            <span className="text-base">{Number(product?.salePrice) || Number(product?.price)} DT</span>
          </p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Description:</p>
          <p className="max-w-[700px] whitespace-pre-wrap">{product?.description}</p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Ville:</p>
          <p className="flex items-center gap-2 max-w-[700px] capitalize">
            <FontAwesomeIcon icon={faLocationDot} size="1x" className="text-slate-700" />
            {product?.city}
          </p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Adresse:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faLocationDot} size="1x" className="text-slate-700" />
            {product?.address}
          </p>
          <p className="block relative mt-3 text-base font-semibold text-slate-700">Livraison:</p>
          <p className="flex items-center gap-2 max-w-[700px]">
            <FontAwesomeIcon icon={faTruck} size="1x" className="text-slate-700" />
            {product?.delivery || "Non"}
          </p>
        </article>
      </section>
    </div>
  );
}
