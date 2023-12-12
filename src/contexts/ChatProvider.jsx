import React, { useState, useContext, useEffect, useMemo } from "react";
import API from "../utils/API";
import axios from "axios";
import { socket } from "../lib/socket";
import { useAuthContext } from "./AuthProvider";

const ChatContext = React.createContext();

function playNotification() {
  const audio = new Audio("/notification.mp3");
  audio.play();
}

function ChatProvider({ children }) {
  const { user, setUser } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [openConversations, setOpenConversations] = useState([]);
  const [preTitle, setPreTitle] = useState("");
  const [joinSupport, setJoinSupport] = useState(false);
  const [supportConversations, setSupportConversations] = useState([]);

  const unread = useMemo(() => {
    if (conversations) {
      return conversations.reduce((total, conv) => (conv.seen === "both" || conv?.seen === user?.id + "" ? total : total + 1), 0);
    }
    return 0;
  }, [conversations, user]);
  useEffect(() => {}, [conversations]);

  async function onConversation(value) {
    if (!["both", user?.id + ""].includes(value.seen)) playNotification();

    setOpenConversations((prev) => {
      let found = false;
      // If the conversation is already open, we replace it with the new one
      const newConv = prev.map((el) => {
        if (el.id === value.id) {
          found = true;
          return value;
        } else {
          return el;
        }
      });

      // If the conversation is not open, we add it to the list
      if (!found) {
        newConv.push(value);
      }

      return newConv.slice(-5);
    });
    setConversations((prev) =>
      [value, ...prev.filter((conv) => conv.id !== value.id)].sort((a, b) => new Date(b.Messages[0].createdAt) - new Date(a.Messages[0].createdAt))
    );
  }

  useEffect(() => {
    socket.on("conversation", onConversation);

    return () => {
      socket.off("conversation", onConversation);
    };
  }, [conversations]);

  useEffect(() => {
    if (!user) {
      setOpenConversations([]);
      return;
    }

    async function onConversations(value) {
      setConversations(value);

      socket.off("conversations", onConversations);
    }

    socket._opts.query.token = `Bearer ${localStorage.getItem("ELCAMBA_token")}`;

    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("conversations", onConversations);

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");

      setConversations([]);
    };
  }, [user]);

  // -------------------- support section --------------------

  async function onSupportConversation(value) {
    if (!["both", user?.id + ""].includes(value.seen)) playNotification();

    setSupportConversations((prev) =>
      [value, ...prev.filter((conv) => conv.id !== value.id)].sort((a, b) => new Date(b.Messages[0].createdAt) - new Date(a.Messages[0].createdAt))
    );
  }

  useEffect(() => {
    socket.on("supportConversation", onSupportConversation);

    return () => {
      socket.off("supportConversation", onSupportConversation);
    };
  }, [supportConversations]);

  useEffect(() => {
    if (!joinSupport) return;

    socket.on("supportConversations", (conversations) => {
      setSupportConversations(conversations);
    });

    socket.emit("joinSupport");

    return () => {
      socket.off("supportConversations");
    };
  }, [joinSupport]);

  // -------------------- end of support section --------------------

  const value = {
    conversations,
    setConversations,
    isConnected,
    openConversations,
    setOpenConversations,
    unread,
    preTitle,
    setPreTitle,
    joinSupport,
    setJoinSupport,
    supportConversations,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;

export function useChatContext() {
  return useContext(ChatContext);
}
