const { expect } = require("chai");
const { afterEach, before, beforeEach } = require("mocha");
const {
  constants: { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK },
} = require("http2");
const rewire = require("rewire");
const sinon = require("sinon");

const { generateMockSecurityGroups } = require("../../aws/tests/mocks");
const { SecurityGroupSerializer } = require("../../serializers");

const list = rewire("../list.js");

describe("List Endpoint", () => {
  let getSecurityGroupsStub;

  const headers = {
    "Content-Type": "application/vnd.api+json",
  };

  before(() => {
    getSecurityGroupsStub = sinon.stub();
    // eslint-disable-next-line no-underscore-dangle
    list.__set__("getSecurityGroups", getSecurityGroupsStub);
  });

  beforeEach(() => getSecurityGroupsStub.reset());
  afterEach(() => getSecurityGroupsStub.reset());

  describe("when security groups are successfully retrieved", () => {
    it("should return a valid JSON:API response with the security group data", done => {
      const securityGroups = generateMockSecurityGroups();
      const serializedSecurityGroups = SecurityGroupSerializer.serialize(securityGroups);

      getSecurityGroupsStub.returns(securityGroups);

      list({ event: { headers } }, null, (error, success) => {
        expect(error).to.equal(null);
        expect(success.statusCode).to.equal(HTTP_STATUS_OK);
        expect(success.body).to.equal(JSON.stringify(serializedSecurityGroups));
        done();
      });
    });
  });

  describe("when security groups cannot be successfully received", () => {
    it("should return an internal server error and a JSON:API error response", done => {
      getSecurityGroupsStub.returns(undefined);

      list({ event: { headers } }, null, (error, response) => {
        const body = JSON.parse(response.body);
        expect(body).to.have.property("errors");

        const { errors } = body;
        expect(errors).to.have.lengthOf(1);

        const [errorResponse] = errors;
        expect(errorResponse.code).to.equal(HTTP_STATUS_INTERNAL_SERVER_ERROR);
        expect(errorResponse.detail).to.equal("Unable to retrieve security groups.");
        expect(errorResponse.title).to.equal("Internal Server Error");
        done();
      });
    });
  });
});
