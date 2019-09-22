module.exports = async (event) => ({
  statusCode: 200,
  body: JSON.stringify({
    message: `Hello, the current time is ${new Date().toTimeString()}.`,
  }),
});
