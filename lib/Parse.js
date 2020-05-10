"use strict";

const fs = require("fs");
const yaml = require("js-yaml");

/**
 * Parse text/files into JS objects;
 *
 * Supports different file extentions
 * URLs, yaml, json
 *
 */
class Parse {
    constructor() {}

    /**
     * Parse yaml file
     *
     * @param {String}   file_name       File to parse
     */
    yaml(file_name) {
        // TODO: fs.readFile -> Files.readSync(file)
        return yaml.safeLoad(fs.readFileSync(file_name, "utf8"));
    }
}

module.exports = new Parse;
