const status = require("http-status");

class InternalServerError extends Error {
  constructor(message, ...rest) {
    super(message, ...rest);

    this.detail =
      typeof message === "string"
        ? message
        : status[`${status.INTERNAL_SERVER_ERROR}_MESSAGE`];

    this.message = status[status.INTERNAL_SERVER_ERROR];
    this.statusCode = status.INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  InternalServerError,
};
