const { generatePolicy } = require("../aws");
const validateAuthorizationToken = require("../utils/validateAuthorizationToken");

const PRINCIPAL_ID = "$everyone";

const authorizer = ({ authorizationToken, methodArn }, context, callback) => {
  const shouldAllow = validateAuthorizationToken(authorizationToken);

  const effect = shouldAllow ? "Allow" : "Deny";

  callback(null, generatePolicy(PRINCIPAL_ID, effect, methodArn));
};

module.exports = authorizer;
