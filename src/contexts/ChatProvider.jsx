import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";
import { socket } from "../lib/socket";
import { useAuthContext } from "./AuthProvider";

const ChatContext = React.createContext();

function ChatProvider({ children }) {
  const { user, setUser } = useAuthContext();
  const [conversations, setConversations] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [openConversations, setOpenConversations] = useState([]);

  async function onConversation(value) {
    setOpenConversations((prev) => {
      let found = false;
      const newConv = prev.map((el) => {
        if (el.id === value.id) {
          found = true;
          return value;
        } else {
          return el;
        }
      });

      if (!found) {
        newConv.push(value);
      }

      return newConv.slice(-5);
    });
    setConversations((prev) => [value, ...prev.filter((conv) => conv.id !== value.id)]);
  }

  useEffect(() => {
    socket.on("conversation", onConversation);

    return () => {
      socket.off("conversation", onConversation);
    };
  }, [conversations]);

  useEffect(() => {
    console.log("user", user);
    if (!user) {
      setOpenConversations([]);
      return;
    }

    async function onConversations(value) {
      console.log("conversations", value);
      setConversations(value);

      socket.off("conversations", onConversations);
    }

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

  const value = {
    conversations,
    setConversations,
    isConnected,
    openConversations,
    setOpenConversations,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;

export function useChatContext() {
  return useContext(ChatContext);
}
