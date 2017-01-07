"use strict";

var fse = require("fs-extra");
var async = require("async");

//internal dependencies
var directoryManip = require("./lib/directory_manipulation");
var parseCsvs = directoryManip.parseCsvs;
var dirCheck = directoryManip.dirCheck;

var lib = require("./lib/messages");
var messages = lib.messages;

var build = require("./lib/build");

// csv and project directory comes in as follows "node app.js <csv-dir> <project-dir>"
const csvDir = process.argv[2]; // Directory containing the .csv files
const projectDir = process.argv[3]; // Directory containing front-end project, html, js, css files
const targetDir = process.argv[4];  // Directory to output zip files
// TODO should probably be getting name of zip from fi name, but need to first get fi name
const targetName = process.argv[5]; // Name of output zip file

if (typeof csvDir === "undefined") {  // no argument was passed for csvDir/argv[2]
  messages.usage();
  process.exit(1);
}

if (typeof projectDir === "undefined") { // no argument was passed for projectDir/argv[3]
  messages.usage();
  process.exit(1);
}

// TODO - need to iterate over .csvs, may need to have a nested async that calls the build.<all> and zip functions
// Use async series to ensure that each function waits for the previous to complete before resuming
async.series([
  // Check both directories for existence AND isDirectory, could probably just check isDirectory but ... yeah
  dirCheck.exists(csvDir),
  dirCheck.exists(projectDir),
  dirCheck.isDirectory(csvDir),
  dirCheck.isDirectory(projectDir),

  // parse each csv file in given directory to a .js file
  parseCsvs(csvDir),

  // TODO remove these hardcoded values
  build.putJsonJsFileProjectSrcDir(csvDir.concat("/ci_demo.csv.js"), projectDir.concat("/src/scripts")),   // place each .js file into the project/src folder

  // make build folder & copy index.html to build folder

  // call npm build scripts
  build.run(projectDir.concat("/src")),

  // zip & store
  build.pkg(targetDir, targetName, projectDir.concat("/build"))
], function appJsCb(err, results) {  // if any of the previous functions fails should end up in the following cb with err
  if (err) {
    console.error("An error occurred. " + err);
    process.exit(1);
  }
});