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

// move to appropriate place and adjust paths accordingly
//zipDir("../example-front-end-shell-app","../example-front-end-shell-app.7z");

// csv and project directory comes in as follows "node app.js <csv-dir> <project-dir>"
var csvDir = process.argv[2]; // Directory containing the .csv files
var projectDir = process.argv[3]; // Directory containing front-end project, html, js, css files

if (typeof csvDir === "undefined") {
  messages.usage();
  process.exit(1);
}

if (typeof projectDir === "undefined") {
  messages.usage();
  process.exit(1);
}

async.series([
  // Check both directories for existence AND isDirectory
  dirCheck.exists(csvDir),
  dirCheck.exists(projectDir),
  dirCheck.isDirectory(csvDir),
  dirCheck.isDirectory(projectDir),
  parseCsvs("../example-front-end-shell-app/src"),

], function (err, results) {
  if(err){
    console.error("An error occurred." + err);
    process.exit(1);
  }

  console.log("\nAll done!");
});

