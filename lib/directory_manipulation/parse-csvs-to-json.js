"use strict";

//var csv = require('csv');
var parse = require('csv-parse/lib/sync');
var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");
var path = require("path");

/**
 * parseCsvs
 * Used to parse all .csv files in the passed dir into .json files, such that there will be one .json file for each .csv
 * @param dir director to read in .csv files
 */
module.exports = function parseCsvs(dir) {
  return function parseCsvsCb(callback) {
    var files;

    try {
      files = fse.readdirSync(dir); // get all files in the provided directory, sans . and ..
    } catch (e) {
      return callback("Error: Could not read directory " + dir + ". " + e);
    }

    // filter to only those with .csv extension
    files = _.filter(files, function (file) {
      //return file.toString().endsWith(".csv");
      return path.extname(file) == ".csv";
    });

    // iterate through each .csv file and parse to json and write to file with .js extension
    _.forEach(files, function (file) {
      parseCsv(path.join(dir, "/", file), callback);
    });

    console.log("\nRead in the following .csv files-> " + files);

    return callback();
  }
};

/**
 * parseCsv
 *
 * Parses a .csv file to a json.js file
 *
 * @param file
 * @param callback
 * @returns {*}
 */
function parseCsv(file, callback) {
  var input;

  try {
    input = fse.readFileSync(file, {
      encoding: "utf8"
    });
  } catch (e){
    return callback("Error: Could not read  " + file + ". " + e);
  }

  input = input.replace(/'/g, "");

  var contents = parse(input, {
    columns: true
  });

  var output = {};
  _.forEach(contents, function (record) {
    addToOutput(record, output);
  });

  var data = "export const dataJSON = \'" + JSON.stringify(output) + "\';";

  try {
    fse.writeFileSync(file.concat(".js"), data);
  } catch (e) {
    return callback("Error: Could not write  " + file + ".js. " + e);
  }
}

/**
 * addToOutput
 *
 * Takes the given input object, obj, and adds to output in specified format
 * @param obj
 * @param output
 * @author Jeff Flower
 */
function addToOutput(obj, output) {
  const txn = obj.txn_type;
  const fi = obj.fi;
  const fi_name = obj["fi_name"];

  const rest = obj;
  delete rest.txn_type;
  delete rest.fi;
  delete rest["fi_name"];

  // check if output already has a key matching txn
  if (output.hasOwnProperty(txn)) {
    // checkout if output[txn] already has a key matching fi
    if (output[txn].hasOwnProperty(fi)) {
      output[txn][fi].push(rest);
    } else {
      // fi key doesn't exist, add it and set it's value to rest
      output[txn][fi] = [rest];
    }
  } else {
    // txn key doesn't exist
    output[txn] = {};
    output[txn][fi] = [rest];
    output["fi_name"] = fi_name;
  }
}
