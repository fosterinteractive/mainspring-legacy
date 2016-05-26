'use strict';

// var config        = require('../config');
// if(!config.tasks.jsLint){return;}

var gulp          = require('gulp');
var styleguide    = require('sc5-styleguide');
var browserSync   = require('browser-sync');
// var outputPath    = 'styleguide';

var overviewPath = 'scss/homepage.md';
var styleguideAppRoot = './';
var styleguideBuildPath = 'styleguide-sc5';

gulp.task('sc5:generate', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Styleguide',
        server: false,
        rootPath: styleguideBuildPath,
        appRoot: styleguideAppRoot,
        overviewPath: overviewPath,
        disableHtml5Mode: true
      }))
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('sc5:applystyles', function() {
  return gulp.src('css/**.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('styleguide', ['sc5:generate', 'sc5:applystyles']);
