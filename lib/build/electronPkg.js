"use strict";

const npmRun = require("npm-run");

module.exports = function electronPkg(directory) {
    const electronRunScript = "npm run dist";

    try {
      npmRun.execSync(electronRunScript, {cwd: directory}); // run from root of this directory, no need to change working directory
    } catch (e) {
      console.error(e);
    }
};