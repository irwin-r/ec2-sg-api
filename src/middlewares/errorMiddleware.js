const { Error: JSONAPIError } = require("jsonapi-serializer");

const onError = (handler, next) => {
  const { detail, message, statusCode } = handler.error;

  if (!(statusCode && message)) {
    return next(handler.error);
  }

  const body = JSON.stringify(
    new JSONAPIError({
      code: statusCode,
      detail,
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
