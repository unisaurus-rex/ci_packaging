"use strict";

const fse = require("fs-extra");
const async = require("async");
const path = require("path");

//internal dependencies
const directoryManip = require("./lib/directory_manipulation");
const parseCsvs = directoryManip.parseCsvs;
const dirCheck = directoryManip.dirCheck;

const messages = require("./lib/messages");

const build = require("./lib/build");

const utility = require("./lib/util");

// csv and project directory comes in as follows "node app.js <csv-dir> <project-dir>"
let csvDir = process.argv[2]; // Directory containing the .csv files
let projectDir = process.argv[3]; // Directory containing front-end project, html, js, css files
let targetDir = process.argv[4];  // Directory to output zip files

/****************** Command-line arguments check for existence *******************************/
let configFile = "";
if (typeof csvDir !== "undefined" && csvDir.toString().startsWith("-c")) { // first argument is not a csv directory but a config file
  configFile = csvDir.toString().slice(2);
  console.log(configFile);

  try {
    if (!fse.existsSync(configFile)) {  // check for file existence
      console.error("Could not load config file \"" + configFile + "\".");
      process.exit(1);
    }
  } catch(e) {
    console.log(e);
  }

  const config = require(configFile);

  csvDir = config.csvDir;
  projectDir = config.projectDir;
  targetDir = config.targetDir;
}

if (!utility.argsExist([csvDir, projectDir, targetDir])) {
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

  // build css, sass, js files for each unique csv.js file, and zip the result with the corresponding.csv.js file name
  build.buildPkgAllCsvs(__dirname, projectDir, csvDir, targetDir),

], function appJsCb(err, results) {  // if any of the previous functions fails should end up in the following cb with err
  if (err) {
    console.error("An error occurred. " + err);
    process.exit(1);
  }

  console.log("\n\n\nAll done! ");
});