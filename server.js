// server.js

const express = require("express");
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");


const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

// Initialize Next.js and Express server
app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new Server(server);

  // Setup Socket.IO
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Listen for events from clients
    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      // Broadcast message to all clients
      io.emit("message", msg);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Handle Next.js routing
  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3001;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
