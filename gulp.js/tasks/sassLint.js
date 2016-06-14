'use strict';

var config    = require('../config');
if(!config.tasks.sassLint){return;}

// Required NPM modules
var gulp      = require('gulp');
var sassLint  = require('gulp-sass-lint');
var cache     = require('gulp-cached');

// Array of Lint Src's
var sassLintPattern = config.tasks.sassLint.pattern;
// Lints Every File in the Lint Src
// Eg if 2 files have lint errors you see 2 errors

gulp.task('sassLint', function () {
  gulp.src(sassLintPattern)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// Passes the Src to gulp-cached
// EG if 2 files have lint errors you
// only see 1 error on the file you just saved.

gulp.task('sassLint:Cached', function () {
  gulp.src(sassLintPattern)
    .pipe(cache('sassLintCache')) // Only Lint Updated Files
    .pipe(sassLint())
    .pipe(sassLint.format());
    // .pipe(sassLint.failOnError());
});



