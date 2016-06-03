'use strict';

// Initialize BrowserSync and Watch compile CSS from SCSS,
// and regenerate styleguide.

var config      = require('../config');
var gulp        = require('gulp');
var path        = require('path');
var config      = require('../config');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sass        = require('gulp-sass');


// Check for required config settings
if(!config.tasks.css){return;}
if(!config.tasks.jsLint){return;}
if(!config.tasks.browserSync){return;}
if(!config.tasks.sassLint.pattern){return;}


// var config  = config.tasks.browserSync;
var scssSrc           = config.tasks.css.pattern;
var jsSrc             = config.tasks.jsLint.pattern;
var browserSyncConfig = config.tasks.browserSync;
var sassLintPattern   = config.tasks.sassLint.pattern;
var styleGuideSrc     = ['scss/**/*.scss','scss/**/*.html'];
// var styleGuideSrc  = config.tasks.styleGuide.pattern;

var sassConfig = config.tasks.css.sassConfig;

// gulp.task('watch', ['serve'], function() {

//   // SASS & Styleguide
//   gulp.watch(scssSrc, ['css:dev', 'sassLint', 'styleguide']);

//   // JS Tasks
//   gulp.watch(jsSrc, ['jsLint']);
// });

// gulp.task('watch', ['css:dev', 'sassLint', 'jsLint', 'styleguide'], function() {

//   // SASS & Styleguide
//   gulp.watch(scssSrc, ['css:dev', 'sassLint', 'styleguide']);

//   // JS Tasks
//   gulp.watch(jsSrc, ['jsLint']);
// });

// gulp.task('browserSync', ['sass'], function() {
//   return browserSync.init(browserSyncConfig);
// });



// gulp.task('watch', ['serve'], function() {
//     gulp.watch(scssSrc, ['css:dev','sassLint','styleguide']);

//     // Trigger Actions on save of SCSS files

//     // gulp.watch(scssSrc).on('change', browserSync.reload);
//     // gulp.watch(src.html).on('change', browserSync.reload);
// });

// Static Server + watching scss/html files

//gulp.task('serve', ['css:dev','sassLintCached','styleguide'], function() {
gulp.task('serve', ['css:dev', 'sassLintCached', 'styleguide'], function() {
  browserSync.init(browserSyncConfig);
  gulp.watch(scssSrc, ['css:dev']);
  gulp.watch(sassLintPattern, ['sassLintCached']);
  gulp.watch(styleGuideSrc, ['styleguide']);
});

gulp.task('default', ['serve']);


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

var reload       = browserSync.reload;
var path         = require('path');


// Config
var src = config.tasks.css.pattern;
var dest = config.tasks.css.dest;
var sassConfig = config.tasks.css.sassConfig;
var prefixSettings = config.tasks.css.autoprefixer;
var sourceMaps = config.tasks.css.sourceMaps;
var reportEnabled = config.tasks.css.sizeReport.enabled;
var reportSettings = config.tasks.css.sizeReport.settings;


// Development CSS - Non minfied with Sourcemaps
// gulp.task('css:dev', function () {
//   gulp.src(src)
//     .pipe(sourcemaps.init())
//     .pipe(sass(sassConfig))
//     .on('error', handleErrors)
//     .pipe(autoprefixer(prefixSettings))
//     .pipe(sourcemaps.write(sourceMaps))
//     .pipe(gulp.dest(dest))
//     .pipe(browserSync.stream({match: '**/*.css'}))
//     ;
// });

// // Production CSS - Minified w/size report, no sourcemaps.
// gulp.task('css:prod', function () {
//   gulp.src(src)
//     .pipe(sass(sassConfig))
//     .on('error', handleErrors)
//     .pipe(autoprefixer(prefixSettings))
//     .pipe(cleanCSS())
//     .pipe(gulp.dest(dest))

//     // Size Report
//     .pipe(gulpIf(reportEnabled,
//       sizeReport(reportSettings)
//     ))
//     ;
// });



