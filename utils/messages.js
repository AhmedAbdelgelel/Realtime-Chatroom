const moment = require("moment");
const Logger = require("../services/loggerService");
const logger = new Logger("messages");

// Format: Create message object with username, text and current time
function formatMessage(username, text) {
  const message = {
    username,
    text,
    time: moment().format("h:mm a"),
  };
  logger.debug("Message formatted", { username, timestamp: message.time });
  return message;
}

module.exports = formatMessage;
