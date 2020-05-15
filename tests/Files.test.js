const fs = require("fs");
const files = require("../lib/Files");

const dir = {};
dir.testground = "tests/testground/";
dir.testYaml = dir.testground + "test.yml";
dir.testDir = dir.testground + "test_mkdir";

// Clean-up testground
afterAll(() => {
    fs.rmdirSync(dir.testDir);
});

describe("mkdir", () => {
    it("creates individual directory", () => {
        // Create directory
        const error = files.mkdir(dir.testDir, (error) => {
            if (error) return true;
            return false;
        });

        // Test
        expect(error).toEqual(false);

        // Double check folder exists
        expect(fs.existsSync(dir.testDir)).toEqual(true);
    });

    it("skips creating an existing directory", () => {
        // Create an existing directory
        const error = files.mkdir(dir.testDir, (error) => {
            if (error) return true;
            return false;
        });

        // Test
        expect(error).toEqual(false);
    });
});

describe("fs checks", () => {
    it("identifies files", () => {
        //  Create false-positive directory
        files.mkdir(dir.testDir, () => {});

        const isFile = files.isFile(dir.testYaml);
        const isNotFile = files.isFile(dir.testDir);

        //
        expect(isFile).toEqual(true);
        expect(isNotFile).toEqual(false);
    });

    it("identifies directories", () => {
        //  Create directory to test
        files.mkdir(dir.testDir, () => {});

        const isDirectory = files.isDirectory(dir.testDir);
        const isNotDirectory = files.isDirectory(dir.testYaml);

        //
        expect(isDirectory).toEqual(true);
        expect(isNotDirectory).toEqual(false);
    });
});

describe("elastic extension", () => {
    it("does not change perfect path", () => {
        const path = files.elasticExtention(dir.testYaml);
        expect(path).toEqual(dir.testYaml);
    });

    it("adds .yml file extension", () => {
        const path = files.elasticExtention(`${dir.testground}test`);
        expect(path).toEqual(dir.testYaml);
    });

    it("returns empty string if nothing found", () => {
        const emptyPath = files.elasticExtention(`${dir.testground}idonotexist`);
        expect(emptyPath).toEqual("");
    });
});
