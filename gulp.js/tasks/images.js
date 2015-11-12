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

//Config
var src  = config.tasks.images.src + '/**';
var dest = config.tasks.images.dest;
var reportEnabled = config.tasks.images.sizeReport.enabled;
var reportSettings = config.tasks.images.sizeReport.settings;

gulp.task('images', function() {
  return gulp.src(src)
  // .pipe(changed(paths.dest)) // Ignore unchanged files
  .pipe(imagemin()) // Optimize
  .pipe(gulp.dest(dest))
  .pipe(browserSync.reload({stream:true})
  // Image Size Reporting
  .pipe(gulpIf(reportEnabled,
      sizeReport(reportSettings)
    ))
  );
});
