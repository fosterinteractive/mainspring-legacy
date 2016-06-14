'use strict';

// Initialize BrowserSync and Watch compile CSS from SCSS,
// and regenerate styleguide.

var config      = require('../config');
var gulp        = require('gulp');
var path        = require('path');
var config      = require('../config');
var browserSync = require('browser-sync').create('bs');
var sass        = require('gulp-sass');


// Check for required config settings
if(!config.tasks.css){return;}
if(!config.tasks.jsLint){return;}
if(!config.tasks.browserSync){return;}
if(!config.tasks.sassLint.pattern){return;}


var scssSrc           = config.tasks.css.pattern;
var jsSrc             = config.tasks.jsLint.pattern;
var browserSyncConfig = config.tasks.browserSync;
var sassLintPattern   = config.tasks.sassLint.pattern;
var styleGuideSrc     = config.tasks.styleGuide.styleGuideSrc;

var sassConfig = config.tasks.css.sassConfig;

// Watch Tasks

gulp.task('watch', ['css:dev','sassLint', 'jsLint'], function() {

  browserSync.init(browserSyncConfig); // Initialize BrowserSync Server

  gulp.watch(scssSrc, ['css:devBrowserSync']); // Compile SCSS to CSS
  gulp.watch(sassLintPattern, ['sassLint:Cached']); // Lint SCSS
  gulp.watch(styleGuideSrc, ['styleGuide:BrowserSync']); // Compile scss/html files to Style Guide

  // JS Tasks
  gulp.watch(jsSrc, ['jsLint']);
});







