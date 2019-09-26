const middy = require("middy");
const { httpContentNegotiation, httpHeaderNormalizer } = require("middy/middlewares");
const {
  constants: { HTTP_STATUS_OK },
} = require("http2");

const { getSecurityGroups } = require("../aws");
const { errorMiddleware } = require("../middlewares");
const { SecurityGroupSerializer } = require("../serializers");
const { InternalServerError } = require("../utils/errors");

const list = async () => {
  const securityGroups = await getSecurityGroups();

  if (!Array.isArray(securityGroups)) {
    throw new InternalServerError("Unable to retrieve security groups.");
  }

  return {
    statusCode: HTTP_STATUS_OK,
    body: JSON.stringify(SecurityGroupSerializer.serialize(securityGroups)),
  };
};

module.exports = middy(list)
  .use(httpHeaderNormalizer())
  .use(httpContentNegotiation({ availableMediaTypes: ["application/vnd.api+json"] }))
  .use(errorMiddleware());
