import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import RingLoader from "../../RingLoader";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { useChatContext } from "../../../contexts/ChatProvider";
import formatDate from "../../../lib/formatDate";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let prevReceiver = -1;

export default function MessagesBox({ user: receiver, messages, limit }) {
  const { user } = useAuthContext();
  const [firstRender, setFirstRender] = useState(true);
  const { isConnected } = useChatContext();

  useEffect(() => {
    if (!receiver) return;

    if (prevReceiver === receiver?.id) return;

    setFirstRender(true);
    prevReceiver = receiver?.id;
  }, [receiver?.id]);

  useEffect(() => {
    console.log("id", receiver.id);

    console.log("first render", firstRender);
  }, [firstRender]);

  useEffect(() => {
    console.log("isconnected", isConnected);
  }, [isConnected]);

  // scrolling to bottom when a new message arrives
  useLayoutEffect(() => {
    const messagesBox = document.querySelector(".messagesBox");
    const allMessages = document.querySelectorAll(".message-container");
    const lastMessage = allMessages[0];

    if (firstRender && messages?.length) {
      lastMessage?.scrollIntoView();
      //   setFirstRender(false);
      // firstRender = false;
      setFirstRender(false);
    }

    if (messagesBox.scrollHeight - messagesBox.clientHeight - messagesBox.scrollTop - (lastMessage?.scrollHeight || 0) < 5) {
      lastMessage?.scrollIntoView();
    }
  }, [messages, firstRender]);

  // console.log(new Date(messages[0]?.createdAt).getTime() - new Date(messages[1]?.createdAt).getTime());

  console.log("limit", limit, "length", messages?.length);

  return (
    <div className="grow h-0 overflow-y-scroll pl-[140px] ml-[-140px] max-[600px]:scrollbar-none messagesBox relative" style={{ pointerEvents: "auto" }}>
      <div className="flex flex-col justify-end min-h-full px-1 pb-3 pointer-events-auto min-w-[250px] messagesContainer">
        {limit > (messages?.length || 0) && (
          <div className="flex flex-col items-center gap-2 mt-6">
            {receiver?.picture ? (
              <img
                src={`${BACKEND_URL}/uploads/profile-pictures/${receiver?.picture}`}
                alt="Profile picture"
                className="w-[125px] aspect-square rounded-[50%] border object-cover"
              />
            ) : (
              <UserCircleIcon className="w-[125px] aspect-square" />
            )}
            <h1 className="font-rubik font-bold text-slate-900 text-xl capitalize break-anywhere">{receiver?.username}</h1>
          </div>
        )}
        <div className={`${false ? "flex" : "hidden"} flex-col gap-2 items-center loading`}>
          <RingLoader width={30} height={30} color="#999" />
        </div>
        <div className="flex flex-col-reverse gap-[2px] mt-4">
          {messages?.map((message, index) => {
            if (
              (index === messages.length - 1 || new Date(message?.createdAt).getTime() - new Date(messages[index + 1]?.createdAt).getTime() > 600000) &&
              new Date(message.createdAt).getDate() !== new Date().getDate()
            ) {
              return (
                <div key={message.id} className="message-container">
                  <p className="w-full text-center text-slate-600 text-sm font-medium mb-2">{formatDate(message.createdAt)}</p>
                  <MessageCard message={message} user={user} />
                </div>
              );
            } else if (index === messages.length - 1 || new Date(message?.createdAt).getTime() - new Date(messages[index + 1]?.createdAt).getTime() > 600000) {
              return (
                <div key={message.id} className="message-container">
                  <p className="w-full text-center text-slate-600 text-sm font-medium mb-2">{formatDate(message.createdAt)}</p>
                  <MessageCard message={message} user={user} />
                </div>
              );
            } else
              return (
                <div key={message.id} className="message-container">
                  <MessageCard message={message} />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
