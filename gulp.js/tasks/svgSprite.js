'use strict';

var config       = require('../config');
if(!config.tasks.svgSprite){return;}

var gulp         = require('gulp');
var gulpIf      = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var svgStore     = require('gulp-svgstore');
var gzip         = require('gulp-gzip');
var path         = require('path');
var getFolders   = require('../lib/getFolders');
var rename       = require('gulp-rename');
var sizeReport  = require('gulp-sizereport');

var settings = {
  src: path.join(config.root.src, config.tasks.svgSprite.src, '**/*.svg'),
  dest: path.join(config.root.dest, config.tasks.svgSprite.dest),
  imageminSettings: config.tasks.svgSprite.imageminSettings,
  reportEnabled: config.tasks.svgSprite.sizeReport.enabled,
  reportSettings: config.tasks.svgSprite.sizeReport.settings,
};

// Step 1 - Minfify and copy to new location
gulp.task('svgMinify', function() {

return gulp.src(settings.src)
  .pipe(imagemin(settings.imageminSettings))
  .pipe(gulp.dest(settings.dest) // write all the minified svg to dest.
  );
});


// Step 2 - Sprite Minfied files
// Each sub-folder's content becomes a single SVG sprite
// in the root dest folder

gulp.task('createSprites', ['svgMinify'], function(){

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

// Step 3 - Export SVGz gzipped files for better compression the server side gzip
// Test to make sure they're not too big

gulp.task('svgSprite', ['createSprites'], function(){

  return gulp.src(path.join(settings.dest, '*.svg'))
  .pipe(rename(function(path){
      path.extname = ''; // Trim Extension
  }))
  .pipe(gzip({ extension: 'svgz' })) // Gzip and add "svgz" extension
  .pipe(gulp.dest(settings.dest))
  .pipe(gulpIf(settings.reportEnabled,
      sizeReport(settings.reportSettings)
    )
  );
});
