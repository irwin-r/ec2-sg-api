const { expect } = require("chai");

const list = require("../list");

describe("GET - List Endpoint", () => {
  it("should return successfully", async () => {
    expect((await list()).statusCode).to.equal(200);
  });
});
