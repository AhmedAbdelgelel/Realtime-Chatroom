// DOM: Get UI elements
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const leaveBtn = document.getElementById("leave-btn");

// Parse: Extract username and room from URL params
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Socket: Create WebSocket connection
const socket = io();

// Join: Send room join request to server
socket.emit("joinRoom", { username, room });

// Update: Handle room users list updates
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Listen: Receive and display new messages
socket.on("message", (message) => {
  outputMessage(message);
  // Auto-scroll chat to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Submit: Handle sending new messages
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
  // Clear input after sending
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Exit: Handle room leave button
leaveBtn.addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  }
});

// UI: Display received message in chat
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// UI: Update room name display
function outputRoomName(room) {
  roomName.innerText = room;
}

// UI: Update users list display
function outputUsers(users) {
  userList.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`;
}
