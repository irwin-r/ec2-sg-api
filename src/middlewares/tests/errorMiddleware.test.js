const { expect } = require("chai");
const sinon = require("sinon");

const { randomNumber, randomString } = require("../../utils/random");

const errorMiddleware = require("../errorMiddleware");

describe("Error Middleware", () => {
  const { onError } = errorMiddleware();

  describe("when a non-http error is provided", () => {
    it("should ignore the error", () => {
      const next = sinon.fake();

      onError({ error: {} }, next);

      sinon.assert.calledWithExactly(next, {});
    });
  });

  describe("when a http error is provided", () => {
    it("should provide a JSON:API error response", () => {
      const next = sinon.fake();

      const detail = randomString();
      const message = randomString();
      const statusCode = randomNumber(100, 500);

      const handler = { error: { detail, message, statusCode } };

      onError(handler, next);

      sinon.assert.calledWithExactly(next);

      expect(handler).to.have.property("response");

      const { response } = handler;

      expect(response.statusCode).to.equal(statusCode);

      const responseBody = JSON.parse(response.body);

      expect(responseBody).to.have.property("errors");
      expect(responseBody.errors).to.have.lengthOf(1);

      const [errorBody] = responseBody.errors;

      expect(errorBody.code).to.equal(statusCode);
      expect(errorBody.detail).to.equal(detail);
      expect(errorBody.title).to.equal(message);
    });
  });
});
