'use strict';

var config      = require('../config');
if(!config.tasks.jsLint){return;}

var gulp      = require('gulp');
var jshint    = require('gulp-jshint');
var stylish   = require('jshint-stylish'); // Styish makes colored output for jslint

// Config
var src = config.tasks.jsLint.pattern;

//////////////////////////////
// JS lint Tasks
//////////////////////////////
gulp.task('jsLint', function () {
  return gulp.src(src)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

