"use strict";

const child_process = require("child_process");

module.exports = function zipPkg (targetDirectory, targetFilename, source) {
  return function _zipPkg(callback) {
    const cd = "cd";
    const zipCommand = "7z a";

    try {
      child_process.execSync(cd.concat(" ", targetDirectory, " && ", zipCommand, " ", targetFilename, " ", source));
    } catch (e) {
      return callback("Error: Could not complete zip operation. " + e);
    }

    callback();
  }
};