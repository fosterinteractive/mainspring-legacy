'use strict';

var config    = require('../config');
if(!config.tasks.scssLint){return;}

var gulp      = require('gulp');
var scssLint  = require('gulp-scss-lint');
var cache     = require('gulp-cached');
var path      = require('path');

// @TODO - Figure out how the get the path to woth with non- ./ root src
// var src = path.join(config.root.src, config.tasks.scssLint.src);

var src = config.tasks.scssLint.src;
var settings = config.tasks.scssLint.settings;

gulp.task('scssLint', function() {
  return gulp.src(src)
    .pipe(cache('scssLintCache')) // Only Lint Updated Files
    .pipe(scssLint(settings));
});

// Testing Caching
// gulp.task('scssLintWatch', ['scssLint'], function() {
//   gulp.watch(src, ['scssLint']);
// });
