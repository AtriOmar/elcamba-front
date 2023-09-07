import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductSelect from "./ProductSelect";
import ProductCard from "./ProductCard";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DurationSelect from "./DurationSelect";
import { IonIcon } from "@ionic/react";
import { megaphoneOutline } from "ionicons/icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import RingLoader from "../../RingLoader";
import Loader from "../../Loader";
import { useUIContext } from "../../../contexts/UIProvider";
import Select from "./Select";
import ProductSelector from "./ProductSelector";
import { useAuthContext } from "../../../contexts/AuthProvider";

function PromoteProduct() {
  const [product, setProduct] = useState(null);
  const [input, setInput] = useState({
    duration: 1,
  });
  const amount = useMemo(() => (product ? input.duration * 5 : 0), [input.duration, product?.id]);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { addPopup } = useUIContext();
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/products/getAll", {
          params: {
            userId: user.id,
          },
        });
        setProducts(res.data);
        const id = searchParams.get("p");

        if (id) {
          setProduct(res.data.find((product) => product.id === Number(id)));
        }
      } catch (err) {}
      setLoading(false);
    }

    fetchProducts();
  }, []);

  function handlePayment(event) {
    if (event.data.event_id === "paymee.complete") {
      //Execute Step 3
    }
  }

  async function createPayment() {
    if (sending) return;

    if (!product) {
      setError("Veuillez sélectionner un produit");
      return;
    }

    setSending(true);
    try {
      const res = await axios.post("/abc/createProductPayment", {
        amount,
        productId: product.id,
        duration: input.duration,
      });

      // navigate(`/payment/${res.data}`);
      window.open(`/payment/${res.data}`, "_blank");
      navigate("/customer/promote/manage");
      // setPaymentUrl(`https://sandbox.paymee.tn/gateway/${res.data.data.token}`);
      // window.addEventListener("message", handlePayment);
      setSending(false);
    } catch (err) {
      setSending(false);

      setError("Une erreur s'est produite");
    }
  }

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-2 scr1000:mx-2 py-6 px-3 scr1000:px-6 pb-40 rounded-lg bg-white shadow-md">
      <div className="max-w-[800px]">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/customer/promote/manage">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-sky-600 hover:text-sky-900 duration-300" />
          </Link>
          <h2 className=" text-2xl font-bold capitalize text-sky-600">Promouvoir produit:</h2>
        </div>
        <section className="flex flex-col scr600:flex-row gap-x-10 mt-10">
          <article className="grow">
            <p className=" mb-1 font-medium text-lg text-sky-900">Selectionner un produit:</p>
            {/* <ProductSelect product={product} setProduct={setProduct} /> */}
            <ProductSelector options={products} value={product} onChange={(option) => setProduct(option)} />
            {product && <ProductCard product={product} />}
            <p className="mt-3 mb-1 font-medium text-lg text-sky-900">Durée:</p>
            {/* <DurationSelect input={input} setInput={setInput} /> */}
            <Select
              options={Array(DAYS)
                .fill(0)
                .map((el, index) => ({ value: index + 1, label: index + 1 + " jour(s)" }))}
              onChange={(option) => setInput((prev) => ({ ...prev, duration: option.value }))}
              value={input.duration}
              position="center"
            />
          </article>
          <article className="flex items-center justify-center flex-col w-full max-w-[200px] h-auto mt-8 py-6 border-2 border-slate-300 rounded-lg font-bold text-gray-800">
            <p>Prix:</p>
            <p>{amount} DT</p>
          </article>
        </section>
        {error && (
          <div className="flex w-full items-center gap-4 mt-4 px-4 py-3 border border-red-500 rounded-lg  bg-red-100  text-red-500">
            <FontAwesomeIcon icon={faExclamationTriangle} size="lg" fill="red" />
            {error}
          </div>
        )}
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

export default PromoteProduct;

const DAYS = 14;
