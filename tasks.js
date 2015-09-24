'use strict';

var gulp = require('gulp');
// Run events in sequence (will be depreciated in gulp 4.0)
// var runSequence = require('run-sequence');
var rename = require('gulp-rename');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');

// Cache Enhances performance of SCSS Lint
var cache = require('gulp-cached');
var size = require('gulp-filesize');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Filter is used to stop .map files from triggering browser sync refeshes
var filter = require('gulp-filter');

// Image Minification
var imagemin = require('gulp-imagemin');
var gzip = require('gulp-gzip');
// Combines Many svg's into 1
var svgSprite = require('gulp-svg-sprite');
var hologram = require('gulp-hologram');

var cssBase64 = require('gulp-css-base64');
// var gzip   = require('gulp-gzip');

// Resources for Gulp
// http://markgoodyear.com/2014/01/getting-started-with-gulp/
// http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev
// http://cameronspear.com/blog/handling-sync-tasks-with-gulp-js/
// http://www.smashingmagazine.com/2014/06/11/building-with-gulp/

//////////////////////////////
// Errors Handler
//
// If we need more robust error handling this would work
// http://www.artandlogic.com/blog/2014/05/error-handling-in-gulp/
//////////////////////////////

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// SASS Production Task Minified + Auto-prefixed, inline images.

gulp.task('sass-prod', function() {
    return sass('./sass/style.scss', {
      style: 'compressed',
      bundleExec: true,
      sourcemap: false,
      precision: 6,
    })
    .on('error', handleError)
    .pipe(cssBase64({
      extensionsAllowed: ['.gif', '.jpg', '.svg', '.png'],
      maxWeightResource: 4000 //Max size 4KB
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      cascade: false
    }))
    .pipe(size())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass-styleguide', function() {
    return sass('./sass/styleguide.scss', {
      style: 'compressed',
      bundleExec: true,
      sourcemap: false,
      precision: 6,
    })
    .on('error', handleError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      cascade: false
    }))
    .pipe(size())
    .pipe(gulp.dest('./css'));
});

// SASS Dev Task Expanded, Sourcemaps, Auto-prefixed

gulp.task('sass', function() {
    return sass('./sass/style.scss', {
      style: 'expanded',
      bundleExec: true,
      sourcemap: true,
      precision: 6,
    })
    .on('error', handleError)
    .pipe(autoprefixer({ // Autoprefix
      browsers: ['last 2 versions', 'ie >= 9'],
      cascade: false
    }))
    .pipe(sourcemaps.write()) // Write Source Maps
    .pipe(size()) // Write Size
    .pipe(gulp.dest('./css')); // Write CSS
});




//////////////////////////////
// SCSS Lint Task
//////////////////////////////
gulp.task('scsslint', function() {
  return gulp.src([
    'sass/**/*.scss',
    '!sass/styleguide.scss',
    '!sass/**/vendor/**/*.scss',
    '!sass/global/_normalize.scss'
    ])
    .pipe(cache('scsslint'))
    .pipe(scsslint(
{      'bundleExec': true
    }));
});



//////////////////////////////
// Style Guide Task
//////////////////////////////

gulp.task('styleguide', function() {
  gulp.src('hologram_config.yml')
    .pipe(hologram({
      bundler: true,
      logging: false
    }));
});



//////////////////////////////
// Gulp Minify SVG & Images
//////////////////////////////

gulp.task('svg-compress', function () {
  return gulp.src('svg-src/**/*.svg')
    .pipe(imagemin({
      progressive: true,
      multipass: true,
      // svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('svg'));
});


//////////////////////////////
// SVG Sprite
//////////////////////////////

// Settings for SVG spriting

var configSymbol = {
 //shape              : {
 //   dimension       : {           // Set maximum dimensions
 //       maxWidth    : 32,
 //       maxHeight   : 32
 //   },
 //   spacing         : {         // Add padding
 //       padding     : 10
 //   },
 // },

  mode              : {

    symbol          : { // Activate the Symbol mode

      bust          : false,  // Don't add random string to output
      dest          : '', // Export folder (not needed due to gulp.dest)
      sprite        : 'sprite-ui.svg', // Export File Name
    }

  },

  svg               : {
    xmlDeclaration  : false
  }

};

var configSymbolProducts = {

  mode              : {

    symbol          : { // Activate the Symbol mode

      bust          : false,  // Don't add random string to output
      dest          : '', // Export folder (not needed due to gulp.dest)
      sprite        : 'sprite-products.svg', // Export File Name
    }

  },

  svg               : {
    xmlDeclaration  : false
  }

};

var configSymbolSocial = {

  mode              : {

    symbol          : { // Activate the Symbol mode

      bust          : false,  // Don't add random string to output
      dest          : '', // Export folder (not needed due to gulp.dest)
      sprite        : 'sprite-social.svg', // Export File Name
    }

  },

  svg               : {
    xmlDeclaration  : false
  }

};

// Compresses and then sprites SVG's

// gulp.task('svg-sprite',['svg-compress'], function () {

//   return gulp.src('svg/sprite/*.svg','svg/sprite/*.svg')
//     .pipe(svgSprite(configSymbol)) // Sprite SVG
//     .pipe(svgSprite(configSymbolProducts)) // Sprite SVG
//     .pipe(gulp.dest('svg')); // Save the Result to the Output Destination
// });



gulp.task('svg-ui', ['svg-compress'], function () {
  return gulp.src('svg/sprite-ui/*.svg')
    .pipe(svgSprite(configSymbol)) // Sprite SVG
    .pipe(gulp.dest('svg')) // Save the Result to the Output Destination
    .pipe(rename(function(path){
      path.extname = ''; // Trim Extension
    }))
    .pipe(gzip({ extension: 'svgz' })) // Gzip and add "svgz" extension
    .pipe(gulp.dest('svg'));
});

// SVG task for spriting social
gulp.task('svg-social', ['svg-ui'], function () {

  return gulp.src('svg/sprite-social/*.svg')
    .pipe(svgSprite(configSymbolSocial)) // Sprite SVG
    .pipe(gulp.dest('svg')) // Save the Result to the Output Destination
    .pipe(rename(function(path){
      path.extname = ''; // Trim Extension
    }))
    .pipe(gzip({ extension: 'svgz' })) // Gzip and add "svgz" extension
    .pipe(gulp.dest('svg'));
});


// SVG task for spriting products
gulp.task('svg', ['svg-social', 'img-compress'], function () {

  return gulp.src('svg/sprite-products/*.svg')
    .pipe(svgSprite(configSymbolProducts)) // Sprite SVG
    .pipe(gulp.dest('svg')) // Save the Result to the Output Destination
    .pipe(rename(function(path){
      path.extname = ''; // Trim Extension
    }))
    .pipe(gzip({ extension: 'svgz' })) // Gzip and add "svgz" extension
    .pipe(gulp.dest('svg'));
});



// //////////////////////////////
// // BrowserSync Task
// //////////////////////////////

// Static Server + watching scss/html files
// Must run local dev enviroment in "http://website.dev"

gulp.task('browser-sync', function() {
    browserSync.init({
      proxy: 'enercare.dev',
      port: 3333,
      // startPath: '/index.php',
      files: ['./css/*.css'],
      ui:{
        port: 3334
      }
    });
});

// Copy all the Bower Components we need to the appropriate plaecs in the repo

/*gulp.task('bower', function() {
    var bower = require('main-bower-files');
    var bowerNormalizer = require('gulp-bower-normalize');
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('./bower_dependencies/'))
});
*/


// Default Task Watch - SASS (Dev)
gulp.task('default', ['browser-sync', 'sass', 'scsslint', 'styleguide'], function() {
  gulp.watch('sass/**/*.scss', ['sass', 'scsslint', 'styleguide']);
});

