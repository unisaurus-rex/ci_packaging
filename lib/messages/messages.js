"use strict";

module.exports = {
  usage: usage
};

/**
 * Takes no argument but prints usage information
 */
function usage() {
  console.log("\nUsage:\n" +
    "\t$ >node app.js [csv-directory] [project-directory]" +
    "\n\n\tWith:" +
    "\n\t-\t[csv-directory] contains .csv files" +
    "\n\t-\t[project-directory] is the front-end application project directory");
}