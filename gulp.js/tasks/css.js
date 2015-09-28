'use strict';

var config      = require('../config');
if(!config.tasks.images){return;}

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');

// Config
var src = config.tasks.css.pattern;
var dest = gulp.dest(config.tasks.css.dest);
var sassConfig = config.tasks.css.sassConfig;
var prefixSettings = config.tasks.css.autoprefixer;

gulp.task('css', function () {
  return gulp.src(src)
    // .pipe(sourcemaps.init())
    .pipe(sass(sassConfig))
    .on('error', handleErrors)
    .pipe(autoprefixer(prefixSettings))
    // .pipe(sourcemaps.write())
    .pipe(dest)
    .pipe(browserSync.reload({stream:true})
  );
});
