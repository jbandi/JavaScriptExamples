# Course Rater JavaScript Demo

This demo show three approaches how to modularize JavaScript code:

1. Using the module pattern implemented in plain JavaScript
2. Using CommonJS modules with [Browserify](http://browserify.org/)
3. Using AMD modules with [Require.js](http://requirejs.org/)

## How to build
The second approach (browserify) needs a build step before you can run the example. The third approach (require.js) has an optional build step.

To execute the build you need node and npm, then do the following:

* `npm install` -> this installs all the needed npm packages as specified in package.json
* `.\jake.sh`-> this runs the complete build as specified in Jakefile.js the result is the `dist` directory (sorry there is no Windows script yet...)


## How to run
1. Plain modules: just open `/src/js-namespace/index.html` in your browser
2. CommonJS with browserify: open `/dist/js-commonjs/index.html` in your browser
3. AMD with Require.js:
    * Unoptimized: Open `/src/js-amd/index.html` in your browser
    * Optimized: Open `/dist/js-amd/index.html` in your browser