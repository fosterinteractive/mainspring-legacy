'use strict';

// var config        = require('../config');
// if(!config.tasks.jsLint){return;}

var gulp          = require('gulp');
// var styleguide    = require('sc5-styleguide');
// var browserSync   = require('browser-sync');
// var outputPath    = 'styleguide';



// gulp.task('styleguide:generate', function() {
//   return gulp.src('css/**/*.scss')
//     .pipe(styleguide.generate({
//         title: 'Styleguide',
//         server: false,
//         appRoot: outputPath,
//         disableEncapsulation: true,
//         overviewPath: 'styleguide.md'
//       }))
//     .pipe(gulp.dest(outputPath));
// });

// gulp.task('styleguide:applystyles', function() {
//   return gulp.src('css/style.css')
//     .pipe(styleguide.applyStyles())
//     .pipe(gulp.dest(outputPath));
// });

// gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// kss-node 2.3.1 and later.
var kss = require('kss');


var options = {
  source: [
    './scss'
  ],
  destination: 'styleguide',

  // The css and js paths are URLs, like '/misc/jquery.js'.
  // The following paths are relative to the generated style guide.
  css: [
    ('../css/styles.css')
  ],

  js: [
  ],

  homepage: 'homepage.md',
  title: 'Style Guide'
};



gulp.task('styleguide', function(cb) {
  kss(options, cb);
});
