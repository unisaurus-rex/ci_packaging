"use strict";

var fse = require("fs-extra");
var async = require("async");
var _ = require("lodash");

/**
 * dir-check
 *
 * Provides functions to check certain conditions on a directory, and handle errors appropriately
 * @type {{exists: exists, isDirectory: isDirectory}}
 */
module.exports = {
  exists: exists,
  isDirectory: isDirectory
};

/**
 * exists
 *
 * Uses fs-extra/fs to tell if the given file/dir exists
 * @param dir
 * @returns {Function} with an optional callback parameter for async
 */
function exists(dir) {
  return function _exists(callback) {
    var exists = fse.existsSync(dir);

    if (!exists) {  // the given directory does not exist as either a file OR a directory
      return callback("\nThe given directory \"" + dir + "\" does not exist." +
        " Please provide a valid directory.");
    }

    return callback(); // is a directory OR a file
  }
}

/**
 * isDirectory
 *
 * Uses fse.stat to determine if the given item is in fact a directory
 *
 * @param dir
 * @returns {Function} with an optional callback parameter for async
 */
function isDirectory(dir) {
  return function _isDirectory(callback) {
    fse.stat(dir, function (err, stats) {
      if (err) {  // some error occurred
        return callback("\nAn error occurred accessing directory " + dir + ".");
      }

      if (!stats.isDirectory()) { // not a directory, also an error
        return callback("\n\"" + dir + "\" must be a directory.");
      }

      return callback(); // no error, all is assumed good at this point
    });
  }
}