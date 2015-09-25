'use strict';

var config       = require('../config');
if(!config.tasks.svgSprite){return;}

var browserSync  = require('browser-sync');
var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var svgStore     = require('gulp-svgstore');
var gzip         = require('gulp-gzip');
var path         = require('path');
var getFolders   = require('../lib/getFolders');
var merge = require('merge-stream');

var settings = {
  src: path.join(config.root.src, config.tasks.svgSprite.src, '**/*.svg'),
  dest: path.join(config.root.dest, config.tasks.svgSprite.dest),
  imageminSettings: config.tasks.svgSprite.imageminSettings,
};

// Step 1 - Minfify and copy to new location
gulp.task('svgMinify', function() {

return gulp.src(settings.src)
  .pipe(imagemin(settings.imageminSettings))
  .pipe(gulp.dest(settings.dest) // write all the minified svg to dest.
  );
});



// Step 2 - Sprite Minfied files
// Each sub-folder's content becomes a single svg sprite

gulp.task('svgSprite', ['svgMinify'], function(){

  // Get the folders in the dest
  var spriteFolders = getFolders(settings.dest);

  // Contents of each folder will get converted to a single sprite
  // spriteFolders.map - executes the function once per folder, and returns the async stream
  var buildSprites = spriteFolders.map(function(folder) {

    var src = path.join(settings.dest, folder, '/**/*.svg');

    return gulp.src(src)
      .pipe(svgStore())
      .pipe(gulp.dest(settings.dest));
  });

});
