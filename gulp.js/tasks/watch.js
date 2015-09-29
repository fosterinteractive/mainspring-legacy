'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var path        = require('path');
var config      = require('../config');
var browserSync = require('browser-sync');
if(!config.tasks.browserSync){return;}

// var batch   = require('gulp-batch');

// Config
var config = config.tasks.browserSync;

gulp.task('watch', ['browserSync', 'css:dev', 'scssLint', 'styleGuide'], function() {

  // SASS & Styleguide
    gulp.watch('sass/**/*.scss', ['css:dev', 'scssLint', 'styleGuide']);
});

