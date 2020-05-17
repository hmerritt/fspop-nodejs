const time = require("../lib/Time");

const dir = {};
dir.testground = "tests/testground/";
dir.testYaml = dir.testground + "test.yml";
dir.testDir = dir.testground + "test_mkdir";

describe("timestamp", () => {
    it("returns current timestamp", () => {
        const expected = new Date().getTime();
        expect(time.stamp()).toEqual(expected);
    });
});

describe("timer", () => {
    it("starts", () => {
        let timer = time.start("test");
        expect(Array.isArray(timer)).toBeTruthy();
        expect(timer[0]).toBeLessThanOrEqual(new Date().getTime());
        expect(timer[1]).toBe(0);
    });

    it("stops", async () => {
        let timer = time.start("test");
        time.stop("test");
        expect(timer[1]).toBeGreaterThan(0);
        expect(timer[1]).toBeLessThanOrEqual(new Date().getTime());

        timer = time.start("test");
        await new Promise(r => setTimeout(r, 100));
        time.stop("test");
        expect(timer[1] - timer[0]).toBeGreaterThanOrEqual(90);
        expect(timer[1] - timer[0]).toBeLessThanOrEqual(120);
    });
});

describe("duration", () => {
    it("returns duration from start point", async () => {
        let timer = time.start("test");
        await new Promise(r => setTimeout(r, 100));

        expect(time.duration("test")).toBeGreaterThanOrEqual(90);
        expect(time.duration("test")).toBeLessThanOrEqual(120);
        expect(time.duration("test")).not.toBe(0);
    });

    it("uses stop timestamp if timer has been stopped", async () => {
        let timer = time.start("test");
        await new Promise(r => setTimeout(r, 20));
        time.stop("test");
        await new Promise(r => setTimeout(r, 100));

        expect(time.duration("test")).toBeGreaterThanOrEqual(15);
        expect(time.duration("test")).toBeLessThanOrEqual(40);
    });

    it("returns readable value", async () => {
        let timer = time.start("test");
        await new Promise(r => setTimeout(r, 5));

        expect(time.duration("test", true)).toMatch(/([0-9]+)ms/)
    });
});

describe("readable", () => {
    it("correctly returns milliseconds", async () => {
        let start = time.stamp();
        let end = start + 100;

        expect(time.readable(end - start)).toMatch(/100ms/);
    });

    it("correctly returns seconds", async () => {
        let start = time.stamp();
        let end = start + 2200;

        expect(time.readable(end - start)).toMatch(/2.2s/);
    });

    it("correctly returns minutes", async () => {
        let start = time.stamp();
        let end = start + 318000;

        expect(time.readable(end - start)).toMatch(/5.3m/);
    });
});
