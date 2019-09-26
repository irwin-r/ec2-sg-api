const { expect } = require("chai");
const faker = require("faker");
const jwt = require("jsonwebtoken");

const validateAuthorizationToken = require("../validateAuthorizationToken");

describe("validateAuthorizationToken", () => {
  describe("when a valid JWT is passed", () => {
    it("should return the decrypted JWT", () => {
      const key = faker.internet.password();
      const body = { [faker.random.word()]: faker.random.words() };
      const token = jwt.sign(body, key, { expiresIn: "1y" });
      const authorizationToken = `Bearer ${token}`;

      const validated = validateAuthorizationToken(authorizationToken, key);

      expect(validated).to.not.equal(false);
      expect(validated).to.own.include(body);
    });
  });

  describe("when an expired JWT is passed", () => {
    it("should return false", () => {
      const key = faker.internet.password();
      const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) - 60 * 60 }, key);
      const authorizationToken = `Bearer ${token}`;

      const validated = validateAuthorizationToken(authorizationToken, key);

      expect(validated).to.equal(false);
    });
  });

  describe("when an invalid JWT is passed", () => {
    it("should return false", () => {
      const authorizationToken = `Bearer ${faker.random.words()}`;
      const key = faker.internet.password();

      const validated = validateAuthorizationToken(authorizationToken, key);

      expect(validated).to.equal(false);
    });
  });

  describe("when a non-string value is passed", () => {
    it("should return false", () => {
      const key = faker.internet.password();

      expect(validateAuthorizationToken({}, key)).to.equal(false);
      expect(validateAuthorizationToken([], key)).to.equal(false);
      expect(validateAuthorizationToken(12, key)).to.equal(false);
      expect(validateAuthorizationToken(null, key)).to.equal(false);
      expect(validateAuthorizationToken(undefined, key)).to.equal(false);
    });
  });

  describe("when nothing is passed at all", () => {
    it("should return false", () => {
      const key = faker.internet.password();

      const validated = validateAuthorizationToken("", key);

      expect(validated).to.equal(false);
    });
  });
});
