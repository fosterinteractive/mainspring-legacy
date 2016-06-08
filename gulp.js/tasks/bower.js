'use strict';

// From http://jonstuebe.com/2014/12/26/dealing-with-bower-files/
// http://andy-carter.com/blog/a-beginners-guide-to-package-manager-bower-and-using-gulp-to-manage-components

var gulp = require('gulp');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('bower:install', function() {
  return bower();
});

gulp.task('bower:clean', function() {
  return del(['./js/vendor/**']);
});

gulp.task('bower', ['bower:install', 'bower:clean'], function() {

  return gulp.src(mainBowerFiles(/* options */), { base: 'bower_components' })
  .pipe(bowerNormalizer({
    bowerJson: './bower.json',
    // flatten: true,
    }))
  .pipe(filter('**/*.js'))
  .pipe(flatten())
  .pipe(gulp.dest('./js/vendor')) // Write the non-minified JS
  .pipe(uglify()) // Minify JS
  .pipe(rename({extname: '.min.js'})) // Change file to *.min.js
  .pipe(gulp.dest('./js/vendor')) // Write minified files
  ;

});
