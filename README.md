# fspop
Automate the creation of file structures using custom templates

[![Build Status](https://travis-ci.org/hmerritt/fspop.svg?branch=master)](https://travis-ci.org/hmerritt/fspop)    [![Coverage Status](https://coveralls.io/repos/github/hmerritt/fspop/badge.svg?branch=master)](https://coveralls.io/github/hmerritt/fspop?branch=master)

[![NPM](https://nodei.co/npm/fspop.png)](https://nodei.co/npm/fspop/)

fspop => __f__(ile) __s__(tructure) __pop__(ulate)




## Installing fspop

```bash
$ npm install fspop -g
```




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
