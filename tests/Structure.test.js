const fs = require("fs");
const Parse = require("../lib/Parse");
const Structure = require("../lib/Structure");

const parse = new Parse();
const structure = new Structure();

const dir = {};
dir.playground = "tests/playground/";
dir.testYaml = dir.playground + "test.yml";
dir.testDir = dir.playground + "test_mkdir";

test("Crawls through a structure", () => {
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

    // Parse test config
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

test("Counts all nodes in a structure", () => {
    // Expected count number
    const expectedCount = 10;

    // Parse test config
    const config = parse.yaml(dir.testYaml);

    // Crawl though structure
    const count = structure.count(config.structure);

    // Test
    expect(count).toEqual(expectedCount);
});
