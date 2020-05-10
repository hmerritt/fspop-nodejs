"use strict";

const fs = require("fs");
const yaml = require("js-yaml");
// const pkg = require("../package.json

const files = require("./Files");
const parse = require("./Parse");
const structure = require("./Structure");

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
     * @param {Function} cb              Callback
     */
    mkdir(path, cb) {
        files.mkdir(path, cb);
    }

    /**
     * Parse yaml file
     *
     * @param {String}   file_name       File to parse
     * @param {Object}   opts            Options
     * @param {Function} cb              Callback
     */
    parse(file_name, opts, cb) {
        return parse.yaml(files.elasticExtention(file_name));
    }

    /**
     * Crawl through each value in a structure
     *
     * @param {Object}   structure       Structure to crawl (parsed from yaml)
     * @param {Function} action          Execute action at each value
     * @param {Object}   opts            Options
     * @param {Function} cb              Callback
     */
    deploy(config, action, opts, cb) {
        // console.log(`[fspop] CREATING: ${structure.count(config.structure)}`);
        // Crawl though each value in structure
        // createing a directory for each one
        structure.crawl(config.structure, config.name, action);
    }
}

module.exports = new API();
