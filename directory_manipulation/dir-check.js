"use strict";

var fse = require("fs-extra");
var async = require("async");
var _ = require("lodash");

module.exports = {
  exists: exists,
  isDirectory: isDirectory/*,
  existsIsDir: existsIsDir*/
};

/**
 * exists
 *
 * Uses fs-extra/fs to tell if the given file/dir exists
 * @param dir
 * @returns {Function} with an optional callback parameter for async
 */
function exists(dir) {
  return function existsCb(callback) {
    var validDir = fse.existsSync(dir);

    if (!validDir) {  // the given directory does not exist as either a file OR a directory
      callback("\nThe given directory \"" + dir + "\" does not exist." +
        " Please provide a valid directory.");
      return;
    }

    callback(); // is a directory OR a file
    return;
  }
}

/**
 * isDirectory
 *
 * Uses fse.stat to determine if the given item is in fact a directory
 *
 * @param dir
 * @returns {Function}
 */
function isDirectory(dir) {
  return function isDirectoryCb(callback) {
    fse.stat(dir, function (err, stats) {
      if (err) {  // some error occurred
        callback("\nAn error occurred accessing directory " + dir + ".");
        return;
      }

      if (!stats.isDirectory()) { // not a directory, also an error
        callback("\n\"" + dir + "\" must be a directory.");
        return;
      }

      callback(); // no error, all is assumed good at this point
      return;
    });
  }
}

/**
 * existsIsDir
 *
 * Checks for existence AND is a directory of given directories
 *
 * @param directories
 * @returns {Function}
 */
//function existsIsDir(directories) {
//  return function existsIsDirCb(callback) {
//  _.forEach(directories, function (directory) {
//    async.series([
//      exists(directory),
//      isDirectory(directory)
//    ], function (err, results) {
//      if (err) {
//        //console.error("An error occurred." + err);
//        //process.exit(1);
//        callback(err);
//      }
//
//      callback();
//    });
//  });
//  }
//}
