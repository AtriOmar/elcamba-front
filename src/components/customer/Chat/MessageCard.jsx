import React from "react";

export default function MessageCard({ message, user }) {
  return (
    <div
      className={`w-fit py-1 px-3 rounded-xl whitespace-pre-wrap break-all ${message.senderId === user.id ? "ml-auto bg-sky-600 text-white" : "bg-slate-300"} `}
    >
      {message.content}
    </div>
  );
}
