"use strict";

const fs = require("fs");
const commander = require("commander");

const {
    pkg,
    log,
    files,
    parse,
    structure
} = require("../API.js");

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

        // Parse structure config
        const config = parse.yaml(files.elasticExtention(file_name));
        const count = structure.count(config.structure);

        console.log(`Found ${log.green(count)} nodes\n`);

        // Check if structure name already exists
        if (files.isDirectory(config.name)) {
            log.warning(`Directory '${config.name}/' already exists`);
            log.warning(`fspop refuses to write to existing directories`);
            return 1;
        }

        // Init progress bar
        let bar = log.progress("creating", count + 1);

        // Create deploy directory
        // Defaults to config.name
        files.mkdir(config.name, (error, path) => {
            if (!error) bar.tick(1);
        });

        // Crawl though each value in structure
        // createing a directory for each one
        structure.crawl(config.structure, config.name, (dir, path) => {
            files.mkdir(`${path}/${dir}`, (error, path) => {
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

        // TODO: more general function usage
        //       -> cfile(name, contents)
        const fileContent = `name: ${file_name}

structure:
    - example_folder:
        - sub
        - another_sub
    - another_folder
`;
        fs.writeFile(`${file_name}.yml`, fileContent, (error) => {
            if (error) throw error;
            return console.log("-> Created new config:", file_name);
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
