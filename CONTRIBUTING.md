# Contributing


## Cloning PM2 development

```bash
$ git clone https://github.com/file-structure/fspop.git
$ cd fspop
$ git checkout development
$ npm install
```

You can test your changes live using `link`. This will create an alias of the `fspop` binary in your `bin` folder.

```bash
$ npm link
$ fspop

$ npm unlink
```


## Project structure

```
.
├── bin      // fspop binary
├── lib      // source files
├── test     // test files
```


## Commit rules

### Commit message

A good commit message should describe what changed and why.

It should:
  - contain a short description of the change (preferably 50 characters or less)
  - be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
  - be prefixed with one of the following word
    - fix : bug fix
    - hotfix : urgent bug fix
    - feat : new or updated feature
    - docs : documentation updates
    - BREAKING : if commit is a breaking change
    - refactor : code refactoring (no functional change)
    - perf : performance improvement
    - style : UX and display updates
    - test : tests and CI updates
    - chore : updates on build, tools, configuration ...
    - Merge branch : when merging branch
    - Merge pull request : when merging PR


## Code Styling

To ensure all code is consistently formatted, we are using `prettier` in combination with `gulp`

```bash
gulp
```

This will format all JavaScript code using `prettier`


## Tests

Tests are using the [`Jest`](https://jestjs.io/) framework
