import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../lib/socket";
import { useNavigate, useParams } from "react-router";
import Loader from "../../Loader";
import MessagesBox from "./MessagesBox";
import SendMessageInput from "./SendMessageInput";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useChatContext } from "../../../contexts/ChatProvider";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import sad from "../../../assets/images/sad.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let currentBoxHeight;

export default function Support() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setConversations, isConnected } = useChatContext();
  const { user, setUser } = useAuthContext();
  const [limit, setLimit] = useState(30);
  const [newLimit, setNewLimit] = useState(true);
  const [visible, setVisible] = useState(true);
  const observing = useRef(-1);
  const resizeObserver = useRef(
    new ResizeObserver((entries, obs) => {
      const el = document.querySelector(".messagesBox");

      if (el?.scrollTop === 0) {
        el.scrollTo(0, el.scrollHeight - currentBoxHeight);
      }

      currentBoxHeight = el?.scrollHeight;
    })
  );
  const observer = useRef(
    new IntersectionObserver((entries, obs) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setLimit((prev) => prev + 30);
        setNewLimit(true);
        obs.unobserve(entry.target);
      }
    })
  );

  useEffect(() => {
    const box2 = document.querySelector(".messagesContainer");
    if (box2) resizeObserver.current.observe(box2);

    if (!conversation?.Messages?.length || conversation?.Messages.length < 5) return;

    const elements = document.querySelectorAll(".message-container");

    const el = elements[elements.length - 4];

    const msg = conversation?.Messages[conversation?.Messages?.length - 4];

    if (observing.current === msg?.id || !msg?.id) {
      return;
    }

    observing.current = msg?.id;

    if (el) observer.current.observe(el);
  }, [conversation?.Messages]);

  useEffect(() => {
    setNewLimit(false);
    if (!isConnected || !visible) return;

    function onMessages({ user: eventUser, conversation: eventConversation }) {
      if (eventUser) setReceiver(eventUser);
      setConversation(eventConversation);

      if (loading) setLoading(false);
      if (eventConversation) socket.off("supportMessages", onMessages);
    }

    async function onMessage(message) {
      console.log("-------------------- message --------------------");
      console.log(message);
      setLimit((prev) => prev + 1);
      setConversation((prev) => {
        const newConv = JSON.parse(JSON.stringify(prev));
        if (newConv) newConv.Messages = [message, ...(newConv?.Messages || [])];
        return newConv;
      });
    }

    socket.emit("supportWatchSingle", id, limit);

    socket.on("supportMessages", onMessages);

    socket.on("supportMessage", onMessage);

    return () => {
      socket.emit("supportUnwatchSingle", id);
      socket.off("supportMessages");
      socket.off("supportMessage");
    };
  }, [isConnected, id, newLimit, visible]);

  useEffect(() => {
    function handleVisibilityChange(e) {
      if (e.target.visibilityState === "visible") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    function handleBlur() {
      setVisible(false);
    }

    function handleFocus() {
      setVisible(true);
    }

    // window.addEventListener("blur", handleBlur);
    // window.addEventListener("focus", handleFocus);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // window.removeEventListener("blur", handleBlur);
      // window.removeEventListener("focus", handleFocus);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (!receiver) {
    return (
      <div className="grid place-items-center m-2 py-10 px-10 rounded-lg bg-white shadow-md">
        <div className="">
          <img className="w-[150px] mx-auto " src={sad} alt="" />
          <h3 className="mt-8 font-medium text-slate-900 text-xl text-center ">Nous ne trouvons pas l'utilisateur demandé</h3>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 w-full py-2 px-3 mt-8 rounded-full bg-amber-400 hover:bg-amber-500 font-medium text-lg text-white cursor-pointer transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full scr1000:mx-2 py-2 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <div className="relative w-full h-full flex flex-col">
        <div className="relative flex justify-between items-center w-full py-2 px-4 rounded-lg bg-sky-600  shadow-lg break-anywhere">
          {/* <Link to="/customer/chat">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-white hover:scale-125 duration-300" />
          </Link> */}
          <button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-white hover:scale-125 duration-300" />
          </button>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            {receiver?.picture ? (
              <img
                src={`${BACKEND_URL}/uploads/profile-pictures/${receiver?.picture}`}
                alt="Profile picture"
                className="w-[30px] aspect-square rounded-[50%] border object-cover bg-white"
              />
            ) : (
              <UserCircleIcon className="w-[35px] text-white" />
            )}

            <span className="text-sm scr700:text-base font-medium scr700:font-bold  text-white text-lg text-center  capitalize line-clamp-1">
              {receiver?.username}
            </span>
          </div>
        </div>
        <MessagesBox user={receiver} messages={conversation?.Messages} limit={limit} />
        <SendMessageInput socket={socket} user={receiver} />
      </div>
    </div>
  );
}
