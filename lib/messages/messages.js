"use strict";

module.exports = {
  usage: usage
};

/**
 * Takes no argument but prints usage information
 */
function usage() {
  console.log("\nUsage:\n" +
    "\t$ node app.js [csv-directory] [project-directory] [target-directory] [target-name]" +
    "\n\n\tWith:" +
    "\n\t-\t[csv-directory] contains .csv files" +
    "\n\t-\t[project-directory] is the front-end application project directory" +
    "\n\t-\t[target-directory] is the directory to output zip" +
    "\n\t-\t[target-name] is the name for the target zip");
}