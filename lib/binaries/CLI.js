"use strict";

const commander = require("commander");
const chalk = require("chalk");

const fspop = require("../API.js");
const log = require("../Log");
const files = require("../Files");
const structure = require("../Structure");
const pkg = require("../../package.json");

/*
 * Setup CLI arguments
 */
commander
    .version(pkg.version)
    //.option("-s --silent", "hide all messages", false)
    //.option("-d --debug", "output extra debugging")
    .usage("[command] <options>");

/*
 * Deploy a file structure
 */
commander
    .command("up <file>")
    .alias("deploy")
    .description("deploy a file structure")
    .action(function (cmd, opts) {
        const file_name = opts["args"][0];

        console.log(`Opening file (${file_name})`);

        const config = fspop.parse(file_name);
        const count = structure.count(config.structure);

        console.log(`Found ${chalk.green(count)} nodes\n`);

        // Check if structure name already exists
        if (files.isDirectory(config.name)) {
            log.yellow(`Directory '${config.name}/' already exists`);
            log.yellow(`fspop refuses to write to existing directories`);
            return 1;
        }

        //  init progress bar
        let bar = log.progress("creating", count + 1);

        // Create deploy directory
        // Defaults to config.name
        fspop.mkdir(config.name, (path, error) => {
            if (!error) bar.tick(1);
        });

        // Crawl though each value in structure
        // createing a directory for each one
        fspop.deploy(config, (dir, path) => {
            const fpath = `${path}/${dir}`;
            fspop.mkdir(fpath, (path, error) => {
                if (!error) bar.tick(1);
            });
        });

        console.log("");
    });

/*
 * Initialise a new config file
 */
commander
    .command("init <name>")
    .alias("new")
    .description("create a new file structure config (e.g. personal.yml)")
    .action(function (cmd, opts) {
        const file_name = opts["args"][0];
        fspop.init(file_name, opts, () => {
            console.log("-> Created new config:", file_name);
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
log.title();
commander.parse(process.argv);
