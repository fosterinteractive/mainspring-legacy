'use strict';

// Initialize BrowserSync and Watch compile CSS from SCSS,
// and regenerate styleguide.

var config      = require('../config');
var gulp        = require('gulp');
var path        = require('path');
var config      = require('../config');
var browserSync = require('browser-sync').create('bs');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');


// Check for required config settings
if(!config.tasks.css){return;}
if(!config.tasks.jsLint){return;}
if(!config.tasks.browserSync){return;}

// var config  = config.tasks.browserSync;
var scssSrc           = config.tasks.css.pattern;
var jsSrc             = config.tasks.jsLint.pattern;
var browserSyncConfig = config.tasks.browserSync;
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


gulp.task('watch', ['serve'], function() {
    // gulp.watch(scssSrc, ['css:dev','sassLint','styleguide']);

    // Trigger Actions on save of SCSS files

    gulp.watch(scssSrc).on('change', browserSync.reload);
    // gulp.watch(src.html).on('change', browserSync.reload);


});

// Static Server + watching scss/html files
gulp.task('serve', function() {
  return browserSync.init(browserSyncConfig);
});

gulp.task('default', ['watch']);
