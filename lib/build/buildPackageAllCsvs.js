"use strict";

const fse = require("fs-extra");
const _ = require("lodash");
const path = require("path");
const copy = require("./copy");
const run = require("./run");
const zipPkg = require("./zipPkg");

module.exports = buildPackageAllCsvs;

function buildPackageAllCsvs(homeDir, projectDir, csvDir, targetDir) {
  return function _buildPackageAllCsvs(callback) {
    let files;

    try {
      files = fse.readdirSync(csvDir); // get all files in the provided directory, sans . and ..
    } catch (e) {
      return callback("Error: Could not read directory " + csvDir + ". " + e);
    }

    // filter to only those with .csv extension
    files = _.filter(files, function (file) {
      //return file.toString().endsWith(".csv");
      return path.extname(file) == ".js";
    });

    _.forEach(files, function (file) {
      copy(path.join(csvDir, file), path.join(projectDir, "/src/scripts/data.js"));   // copy each .js file to project/src/srcipts/data.js folder

      // call npm build scripts
      run(path.join(projectDir, "/src"));

      // copy ci-interim/build contents to ./app
      copy(path.join(projectDir, "/build"), path.join(homeDir, "/app"));

      // copy ci-interim/styles/css/webfont folder to ./app/styles/css/webfonts
      copy(path.join(projectDir, "/src/styles/css/webfont"), path.join(homeDir, "/app/styles/css/webfont"));

      // zip & store
      zipPkg(targetDir, path.basename(file, ".csv.js").concat(".zip"), path.join(homeDir, "/app"));
    });

    return callback();
  }
}