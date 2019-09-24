const { generatePolicy } = require("../aws");

const PRINCIPAL_ID = "user";

const BEARER_TOKEN = "Bearer";

// You should NEVER store secrets in repos
// except in the case of technical tests, where you're showcasing your godly security
const ACCEPTED_TOKENS = ["CloudConformity", "IrwinIsCool"];

const authorizer = ({ authorizationToken, methodArn }, context, callback) => {
  const [type, token] = authorizationToken.split(" ");

  // In the real world, we'd be validating the bearer token against a DB or a JWT private key
  const shouldAllow = type === BEARER_TOKEN && ACCEPTED_TOKENS.includes(token);
  const effect = shouldAllow ? "Allow" : "Deny";

  callback(null, generatePolicy(PRINCIPAL_ID, effect, methodArn));
};

module.exports = authorizer;
