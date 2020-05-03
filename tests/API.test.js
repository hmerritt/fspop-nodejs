const fs = require("fs");
const FSPOP = require("../lib/API.js");
const fspop = new FSPOP();

const dir = {};
dir.playground = "tests/playground/";
dir.testYaml = dir.playground + "test.yml";
dir.testDir = dir.playground + "test_mkdir";

test("Creates individual directory correctly", () => {
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

test("Parses yaml file correctly", () => {
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

    // Parse test file
    const parsed = fspop.parse(dir.testYaml);

    // Test
    expect(parsed).toEqual(expected);
});
