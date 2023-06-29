import React, { useId } from "react";
import formatDate from "../../../lib/formatDate";
import { Tooltip } from "react-tooltip";
import { useAuthContext } from "../../../contexts/AuthProvider";

export default function MessageCard({ message }) {
  const { user } = useAuthContext();

  return (
    <div>
      <div
        id={`message-${message.id}`}
        className={`w-fit max-w-[85%] py-1 px-3 rounded-xl whitespace-pre-wrap break-all ${
          message.senderId === user.id ? "ml-auto bg-sky-600 text-white" : "bg-slate-300"
        } `}
      >
        {message.content}
      </div>
      <Tooltip anchorSelect={`#message-${message.id}`} content={formatDate(message.createdAt)} place="right" />
    </div>
  );
}
