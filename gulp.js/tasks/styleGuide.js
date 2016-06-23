'use strict';

var config        = require('../config');
if(!config.tasks.css){return;}
if(!config.tasks.styleGuide){return;}

var gulp          = require('gulp');
var styleguide    = require('sc5-styleguide');

// Local Config
var scssSrc = config.tasks.css.pattern;
var cssDest = config.tasks.css.dest;
var styleGuideSettings = config.tasks.styleGuide.styleGuideSettings;
var styleGuideSrc = config.tasks.styleGuide.styleGuideSrc;
var styleBuildPath = config.tasks.styleGuide.styleGuideBuildPath;

// Generate Tasks creates the styleguide files
gulp.task('sc5:generate', function() {
  return gulp.src(scssSrc)
    .pipe(styleguide.generate(styleGuideSettings))
    .pipe(gulp.dest(styleBuildPath));
});

// Apply Styles: Parses CSS outpiut to Generate :hover
// & other pseudo elements as classes for display in the styleguide
gulp.task('styleGuide', ['sc5:generate'], function() {
  return gulp.src(cssDest + '/*.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleBuildPath));
});

// BrowserSync Style Guide Tasks

// Generate Tasks creates the styleguide files
gulp.task('sc5:generateBrowserSync', function() {
  var browserSync  = require('browser-sync').get('bs');

  return gulp.src(scssSrc)
    .pipe(styleguide.generate(styleGuideSettings))
    .pipe(gulp.dest(styleBuildPath))
    .pipe(browserSync.stream({match:['**/*.json','**/*.html']}));
});

// Apply Styles: Parses CSS outpiut to Generate :hover
// & other pseudo elements as classes for display in the styleguide
gulp.task('styleGuide:BrowserSync', ['sc5:generateBrowserSync'], function() {
  var browserSync  = require('browser-sync').get('bs');

  return gulp.src(cssDest + '/*.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleBuildPath))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


