"use strict";

const chalk = require("chalk");
const ProgressBar = require("progress");
const pkg = require("../package.json");

/**
 * Console logs
 *
 */
class Log {
    constructor() {}

    /**
     * Log script name and version number
     */
    title() {
        console.log(`fspop [Version ${pkg.version}]\n`);
    }

    /**
     * Log ascii progress bar
     *
     * @param {String}   name            Name displayed beside progress bar
     * @param {Integer}  total           Progress bar total
     */
    progressBar(name, total) {
        return new ProgressBar(`  ${name} [:bar] : :percent :current/:total`, {
            complete: "=",
            incomplete: " ",
            width: 28,
            total: total,
        });
    }

    red(text) {
        console.log(chalk.red(text));
    }

    yellow(text) {
        console.log(chalk.yellow(text));
    }

    green(text) {
        console.log(chalk.green(text));
    }
}

module.exports = new Log();
