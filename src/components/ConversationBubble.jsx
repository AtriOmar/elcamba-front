import { UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useAuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useChatContext } from "../contexts/ChatProvider";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ConversationBubble({ conversation }) {
  const { user } = useAuthContext();
  const { setOpenConversations } = useChatContext();

  if (!user) return;

  const otherUser = useMemo(() => (conversation?.User1?.id === user?.id ? conversation?.User2 : conversation?.User1), [conversation]);

  return (
    <div>
      <div className="relative" id={`bubble-${conversation?.id}`}>
        <button
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 grid place-items-center w-6 h-6 rounded-[50%] bg-blue-500 hover:bg-blue-700 shadow-lg"
          onClick={() => {
            setOpenConversations((prev) => prev.filter((el) => el.id !== conversation.id));
          }}
        >
          <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
        </button>
        <p
          className={`absolute -top-2 -left-2 drop-shadow font-bold text-xs text-red-500 ${
            conversation.seen === "both" || conversation?.seen === user.id + "" ? "hidden" : ""
          }`}
        >
          Nouv
        </p>
        <Link to={`/customer/chat/${otherUser?.id}`} className="flex items-center">
          {otherUser?.picture ? (
            <img
              src={`${BACKEND_URL}/uploads/profile-pictures/${otherUser?.picture}`}
              alt="Profile picture"
              className="w-[60px] aspect-square rounded-[50%] border-2 border-slate-300 object-cover bg-white"
            />
          ) : (
            <UserCircleIcon className="w-[60px] text-sky-700" />
          )}
        </Link>
      </div>
      <Tooltip
        anchorSelect={`#bubble-${conversation?.id}`}
        content={
          <div>
            <p className="capitalize">{otherUser?.username}</p>
            <p>"{conversation?.Messages?.[0]?.content || ""}"</p>
          </div>
        }
        place="left"
      />
    </div>
  );
}
