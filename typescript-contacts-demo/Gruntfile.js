module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: 'src/**/*.js',
            options: {
//                specs: 'src/**/*Spec.js',
                keepRunner: true
            }
        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                options: {
                    // module: 'commonjs', // or amd
                    target: 'es5', //or es3
                    // base_path: 'path/to/typescript/files',
                    sourcemap: true
                    // declaration: true
                }
            },
            dist: {
                src: ['src/main/ts/*.ts'],
                dest: 'dist/cdemo.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    // sourcemap: true,
                    declaration: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    'Copyright 2013 Kai Toedter\n' +
                    'Licensed under the Apache License, Version 2.0 */\n'
            },
            min: {
                files: {
                    'dist/cdemo.min.js': ['dist/cdemo.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['typescript:base', 'jasmine', 'dist']);
    grunt.registerTask('dist', ['typescript:dist', 'uglify']);
};
