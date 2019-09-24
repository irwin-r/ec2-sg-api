const crypto = require("crypto");

const randomNumber = (minimum, maximum) => {
  if (minimum === undefined && maximum === undefined) {
    return Math.random();
  }

  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomString = (length = 32) => {
  return crypto.randomBytes(length / 2).toString("hex");
};

module.exports = {
  randomNumber,
  randomString,
};
