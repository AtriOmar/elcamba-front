import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../lib/socket";
import { useParams } from "react-router";
import Loader from "../../Loader";
import MessagesBox from "./MessagesBox";
import SendMessageInput from "./SendMessageInput";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useChatContext } from "../../../contexts/ChatProvider";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let currentBoxHeight;

export default function Chat() {
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setConversations, isConnected } = useChatContext();
  const { user, setUser } = useAuthContext();
  const [limit, setLimit] = useState(30);
  const [newLimit, setNewLimit] = useState(true);
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

    console.log(conversation?.Messages);
    if (!conversation?.Messages?.length || conversation?.Messages.length < 5) return;

    const elements = document.querySelectorAll(".message-container");

    const el = elements[elements.length - 4];

    const msg = conversation?.Messages[conversation?.Messages?.length - 4];

    if (observing.current === msg?.id || !msg?.id) {
      console.log("yes");
      return;
    }

    observing.current = msg?.id;

    if (el) observer.current.observe(el);
  }, [conversation?.Messages]);

  useEffect(() => {
    setNewLimit(false);
    if (!socket) return;

    function onMessages({ user: eventUser, conversation: eventConversation }) {
      if (eventUser) setReceiver(eventUser);
      setConversation(eventConversation);

      console.log("event conversation", eventConversation);

      if (loading) setLoading(false);
      if (eventConversation) socket.off("messages", onMessages);
    }

    async function onMessage(message) {
      console.log("new message");

      setLimit((prev) => prev + 1);
      setConversation((prev) => {
        const newConv = JSON.parse(JSON.stringify(prev));
        if (newConv) newConv.Messages = [message, ...(newConv?.Messages || [])];
        return newConv;
      });
    }

    socket.emit("watchSingle", id, limit);

    socket.on("messages", onMessages);

    socket.on("message", onMessage);

    return () => {
      socket.emit("unwatchSingle", id);
      socket.off("messages");
      socket.off("message");
    };
  }, [isConnected, id, newLimit]);

  if (loading) {
    return (
      <div className="grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (!receiver) return;

  return (
    <div className="h-full scr1000:mx-2 py-2 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <div className="relative w-full h-full flex flex-col">
        <div className="relative flex justify-between items-center w-full py-2 px-4 rounded-lg bg-sky-600  shadow-lg break-anywhere">
          <Link to="/customer/chat">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className="text-white hover:scale-125 duration-300" />
          </Link>
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

            <span className=" font-bold  text-white text-lg text-center  capitalize">{receiver?.username}</span>
          </div>
        </div>
        <MessagesBox user={receiver} messages={conversation?.Messages} limit={limit} />
        <SendMessageInput socket={socket} user={receiver} />
      </div>
    </div>
  );
}
