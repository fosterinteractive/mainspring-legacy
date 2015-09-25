'use strict';

var config      = require('../config');
if(!config.tasks.images){return;}

var gulp        = require('gulp');
var gulpIf      = require('gulp-if');
var browserSync = require('browser-sync');
var imagemin    = require('gulp-imagemin');
var path        = require('path');
var sizeReport  = require('gulp-sizereport');
// var changed  = require('gulp-changed');

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.dest, config.tasks.images.dest)
};

// Enable Size Report
var reportEnabled = config.tasks.images.sizeReport.enabled;


gulp.task('images', function() {
  return gulp.src(paths.src)
  // .pipe(changed(paths.dest)) // Ignore unchanged files
  .pipe(imagemin()) // Optimize
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.reload({stream:true})
  // Image Size Reporting
  .pipe(gulpIf(reportEnabled,
      sizeReport(config.tasks.images.sizeReport.settings)
    ))
  );
});
