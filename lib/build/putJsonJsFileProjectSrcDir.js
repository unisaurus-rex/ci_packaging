"use strict";

var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");
var path = require("path");

module.exports = putJsonJsFileProjectSrcDir;

function putJsonJsFileProjectSrcDir(jsonJsFile, projectSrcDir) {
  return function _putJsonJsFileProjectSrcDir(callback) {
    var filename = projectSrcDir.concat("/data.js ");

    try {
      fse.copySync(jsonJsFile,  filename);
    } catch (e) {
      return callback("Error: Could not copy " + jsonJsFile + " to " + filename + e);
    }

    return callback();
  };
}