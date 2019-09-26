const { expect } = require("chai");
const { before } = require("mocha");
const rewire = require("rewire");
const sinon = require("sinon");

const { generateMockMethodArn } = require("../../aws/tests/mocks");

const authorizer = rewire("../authorizer.js");

describe("Custom Authorizer", () => {
  let validateAuthorizationTokenStub;

  before(() => {
    validateAuthorizationTokenStub = sinon.stub();
    // eslint-disable-next-line no-underscore-dangle
    authorizer.__set__("validateAuthorizationToken", validateAuthorizationTokenStub);
  });

  describe("when a valid JWT is passed", () => {
    it("should respond with an authorization acknowledgement", done => {
      const methodArn = generateMockMethodArn();
      validateAuthorizationTokenStub.returns(true);

      authorizer({ methodArn }, null, (err, policy) => {
        expect(err).to.equal(null);
        expect(policy.principalId).to.equal("$everyone");

        const [statement] = policy.policyDocument.Statement;
        expect(statement.Effect).to.equal("Allow");
        expect(statement.Resource).to.equal(methodArn);

        done();
      });
    });
  });

  describe("when an invalid JWT is passed", () => {
    it("should respond with an unauthorised policy", done => {
      const methodArn = generateMockMethodArn();
      validateAuthorizationTokenStub.returns(false);

      authorizer({ methodArn }, null, (err, policy) => {
        expect(err).to.equal(null);
        expect(policy.principalId).to.equal("$everyone");

        const [statement] = policy.policyDocument.Statement;
        expect(statement.Effect).to.equal("Deny");
        expect(statement.Resource).to.equal(methodArn);

        done();
      });
    });
  });
});
