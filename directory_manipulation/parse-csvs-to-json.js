"use strict";

var csv = require("csv");
var fse = require("fs-extra");
var _ = require("lodash");

/**
 * Used to parse all .csv files in the passed dir into .json files, such that there will be one .json file for each .csv
 * @param dir director to read in .csv files
 * @author Jeff Flower
 */
module.exports = function parseCsvs(dir) {
  return function parseCsvsCb (callback) {
    var files = fse.readdirSync(dir);

    files = _.filter(files, function (file) {
      return file.toString().endsWith(".csv");
    });

    //TODO - change to map or would you????
    _.forEach(files, function (file) {
      parseCsv(dir, file);
    });

    console.log("\nRead in the following .csv files-> " + files);
    callback();
    return;
  }
};

function parseCsv(dir, file) {

  //var file = __dirname + "/" + process.argv[2]; // csv file to parse should be argument when running program
  var parser = csv.parse({columns: true}); // use first row as headerss

  var output = {};

  parser.on('readable', function () {
    var record;
    while (record = parser.read()) {
      addToOutput(record);
    }
  });

  // write new .js file to hold the originally .csv content parsed into .json format
  parser.on('finish', function () {
    var data = "export const dataJSON = \'" + JSON.stringify(output) + "\';";
    fse.writeFile(dir + "/" + file + ".js", data);
  });

  fse.createReadStream(dir + "/" + file).pipe(parser);

  // parse a record into the correct place in output
  // a record will be an object with keys
  function addToOutput(obj) {
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
}