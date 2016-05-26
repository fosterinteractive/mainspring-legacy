'use strict';

var config        = require('../config');
if(!config.tasks.jsLint){return;}

var gulp          = require('gulp');
var hologram      = require('gulp-hologram');
var browserSync   = require('browser-sync');

// Config
var configFile = config.tasks.hologram.configFile;
var settings = config.tasks.hologram.settings;

gulp.task('styleGuideasdasdada', function() {
  gulp.src(configFile)
    .pipe(hologram(settings))
    .pipe(browserSync.reload({stream:true}));
});

