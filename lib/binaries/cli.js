"use strict";

const commander = require("commander");
const pkg = require("../../package.json");

/*
 * Setup CLI arguments
 */
commander
    .version(pkg.version) // File Structure [Version ${pkg.version}]
    .option("-s --silent", "hide all messages", false)
    .option("-d --debug", "output extra debugging")
    .usage("[command] <options>");
