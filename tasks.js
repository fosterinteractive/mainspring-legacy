'use strict';

// THIS IS ALL TO BE REFACTORED INTO /GULP.JS
// Tasks are deleted as they're replaced

var gulp = require('gulp');
// Run events in sequence (will be depreciated in gulp 4.0)
// var runSequence = require('run-sequence');
var rename = require('gulp-rename');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');

// Cache Enhances performance of SCSS Lint
var cache = require('gulp-cached');
var size = require('gulp-filesize');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Filter is used to stop .map files from triggering browser sync refeshes
var filter = require('gulp-filter');

// Image Minification
var imagemin = require('gulp-imagemin');
var gzip = require('gulp-gzip');
// Combines Many svg's into 1
var svgSprite = require('gulp-svg-sprite');
var hologram = require('gulp-hologram');

var cssBase64 = require('gulp-css-base64');
// var gzip   = require('gulp-gzip');

// Resources for Gulp
// http://markgoodyear.com/2014/01/getting-started-with-gulp/
// http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev
// http://cameronspear.com/blog/handling-sync-tasks-with-gulp-js/
// http://www.smashingmagazine.com/2014/06/11/building-with-gulp/

// SASS Production Task Minified + Auto-prefixed, inline images.

gulp.task('sass-prod', function() {
    return sass('./sass/style.scss', {
      style: 'compressed',
      bundleExec: true,
      sourcemap: false,
      precision: 6,
    })
    .on('error', handleError)
    .pipe(cssBase64({
      extensionsAllowed: ['.gif', '.jpg', '.svg', '.png'],
      maxWeightResource: 4000 //Max size 4KB
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      cascade: false
    }))
    .pipe(size())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass-styleguide', function() {
    return sass('./sass/styleguide.scss', {
      style: 'compressed',
      bundleExec: true,
      sourcemap: false,
      precision: 6,
    })
    .on('error', handleError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      cascade: false
    }))
    .pipe(size())
    .pipe(gulp.dest('./css'));
});

// SASS Dev Task Expanded, Sourcemaps, Auto-prefixed

gulp.task('sass', function() {
    return sass('./sass/style.scss', {
      style: 'expanded',
      bundleExec: true,
      sourcemap: true,
      precision: 6,
    })
    .on('error', handleError)
    .pipe(autoprefixer({ // Autoprefix
      browsers: ['last 2 versions', 'ie >= 9'],
      cascade: false
    }))
    .pipe(sourcemaps.write()) // Write Source Maps
    .pipe(size()) // Write Size
    .pipe(gulp.dest('./css')); // Write CSS
});










// Copy all the Bower Components we need to the appropriate plaecs in the repo

/*gulp.task('bower', function() {
    var bower = require('main-bower-files');
    var bowerNormalizer = require('gulp-bower-normalize');
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('./bower_dependencies/'))
});
*/


// Default Task Watch - SASS (Dev)
gulp.task('default', ['browser-sync', 'sass', 'scsslint', 'styleguide'], function() {
  gulp.watch('sass/**/*.scss', ['sass', 'scsslint', 'styleguide']);
});

