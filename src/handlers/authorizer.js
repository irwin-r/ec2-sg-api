const { generatePolicy } = require("../aws");

const PRINCIPAL_ID = "user";

const BEARER_TOKEN = "Bearer";
const ACCEPTED_TOKENS = ["CloudConformity", "IrwinIsCool"];

const authorizer = ({ authorizationToken, methodArn }, context, callback) => {
  const [type, token] = authorizationToken.split(" ");

  // In the real world, we'd be validating the bearer token instead of this very secure line of code :p
  const shouldAllow = type === BEARER_TOKEN && ACCEPTED_TOKENS.includes(token);

  if (shouldAllow) {
    callback(null, generatePolicy(PRINCIPAL_ID, "Allow", methodArn));
  } else {
    callback(null, generatePolicy(PRINCIPAL_ID, "Deny", methodArn));
  }
};

module.exports = authorizer;
