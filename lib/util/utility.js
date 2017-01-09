"use strict";

const _ = require("lodash");

module.exports = {
  argsExist: argsExist
};

/**
 * argsExist
 *
 * Used to detere if all members of the argument list provided are defined
 * @param argsArray
 * @returns {*}
 */
function argsExist(argsArray) {
  return _.every(argsArray, function allExist(arg) {
    return !(_.isNil(arg));
  });
}