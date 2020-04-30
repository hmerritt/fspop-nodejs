"use strict";

const fs = require("fs");
const path = require("path");

const pkg = require("../package.json");

/**
 * Main Function to be imported
 * can be aliased to fspop
 *
 * To use it when fspop is installed as a module:
 * var FSPOP = require('file-structure');
 * var fspop = FSPOP(<opts>);
 *
 * @param {Object}  opts
 */
class API {
    constructor(opts) {
        if (!opts) opts = {};
    }

    /**
     * Initialise a new config file
     *
     * @param {String}   file_name    Application Name or All
     * @param {Object}   opts         Options
     * @param {Function} cb           Callback
     */
    init(file_name, opts, cb) {
        const fileContent = `name: ${file_name}

structure:
- example_folder:
    - sub
    - another_sub
- another_folder
`;
        fs.writeFile(`${file_name}.yml`, fileContent, (err) => {
            if (err) throw err;
            return cb();
        });
    }
}

module.exports = API;
