"use strict";

const child_process = require("child_process");

module.exports = function run (sourceDir) {
  return function _run(callback){
    child_process.execSync("cd " + sourceDir + " && npm run build");

    return callback();
  };
};