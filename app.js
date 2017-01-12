"use strict";

const fse = require("fs-extra");
const async = require("async");
const path = require("path");

//internal dependencies
var directoryManip = require("./lib/directory_manipulation");
var parseCsvs = directoryManip.parseCsvs;
var dirCheck = directoryManip.dirCheck;

var messages = require("./lib/messages");

var build = require("./lib/build");

var utility = require("./lib/util");

// csv and project directory comes in as follows "node app.js <csv-dir> <project-dir>"
const csvDir = process.argv[2]; // Directory containing the .csv files
const projectDir = process.argv[3]; // Directory containing front-end project, html, js, css files
const targetDir = process.argv[4];  // Directory to output zip files
// TODO should probably be getting name of zip from fi name, but need to first get fi name
const targetName = process.argv[5]; // Name of output zip file

/****************** Command-line arguments check for existence *******************************/
if (!utility.argsExist([csvDir, projectDir, targetDir, targetName])) {
  messages.usage();

  process.exit(1);
}

// Use async series to ensure that each function waits for the previous to complete before resuming
async.series([
  // Check both directories for existence AND isDirectory, could probably just check isDirectory but ... yeah
  dirCheck.exists(csvDir),
  dirCheck.exists(projectDir),
  dirCheck.exists(targetDir),
  dirCheck.isDirectory(csvDir),
  dirCheck.isDirectory(projectDir),
  dirCheck.isDirectory(targetDir),

  // parse each csv file in given directory to a .js file
  parseCsvs(csvDir),

/***************************TODO: Should be done in an iteration for each csv.js file****************/
/**
 * Requires us to be able to distinguish the output zip files. Once possible will move to a loop to iterate over csv.js files and package with distinct zip name
 */
  // TODO remove hardcoded .js filename
  build.copy(path.join(csvDir, "/ci_demo.csv.js"), path.join(projectDir, "/src/scripts/data.js")),   // copy each .js file to project/src/srcipts/data.js folder

  // TODO  do we want to remake build folder & copy index.html to build folder each time????

  // call npm build scripts
  build.run(path.join(projectDir, "/src")),

  // copy ci-interim/build contents to ./app
  build.copy(path.join(projectDir, "/build"), path.join(__dirname, "/app")),

  // build the executable using electron
  build.electronPkg(__dirname),

  // zip & store
  build.zipPkg(targetDir, targetName, path.join(__dirname, "/dist/*.exe"))
/**************** End of content to be moved to iteration ***********************/
], function appJsCb(err, results) {  // if any of the previous functions fails should end up in the following cb with err
  if (err) {
    console.error("An error occurred. " + err);
    process.exit(1);
  }

  console.log("\n\n\nAll done! ");
});