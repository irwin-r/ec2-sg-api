const isString = require("lodash/isString");
const jwt = require("jsonwebtoken");

const validateAuthorizationToken = (authorizationToken, key = process.env.JWT_KEY) => {
  if (!isString(authorizationToken)) {
    return false;
  }

  const [type, token] = authorizationToken.split(" ");

  if (type.toLowerCase() !== "bearer") {
    return false;
  }

  try {
    return jwt.verify(token, key);
  } catch (_) {
    // gracefully return in the event of an invalid token
    return false;
  }
};

module.exports = validateAuthorizationToken;
