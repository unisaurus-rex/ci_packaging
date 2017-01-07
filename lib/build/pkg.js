"use strict";

const child_process = require("child_process");

module.exports = function pkg (targetDirectory, targetFilename, source) {
  return function _pkg(callback) {
    var pw = "1234";  // not used for security but to get zip pass the proxy

    try {
      child_process.execSync("cd " + targetDirectory + " && 7z a -p".concat(pw, " ", targetFilename, " ", source));
    } catch (e) {
      return callback("Error: Could not complete zip operation. " + e);
    }

    callback();
  }
};