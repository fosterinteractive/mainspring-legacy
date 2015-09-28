'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var path    = require('path');
// var watch   = require('gulp-watch');
// var plumber = require('gulp-plumber');
// var batch   = require('gulp-batch');

// gulp.task('watch', function () {
//     watch('./sass/**/*.scss', batch(function (events, done) {
//         gulp.start('build', done);
//     }));
// });

gulp.task('watch', ['browserSync'], function() {

  // SASS & Styleguide
    gulp.watch('sass/**/*.scss', ['scssLint', 'styleGuide']);
});

// gulp.task('watch', ['browserSync'], function() {
//   // 'images', 'svgSprite', 'css',
//   var watchableTasks = ['css', 'scssLint'];

//   watchableTasks.forEach(function(taskName) {
//     var task = config.tasks[taskName];
//     if(task) {
//       // Some tasks handle mutiple sources or have exceptions
//       if (task.pattern == null){
//         var filePattern = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
//       } else {
//         var filePattern = task.pattern;
//       }

//       console.log(filePattern);
//       watch(filePattern, function() {
//         gulp.start(taskName);
//       });
//   }
// });
