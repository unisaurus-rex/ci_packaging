"use strict";

var EasyZip = require("easy-zip").EasyZip;

/**
 * Zips the given sourceDirectory and writes it to the given targetDirectory.
 * @param sourceDirectory
 * @param targetDirectory
 */
module.exports = function zipDir (sourceDirectory, targetDirectory) {
  var zip = new EasyZip();
  zip.zipFolder(sourceDirectory, function () {
    zip.writeToFile(targetDirectory);
  });
};
