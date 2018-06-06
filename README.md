# deepest-common-folder
> Node module that finds the deepest common folder from an array of given paths

![MIT License](https://img.shields.io/badge/License-MIT-lightgrey.svg?style=for-the-badge)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-lightgrey.svg?style=for-the-badge)
![Travis CI](https://img.shields.io/travis/null93/deepest-common-folder.svg?style=for-the-badge&colorB=9f9f9f)

## About

This module takes in an array of path strings and determines the deepest common folder.  This means that it finds the deepest possible parent folder that is shared by all paths in the passed array.

## Install

```
npm i -S deepest-common-folder
```

## Testing

```
npm run test
```

## Usage

Below is an example of how this module can be used. Please note that if an empty array is passed, then `/` will be returned.  Also if relative paths are used, they will be resolved based on the _CWD_. An absolute path with a trailing `/` will always be returned.  If a non-array is passed, then an exception is thrown.

```javascript
const dcf = require ("deepest-common-folder")

let paths = [
	"/foo/bar",
	"/foo/bar/baz",
	"/foo/baz",
	"/foo/baz/bar"
]

let folder = dcf ( paths )
```
