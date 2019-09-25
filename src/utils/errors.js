const {
  constants: { HTTP_STATUS_INTERNAL_SERVER_ERROR },
} = require("http2");

class InternalServerError extends Error {
  constructor(detail) {
    super("Internal Server Error");
    this.statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
    this.detail = detail;
  }
}

module.exports = {
  InternalServerError,
};
