class BaseError extends Error {
  constructor(name, statusCode, message, isOperational) {
    super(message);
    (this.name = name),
      (this.statusCode = statusCode),
      (this.isOperational = isOperational);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = BaseError;
