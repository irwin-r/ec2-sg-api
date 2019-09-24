const status = require("http-status");

class InternalServerError extends Error {
  constructor(detail = status[`${status.INTERNAL_SERVER_ERROR}_MESSAGE`]) {
    super(status[status.INTERNAL_SERVER_ERROR]);
    this.statusCode = status.INTERNAL_SERVER_ERROR;
    this.detail = detail;
  }
}

module.exports = {
  InternalServerError,
};
