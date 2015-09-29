'use strict';

// From http://jonstuebe.com/2014/12/26/dealing-with-bower-files/

var gulp = require('gulp');
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');
var del = require('del');


gulp.task('bower:install', function() {
  return bower();
});

gulp.task('bower:clean', function() {
  del(['bower_export/**']);
});

gulp.task('bower:export', ['bower:clean'], function() {

  return gulp.src(mainBowerFiles(/* options */), { base: 'bower_components' })
  .pipe(bowerNormalizer({
    bowerJson: './bower.json',
    flatten: true,
    }))
  .pipe(gulp.dest('./bower_export'))
  ;

});
