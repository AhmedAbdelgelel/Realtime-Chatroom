const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} = require("./utils/users");
dotenv.config();

// Init: Create Express app and Socket.io server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware: Setup JSON parsing and static file serving
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const botName = "ChatRoom Bot";

// WebSocket: Handle real-time chat connections
io.on("connection", (socket) => {
  // Handler: When user joins a chat room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Notifications: Welcome new user
    socket.emit("message", formatMessage(botName, "Welcome to chat room bro"));

    // Notifications: Alert others of new user
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat room`)
      );

    // Update: Send current room users list
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Handler: Process incoming chat messages
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    }
  });

  // Handler: Clean up when user disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat room`)
      );
      // Update: Refresh room users list
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// Server: Start listening on specified port
const port = process.env.PORT ?? 3000;
server.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

// Error Handling: Catch unhandled promise rejections
process.on("unhandledRejection", (err) => {
  server.close(() => {
    console.log("Unhandled Rejection! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
  });
});

// Error Handling: Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  server.close(() => {
    console.log("Uncaught Exception! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
  });
});
