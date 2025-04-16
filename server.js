const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const Logger = require("./services/loggerService");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} = require("./utils/users");
dotenv.config();

const logger = new Logger("socket");

// Init: Create Express app and Socket.io server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

logger.info("Server initialized");

// Middleware: Setup JSON parsing and static file serving
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const botName = "ChatRoom Bot";

// WebSocket: Handle real-time chat connections
io.on("connection", (socket) => {
  // Handler: When user joins a chat room
  socket.on("joinRoom", ({ username, room }) => {
    try {
      const user = userJoin(socket.id, username, room);
      logger.info("User joined chat room", { user });

      socket.join(user.room);

      // Notifications: Welcome new user
      socket.emit(
        "message",
        formatMessage(botName, "Welcome to chat room bro")
      );

      // Notifications: Alert others of new user
      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage(botName, `${user.username} has joined the chat room`)
        );

      // Update: Send current room users list
      const roomUsers = getRoomUsers(user.room);
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: roomUsers,
      });
    } catch (error) {
      logger.error("Error in joinRoom handler", {
        error: error.message,
        username,
        room,
      });
    }
  });

  // Handler: Process incoming chat messages
  socket.on("chatMessage", (msg) => {
    try {
      const user = getCurrentUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", formatMessage(user.username, msg));
      } else {
        logger.warn("Message received from unknown user", {
          socketId: socket.id,
        });
      }
    } catch (error) {
      logger.error("Error processing chat message", {
        error: error.message,
        socketId: socket.id,
      });
    }
  });

  // Handler: Clean up when user disconnects
  socket.on("disconnect", () => {
    try {
      const user = userLeave(socket.id);
      logger.info("Socket disconnected", { socketId: socket.id });

      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage(botName, `${user.username} has left the chat room`)
        );

        // Update: Refresh room users list
        const roomUsers = getRoomUsers(user.room);
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: roomUsers,
        });
      }
    } catch (error) {
      logger.error("Error handling disconnect", {
        error: error.message,
        socketId: socket.id,
      });
    }
  });
});

// Server: Start listening on specified port
const port = process.env.PORT ?? 3000;
server.listen(port, () => {
  logger.info(`Server started successfully`, {
    port,
    environment: process.env.NODE_ENV,
  });
});

// Error Handling: Catch unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.fatal("Unhandled Promise Rejection", {
    error: err.message,
    name: err.name,
  });
  server.close(() => {
    process.exit(1);
  });
});

// Error Handling: Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.fatal("Uncaught Exception", { error: err.message, name: err.name });
  server.close(() => {
    process.exit(1);
  });
});
