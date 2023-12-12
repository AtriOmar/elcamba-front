import React, { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import ConversationCard from "./ConversationCard";
import { useChatContext } from "../../../contexts/ChatProvider";
import { Helmet } from "react-helmet-async";

export default function ChatDashboard() {
  const { conversations, unread, preTitle } = useChatContext();

  return (
    <div className="flex flex-col my-2 scr1000:mx-2 py-6 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <Helmet>
        <title>{preTitle}ELCAMBA</title>
      </Helmet>
      <h2 className="z-10 sticky top-16 self-start w-fit px-4 py-2 mx-auto rounded-lg bg-white bg-opacity-75 font-bold capitalize text-2xl text-center text-sky-600">
        Mes discussions:
      </h2>
      {conversations?.length ? (
        <div className="flex flex-col gap-5 mt-5">
          {conversations?.map((conversation) => (
            <ConversationCard key={conversation?.id + conversation?.seen} conversation={conversation} />
          ))}
        </div>
      ) : (
        <div className="grow grid place-items-center py-20 px-6 font-bold text-gray-500 text-2xl text-center">Vous n'avez aucune discussion</div>
      )}
    </div>
  );
}
