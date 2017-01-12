"use strict";

const child_process = require("child_process");

module.exports = function zipPkg (targetDirectory, targetFilename, source) {
  return function _zipPkg(callback) {
    const pw = "1234";  // not used for security but to get zip and contents passed the proxy
    const cd = "cd";
    const zipCommand = "7z a -p";

    try {
      child_process.execSync(cd.concat(" ", targetDirectory, " && ", zipCommand, pw, " ", targetFilename, " ", source));
    } catch (e) {
      return callback("Error: Could not complete zip operation. " + e);
    }

    callback();
  }
};