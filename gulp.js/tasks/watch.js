'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var path        = require('path');
var config      = require('../config');
var browserSync = require('browser-sync');
if(!config.tasks.browserSync){return;}


// Config
// var config  = config.tasks.browserSync;
var scssSrc     = config.tasks.css.pattern;
var jsSrc       = config.tasks.jsLint.pattern;

gulp.task('watch', ['browserSync', 'css:dev', 'sassLint', 'styleGuide', 'jsLint'], function() {

  // SASS & Styleguide
  gulp.watch(scssSrc, ['css:dev', 'sassLint', 'styleGuide']);

  // JS Tasks
  gulp.watch(jsSrc, ['jsLint']);
});

