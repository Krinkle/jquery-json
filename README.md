## Build

To run the minifier, run this command from the root directory of the repository:

	$ ./build.sh

## Test

Open up ./test/index.html in your browsers and run the test.
For it to pass in modern browsers, you have to enable the `disable_native`
option from the QUnit toolbar.

Also, before releasing. Make sure to test the build version as well, you can
do so by enabling the `build-min` option in the QUnit toolbar. This will load
the code from the `./build/` directory instead of `./src/`.

## Version

We use the Semantic Versioning guidelines as much as possible.

Releases will be numbered in the following format:

<major>.<minor>.<patch>

The -alpha suffix is used to indicate unreleased versions in development.

For more information on SemVer, please visit http://semver.org/.
