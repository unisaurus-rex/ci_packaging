"use strict";

var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");
var path = require("path");

module.exports = copy;

/**
 * copy
 *
 * Copies the given src file/dir to the given destination file/dir
 *
 * @param src
 * @param destination
 * @returns {Function}
 */
function copy(src, destination) {
    try {
      fse.copySync(src, destination);
    } catch (e) {
      console.error(e);
    }
}