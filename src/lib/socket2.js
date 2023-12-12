import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

var id = Cookies.get("connection_id");

if (!id) {
  id = uuidv4();
  Cookies.set("connection_id", id);
}

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_BACKEND_URL;

export const socket2 = io(URL + "/connections", {
  forceNew: true,
  query: {
    id,
  },
});

socket2.on("connect", () => console.log("connecting to connections socket"));
