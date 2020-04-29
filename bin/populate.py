#!/usr/bin/env python

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


# Loop data structure
print(json.dumps(data, indent=4, sort_keys=True))
