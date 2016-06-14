'use strict';

var config      = require('../config');
if(!config.tasks.css){return;}

var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var sizeReport   = require('gulp-sizereport');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');


// Local Config
var scssSrc = config.tasks.css.pattern;
var cssDest = config.tasks.css.dest;
var sassConfig = config.tasks.css.sassConfig;
var prefixSettings = config.tasks.css.autoprefixer;
var sourceMaps = config.tasks.css.sourceMaps;
var reportEnabled = config.tasks.css.sizeReport.enabled;
var reportSettings = config.tasks.css.sizeReport.settings;


// Development CSS (with BrowserSync) - Non minfied with Sourcemaps
gulp.task('css:devBrowserSync', function () {
  var browserSync  = require('browser-sync').get('bs');

  gulp.src(scssSrc)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig))
    .pipe(autoprefixer(prefixSettings))
    .pipe(sourcemaps.write(sourceMaps))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


// Development CSS - Non minfied with Sourcemaps
gulp.task('css:dev', function () {
  gulp.src(scssSrc)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig))
    .pipe(autoprefixer(prefixSettings))
    .pipe(sourcemaps.write(sourceMaps))
    .pipe(gulp.dest(cssDest));
});



// // Production CSS - Minified w/size report, no sourcemaps.
gulp.task('css:prod', function () {
  gulp.src(scssSrc)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass(sassConfig))
    .pipe(autoprefixer(prefixSettings))
    .pipe(cleanCSS())
    .pipe(gulp.dest(cssDest))

    // Size Report
    .pipe(gulpIf(reportEnabled,
      sizeReport(reportSettings)
    ))
    ;
});


