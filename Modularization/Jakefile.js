(function () {
	"use strict";

	var fs = require("fs");
	var shell = require("shelljs");
	var uglify = require("uglify-js");
    var browserify = require("browserify");   // CommonJS
    var requirejs = require("requirejs");     // AMD

	var lint = require("./build/utils/lint_runner.js");

	var DISTRIBUTION_DIR = "dist";
	var DISTRIBUTION_VENDOR_DIR = DISTRIBUTION_DIR + "/vendor";
    var DISTRIBUTION_CSS_DIR = DISTRIBUTION_DIR + "/css";

    var DISTRIBUTION_COMMONJS_DIR = DISTRIBUTION_DIR + "/js-commonjs";
    var DISTRIBUTION_AMD_DIR = DISTRIBUTION_DIR + "/js-amd";

	desc("Default Build");
	task("default", ["clean", "lint", "commonjs", "amd"], function() {
		console.log("\n\nOK");
	});

	desc("Clean");
	task("clean", function() {
        console.log("* Build Step: Clean");
		shell.rm("-rf", DISTRIBUTION_DIR);
	})

	desc("Lint everything");
	task("lint", [], function () {
        console.log("* Build Step: Linting");
		var passed = lint.validateFileList(javascriptFiles(), browserLintOptions(), browserGlobals());
		if (!passed) fail("Lint failed");
	});

    desc("Build CommonJS example");
    task("commonjs", ["lint", "create_package_structure", "commonjs_dist"]);

    task("commonjs_clean", [], function() {
        shell.rm("-rf", DISTRIBUTION_COMMONJS_DIR + "/*");
        shell.cp("-R", "src/js-commonjs/*.html", DISTRIBUTION_COMMONJS_DIR);
        shell.cp("-R", "src/js-commonjs/main.js", DISTRIBUTION_COMMONJS_DIR);
    });

    task("commonjs_dist", ["commonjs_clean"], function() {
        console.log("* Build Step: Building CommonJS distribution");
        var b = browserify();
        b.require("./src/js-commonjs/rating_widget.js",{expose: "./rating_widget.js"}  );
        b.bundle({ debug: true }, function(err, bundle) {
            if (err) fail(err);
            fs.writeFileSync(DISTRIBUTION_COMMONJS_DIR + "/bundle.js", bundle);
            complete();
        });
    }, {async: true});

    desc("Build CommonJS example");
    task("amd", ["lint", "create_package_structure", "amd_dist"]);

    task("amd_clean", [], function() {
        shell.rm("-rf", DISTRIBUTION_AMD_DIR + "/*");
        shell.cp("-R", "src/js-amd/*.html", DISTRIBUTION_AMD_DIR);
        shell.cp("-R", "src/js-amd/main.js", DISTRIBUTION_AMD_DIR);
    });

    task("amd_dist", ["amd_clean"], function() {
        console.log("* Build Step: Building AMD distribution");
        var config = {
            baseUrl: "src/js-amd",
            name: "rating_widget",
            out: DISTRIBUTION_AMD_DIR + "/rating_widget.js"
        };
        requirejs.optimize(config, complete, function(err) {
            console.log("AMD fail", err);
            fail();
        });
    }, {async: true});

    desc("create package structure");
    task("create_package_structure", function(){
        shell.mkdir("-p", DISTRIBUTION_DIR);
        shell.mkdir("-p", DISTRIBUTION_VENDOR_DIR);
        shell.mkdir("-p", DISTRIBUTION_CSS_DIR);
        shell.mkdir("-p", DISTRIBUTION_COMMONJS_DIR);
        shell.mkdir("-p", DISTRIBUTION_AMD_DIR);

        shell.cp('-Rf', 'src/vendor/*', DISTRIBUTION_VENDOR_DIR);
        shell.cp('-Rf', 'src/css/*', DISTRIBUTION_CSS_DIR);
    })

	function javascriptFiles() {
        var files = new jake.FileList();
        files.include("src/**/*.js");
        files.exclude("src/vendor/*.js");
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
			trailing:true
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

            // AMD
            define: false,

            // Jasmine
            describe: false,
            beforeEach: false,
            afterEach: false,
            it: false,
            expect: false
		};
	}

}());