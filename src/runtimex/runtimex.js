const RuntimeCompiler = require("./runtimex.compiler.js");

RuntimeCompiler.verify();

module.exports = function () {
  return function () {
    return "loaded-RuntimeX";
  };
};
