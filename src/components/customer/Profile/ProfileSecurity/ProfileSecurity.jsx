import React, { useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthProvider";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUIContext } from "../../../../contexts/UIProvider";
import EmailLogo from "../../../../assets/images/email.png";
import formatDate from "../../../../lib/formatDate";
import RingLoader from "../../../RingLoader";

export default function ProfileSecurity() {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(-1);
  const [resetPasswordSent, setResetPasswordSent] = useState(false);
  const { addPopup } = useUIContext();
  const [sending, setSending] = useState(false);

  async function sendResetPasswordEmail() {
    setSending(true);
    try {
      const res = await axios.post("/users/sendResetEmail", { email: user.email });

      setResetPasswordSent(true);
    } catch (err) {
      addPopup({
        type: "danger",
        text: "Une erreur s'est produite",
      });
    }
    setSending(false);
  }

  return (
    <div className="mt-4 max-w-[500px]">
      <h2 className="self-start text-2xl font-bold capitalize text-sky-600">Sécurité:</h2>
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Identifiant:</label>
      <p>{user.id}</p>
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Date de création:</label>
      <p>{formatDate(user.createdAt)}</p>
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Dernière modification:</label>
      <p>{formatDate(user.updatedAt)}</p>

      <label className="block relative mt-3 text-base font-semibold text-slate-700">Email:</label>
      <p>{user.email}</p>
      {/* <button
        className="flex items-center gap-2 w-fit mt-1  py-1 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm text-white duration-300"
        onClick={() => {
          setEdit(true);
        }}
      >
        Changer
      </button> */}
      <label className="block relative mt-3 text-base font-semibold text-slate-700">Mot de passe:</label>
      <Accordion open={open === 1}>
        <AccordionHeader
          className={`w-fit mt-1  py-1 px-3 rounded-lg bg-blue-500 hover:bg-blue-600 font-normal text-sm text-white duration-300`}
          onClick={() => setOpen(open === 1 ? -1 : 1)}
        >
          Réintialiser
        </AccordionHeader>
        <AccordionBody className={`border-l px-4 py-2 font-open font-medium text-sm`}>
          {resetPasswordSent ? (
            <p className="mt-2 font-medium text-center text-black">
              <img src={EmailLogo} alt="" className="w-10 mx-auto" />
              Un e-mail a été envoyé à '{user.email}',
              <br />
              veuillez vérifier votre boîte de réception pour réinitialiser votre mot de passe.
            </p>
          ) : (
            <>
              <p>*** Nous allons vous envoyer un email qui vous permettra de réinitialiser votre mot de passe</p>

              <div className="relative flex gap-2 mt-1 font-normal">
                <button
                  className="flex items-center gap-2 w-fit  py-1 px-3 rounded-lg bg-green-500 hover:bg-green-600 text-sm text-white duration-300"
                  onClick={sendResetPasswordEmail}
                >
                  Réintialiser
                </button>
                <button
                  className="flex items-center gap-2 w-fit  py-1 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-sm text-white duration-300"
                  onClick={() => {
                    setOpen(-1);
                  }}
                >
                  Annuler
                </button>
                {sending ? (
                  <i className="">
                    <RingLoader color="black" />
                  </i>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </AccordionBody>
      </Accordion>
    </div>
  );
}
