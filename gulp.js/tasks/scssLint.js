'use strict';

var config    = require('../config');
if(!config.tasks.scssLint){return;}

var gulp      = require('gulp');
var scssLint  = require('gulp-scss-lint');
var cache     = require('gulp-cached');

// Array of Lint Src's
var src = config.tasks.scssLint.pattern;
var settings = config.tasks.scssLint.settings;

gulp.task('scssLint', function() {
  return gulp.src(src)
    .pipe(cache('scssLintCache')) // Only Lint Updated Files
    .pipe(scssLint(settings));
});



// Testing Watch Function Caching
// gulp.task('scssLintWatch', ['scssLint'], function() {
//   gulp.watch(src, ['scssLint']);
// });
