# Real-time Programming Chat Room

A real-time chat application built with Node.js, Express, and Socket.IO that allows developers to join language-specific chat rooms and communicate instantly.

## Features

- Real-time messaging using WebSocket connections
- Dedicated chat rooms for different programming languages (JavaScript, Python, PHP, C#, Ruby, Java)
- User join/leave notifications
- Active users list for each room
- Responsive design for both desktop and mobile
- Message timestamps
- Clean and intuitive UI

## Tech Stack

- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.IO
- **Frontend**: HTML, CSS, JavaScript
- **Time Formatting**: Moment.js

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AhmedAbdelgelel/Realtime-Chatroom.git
cd Realtime-Chatroom
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
NODE_ENV=development
```

4. Start the application:

For development (with auto-reload):
```bash
npm run dev
```

For production:
```bash
npm start
```

5. Open `http://localhost:3000` in your browser

## Usage

1. Enter your username on the home page
2. Select a programming language room from the dropdown
3. Start chatting with other developers in real-time
4. Use the "Leave Room" button to exit the chat

## Project Structure

```
├── server.js           # Main server file with Socket.IO setup
├── public/            # Static frontend files
│   ├── index.html     # Landing page
│   ├── chat.html      # Chat interface
│   ├── css/
│   │   └── style.css  # Styles
│   └── js/
│       └── main.js    # Frontend Socket.IO logic
└── utils/
    ├── messages.js    # Message formatting
    └── users.js       # User management
```

## Author

Ahmed Abdelgelel

## License

MIT