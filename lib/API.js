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
     * Crawl through each value in structure
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
            const baseValue = structure[baseKey];
            //console.log(typeof baseValue);
            //console.log(baseValue);
            if (typeof baseValue === "string") {
                action(path_current + "/" + baseValue);
            } else if (Array.isArray(baseValue)) {
                for (let arrayKey in baseValue) {
                    const arrayValue = baseValue[arrayKey];

                    if (typeof arrayValue === "string") {
                        action(path_current + "/" + arrayValue);
                    }

                    if (arrayValue === Object(arrayValue)) {
                        const newBaseKey = Object.keys(arrayValue)[0];
                        const newBase = arrayValue;
                        const newPath_current = path_current + "/" + newBaseKey;
                        action(newPath_current);
                        this.structure_crawl(newBase, newPath_current, action);
                    }
                }
            } else if (baseValue === Object(baseValue)) {
                //this.structure_crawl(baseValue, path_current, action);
                const newBaseKey = Object.keys(baseValue)[0];
                const newBase = baseValue;
                const newPath_current = path_current + "/" + newBaseKey;
                action(newPath_current);
                this.structure_crawl(newBase, newPath_current, action);
            }
        }
    }
}

module.exports = API;
