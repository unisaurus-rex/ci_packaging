"use strict";

const child_process = require("child_process");

module.exports = function zipPkg(targetDirectory, targetFilename, source) {
  const cd = "cd";
  const zipCommand = "7z a";

  try {
    child_process.execSync(cd.concat(" ", targetDirectory, " && ", zipCommand, " ", targetFilename, " ", source));
  } catch (e) {
    console.error(e);
  }

  console.info("Wrote " + targetFilename + " to " + targetDirectory);
};