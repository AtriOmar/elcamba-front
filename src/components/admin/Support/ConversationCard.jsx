import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import formatDate, { formatDateRelative } from "../../../lib/formatDate";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ConversationCard({ conversation }) {
  const { user } = useAuthContext();
  const otherUser = useMemo(() => (conversation?.User1?.id === 0 ? conversation?.User2 : conversation?.User1), [conversation]);
  const [formattedDate, setFormattedDate] = useState(formatDateRelative(conversation?.Messages?.[0].createdAt));

  useEffect(() => {
    setFormattedDate(formatDateRelative(conversation?.Messages?.[0].createdAt));
    const interval = setInterval(() => {
      setFormattedDate(formatDateRelative(conversation?.Messages?.[0].createdAt));
    }, 30000);

    return () => clearInterval(interval);
  }, [conversation]);

  if (!conversation) return;

  return (
    <Link
      to={"/admin/support/" + otherUser?.id}
      className="relative block grow max-w-[400px] py-3 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 hover:shadow-card2 duration-300"
    >
      <p className={`absolute top-1 right-2 font-bold text-xs ${conversation.seen === "both" || conversation.seen === "0" ? "hidden" : ""}`}>Nouv</p>
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
          <p className="text-slate-500">{formattedDate}</p>
        </>
      ) : (
        ""
      )}
    </Link>
  );
}
