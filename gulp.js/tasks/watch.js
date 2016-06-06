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
if(!config.tasks.sassLint.pattern){return;}


var scssSrc           = config.tasks.css.pattern;
var jsSrc             = config.tasks.jsLint.pattern;
var browserSyncConfig = config.tasks.browserSync;
var sassLintPattern   = config.tasks.sassLint.pattern;
var styleGuideSrc     = config.tasks.styleGuide.styleGuideSrc;

var sassConfig = config.tasks.css.sassConfig;

// Watch Tasks

gulp.task('serve', ['css:dev','sassLintCached', 'jsLint', 'styleGuide'], function() {

  browserSync.init(browserSyncConfig); // Initialize BrowserSync Server

  gulp.watch(scssSrc, ['css:devBrowserSync']); // Compile SCSS to CSS
  gulp.watch(sassLintPattern, ['sassLintCached']); // Lint SCSS
  gulp.watch(styleGuideSrc, ['styleGuide:BrowserSync']); // Compile scss/html files to Style Guide

  // JS Tasks
  gulp.watch(jsSrc, ['jsLint']);
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
var scssSrc = config.tasks.css.pattern;
var cssDest = config.tasks.css.dest;
var sassConfig = config.tasks.css.sassConfig;
var prefixSettings = config.tasks.css.autoprefixer;
var sourceMaps = config.tasks.css.sourceMaps;
var reportEnabled = config.tasks.css.sizeReport.enabled;
var reportSettings = config.tasks.css.sizeReport.settings;


