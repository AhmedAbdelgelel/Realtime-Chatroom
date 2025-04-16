const Logger = require("../services/loggerService");
const logger = new Logger("users");

// Store: In-memory users array for active chat participants
const users = [];

// Add: Register new user joining a chat room
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  logger.info("New user registered", { user });
  return user;
}

// Find: Get user object by their socket id
function getCurrentUser(id) {
  const user = users.find((user) => user.id === id);
  logger.debug("User lookup by ID", { id, found: !!user });
  return user;
}

// Remove: Delete user when they leave chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users.splice(index, 1)[0];
    logger.info("User removed from chat", { user });
    return user;
  }
  logger.warn("Attempt to remove non-existent user", { id });
}

// Filter: Get all users in a specific room
function getRoomUsers(room) {
  const roomUsers = users.filter((user) => user.room === room);
  logger.debug("Room users retrieved", { room, userCount: roomUsers.length });
  return roomUsers;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
