const { expect } = require("chai");

const flatten = require("../flatten");
const { randomNumber, randomString } = require("../random");

const createRandomizedArray = () =>
  new Array(randomNumber(5, 10)).fill().map(() => randomNumber(0, 9999));

describe("flatten", () => {
  it("should convert an array of multiple arrays into one", () => {
    const array1 = createRandomizedArray();
    const array2 = createRandomizedArray();

    const nestedArray = [array1, array2];
    const expectedArray = [...array1, ...array2];

    const flattened = flatten(nestedArray);

    expect(flattened).to.eql(expectedArray);
    expect(flattened).to.have.lengthOf(expectedArray.length);
  });

  it("should preserve deeply nested arrays and objects", () => {
    const node1 = { [randomString()]: [randomString()] };
    const node2 = [{ [randomString()]: [randomString()] }];

    const nestedArray = [[node1, node2]];

    const flattened = flatten(nestedArray);

    expect(flattened[0]).to.eql(node1);
    expect(flattened[1]).to.eql(node2);
  });
});
