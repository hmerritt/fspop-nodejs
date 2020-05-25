# fspop
Automate the creation of file structures using custom templates

[![Build Status](https://travis-ci.org/hmerritt/fspop.svg?branch=master)](https://travis-ci.org/hmerritt/fspop)    [![Coverage Status](https://coveralls.io/repos/github/hmerritt/fspop/badge.svg?branch=master)](https://coveralls.io/github/hmerritt/fspop?branch=master)

[![NPM](https://nodei.co/npm/fspop.png)](https://nodei.co/npm/fspop/)

fspop => __f__(ile) __s__(tructure) __pop__(ulate)




## Installing fspop

```bash
$ npm install fspop -g
```




## Defining a Structure File
Structure files are written in `.yaml` and require two things. (Use `fspop init` to create one for you)
1. name
2. structure

`fspop` will run though the entire structure and create a directory for each item

```yaml
name: media

structure:
    - games
    - music
    - photos:
        - personal
        - family
```




## Commands
| Command  	| Description                             	|
|----------	|-----------------------------------------	|
| `deploy` 	| Creates file structure from config file 	|
| `init`   	| Creates a new structure config file     	|




## Usage

### Create a new structure file
The fastest way to create a new structure is to use the `init` command.

```bash
$ fspop init STRUCTURE_NAME
```


### Deploy a structure
Deploying a structure is as simple as calling `deploy` and giving the file name of the structure

```bash
$ fspop deploy STRUCTURE_NAME
```




<br>

## License
[Apache-2.0 License](LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B17979%2Fgithub.com%2Fhmerritt%2Ffspop.svg?type=large)](https://app.fossa.com/projects/custom%2B17979%2Fgithub.com%2Fhmerritt%2Ffspop?ref=badge_large)