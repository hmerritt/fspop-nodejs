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

/*
 * Display help if 0 arguments passed
 * (there are 2 default args which are passed by default)
 */
if (process.argv.length == 2) process.argv.push("--help");

/*
 * Parse CLI arguments
 */
commander.parse(process.argv);
