"use strict";

var fse = require("fs-extra");
var async = require("async");

//internal dependencies
var directoryManip = require("./directory_manipulation");
var zipDir = directoryManip.zipDir;
var parseCsvs = directoryManip.parseCsvs;
var dirCheck = directoryManip.dirCheck;

var lib = require("./lib");
var messages = lib.messages;

var build = require("./build");

// move to appropriate place and adjust paths accordingly
//zipDir("../ci-interim-develop","../ci-interim-develop.7z");

// csv and project directory comes in as follows "node app.js <csv-dir> <project-dir>"
var csvDir = process.argv[2]; // Directory containing the .csv files
var projectDir = process.argv[3]; // Directory containing front-end project, html, js, css files

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

  // TODO remove these hardcoded values
  parseCsvs("../csvs"),  // parse each csv file in given directory to a .js file

  // TODO remove these hardcoded values
  build.putJsonJsFileProjectSrcDir("../csvs/ci_demo.csv.js", "../ci-interim-develop/src"),   // place each .js file into the project/src folder

  // make build folder & copy index.html to build folder

  // call npm build funcs
  build.run("../ci-interim-develop/src"),  // currently cannot install jspm globally

  // zip & store & remove build folder
  zipDir("../ci-interim-develop/build", "C:/Users/U999716/Desktop/ci-interim.zip")

], function appJsCb (err, results) {  // if any of the previous functions fails should end up in the following cb with err
  if (err) {
    console.error("An error occurred. " + err);
    process.exit(1);
  }
});

//console.log("\nAll done!");

