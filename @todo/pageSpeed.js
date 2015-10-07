'use strict';
var gulp      = require('gulp');
// variables
// var ngrok     = require('ngrok');
// var psi       = require('psi');
// var sequence  = require('run-sequence');
// var site      = '';
// var portVal   = 3020;

// Run PageSpeed Insights
gulp.task('pageSpeed', function (cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('dww.com', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});



// variables
var ngrok     = require('ngrok');
var psi       = require('psi');
var sequence  = require('run-sequence');
var site      = 'localhost';
// var portVal   = 3020;

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(80, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }, cb);
});

// this is where your server task goes. I'm using browser sync
gulp.task('browser-sync-psi', function() {
  browserSync({
    // port: portVal,
    // open: false,
    server: {
      baseDir: '_site'
    }
  });
});

// psi sequence with 'browser-sync-psi' instead
gulp.task('psi-seq', function (cb) {
  return sequence(
    // 'browser-sync-psi',
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});

// psi task runs and exits
gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!');
  process.exit();
});
