'use strict';

var config      = require('../config');
if(!config.tasks.browserSync){return;}

var browserSync = require('browser-sync');
var gulp        = require('gulp');

// Config
var config = config.tasks.browserSync;

gulp.task('browserSync', function() {
  return browserSync(config);
});


