'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
// Styish makes colored output for jslint
var stylish = require('jshint-stylish');

//////////////////////////////
// JS lint Tasks
//////////////////////////////
gulp.task('jsLint', function () {
  return gulp.src(['./js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

