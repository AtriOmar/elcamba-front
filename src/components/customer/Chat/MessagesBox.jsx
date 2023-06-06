import React, { useLayoutEffect, useMemo } from "react";
import MessageCard from "./MessageCard";
import RingLoader from "../../RingLoader";
import { useAuthContext } from "../../../contexts/AuthProvider";

export default function MessagesBox({ user: receiver, messages }) {
  const { user } = useAuthContext();
  var firstRender = useMemo(() => true, [receiver]);

  // scrolling to bottom when a new message arrives
  useLayoutEffect(() => {
    const messagesBox = document.querySelector(".messagesBox");
    const allMessages = document.querySelectorAll(".messageContainer");
    const lastMessage = allMessages[allMessages.length - 1];

    if (firstRender && messages?.length) {
      lastMessage?.scrollIntoView();
      //   setFirstRender(false);
      firstRender = false;
    }

    if (messagesBox.scrollHeight - messagesBox.clientHeight - messagesBox.scrollTop - (lastMessage?.scrollHeight || 0) < 5) {
      lastMessage?.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="grow overflow-y-auto pl-[140px] ml-[-140px] max-[600px]:scrollbar-none messagesBox relative" style={{ pointerEvents: "auto" }}>
      <div className="min-h-full flex flex-col justify-end px-1 pt-6 pb-3 pointer-events-auto min-w-[250px] messagesContainer">
        {
          <>
            <h1 className="text-center font-rubik font-bold text-slate-900 text-xl capitalize break-anywhere">{receiver?.username}</h1>
          </>
        }
        <div className={`${false ? "flex" : "hidden"} flex-col gap-2 items-center loading`}>
          <RingLoader width={30} height={30} color="#999" />
        </div>
        <div className="flex flex-col gap-[2px] mt-4">
          {messages?.map((message, index) => {
            if (
              (index === 0 || message?.createdAt - messages[index - 1]?.createdAt > 600000) &&
              new Date(message.createdAt).getDate() !== new Date().getDate()
            ) {
              return (
                <div key={message.id} className="thoughtContainer">
                  <p className="w-full text-center text-slate-600 text-sm font-medium mb-2">
                    {new Intl.DateTimeFormat("en-UK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.createdAt))}
                  </p>
                  <MessageCard message={message} user={user} />
                </div>
              );
            } else if (index === 0 || message?.createdAt - messages[index - 1]?.createdAt > 600000) {
              return (
                <div key={message.id} className="thoughtContainer">
                  <p className="w-full text-center text-slate-600 text-sm font-medium mb-2">
                    {new Intl.DateTimeFormat("en-UK", { timeStyle: "short" }).format(new Date(message.createdAt))}
                  </p>
                  <MessageCard message={message} user={user} />
                </div>
              );
            } else
              return (
                <div key={message.id} className="messageContainer">
                  <MessageCard message={message} user={user} />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
