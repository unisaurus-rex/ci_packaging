"use strict";

var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");
var path = require("path");

module.exports = putJsonJsFileProjectSrcDir;

/**
 * putJsonJsFileProjectSrcDir
 *
 * Copies the given json file to the given directory
 *
 * @param jsonJsFile
 * @param projectSrcDir
 * @returns {Function}
 */
function putJsonJsFileProjectSrcDir(jsonJsFile, projectSrcDir) {
  return function _putJsonJsFileProjectSrcDir(callback) {
    var filename = path.join(projectSrcDir, "/data.js");

    try {
      fse.copySync(jsonJsFile, filename);
    } catch (e) {
      return callback("Error: Could not copy " + jsonJsFile + " to " + filename + ". " + e);
    }

    return callback();
  };
}