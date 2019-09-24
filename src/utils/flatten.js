// We'd really rather be using Array.prototype.flat but Node 10.x doesn't support it and we're not using babel/polyfills
const flatten = arrays => arrays.reduce((a, b) => [...a, ...b], []);

module.exports = flatten;
