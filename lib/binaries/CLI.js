"use strict";

const fs = require("fs");
const commander = require("commander");

const { pkg, log, files, parse, structure, time } = require("../API.js");

/*
 * Exit script with error code
 */
function exit(cb, code = 1) {
    cb();
    process.exit(code);
}

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
        const argFileName = opts["args"][0];
        const fileName = files.elasticExtention(argFileName);
        let config = {};

        // TODO: Check if valid filename
        //       -> regex expression for acceptable names

        // Open structure
        try {
            console.log(`Opening structure '${argFileName}'`);

            // Check if fileName is empty
            // (elasticExtention returns empty on non-existant files)
            if (fileName === "") throw "unable to find structure file";

            // Parse structure config
            config = parse.yaml(fileName);
        } catch (error) {
            exit(() => {
                log.error(`\nFailed to open structure '${argFileName}'`);
                log.error(`Reason: ${error}`);
            });
        }

        // Validate structure config file
        // check it has required properties
        if (!structure.isValid(config)) {
            exit(() => {
                log.error(`\nStructure file is not valid '${argFileName}'`);
                log.error(`Reason: either no 'name' or 'structure' property`);
            });
        }

        // Count all items in structure
        const count = structure.count(config.structure);

        console.log(`Found ${log.green(count)} nodes\n`);

        // Check if structure name already exists
        if (files.isDirectory(config.name)) {
            exit(() => {
                log.warning(`Directory '${config.name}/' already exists`);
                log.error(`fspop refuses to deploy to existing directories`);
            });
        }

        // Init progress bar
        let bar = log.progress("creating", count + 1);

        try {
            // Create deploy directory
            // Defaults to config.name
            files.mkdir(config.name, (error, path) => {
                if (!error) {
                    bar.tick(1);
                } else {
                    throw `failed to create directory: '${path}'`;
                }
            });

            // Crawl though each value in structure
            // createing a directory for each one
            structure.crawl(config.structure, config.name, (dir, path) => {
                files.mkdir(`${path}/${dir}`, (error, path) => {
                    if (!error) {
                        bar.tick(1);
                    } else {
                        throw `failed to create directory: '${path}'`;
                    }
                });
            });
        } catch (error) {
            exit(() => {
                log.error(`\n\nUnable to deploy structure`);
                log.error(`Reason: ${error}`);
            });
        }

        // Print success message
        // + execution time
        console.log(
            `\n${log.green("Structure deployed")} in ${time.duration(
                "main",
                true
            )}`
        );
    });

/*
 * Initialise a new config file
 */
commander
    .command("init [name]")
    .alias("new")
    .description("create a new file structure config (e.g. personal.yml)")
    .action(function (cmd, opts) {
        const argFileName = opts["args"][0] || "structure";

        // TODO: more general function usage
        //       -> cfile(name, contents)
        const fileContent = `name: ${argFileName}

structure:
    - example_folder:
        - sub
        - another_sub
    - another_folder
`;
        fs.writeFile(`${argFileName}.yml`, fileContent, (error) => {
            if (error) throw error;
            return console.log("-> Created new config:", argFileName);
        });
    });

/*
 * Print script title and version
 * also start recording execution time
 */
log.title();
time.start("main");

/*
 * Display help if 0 arguments passed
 * (there are 2 default args which are passed by default)
 */
if (process.argv.length == 2) process.argv.push("--help");

/*
 * Parse CLI arguments
 */
commander.parse(process.argv);
