"use strict";

var EasyZip = require("easy-zip").EasyZip;

/**
 * Zips the given sourceDirectory and writes it to the given targetDirectory.
 * @param sourceDirectory
 * @param targetDirectory
 */
module.exports = zipDir;

function zipDir(sourceDirectory, targetDirectory) {
  return function _zipDir(callback) {
    var zip = new EasyZip();
    zip.zipFolder(sourceDirectory, function () {
      zip.writeToFile(targetDirectory);
      return callback();
    });
  };
}
