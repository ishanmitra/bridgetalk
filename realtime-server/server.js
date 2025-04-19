const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow requests from your frontend (or just '*')
app.use(cors({
  origin: "*", // or specify http://localhost:5173
  methods: ["GET", "POST"]
}));

const io = new Server(server, {
  cors: {
    origin: "*", // adjust for prod
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("chat-message", ({ roomId, message }) => {
    console.log("Broadcasting message:", message);
    io.to(roomId).emit("chat-message", { message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("offer", ({ offer, roomId }) => {
    console.log("Relaying offer");
    socket.to(roomId).emit("offer", { offer });
  });

  socket.on("answer", ({ answer, roomId }) => {
    console.log("Relaying answer");
    socket.to(roomId).emit("answer", { answer });
  });

  socket.on("ice-candidate", ({ candidate, roomId }) => {
    console.log("Relaying ICE candidate");
    socket.to(roomId).emit("ice-candidate", { candidate });
  });
});

server.listen(3001, () => console.log("Socket server running on :3001"));
