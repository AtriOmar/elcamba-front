import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(URL, {
  forceNew: true,
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
  query: {
    hi: "",
  },
});

socket.on("connect", () => console.log("connecting"));
