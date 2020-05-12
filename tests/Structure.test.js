const fs = require("fs");
const parse = require("../lib/Parse");
const structure = require("../lib/Structure");

const dir = {};
dir.testground = "tests/testground/";
dir.testYaml = dir.testground + "test.yml";
dir.testDir = dir.testground + "test_mkdir";

describe("structure", () => {
    it("crawls through a structure", () => {
        // Expected array
        const expectedStructureValues = [
            {
                value: "test-1--level-1--1",
                path: "test",
            },
            {
                value: "test-1--level-2--1",
                path: "test/test-1--level-1--1",
            },
            {
                value: "test-1--level-2--2",
                path: "test/test-1--level-1--1",
            },
            {
                value: "test-2--level-1--2",
                path: "test",
            },
            {
                value: "test-2--level-2--1",
                path: "test/test-2--level-1--2",
            },
            {
                value: "test-2--level-2--2",
                path: "test/test-2--level-1--2",
            },
            {
                value: "test-2--level-3--1",
                path: "test/test-2--level-1--2/test-2--level-2--2",
            },
            {
                value: "test-2--level-4--1",
                path:
                    "test/test-2--level-1--2/test-2--level-2--2/test-2--level-3--1",
            },
            {
                value: "test-2--level-4--2",
                path:
                    "test/test-2--level-1--2/test-2--level-2--2/test-2--level-3--1",
            },
            {
                value: "test-3--level-1--3",
                path: "test",
            },
        ];

        // parse test config
        const config = parse.yaml(dir.testYaml);

        // Store values crawled from structure
        const structureValues = [];

        // Crawl though structure
        structure.crawl(config.structure, config.name, (value, path) => {
            // Add each value and its path into the array
            structureValues.push({
                value: value,
                path: path,
            });
        });

        // Test
        expect(structureValues).toEqual(expectedStructureValues);
    });

    it("counts all nodes in a structure", () => {
        // Expected count number
        const expectedCount = 10;

        // parse test config
        const config = parse.yaml(dir.testYaml);

        // Crawl though structure
        const count = structure.count(config.structure);

        // Test
        expect(count).toEqual(expectedCount);
    });
});
