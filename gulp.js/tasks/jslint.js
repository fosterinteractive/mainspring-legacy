'use strict';

var config      = require('../config');
if(!config.tasks.jsLint){return;}

var gulp = require('gulp');
var jshint = require('gulp-jshint');
// Styish makes colored output for jslint
var stylish = require('jshint-stylish');
var path         = require('path');

var src = path.join(config.root.src, config.tasks.css.src);

//////////////////////////////
// JS lint Tasks
//////////////////////////////
gulp.task('jsLint', function () {
  return gulp.src(src)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

