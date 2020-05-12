const fs = require("fs");
const files = require("../lib/Files");

const dir = {};
dir.testground = "tests/testground/";
dir.testYaml = dir.testground + "test.yml";
dir.testDir = dir.testground + "test_mkdir";

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

        // Delete directory
        fs.rmdirSync(dir.testDir);
    });
});
