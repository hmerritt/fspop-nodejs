#!/usr/bin/env python

import os
import sys
import yaml
import json


# Location of yml
#file_location = input("Path to '.yml' file: ")
file_location = sys.argv[1]


# file data
data = []


# Parse yaml file
with open(file_location, "r") as stream:
    try:
        data = yaml.safe_load(stream)
    except yaml.YAMLError as exc:
        print(exc)
        sys.exit()


# Print structure type
print("Structure:", data["type"], "\n")


# Print parsed object
def print_structure(structure):
    print(json.dumps(structure, indent=4, sort_keys=True))


# Create directory
def mkdir(path):
    if not os.path.isdir(str(path)):
        #print("")
        os.mkdir(str(path))


# Loop data structure
def dir_bootstrap(structure, dir_root=data["type"]):
    # Setup root folder
    mkdir(dir_root)

    #
    #print_structure(structure)

    # Loop structure
    for value in structure:
        # Check if string
        if type(value) is str:
            path = dir_root + "/" + value
            print("Creating dir:", path)
            mkdir(path)

            # If structure is dict
            if type(structure) is dict:
                # Check if string exists in structure
                # usually means an array of folders
                dir_bootstrap(structure.get(value), (dir_root + "/" + value))

        # Check if array
        elif isinstance(value, list):
            for item in value:
                path = dir_root + "/" + item
                print("Creating dir:", path)
                mkdir(path)

        # Check if dict
        elif type(value) is dict:
            dir_bootstrap(value)


dir_bootstrap(data["structure"])
