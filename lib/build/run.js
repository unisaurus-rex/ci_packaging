"use strict";

const npmRun = require("npm-run");

/**
 * run
 *
 * Runs the bundle-js, bundle-sass, copy-fonts, copy-images npm scripts
 *
 * @param sourceDir
 * @returns {Function}
 */
module.exports = function run(sourceDir) {
  return function _run(callback) {
    var currentScript = ""; // Used to tell progress in case of error

    // npm run scripts to execute
    const bundleJs = "npm run bundle-js";
    const bundleSass = "npm run bundle-sass";
    const copyFonts = "npm run copy-fonts";
    const copyImages = "npm run copy-images";

    try {
      currentScript = bundleJs;
      npmRun.execSync(bundleJs, {cwd: sourceDir});

      currentScript = bundleSass;
      npmRun.execSync(bundleSass, {cwd: sourceDir});

      currentScript = copyFonts;
      npmRun.execSync(copyFonts, {cwd: sourceDir});

      currentScript = copyImages;
      npmRun.execSync(copyImages, {cwd: sourceDir});
    } catch (e) {
      return callback("Error: Failed on the following step: " + currentScript + ". " + e);
    }

    return callback();
  };
};