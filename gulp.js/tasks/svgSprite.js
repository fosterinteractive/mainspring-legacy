'use strict';

var config       = require('../config');
if(!config.tasks.svgSprite){return;}

var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var svgStore     = require('gulp-svgstore');
var gzip         = require('gulp-gzip');
var path         = require('path');
var del          = require('del');
var getFolders   = require('../lib/getFolders');
// var folders = require('gulp-folders'),
var rename       = require('gulp-rename');
var sizeReport   = require('gulp-sizereport');
var merge        = require('merge-stream');

// SVG Settings
var svgSource           = config.tasks.svgSprite.svgSource;
var svgKeepAttrsSource  = config.tasks.svgSprite.svgKeepAttributesSource;
var svgDest             = config.tasks.svgSprite.dest;
var settingsRemoveAttrs = config.tasks.svgSprite.settingsRemoveAttrs;
var settingsKeepAttrs   = config.tasks.svgSprite.settingsKeepAttrs;
var reportEnabled       = config.tasks.svgSprite.sizeReport.enabled;
var reportSettings      = config.tasks.svgSprite.sizeReport.settings;
var svgGzipFormat       = config.tasks.svgSprite.svgGzipFormat;

// Step 1 - Delete the SVG destination folder's contents
gulp.task('svgDelete', function() {
  // Delete all files except warning file to not save Svg in destination
  var deletePattern = [svgDest + '/**/*', '!' + svgDest + '/do-not-save-files-here.md'];
  return del(deletePattern);
});

// Step 2 - Minfify, Remove all Strokes & Fills, and copy to new location
gulp.task('svgMinify', ['svgDelete'], function() {
  return gulp.src(svgSource)
    .pipe(imagemin(settingsRemoveAttrs))
    .pipe(gulp.dest(svgDest) // write all the minified svg to dest.
  );
});

// Step 3 - Minfify (Leaving Strokes & Fills) and copy to new location
gulp.task('svgMinify:KeepAttributes', ['svgMinify'], function() {
  return gulp.src(svgKeepAttrsSource)
    .pipe(imagemin(settingsKeepAttrs))
    .pipe(gulp.dest(svgDest) // write all the minified svg to dest.
  );
});


// Step 4 - Sprite Minfied files
// Each sub-folder's content becomes a single SVG sprite
// in the root dest folder

gulp.task('createSprites', ['svgMinify:KeepAttributes'], function(){

  // Get the folders in the dest
  var spriteFolders = getFolders(svgDest);

  // Contents of each folder will get converted to a single sprite
  // spriteFolders.map - executes the function once per folder, and returns the async stream
  var buildSprites = spriteFolders.map(function(folder) {

    var spriteSrc = path.join(svgDest, folder, '/**/*.svg');

    return gulp.src(spriteSrc)
      .pipe(svgStore())
      .pipe(gulp.dest(svgDest));
    });

   return merge(buildSprites); // Wait for all stream emitters to end then return
});


// Step 5 - Export SVGz gzipped files for better compression the server side gzip
// Test to make sure they're not too big

gulp.task('svgSprite', ['createSprites'], function(){

  return gulp.src(svgDest + '/*.svg')
  .pipe(rename(function(path){
      path.extname = ''; // Trim Extension
  }))
  .pipe(gzip({ extension: svgGzipFormat })) // Gzip and add "svgz" extension
  .pipe(gulp.dest(svgDest))
  .pipe(gulpIf(reportEnabled,
      sizeReport(reportSettings)
    )
  );
});
