'use strict';

var extraHead = [
  '<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>',
  '<script src="/js/vendor/svg4everybody.min.js"></script>',
  '<script src="/js/vendor/velocity.min.js"></script>',
  '<script src="/js/vendor/mainspring.accordion.js"></script>',
  '<script src="/js/styleguide.js"></script>'
];

// var config        = require('../config');
// if(!config.tasks.jsLint){return;}

var gulp          = require('gulp');
var styleguide    = require('sc5-styleguide');
var browserSync   = require('browser-sync');
// var outputPath    = 'styleguide';

var overviewPath = 'scss/homepage.md';
var styleguideAppRoot = './';
var styleguideBuildPath = 'styleguide';

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

gulp.task('sc5:applystyles', function() {
  return gulp.src('css/**.css')
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(styleguideBuildPath));
});

gulp.task('styleguide', ['sc5:generate', 'sc5:applystyles']);
