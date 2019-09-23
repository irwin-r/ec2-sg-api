const middy = require("middy");
const status = require("http-status");

const { getSecurityGroups } = require("../aws");
const { errorMiddleware } = require("../middlewares");
const { SecurityGroupSerializer } = require("../serializers");
const { InternalServerError } = require("../utils/errors");

const list = async () => {
  const securityGroups = await getSecurityGroups();

  if (Array.isArray(securityGroups)) {
    throw new InternalServerError("Unable to retrieve security groups.");
  }

  return {
    statusCode: status.OK,
    body: JSON.stringify(SecurityGroupSerializer.serialize(securityGroups)),
  };
};

module.exports = middy(list).use(errorMiddleware());
