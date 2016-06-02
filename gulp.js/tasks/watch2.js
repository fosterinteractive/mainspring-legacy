'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;


var config      = require('../config');
if(!config.tasks.css){return;}

var src = config.tasks.css.pattern;
var dest = config.tasks.css.dest;
var sassConfig = config.tasks.css.sassConfig;
var browserSyncConfig = config.tasks.browserSync;


// Static Server + watching scss/html files
gulp.task('serve', ['css:dev'], function() {

    browserSync.init(browserSyncConfig);

    gulp.watch(src, ['sass']);
    // gulp.watch(src.html).on('change', browserSync.reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src)
        .pipe(sass(sassConfig))
        .pipe(gulp.dest(dest))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
