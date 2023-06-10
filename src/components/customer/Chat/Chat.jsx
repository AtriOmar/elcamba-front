import React, { useState, useEffect } from "react";
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

export default function Chat() {
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setConversations, isConnected } = useChatContext();
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (!socket) return;

    function onMessages({ user: eventUser, conversation: eventConversation }) {
      console.log("-------------------- user --------------------");
      console.log(receiver);

      console.log("-------------------- conversation --------------------");
      console.log(eventConversation);

      if (eventUser) setReceiver(eventUser);
      setConversation(eventConversation);

      if (loading) setLoading(false);
      console.log("seen");
      console.log(eventConversation?.seen);
      if (eventConversation && !eventConversation?.seen?.includes?.(user?.id)) {
        setConversations((prev) => prev.map((conv) => (conv.id !== eventConversation.id ? conv : { ...conv, seen: conv.seen ? "both" : "" + user.id })));
      }
    }

    socket.emit("watchSingle", id);

    socket.on("messages", onMessages);

    return () => {
      socket.off("messages");
    };
  }, [isConnected]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full py-2 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <div className="relative w-full max-w-[100%] h-full flex flex-col">
        <div className="relative flex justify-between items-center w-full py-2 px-4 rounded-lg bg-sky-600  shadow-lg break-anywhere">
          {/* <div>
            <button
              onClick={() => setNotesLeftSidebarIsOpen(true)}
              className={`${notesLeftSidebarIsOpen ? "hidden" : ""} scr1100:hidden `}
            >
              <SidebarIcon className="h-[25px] fill-white rotate-180" />
            </button>
          </div> */}
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
        <MessagesBox user={user} messages={conversation?.Messages} />
        <SendMessageInput socket={socket} user={receiver} />
      </div>
    </div>
  );
}
