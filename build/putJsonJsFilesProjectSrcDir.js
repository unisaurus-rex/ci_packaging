"use strict";

var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");

module.exports = putJsonJsFilesProjectSrcDir;

function putJsonJsFileProjectSrcDir(jsonJsFile, projectSrcDir, callback) {
  try {
    fse.copySync(jsonJsFile, projectSrcDir);
  } catch (e) {
    return callback(e);
  }
}

function putJsonJsFilesProjectSrcDir(jsonJsFilesDir, projectSrcDir) {
  return function putJsonJsFilesProjectSrcDirCb(callback) {
    var files = fse.readdirSync(jsonJsFilesDir);

    files = _.filter(files, function (file) {
      return file.toString().endsWith(".js");
    });

    _.forEach(files, function (file) {
      putJsonJsFileProjectSrcDir(jsonJsFilesDir.concat("/", file), projectSrcDir.concat("/", file), callback);
    });

    return callback();
  };
}