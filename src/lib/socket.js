import { io } from "socket.io-client";
console.log("Socket URL:", import.meta.env.VITE_SOCKET_URL);
const socket = io(import.meta.env.VITE_SOCKET_URL); // change if deploying
export default socket;