'use strict';
// ******************************** //
// *** Required Config Settings *** //
// ******************************** //

// BrowserSync Proxy URL
var localUrl = 'mainspring.dev'; // EG 'localhost', 'mysite.dev'

// Style Guide Settings
//
// Add in these files to the <head> of the styleguide
var styleGuideExtraHead = [
  '<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>',
  '<script src="/js/vendor/svg4everybody.min.js"></script>',
  '<script src="/js/vendor/velocity.min.js"></script>',
  '<script src="/js/vendor/mainspring.accordion.js"></script>',
];

// Page Title of Style Guide
var styleGuideTitle = 'Style Guide';

// Generate Style Guide in this folder
var styleGuideBuildPath = 'styleguide';

// ******************************** //
// *** Optional Config Settings *** //
// ******************************** //
// Only need to change if your use a non-default
// mainspring folder structure.

/////////////
// Sass & CSS Settings
// Watch scss files to compile to css
var scssPattern = ['scss/**/*.scss'];
var maxCssSize = 70000 // Warn if compiled css < 70kb (uncompressed)
var maxCssGzippedSize = 40000 // Warn if compiled css < 40kb (compressed)

/////////////
// Linters

// Exclude these SCSS files from linting
var sassLintExclusions = ['!scss/**/vendor/**/*.scss'];

// Lint all SCSS files, the sassLintExclusions files
var sassLintPattern = scssPattern.concat(sassLintExclusions);

// JS Linting these files. (Default is no minified or /vendor files)
var jsLintPattern = [
  'js/**/*.js',
  '!js/**/*.min.js', // Ignore minified files
  '!js/**/vendor/*.js']; // Ignore /vendor sub-folders

////////////////
// SVG Settings

// Source Folder for non optimized SVG's.
var svgPattern = ['svg-src/**/*.svg'];

// Keep Stroke / Fill Attributes for these folders.
var svgKeepAttributes = ['svg-src/svg-art/*.svg'];

//
var svgSource = svgPattern.concat(svgKeepAttributes.map(function (i){
    return '!' + i;
}));

console.log(svgSource);

// Export SVG sprites here
var svgDestination = ['svg'];


var svgGzip = ['svgz']; // svgz or svg.gz

// Config Array used by gulp.js tasks
module.exports = {

  tasks: {

    browserSync: {
      // See http://www.browsersync.io/docs/options/ for options
      proxy: localUrl,
      port: 3333,
      ui:{
        port: 3334
      },
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      }

    },

    // Compile CSS from SCSS and optimize
    css: {
      pattern: scssPattern,
      dest: 'css',
      autoprefixer: {
        browsers: [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 6',
        'android >= 4.2',
        'bb >= 10'
        ]

      },
      sassConfig: {
        // Node Sass Settings - https://github.com/sass/node-sass
        indentedSyntax: false, // Enable .sass syntax
        precision: 10, // Google Starter kit's default
        errLogToConsole: true
      },
      sourceMaps: './maps', // Source Maps Folder
      sizeReport: {
        enabled: true,
        settings: {
          gzip: true, // Gzip for size reporting
          '*': {
            'maxSize': maxCssSize,
            'maxGzippedSize': maxCssGzippedSize // Max Size in Bytes after gzip
          }
        }
      }
    },

    styleGuide: {
      styleGuideSettings: {
        title: styleGuideTitle,
        styleGuideExtraHead: styleGuideExtraHead,
        server: false,
        appRoot: './',
        overviewPath: 'scss/homepage.md',
        disableHtml5Mode: true,
        sideNav: true,
        disableEncapsulation: true
      },
      styleGuideSrc: styleGuideSrc,
      styleGuideBuildPath: styleGuideBuildPath
    },

    jsLint: {
      pattern: jsLintPattern
    },

    sassLint: {
      pattern: sassLintPattern
    },

    // Compress Static Bitmaps
    images: {
      src: 'img-src',
      dest: 'img',
      extensions: ['jpg', 'png'], // No gif, PNG-8 is better
      settings: {
        progressive: true, // Progressive JPG
        optimizationLevel: 4, //PNG compression level
      },
      sizeReport: {
        enabled: true,
        settings: {
          gzip: true, // Gzip for size reporting
          '*': {
            'maxGzippedSize': 50000 // Max Size in Bytes after gzip
          }
        }
      }
    },

    // SVG spriting
    svgSprite: {
      svgSource: 'svgSource',
      dest: 'svg',
      extensions: ['svg'],
      // Setting Remove Strokes and Fills for CSS color controll on SVG's
      settingsRemoveAttrs: {
        multipass: true,
          svgoPlugins: [
            { removeAttrs : { attrs :['stroke', 'fill'] }}
          ],
      },
      // Setting leaves Colors intact
      settings: {
        multipass: true,
      },
      sizeReport: {
        enabled: true,
        settings: {
          '*': {
            'maxSize': 50000 // Alert if > Max Size in Bytes after gzip
          }
        }
      }
    }
  },

};


