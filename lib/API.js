"use strict";

const pkg = require("../package.json");

const log = require("./Log");
const files = require("./Files");
const parse = require("./Parse");
const structure = require("./Structure");

/**
 * Main object to be imported - a bundle of all fspop classes and utils
 * can be aliased to fspop
 *
 * To use it when fspop is installed as a module:
 * const fspop = require('fspop');
 */
module.exports = {
    pkg,
    log,
    files,
    parse,
    structure
}
