"use strict";

const { isArray, isString, isPlainObject } = require("lodash");

/**
 * Structure viewing and manipulation such as;
 * crawl
 *
 */
class Structure {
    constructor() {}

    /**
     * Crawl through each value in a structure
     *
     * @param {Object}   structure       Structure to crawl (parsed from yaml)
     * @param {String}   path_current    Virtual path level of crawl
     * @param {Function} action          Execute action at each value
     */
    crawl(structure, path_current, action) {
        // Loop structure
        for (let baseKey in structure) {
            // Value of structure key
            const baseValue = structure[baseKey];

            // Check for different structure types

            // Check if Object
            if (isPlainObject(baseValue)) {
                // Crawl down a level of the structure
                this._crawlRecurse(baseValue, path_current, action);

                // Check if Array
            } else if (isArray(baseValue)) {
                // Loop items in array
                for (let arrayKey in baseValue) {
                    // Value of array key
                    const arrayValue = baseValue[arrayKey];

                    // Check if String
                    if (isString("string")) {
                        action(arrayValue, path_current);
                    }

                    // Check if Object
                    if (isPlainObject(arrayValue)) {
                        // Crawl down a level of the structure
                        this._crawlRecurse(arrayValue, path_current, action);
                    }
                }

                // Check if String
            } else if (isString("string")) {
                action(baseValue, path_current);
            }
        }
    }

    /**
     * Crawl down a level of the structure
     * (only used inside crawl)
     *
     * @param {Object}   obj             New structure to crawl though
     * @param {String}   path            Virtual path level of crawl
     * @param {Function} action          Pass original action down
     */
    _crawlRecurse(obj, path, action) {
        // Value of the object key
        const objKey = Object.keys(obj)[0];

        // Extend Virtual path with object key
        const newPath = path + "/" + objKey;

        // Execute user action
        action(objKey, path);

        // Recurse crawl using new object
        // and Virtual path
        this.crawl(obj, newPath, action);
    }
}

module.exports = Structure;
