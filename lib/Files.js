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
    // 2.1 cycle different extensions seeing if file exists
    // 3. report an error
    //

    /**
     * Check if a file/directory exists (synchronously)
     *
     * @param {String}   path            Path of item to check
     */
    exists(path) {
        if (fs.existsSync(path)) return true;
        return false;
    }

    /**
     * Check if item is a file
     *
     * @param {String}   path            Path of item to check
     */
    isFile(path) {
        return this.exists(path) && fs.lstatSync(path).isFile();
    }

    /**
     * Check if item is a directory
     *
     * @param {String}   path            Path of item to check
     */
    isDirectory(path) {
        return this.exists(path) && fs.lstatSync(path).isDirectory();
    }

    /**
     * Check different file extensions for a given input
     * and see if any exist. Used to find;
     * config -> config.yml
     *
     * @param {String}   path            Path of item to check
     * @param {Array}    extensions      Extensions to check
     */
    elasticExtention(path, extensions = []) {
        switch (true) {
            case this.isFile(path):
                return path;
                break;

            case this.isFile(`${path}.yml`):
                return `${path}.yml`;
                break;

            case this.isFile(`${path}.yaml`):
                return `${path}.yaml`;
                break;

            default:
                return ""
        }
    }

    /**
     * Create individual directory (synchronously)
     *
     * @param {String}   path            Path of directory to create
     * @param {Function} cb              Callback
     */
    mkdir(path, cb) {
        // Create directory if it does not exist
        if (!this.isDirectory(path)) fs.mkdirSync(path);

        // Verify directory exists
        if (this.isDirectory(path)) return cb(path, false);
        return cb(path, true);
    }
}

module.exports = new Files();
