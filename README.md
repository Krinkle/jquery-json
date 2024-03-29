[![npm](https://img.shields.io/npm/v/jquery-json.svg?style=flat)](https://www.npmjs.com/package/jquery-json)
[![Tested with QUnit](https://img.shields.io/badge/tested_with-qunit-9c3493.svg)](https://qunitjs.com/)

# jQuery JSON

JSON plugin for jQuery, provides simple ways to convert to JSON and back again.

## Usage

```js
$.toJSON(myObject);
$.toJSON({ foo: 'bar' });
```

## Development

To create the minified build, run this command from the root directory of the repository:

```bash
$ npm run build
```

## Test

Open up `./test/index.html` in your browser to run the test suite, or run it from
the command line with Grunt:

```
$ npm install
$ npm test
```

For it to pass in modern browsers, you have to enable the `disableNative`
option from the QUnit toolbar.

Also, before releasing. Make sure to test the minifed version as well, you can
do so by enabling the `distmin` option in the QUnit toolbar. This will load
the minified build from the `./dist/` directory instead of `./src/`.

## Versioning

We use the Semantic Versioning guidelines as much as possible.

Releases will be numbered in the following format:

`<major>.<minor>.<patch>`

For more information on SemVer, please visit http://semver.org/.
