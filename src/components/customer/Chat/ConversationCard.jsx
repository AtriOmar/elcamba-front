import React from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";

export default function ConversationCard({ conversation }) {
  const { user } = useAuthContext();

  if (!conversation) return;

  return (
    <Link
      to={"/customer/chat/" + (conversation.User1.id === user.id ? conversation.User2.id : conversation.User1.id)}
      className="relative block grow max-w-[400px] py-3 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 hover:shadow-card2 duration-300"
    >
      <p className={`absolute top-1 right-2 font-bold text-xs ${conversation.seen === "both" || conversation.seen?.includes(user.id) ? "hidden" : ""}`}>Nouv</p>
      <h3 className="font-semibold text-sky-800">{conversation.User1.id === user.id ? conversation.User2.username : conversation.User1.username}</h3>
      <p className=" text-slate-700 break-all line-clamp-3">
        {conversation.Messages?.[0].senderId === user.id ? <span className="font-medium">Vous: </span> : ""}
        {conversation.Messages?.[0].content}
      </p>
      <p className="text-slate-500">
        {new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(conversation.Messages?.[0].createdAt))}
      </p>
    </Link>
  );
}
