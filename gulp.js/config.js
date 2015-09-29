'use strict';

module.exports = {

  tasks: {

    browserSync: {
      // See http://www.browsersync.io/docs/options/ for options
      proxy: 'mainspring.dev',
      port: 3333,
      files: [
      './scss/*.css',
        './styleguide/index.html'], // Watch index.html only - Holgram regenerates every file on update.
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
      pattern: ['./scss/**/*.scss'],
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
            'maxSize': 70000,
            'maxGzippedSize': 50000 // Max Size in Bytes after gzip
          }
        }
      }
    },
    hologram: {
      configFile: './hologram_config.yml',
      settings : {
        bundler: true,
        logging: false
      }
    }
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

    jsLint: {
      pattern: './js/**/*.js'
    },

    scssLint: {
      pattern: [
      'scss/**/*.scss',
        '!scss/**/vendor/**/*.scss', // Ignore /vendor folders
        ],
        settings : {
        'config': '.scss-lint.yml', // Linter Config File
        'bundleExec': true,
      }
    },


    // js: {
    //   src: 'javascripts',
    //   dest: 'javascripts',
    //   extractSharedJs: true,
    //   entries: {
    //     app: ['./app.js'],
    //     page: ['./page.js']
    //   },
    //   extensions: ['js']
    // },



    // SVG spriting
    svgSprite: {
      src: 'svg-src',
      dest: 'svg',
      extensions: ['svg'],
      imageminSettings: {
        multipass: true,
        // @TODO - Add in more options from https://github.com/svg/svgo
        // svgoPlugins: [{removeViewBox: false}],
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
  };
