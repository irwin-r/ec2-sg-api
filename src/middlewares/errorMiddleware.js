const { Error: JSONAPIError } = require("jsonapi-serializer");
const status = require("http-status");

const onError = (handler, next) => {
  const { detail, message, statusCode } = handler.error;

  if (!(statusCode && message)) {
    return next(handler.error);
  }

  const body = JSON.stringify(
    new JSONAPIError({
      code: statusCode,
      detail: detail || status[`${statusCode}_MESSAGE`],
      title: message,
    })
  );

  // eslint-disable-next-line no-param-reassign
  handler.response = {
    body,
    statusCode,
  };

  return next();
};

module.exports = () => ({
  onError,
});
