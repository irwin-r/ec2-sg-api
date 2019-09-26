const { expect } = require("chai");
const faker = require("faker");
const {
  constants: { HTTP_STATUS_INTERNAL_SERVER_ERROR },
} = require("http2");

const { InternalServerError } = require("../errors");

describe("InternalServerErrorException", () => {
  it("should create a new Error object with the correct properties", () => {
    const errorDetail = faker.lorem.words();

    const error = new InternalServerError(errorDetail);

    expect(error.detail).to.equal(errorDetail);
    expect(error.statusCode).to.equal(HTTP_STATUS_INTERNAL_SERVER_ERROR);
    expect(error.message).to.equal("Internal Server Error");
  });

  it("should throw successfully", () => {
    expect(() => {
      throw new InternalServerError();
    }).to.throw(InternalServerError);
  });
});
