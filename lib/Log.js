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
    progress(name, total) {
        return new ProgressBar(`  ${name} [:bar] : :percent :current/:total`, {
            complete: "=",
            incomplete: " ",
            width: 28,
            total: total,
        });
    }

    /**
     * Colors
     */
    blue(text) {
        return chalk.blue(text);
    }

    green(text) {
        return chalk.green(text);
    }

    red(text) {
        return chalk.red(text);
    }

    white(text) {
        return chalk.white(text);
    }

    yellow(text) {
        return chalk.yellow(text);
    }

    /**
     * Actions
     */
    error(text) {
        console.log(this.red(text));
    }

    info(text) {
        console.log(this.blue(text));
    }

    success(text) {
        console.log(this.green(text));
    }

    warning(text) {
        console.log(this.yellow(text));
    }

}

module.exports = new Log();
