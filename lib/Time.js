"use strict";

/**
 * Time
 *
 * Helper functions to record execution time
 * of each command
 *
 */
class Time {
    constructor() {
        // Object to store all timers
        this.timers = {};
    }

    /**
     * Get current unix timestamp (in milliseconds)
     */
    stamp() {
        return new Date().getTime();
    }

    /**
     * Start a new timer
     *
     * Each timer has a reference name; this way
     * many timers can be created
     *
     * @param {String}   name       Name of timer
     */
    start(name = "main") {
        // Start a timer as an array
        // 0: start time
        // 1: end time (0 if not stopped)
        return this.timers[name] = [this.stamp(), 0];
    }

    /**
     * Stop a running timer
     *
     * @param {String}   name       Name of timer
     */
    stop(name = "main") {
        return this.timers[name][1] = this.stamp();
    }

    /**
     * Duration of a timer
     *
     * If timer is still running it uses
     * a new timestamp
     *
     * @param {String}   name       Name of timer
     * @param {String}   isReadable Return a readable stamp or not
     */
    duration(name = "main", isReadable = false) {
        let start = this.timers[name][0];
        let stop = this.timers[name][1];

        // If timer is still running, use current timestamp
        if (stop === 0) stop = this.stamp();

        // Duration = difference between the
        // stopped and start time
        const difference = stop - start;

        if (isReadable) {
            return this.readable(difference);
        } else {
            return difference;
        }
    }

    /**
     * Format timestamp for user consumption
     *
     * @param {String}   timestamp  unix timestamp
     */
    readable(timestamp) {
        let readable;

        // Decide which unit to use
        switch (true) {
            // Minutes
            case timestamp >= 60000:
                readable = `${(timestamp / 60000).toFixed(1)}m`;
                break;

            // Seconds
            case timestamp >= 1000:
                readable = `${(timestamp / 1000).toFixed(1)}s`;
                break;

            // Milliseconds
            default:
                readable = `${timestamp}ms`;
        }

        return readable;
    }
}

module.exports = new Time();
