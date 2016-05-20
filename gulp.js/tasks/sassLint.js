'use strict';

var config    = require('../config');
if(!config.tasks.sassLint){return;}

// Array of Lint Src's
var src = config.tasks.sassLint.pattern;
// var settings = config.tasks.scssLint.settings;

var gulp = require('gulp'),
    sassLint = require('gulp-sass-lint');

gulp.task('sassLint', function () {
  return gulp.src(src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
