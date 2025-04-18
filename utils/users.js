import Logger from "../services/loggerService.js";
const logger = new Logger("users");

const users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  logger.info("New user registered", { user });
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users.splice(index, 1)[0];
    logger.info("User removed from chat", { user });
    return user;
  }
  logger.warn("Attempt to remove non-existent user", { id });
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

export { userJoin, getCurrentUser, userLeave, getRoomUsers };
