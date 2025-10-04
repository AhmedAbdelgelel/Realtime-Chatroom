class ApiError extends BaseError {
  constructor(name, statusCode, message, isOperational) {
    super(name, statusCode, message, isOperational);
  }
}
module.exports = ApiError;
