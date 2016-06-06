'use strict';

var config        = require('../config');
if(!config.tasks.css){return;}
// if(!config.tasks.stylguide){return;}


// Local Config
var scssSrc = config.tasks.css.pattern;
var cssDest = config.tasks.css.dest;
var sassConfig = config.tasks.css.sassConfig;
var prefixSettings = config.tasks.css.autoprefixer;
var sourceMaps = config.tasks.css.sourceMaps;
var reportEnabled = config.tasks.css.sizeReport.enabled;
var reportSettings = config.tasks.css.sizeReport.settings;

var extraHead = [
  '<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>',
  '<script src="/js/vendor/svg4everybody.min.js"></script>',
  '<script src="/js/vendor/velocity.min.js"></script>',
  '<script src="/js/vendor/mainspring.accordion.js"></script>',
  '<script src="/js/styleguide.js"></script>'
];



var gulp          = require('gulp');
var styleguide    = require('sc5-styleguide');
var browserSync   = require('browser-sync');
// var outputPath    = 'styleguide';

var overviewPath = 'scss/homepage.md';
var styleguideAppRoot = './';
var styleguideBuildPath = 'styleguide';

// Generate Tasks creates the styleguide files
gulp.task('sc5:generate', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Styleguide',
        server: false,
        rootPath: styleguideBuildPath,
        appRoot: styleguideAppRoot,
        overviewPath: overviewPath,
        disableHtml5Mode: true,
        sideNav: true,
        extraHead: extraHead,
        disableEncapsulation: true
      }))
    .pipe(gulp.dest(styleguideBuildPath));
});

// Apply Styles: Parses CSS outpiut to Generate :hover
// & other pseudo elements as classes for display in the styleguide
gulp.task('styleGuide', ['sc5:generate'], function() {
  return gulp.src('css/**.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideBuildPath));
});

// Generate Tasks creates the styleguide files
gulp.task('sc5:generateBrowserSync', function() {
  var browserSync  = require('browser-sync').get('bs');

  return gulp.src('scss/**/*.scss')
    .pipe(styleguide.generate({
        title: 'Styleguide',
        server: false,
        rootPath: styleguideBuildPath,
        appRoot: styleguideAppRoot,
        overviewPath: overviewPath,
        disableHtml5Mode: true,
        sideNav: true,
        extraHead: extraHead,
        disableEncapsulation: true
      }))
    .pipe(gulp.dest(styleguideBuildPath))
    .pipe(browserSync.stream({match:['**/*.json']}));
});


gulp.task('styleGuide:BrowserSync', ['sc5:generateBrowserSync'], function() {
  var browserSync  = require('browser-sync').get('bs');

  return gulp.src('css/**.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideBuildPath))
    .pipe(browserSync.stream({match: '**/*.css'}));
});


