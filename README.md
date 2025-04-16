# DevChat Hub 🚀

A modern, real-time chat platform designed specifically for developers to connect and collaborate. Built with Node.js and Socket.IO, DevChat Hub provides dedicated rooms for different programming languages, enabling developers to engage in focused discussions about their favorite technologies.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

## ✨ Features

- **🔄 Real-time Communication**: Instant message delivery using WebSocket connections
- **🏠 Language-Specific Rooms**: Dedicated spaces for JavaScript, Python, PHP, C#, Ruby, and Java discussions
- **👥 Active User Tracking**: Real-time display of current room participants
- **🔔 Smart Notifications**: Join/leave notifications to keep everyone informed
- **⏰ Message Timestamps**: Track conversation flow with accurate message timing
- **📱 Responsive Design**: Seamless experience across desktop and mobile devices
- **🎨 Clean UI**: Intuitive and modern user interface

## 🛠️ Tech Stack

- **Backend**
  - Node.js + Express.js for robust server architecture
  - Socket.IO for real-time, bidirectional communication
  - Moment.js for timestamp formatting
- **Frontend**
  - Pure HTML5 & CSS3 for lightweight performance
  - Modern JavaScript (ES6+)
  - Responsive design principles
- **Development**
  - Nodemon for development auto-reload
  - Environment variables for configuration
  - Error handling for stability

## 🚀 Quick Start

1. **Clone & Install**

   ```bash
   git clone https://github.com/AhmedAbdelgelel/Realtime-Chatroom.git
   cd Realtime-Chatroom
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file:

   ```
   PORT=3000
   NODE_ENV=development
   ```

3. **Launch**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

4. **Connect**: Open `http://localhost:3000` in your browser

## 💡 Usage

1. Choose your developer identity (username)
2. Select your preferred programming language room
3. Start collaborating with fellow developers
4. Use the "Leave Room" button to exit gracefully

## 📁 Project Structure

```
├── server.js           # Express & Socket.IO server setup
├── public/            # Frontend assets
│   ├── index.html     # Landing/Login page
│   ├── chat.html      # Main chat interface
│   ├── css/          # Styling
│   └── js/           # Client-side logic
└── utils/            # Helper functions
    ├── messages.js    # Message formatting
    └── users.js       # User management
```

## 🧑‍💻 Author

Ahmed Abdelgelel

## 📝 License

MIT
