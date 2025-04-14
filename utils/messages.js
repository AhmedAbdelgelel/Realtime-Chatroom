// Helper: Format chat messages with timestamps
const moment = require("moment");

// Format: Create message object with username, text and current time
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMessage;
