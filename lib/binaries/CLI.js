"use strict";

const commander = require("commander");

const fspop = require("../API.js");
const pkg = require("../../package.json");

/*
 * Setup CLI arguments
 */
commander
    .version(pkg.version) // File Structure [Version ${pkg.version}]
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
        const file_name = opts["args"][0] || "file-structure";
        const config = fspop.parse(file_name);

        // Create deploy directory
        // Defaults to config.name
        fspop.mkdir(config.name, opts, (error) => {
            if (!error) {
                console.log(
                    `[fspop] SUCCESSFULLY created directory: ${config.name}`
                );
            } else {
                console.log(
                    `[fspop] FAILED creating directory: ${config.name}`
                );
            }
        });

        // Crawl though each value in structure
        // createing a directory for each one
        fspop.deploy(config, (dir, path) => {
            const fpath = `${path}/${dir}`;
            fspop.mkdir(fpath, opts, (error) => {
                if (!error) {
                    console.log(
                        `[fspop] SUCCESSFULLY created directory: ${dir}`
                    );
                } else {
                    console.log(`[fspop] FAILED creating directory: ${dir}`);
                }
            });
        });
    });

/*
 * Initialise a new config file
 */
commander
    .command("init <name>")
    .alias("new")
    .description("create a new file structure config (e.g. personal.yml)")
    .action(function (cmd, opts) {
        const file_name = opts["args"][0] || "file-structure";
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
commander.parse(process.argv);
