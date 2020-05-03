"use strict";

const fs = require("fs");
const yaml = require("js-yaml");
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
     * @param {String}   file_name       Filename to create
     * @param {Object}   opts            Options
     * @param {Function} cb              Callback
     */
    init(file_name, opts, cb) {
        // TODO: more general function usage
        //       -> cfile(name, contents)

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

    /**
     * Create individual directory (synchronously)
     *
     * @param {String}   path            Path of directory to create
     * @param {Object}   opts            Options
     * @param {Function} cb              Callback
     */
    mkdir(path, opts, cb) {
        // Create directory if it does not exist
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        // Verify directory exists
        if (fs.existsSync(path)) {
            return cb();
        } else {
            return cb(true);
        }
    }

    /**
     * Parse yaml file
     *
     * @param {String}   file_name       File to parse
     * @param {Object}   opts            Options
     * @param {Function} cb              Callback
     */
    parse(file_name, opts, cb) {
        return yaml.safeLoad(fs.readFileSync(file_name, "utf8"));
    }

    /**
     * Crawl through each value in a structure
     *
     * @param {Object}   structure       Structure to crawl (parsed from yaml)
     * @param {String}   path_current    Virtual path level of crawl
     * @param {Function} action          Execute action at each value
     * @param {Object}   opts            Options
     * @param {Function} cb              Callback
     */
    structure_crawl(structure, path_current, action, opts, cb) {
        // Loop structure
        for (let baseKey in structure) {
            // Value of structure key
            const baseValue = structure[baseKey];

            // Check for different structure types

            // Check if String
            if (typeof baseValue === "string") {
                action(baseValue, path_current);

                // Check if Array
            } else if (Array.isArray(baseValue)) {
                // Loop items in array
                for (let arrayKey in baseValue) {
                    // Value of array key
                    const arrayValue = baseValue[arrayKey];

                    // Check if String
                    if (typeof arrayValue === "string") {
                        action(arrayValue, path_current);
                    }

                    // Check if Object
                    if (arrayValue === Object(arrayValue)) {
                        // Crawl down a level of the structure
                        const newBaseKey = Object.keys(arrayValue)[0];
                        const newBase = arrayValue;
                        const newPath_current = path_current + "/" + newBaseKey;
                        action(newBaseKey, path_current);
                        this.structure_crawl(newBase, newPath_current, action);
                    }
                }

                // Check if Object
            } else if (baseValue === Object(baseValue)) {
                // Crawl down a level of the structure
                const newBaseKey = Object.keys(baseValue)[0];
                const newBase = baseValue;
                const newPath_current = path_current + "/" + newBaseKey;
                action(newBaseKey, path_current);
                this.structure_crawl(newBase, newPath_current, action);
            }
        }
    }
}

module.exports = API;
