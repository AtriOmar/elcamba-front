import React, { useEffect, useState } from "react";
import { socket } from "../../../lib/socket";
import ConversationCard from "./ConversationCard";
import { useChatContext } from "../../../contexts/ChatProvider";

export default function SupportDashboard() {
  const { joinSupport, setJoinSupport, supportConversations } = useChatContext();

  useEffect(() => {
    if (!joinSupport) setJoinSupport(true);
  }, []);

  return (
    <div className="flex flex-col min-h-full rounded-lg p-3 bg-white shadow-card1">
      {supportConversations?.length ? (
        <div className="flex flex-col gap-5 mt-5">
          {supportConversations?.map((conversation) => (
            <ConversationCard key={conversation?.id + conversation?.seen} conversation={conversation} />
          ))}
        </div>
      ) : (
        <div className="grow grid place-items-center py-20 px-6 font-bold text-gray-500 text-2xl text-center">Vous n'avez aucune discussion</div>
      )}
    </div>
  );
}
