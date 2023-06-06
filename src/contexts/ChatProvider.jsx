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

  useEffect(() => {
    console.log("user", user);
    if (!user) return;

    async function onConversations(value) {
      console.log("conversations", value);
      setConversations(value);
    }

    socket.connect();

    socket.on("conncect", () => {
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
      socket.off("conversations", onConversations);
      setConversations([]);
    };
  }, [user]);

  const value = {
    conversations,
    setConversations,
    isConnected,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;

export function useChatContext() {
  return useContext(ChatContext);
}
