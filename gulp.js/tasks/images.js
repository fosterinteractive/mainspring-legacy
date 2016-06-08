'use strict';

var config      = require('../config');
if(!config.tasks.images){return;}

var gulp        = require('gulp');
var gulpIf      = require('gulp-if');
var browserSync = require('browser-sync');
var imagemin    = require('gulp-imagemin');
var path        = require('path');
var sizeReport  = require('gulp-sizereport');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');

//Config
var imageSrc  = config.tasks.images.src + '/**';
var imageDest = config.tasks.images.dest;
var reportEnabled = config.tasks.images.sizeReport.enabled;
var reportSettings = config.tasks.images.sizeReport.settings;

gulp.task('images', function() {
  return gulp.src(imageSrc)
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))

  .pipe(imagemin()) // Optimize
  .pipe(gulp.dest(imageDest))
  .pipe(browserSync.reload({stream:true})

  // Image Size Reporting
  .pipe(gulpIf(reportEnabled,
      sizeReport(reportSettings)
    ))
  );
});
