"use strict";

//var csv = require('csv');
var parse = require('csv-parse/lib/sync');
var fse = require("fs-extra");
var _ = require("lodash");
var async = require("async");

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
      return callback("Error: Could not read dorectory " + dir + e);
    }

    // filter to only those with .csv extension
    files = _.filter(files, function (file) {
      return file.toString().endsWith(".csv");
    });

    // iterate through each .csv file and parse to json and write to file with .js extension
    _.forEach(files, function (file) {
      parseCsv(dir, file, callback);
    });

    console.log("\nRead in the following .csv files-> " + files);

    return callback();
  }
};

function parseCsv(dir, file, callback) {
  var input;

  try {
    input = fse.readFileSync(dir.concat("/", file), {
      encoding: "utf8"
    });
  } catch (e){
    return callback("Error: Could not read  " + dir.concat("/", file) + e);
  }

  var contents = parse(input, {
    columns: true
  });

  var output = {};
  _.forEach(contents, function (record) {
    addToOutput(record, output);
  });

  var data = "export const dataJSON = \'" + JSON.stringify(output) + "\';";

  try {
    fse.writeFileSync(dir + "/" + file + ".js", data);
  } catch (e) {
    return callback("Error: Could not write  " + dir + "/" + file + ".js " + e);
  }
}

///**
// * parseCsv
// *
// * Used to parse a .csv file into a .json file
// *
// * @param dir directory to read in .csv files
// * @param file should be .csv file
// * @author Jeff Flower
// */
//function parseCsv(dir, file, callback) {
//  //var file = __dirname + "/" + process.argv[2]; // csv file to parse should be argument when running program
//  var parser = csv.parse({columns: true}); // use first row as headerss
//
//  var output = {};
//
//  // what to do on readable content read content of the csv file and append to json output
//  parser.on('readable', function readableCb() {
//    var record;
//    while (record = parser.read()) {  // so long as there is content continue reading and parsing
//
//      addToOutput(record);
//    }
//  });
//
//  // what to do on completion of reading, write new .js file to hold the originally .csv content parsed into .json format
//  parser.on('finish', function finishCb() {
//    var data = "export const dataJSON = \'" + JSON.stringify(output) + "\';";
//
//    try {
//      fse.writeFileSync(dir + "/" + file + ".js", data);
//
//      console.log("Parsed " + dir + "/" + file + " to " + dir + "/" + file + ".js");
//    } catch (e) {
//      return callback("Error writing " + dir + "/" + file + ".js. " + e);
//    }
//
//    //fse.writeFile(dir + "/" + file + ".js", data, function (err) {
//    //  if (err) {
//    //    return callback("Error writing " + dir + "/" + file + ".js. " + e);
//    //  }
//    //
//    //  console.log("Wrote " + dir + "/" + file + ".js");
//    //});
//
//  });
//
//  // begin reading .csv file, pipe to parser
//  fse.createReadStream(dir + "/" + file).pipe(parser);
//
//  // parse a record into the correct place in output
//  // a record will be an object with keys
//  function addToOutput(obj) {
//    var txn = obj.txn_type;
//    var fi = obj.fi;
//
//    var rest = obj;
//    delete rest.txn_type;
//    delete rest.fi;
//
//    // check if output already has a key matching txn
//    if (output.hasOwnProperty(txn)) {
//      // checkout if output[txn] already has a key matching fi
//      if (output[txn].hasOwnProperty(fi)) {
//        output[txn][fi].push(rest);
//      } else {
//        // fi key doesn't exist, add it and set it's value to rest
//        output[txn][fi] = [rest];
//      }
//    } else {
//      // txn key doesn't exist
//      output[txn] = {};
//      output[txn][fi] = [rest];
//    }
//  }
//}

/**
 * addToOutput
 *
 * Takes the given input object, obj, and adds to output in specified format
 * @param obj
 * @param output
 * @author Jeff Flower
 */
function addToOutput(obj, output) {
  var txn = obj.txn_type;
  var fi = obj.fi;

  var rest = obj;
  delete rest.txn_type;
  delete rest.fi;

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
  }
}
