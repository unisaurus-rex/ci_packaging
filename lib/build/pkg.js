"use strict";

const child_process = require("child_process");

module.exports = function pkg (target, source) {
  return function _pkg(callback) {
    var pw = "1234";  // not used for security but to get zip pass the proxy

    child_process.execSync("7z a -p".concat(pw, " ", target, " ", source));
    callback();
  }
};