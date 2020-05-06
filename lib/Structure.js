"use strict";

//const { isArray, isString, isPlainObject } = require("lodash");

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
                        this.crawl(newBase, newPath_current, action);
                    }
                }

                // Check if Object
            } else if (baseValue === Object(baseValue)) {
                // Crawl down a level of the structure
                const newBaseKey = Object.keys(baseValue)[0];
                const newBase = baseValue;
                const newPath_current = path_current + "/" + newBaseKey;
                action(newBaseKey, path_current);
                this.crawl(newBase, newPath_current, action);
            }
        }
    }
}

module.exports = Structure;
