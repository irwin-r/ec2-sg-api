const { expect } = require("chai");

const { list } = require("../index");

describe("GET - List Endpoint", () => {
  it("should return successfully", async () => {
    list(null, null, res => {
      expect(res.statusCode).to.equal(200);
    });
  });
});
