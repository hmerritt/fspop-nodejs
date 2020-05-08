const fs = require("fs");
const Parse = require("../lib/Parse");
const parse = new Parse();

const dir = {};
dir.playground = "tests/playground/";
dir.testYaml = dir.playground + "test.yml";
dir.testDir = dir.playground + "test_mkdir";

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
    const parsed = parse.yaml(dir.testYaml);

    // Test
    expect(parsed).toEqual(expected);
});
