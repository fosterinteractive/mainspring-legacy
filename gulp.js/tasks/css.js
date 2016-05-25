'use strict';

var config      = require('../config');
if(!config.tasks.css){return;}

var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var sizeReport   = require('gulp-sizereport');


// Config
var src = config.tasks.css.pattern;
var dest = config.tasks.css.dest;
var sassConfig = config.tasks.css.sassConfig;
var prefixSettings = config.tasks.css.autoprefixer;
var sourceMaps = config.tasks.css.sourceMaps;
var reportEnabled = config.tasks.css.sizeReport.enabled;
var reportSettings = config.tasks.css.sizeReport.settings;


// Development CSS - Non minfied with Sourcemaps
gulp.task('css:dev', function () {
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig))
    .on('error', handleErrors)
    .pipe(autoprefixer(prefixSettings))
    .pipe(sourcemaps.write(sourceMaps))
    .pipe(gulp.dest(dest))
    ;
});

// Production CSS - Minified w/size report, no sourcemaps.
gulp.task('css:prod', function () {
  return gulp.src(src)
    .pipe(sass(sassConfig))
    .on('error', handleErrors)
    .pipe(autoprefixer(prefixSettings))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest))

    // Size Report
    .pipe(gulpIf(reportEnabled,
      sizeReport(reportSettings)
    ))
    ;
});

// Watch Tasks (For Debug only - see watch.js for recommended task)
gulp.task('css:watch', ['css:dev'], function() {
  gulp.watch(src, ['css:dev']);
});
