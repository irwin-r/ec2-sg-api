const { expect } = require("chai");
const status = require("http-status");

const { InternalServerError } = require("../errors");
const random = require("../random");

describe("InternalServerErrorException", () => {
  it("should create a new Error object with the correct properties", () => {
    const errorDetail = `I broke ${random(500, 1000)} things`;

    const error = new InternalServerError(errorDetail);

    expect(error.detail).to.equal(errorDetail);
    expect(error.statusCode).to.equal(status.INTERNAL_SERVER_ERROR);
    expect(error.message).to.equal(status[status.INTERNAL_SERVER_ERROR]);
  });

  it("should throw successfully", () => {
    expect(() => {
      throw new InternalServerError();
    }).to.throw();
  });
});
