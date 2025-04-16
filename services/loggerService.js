const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

class LoggerService {
  constructor(route) {
    this.route = route;
    const logger = winston.createLogger({
      level: process.env.NODE_ENV === "development" ? "info" : "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route} | ${
            info.message
          }`;
          return info.obj
            ? message + ` data: ${JSON.stringify(info.obj, null, 2)}`
            : message;
        })
      ),
      transports: [
        // Console transport removed to disable terminal logging
        new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH}/error_${route}.log`,
          level: "error",
        }),
        new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH}/${route}.log`,
        }),
      ],
    });
    this.logger = logger;
  }

  info(message, obj = null) {
    this.logger.log("info", message, { obj });
  }

  error(message, obj = null) {
    this.logger.log("error", message, { obj });
  }

  warn(message, obj = null) {
    this.logger.log("warn", message, { obj });
  }

  trace(message, obj = null) {
    if (process.env.NODE_ENV === "development") {
      this.logger.log("info", `TRACE: ${message}`, { obj });
    }
  }

  fatal(message, obj = null) {
    this.logger.log("error", `FATAL: ${message}`, { obj });
    process.exit(1);
  }
}

module.exports = LoggerService;
