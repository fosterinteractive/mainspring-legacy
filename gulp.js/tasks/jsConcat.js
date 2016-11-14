'use strict';

// var config      = require('../config');
// if(!config.tasks.jsOpimize){return;}

var gulp          = require('gulp');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var sizeReport    = require('gulp-sizereport');

// Configuration
// Define the list of files you want concatinated in order
// Wildcard at the end will not import duplicates.

var jsFiles = [
  'js/vendor/jquery.js',
  'js/vendor/jQuery.dotdotdot.js',
  'js/vendor/*.js',
  '!js/vendor/*.min/js'
];

var jsDest = 'js';

gulp.task('jsConcat', function() {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});
