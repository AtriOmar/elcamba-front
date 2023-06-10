import React, { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import ConversationCard from "./ConversationCard";
import { useChatContext } from "../../../contexts/ChatProvider";

export default function ChatDashboard() {
  const { conversations } = useChatContext();

  return (
    <div className="min-h-full py-6 px-3 scr1000:px-6 rounded-lg bg-white shadow-md">
      <h2 className="z-10 sticky top-5 self-start w-fit px-4 py-2 mx-auto rounded-lg bg-white bg-opacity-75 font-bold capitalize text-2xl text-center text-sky-600">
        Mes discussions:
      </h2>
      <div className="flex flex-col gap-5 mt-5">
        {conversations?.map((conversation) => (
          <ConversationCard key={conversation?.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}
