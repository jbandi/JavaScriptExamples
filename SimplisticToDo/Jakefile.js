/*global jake, desc, task, require, complete, fail */

(function () {
	"use strict";

	var REQUIRED_BROWSERS = [
//		["IE 8.0", "Windows"],
//		["IE 9.0", "Windows"],
//		["Firefox 23.0", "Mac"],
//		["Chrome 29.0", "Mac"],
//		["Safari 6.0", "Mac"]
//		["Mobile Safari 6.0", "iOS"]
	];

	var fs = require("fs");
	var shell = require("shelljs");
	var uglify = require("uglify-js");

	var lint = require("./build/utils/lint_runner.js");
	var karma = require("./build/utils/karma_runner.js");

	var DISTRIBUTION_DIR = "dist";
	var DISTRIBUTION_JS_DIR = DISTRIBUTION_DIR + "/js";
	var DISTRIBUTION_JS_VENDOR_DIR = DISTRIBUTION_JS_DIR + "/vendor";
    var DISTRIBUTION_CSS_DIR = DISTRIBUTION_DIR + "/css";

    desc("Start Karma server -- run this first");
    task("karma", function() {
        karma.serve(complete, fail);
    }, {async: true});

	desc("Default Build");
	task("default", ["clean", "lint", "package"], function() {
		console.log("\n\nOK");
	});

	desc("Clean");
	task("clean", function() {
		shell.rm("-rf", DISTRIBUTION_DIR);
	});

	desc("Lint everything");
	task("lint", [], function () {
        console.log("* Build Step: Linting");
		var passed = lint.validateFileList(javascriptFiles(), browserLintOptions(), browserGlobals());
		if (!passed){ fail("Lint failed"); }
	});

    desc("Run unit tests");
    task("test", [], function() {
        console.log("* Build Step: Testing");
        karma.runTests(REQUIRED_BROWSERS, complete, fail);
    }, {async: true});

    desc("Package Distribution");
    task("package", ["create_package_structure", "uglify"], function(){
        console.log("* Build Step: Packaging");
        shell.cp("-Rf", "*.html", DISTRIBUTION_DIR);

        // TODO: should be generic for all .html files
        shell.sed("-i", 'src="js/main.js"', 'src="js/all.min.js"', DISTRIBUTION_DIR + "/index.html");
    });

    desc("create package structure");
    task("create_package_structure", function(){
        shell.mkdir("-p", DISTRIBUTION_DIR);
        shell.mkdir("-p", DISTRIBUTION_JS_DIR);
        shell.mkdir("-p", DISTRIBUTION_JS_VENDOR_DIR);
        shell.mkdir("-p", DISTRIBUTION_CSS_DIR);

        shell.cp('-Rf', 'js/vendor/*', DISTRIBUTION_JS_VENDOR_DIR);
        shell.cp('-Rf', 'css/*', DISTRIBUTION_CSS_DIR);
    });

	desc("Uglify");
	task("uglify", function(){
		shell.mkdir("-p", DISTRIBUTION_JS_DIR);

		var result = uglify.minify(javascriptFiles());

		var out = fs.openSync(DISTRIBUTION_JS_DIR + '/all.min.js', 'w+');
		fs.writeSync(out, result.code);
	});

	function javascriptFiles() {
		var files = new jake.FileList();
		files.include("js/*.js");
		return files.toArray();
	}

	function globalLintOptions() {
        var jsmin = require('jsmin').jsmin;
        var stripped_options = jsmin(fs.readFileSync('.jshintrc', "utf8")); // strip comments from .jshintrc
        var options = JSON.parse(stripped_options);

//		var options = {
//			bitwise:true,
//			curly:false,
//			eqeqeq:true,
//			forin:true,
//			immed:true,
//			latedef:false,
//			newcap:true,
//			noarg:true,
//			noempty:true,
//			nonew:true,
//			regexp:true,
//			undef:true,
//			strict:true,
//			trailing:true,
//			//globalstrict: true
//		};
        return options;
	}

	function browserLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		return options;
	}

	function browserGlobals() {
		return {
			// CommonJS
			require: false,
			module: false,
			exports: false
		};
	}

}());