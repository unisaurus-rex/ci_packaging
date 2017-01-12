"use strict";

const npmRun = require("npm-run");

module.exports = function electronPkg(directory) {
  return function _electronPkg(callback) {
    const electronRunScript = "npm run dist";

    try {
      npmRun.execSync(electronRunScript, {cwd: directory}); // run from root of this directory, no need to change working directory
    } catch (e) {
      return callback("Error: Electron build failed. " + e);
    }

    return callback();
  };
};