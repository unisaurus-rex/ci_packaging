"use strict";

var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");
var path = require("path");

module.exports = putJsonJsFileProjectSrcDir;

function putJsonJsFileProjectSrcDir(jsonJsFile, projectSrcDir) {
  return function _putJsonJsFileProjectSrcDir(callback) {
    var filename = path.basename(jsonJsFile);
    console.log("********************\n" + filename);

    try {
      fse.copySync(jsonJsFile,  projectSrcDir.concat("/", filename));
    } catch (e) {
      return callback("Error: Could not copy " + jsonJsFile + " to " + projectSrcDir.concat("/", filename, " ") + e);
    }

    return callback();
  };
}