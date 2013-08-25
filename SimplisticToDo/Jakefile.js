(function () {
	"use strict";

	var REQUIRED_BROWSERS = [
		//"IE 8.0 (Windows)",
		//"IE 9.0 (Windows)",
		//"Firefox 22.0 (Mac)",
		"Chrome 29.0 (Mac)",
		//"Safari 6.0 (Mac)",
		//Safari 6.0 (iOS)"
	];

	var fs = require("fs");
	var shell = require("shelljs");
	var uglify = require("uglify-js");

	var lint = require("./build_utils/lint_runner.js");
	// var karma = require("./build/util/karma_runner.js");

	var DISTRIBUTION_DIR = "dist";
	var DISTRIBUTION_JS_DIR = DISTRIBUTION_DIR + "/js";

	desc("Default Build");
	task("default", ["clean", "lint", "uglify"], function() {
		console.log("\n\nOK");
	});

	desc("Clean");
	task("clean", function() {
		shell.rm("-rf", DISTRIBUTION_DIR);
	})

//	desc("Start Karma server -- run this first");
//	task("karma", function() {
//		karma.serve(complete, fail);
//	}, {async: true});

	desc("Lint everything");
	task("lint", [], function () {
		var passed = lint.validateFileList(javascriptFiles(), browserLintOptions(), browserGlobals());
		if (!passed) fail("Lint failed");
	});

	desc("Uglify");
	task("uglify", function(){
		shell.mkdir("-p", DISTRIBUTION_JS_DIR);

		var result = uglify.minify(javascriptFiles());

		var out = fs.openSync(DISTRIBUTION_JS_DIR + '/all.min.js', 'w+');
		fs.writeSync(out, result.code);
	})

	// desc("Test browser code");
	// task("test", ["build"], function() {
	// 	karma.runTests(REQUIRED_BROWSERS, complete, fail);
	// }, {async: true});


	function javascriptFiles() {
		var files = new jake.FileList();
		files.include("js/*.js");
		return files.toArray();
	}

	function globalLintOptions() {
		return {
			bitwise:true,
			curly:false,
			eqeqeq:true,
			forin:true,
			immed:true,
			latedef:false,
			newcap:true,
			noarg:true,
			noempty:true,
			nonew:true,
			regexp:true,
			undef:true,
			strict:true,
			trailing:true,
			//globalstrict: true
		};
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
			exports: false,
		};
	}

}());