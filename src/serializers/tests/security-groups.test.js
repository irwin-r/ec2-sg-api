const { expect } = require("chai");

const { randomNumber, randomString } = require("../../utils/random");

const SecurityGroupSerializer = require("../security-group");

const createDummyInputObject = () => ({
  Description: randomString(),
  GroupName: randomString(),
  OwnerId: randomString(),
  GroupId: randomString(),
  VpcId: randomString(),
});

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
      const dummyObject = createDummyInputObject();
      const serializedObject = SecurityGroupSerializer.serialize(dummyObject);

      expect(serializedObject).to.have.property("data");
      const { data } = serializedObject;

      expect(data.type).to.equal("security-group");

      expect(data).to.have.property("attributes");
      expectAttributes(dummyObject, data.attributes);
    });
  });

  describe("when an array of security groups is provided", () => {
    it("should create a JSON:API-compliant array of data objects", () => {
      const dummyObjects = new Array(randomNumber(5, 10))
        .fill()
        .map(createDummyInputObject);

      const serializedObject = SecurityGroupSerializer.serialize(dummyObjects);

      expect(serializedObject).to.have.property("data");
      const { data } = serializedObject;

      expect(data).to.have.lengthOf(dummyObjects.length);

      data.forEach((row, index) => {
        expect(row.type).to.equal("security-group");
        expect(row).to.have.property("attributes");
        expectAttributes(dummyObjects[index], row.attributes);
      });
    });
  });
});
