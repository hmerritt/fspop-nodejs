"use strict";

const commander = require("commander");

const FSPOP = require("../API.js");
const pkg = require("../../package.json");

const fspop = new FSPOP();

/*
 * Setup CLI arguments
 */
commander
    .version(pkg.version) // File Structure [Version ${pkg.version}]
    //.option("-s --silent", "hide all messages", false)
    //.option("-d --debug", "output extra debugging")
    .usage("[command] <options>");

/*
 * Initialise a new config file
 */
commander
    .command("init [structure-name]")
    .description("create a new file structure config (e.g. personal.yml)")
    .action(function (cmd, opts) {
        const file_name = opts["args"][0] || "file-structure";
        fspop.init(file_name, opts, () => {
            console.log("-> Created new config:", file_name);
        });
    });

/*
 * Deploy a file structure
 */
commander
    .command("up [structure-name]")
    .description("deploy a file structure")
    .action(function (cmd, opts) {
        const file_name = opts["args"][0] || "file-structure";
        const config = fspop.parse(file_name);
        //console.dir(config);
        fspop.structure_crawl(config["structure"], config["name"], (val) => {
            console.log(val);
        });
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
