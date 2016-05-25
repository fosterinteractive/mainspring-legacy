'use strict';

var config    = require('../config');
if(!config.tasks.sassLint){return;}

// Required NPM modules
var gulp      = require('gulp');
var sassLint  = require('gulp-sass-lint');
var cache     = require('gulp-cached');

// Array of Lint Src's
var src = config.tasks.sassLint.pattern;

var gulp = require('gulp'),
    sassLint = require('gulp-sass-lint');

// Lints Every File in the Lint Src
// Eg if 2 files fail lint you see 2 errors every time

gulp.task('sassLint', function () {
  return gulp.src(src)
    .pipe(cache('scssLintCache')) // Only Lint Updated Files
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// Passes the Src to gulp-cached
// EG if 2 files fail you only see 1 error on the file you just saved.

gulp.task('sassLintCached', function () {
  return gulp.src(src)
    .pipe(cache('scssLintCache')) // Only Lint Updated Files
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});



