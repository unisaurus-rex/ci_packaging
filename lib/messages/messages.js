"use strict";

module.exports = {
  usage: usage
};

/**
 * Takes no argument but prints usage information
 */
function usage() {
  const readmeLink = "http://github.com/unisaurus-rex/ci_packaging#ci_packaging";

  console.log("\n  Command-line driven Usage:\n" +
    "\t$ node app.js [csv-directory] [project-directory] [target-directory] [target-name]" +
    "\n\n  Config driven Usage:\n" +
    "\t$ node app.js -c[config-json]" +
    "\n\n\tWith:" +
    "\n\t-\t[csv-directory] contains .csv files" +
    "\n\t-\t[project-directory] is the front-end application project directory" +
    "\n\t-\t[target-directory] is the directory to output zip" +
    "\n\t-\t[target-name] is the name for the target zip" +
    "\n\t-\t[config-json] is the name of the config.json file containing csv-directory, project-directory, target-directory, target-name" +
    "\n\n  For help visit " + readmeLink);
}