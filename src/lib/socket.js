import { io } from "socket.io-client";

// IMPORTANT: Use the full ngrok URL (https), include options to support WebRTC signaling
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"], // Ensure websocket connection
  secure: true,
});

export default socket;
