const { expect } = require("chai");

const { generateMockSecurityGroup, generateMockSecurityGroups } = require("../../aws/tests/mocks");

const SecurityGroupSerializer = require("../security-group");

const expectAttributes = (inputObject, attributes) => {
  expect(attributes.description).to.equal(inputObject.Description);
  expect(attributes["group-id"]).to.equal(inputObject.GroupId);
  expect(attributes["group-name"]).to.equal(inputObject.GroupName);
  expect(attributes["owner-id"]).to.equal(inputObject.OwnerId);
  expect(attributes["vpc-id"]).to.equal(inputObject.VpcId);
};

describe("SecurityGroup Serializer", () => {
  describe("when a single security group is provided", () => {
    it("should create a JSON:API-compliant data object", () => {
      const securityGroup = generateMockSecurityGroup();
      const serializedObject = SecurityGroupSerializer.serialize(securityGroup);

      expect(serializedObject).to.have.property("data");
      const { data } = serializedObject;

      expect(data.type).to.equal("security-group");

      expect(data).to.have.property("attributes");
      expectAttributes(securityGroup, data.attributes);
    });
  });

  describe("when an array of security groups is provided", () => {
    it("should create a JSON:API-compliant array of data objects", () => {
      const securityGroups = generateMockSecurityGroups();

      const serializedObject = SecurityGroupSerializer.serialize(securityGroups);

      expect(serializedObject).to.have.property("data");
      const { data } = serializedObject;

      expect(data).to.have.lengthOf(securityGroups.length);

      data.forEach((row, index) => {
        expect(row.type).to.equal("security-group");
        expect(row).to.have.property("attributes");
        expectAttributes(securityGroups[index], row.attributes);
      });
    });
  });
});
