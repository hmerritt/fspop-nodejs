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
        this.timers[name] = [this.stamp(), 0];
    }

    /**
     * Stop a running timer
     *
     * @param {String}   name       Name of timer
     */
    stop(name = "main") {
        this.timers[name][1] = this.stamp();
    }

    /**
     * Duration of a timer
     *
     * If timer is still running it uses
     * a new timestamp
     *
     * @param {String}   name       Name of timer
     */
    duration(name = "main") {
        let start = this.timers[name][0];
        let stop = this.timers[name][1];

        // If timer is still running, use current timestamp
        if (stop === 0) stop = this.stamp();

        // Return the difference between the
        // stopped and start time
        return stop - start;
    }
}

module.exports = new Time();
