"use strict";

const fs = require("fs");

/**
 * File helper functions;
 */
class Files {
    constructor() {}

    //
    // @TODO
    // 1. attempt to open file using user-input as-is
    // 2. check for file extention
    // 2.1 cycle different extentions seeing if file exists
    // 3. report an error
    //

    /**
     * Create individual directory (synchronously)
     *
     * @param {String}   path            Path of directory to create
     * @param {Function} cb              Callback
     */
    mkdir(path, cb) {
        // Create directory if it does not exist
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        // Verify directory exists
        if (fs.existsSync(path)) {
            return cb(path, false);
        } else {
            return cb(path, true);
        }
    }
}

module.exports = Files;
