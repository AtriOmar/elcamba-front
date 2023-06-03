import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TypeSelect from "./PromotePoster/TypeSelect";
import DurationSelect from "./PromoteProduct/DurationSelect";
import PosterSelect from "./PromotePoster/PosterSelect";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../RingLoader";

const PRICES = {
  1: 12,
  2: 5,
  3: 8,
};

function PromotePoster() {
  const [product, setProduct] = useState(null);
  const [input, setInput] = useState({
    duration: 1,
    type: 1,
    photo: null,
  });
  const amount = useMemo(() => input.duration * PRICES[input.type], [input.type, input.duration]);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    console.log(product);
  }, []);

  async function createPayment() {
    if (sending) return;

    setSending(true);
    try {
      const formData = new FormData();
      formData.append("photo", input.photo);
      formData.append("duration", input.duration);
      formData.append("type", input.type);
      formData.append("amount", amount);
      const res = await axios.post("/ads/createPosterPayment", formData);
      console.log("create poster payment", res.data);
      // navigate(`/payment/${res.data}`);
      window.open(`/payment/${res.data}`, "_blank");
      // setPaymentUrl(`https://sandbox.paymee.tn/gateway/${res.data.data.token}`);
      // window.addEventListener("message", handlePayment);
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="p-6 pb-20 rounded-lg bg-white shadow-md">
      <div className="max-w-[700px]">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/customer/promote/manage">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-sky-600 hover:text-sky-900 duration-300" />
          </Link>
          <h2 className=" text-2xl font-bold capitalize text-sky-600">Promouvoir affiche:</h2>
        </div>
        <h3 className="mt-10 mb-2 font-medium text-xl text-center ">Page d'acceuil</h3>
        <TypeSelect input={input} setInput={setInput} />
        <section className="flex gap-10 mt-10">
          <article className="grow">
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Affiche:</p>
            <PosterSelect input={input} setInput={setInput} />
            <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Durée:</p>
            <DurationSelect input={input} setInput={setInput} />
          </article>
          <article className="flex items-center justify-center shrink-0 flex-col w-full max-w-[200px] h-auto mt-8 border-2 border-slate-300 rounded-lg font-bold text-gray-800">
            <p>Prix:</p>
            <p>{amount} DT</p>
          </article>
        </section>
        <div className="relative w-fit">
          <button
            className="flex items-center gap-4 w-fit mt-4  py-2 px-10 rounded-lg bg-green-500 hover:bg-green-600 text-white duration-300"
            onClick={createPayment}
          >
            <IonIcon icon={megaphoneOutline} className="text-2xl" aria-hidden="true" />
            Promouvoir
          </button>
          {sending ? (
            <i className="absolute right-1 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PromotePoster;
