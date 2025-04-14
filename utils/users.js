// Store: In-memory users array for active chat participants
const users = [];

// Add: Register new user joining a chat room
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Find: Get user object by their socket id
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// Remove: Delete user when they leave chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Filter: Get all users in a specific room
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
