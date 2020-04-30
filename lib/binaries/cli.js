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
 * Initialise a new config file
 */
commander
    .command("init [structure-name]")
    .description("create a new file structure config (e.g. personal.yml)")
    .action(function (cmd, opts) {
        const initName = opts["args"][0];
        if (initName) {
            console.log(initName);
        }
    });

/*
 * Display help if 0 arguments passed
 * (there are 2 default args which are passed by default)
 */
if (process.argv.length == 2) process.argv.push("--help");

/*
 * Parse CLI arguments
 */
commander.parse(process.argv);
