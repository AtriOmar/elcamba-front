import React, { useMemo } from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import formatDate from "../../../lib/formatDate";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ConversationCard({ conversation }) {
  const { user } = useAuthContext();
  const otherUser = useMemo(() => (conversation?.User1?.id === user?.id ? conversation?.User2 : conversation?.User1), [conversation]);

  console.log("conversation", conversation);
  console.log(conversation.seen === user.id + "");

  if (!conversation) return;

  return (
    <Link
      to={"/customer/chat/" + otherUser?.id}
      className="relative block grow max-w-[400px] py-3 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 hover:shadow-card2 duration-300"
    >
      <p className={`absolute top-1 right-2 font-bold text-xs ${conversation.seen === "both" || conversation.seen === user.id + "" ? "hidden" : ""}`}>Nouv</p>
      <div className="flex items-center gap-3">
        {otherUser?.picture ? (
          <img
            src={`${BACKEND_URL}/uploads/profile-pictures/${otherUser?.picture}`}
            alt="Profile picture"
            className="w-[35px] aspect-square rounded-[50%] border object-cover bg-white"
          />
        ) : (
          <UserCircleIcon className="w-[35px] text-sky-700" />
        )}
        <h3 className="font-semibold text-sky-800 capitalize">{otherUser?.username}</h3>
      </div>
      {conversation?.Messages?.[0] ? (
        <>
          <p className=" text-slate-700 break-all line-clamp-3">
            {conversation?.Messages?.[0]?.senderId === user.id ? <span className="font-medium">Vous: </span> : ""}
            {conversation?.Messages?.[0]?.content}
          </p>
          <p className="text-slate-500">{formatDate(conversation?.Messages?.[0].createdAt)}</p>
        </>
      ) : (
        ""
      )}
    </Link>
  );
}
