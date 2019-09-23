const { Serializer } = require("jsonapi-serializer");

module.exports = new Serializer("security-group", {
  attributes: ["Description", "GroupName", "OwnerId", "GroupId", "VpcId"],
  pluralizeType: false,
});
