const fs = require("fs");
const FSPOP = require("../lib/API.js");
const fspop = new FSPOP();

const dir = {};
dir.playground = "tests/playground/";
dir.testYaml = dir.playground + "test.yml";
dir.testDir = dir.playground + "test_mkdir";

test("Creates individual directory", () => {
    // Create directory
    const error = fspop.mkdir(dir.testDir, {}, (error) => {
        if (error) return true;
        return false;
    });

    // Test
    expect(error).toEqual(false);

    // Double check folder exists
    expect(fs.existsSync(dir.testDir)).toEqual(true);
});

test("Skips creating an existing directory", () => {
    // Create an existing directory
    const error = fspop.mkdir(dir.testDir, {}, (error) => {
        if (error) return true;
        return false;
    });

    // Test
    expect(error).toEqual(false);

    // Delete directory
    fs.rmdirSync(dir.testDir);
});

test("Parses yaml file", () => {
    // Expected object
    const expected = {
        name: "test",
        structure: [
            {
                "test-1--level-1--1": [
                    "test-1--level-2--1",
                    "test-1--level-2--2",
                ],
            },
            {
                "test-2--level-1--2": [
                    "test-2--level-2--1",
                    {
                        "test-2--level-2--2": [
                            {
                                "test-2--level-3--1": [
                                    "test-2--level-4--1",
                                    "test-2--level-4--2",
                                ],
                            },
                        ],
                    },
                ],
            },
            "test-3--level-1--3",
        ],
    };

    // Parse test config
    const parsed = fspop.parse(dir.testYaml);

    // Test
    expect(parsed).toEqual(expected);
});

test("Crawl through a structure", () => {
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
    const config = fspop.parse(dir.testYaml);

    // Store values crawled from structure
    const structureValues = [];

    // Crawl though structure
    fspop.structure_crawl(config.structure, config.name, (value, path) => {
        // Add each value and its path into the array
        structureValues.push({
            value: value,
            path: path,
        });
    });

    // Test
    expect(structureValues).toEqual(expectedStructureValues);
});
