'use strict';


module.exports = {
  root: {
    // Default exports in this project folder.
    // Leave blank to work in this folder
    src: '', // EG - './src',
    dest: '' // EG - './public'
  },

  tasks: {

    browserSync: {
      // See http://www.browsersync.io/docs/options/ for options
      proxy: 'mainspring.dev',
      port: 3333,
      files: ['./css/*.css'],
      ui:{
        port: 3334
      }
    },

    jsLint: {
      src: './js/**/*.js'
    },

    scssLint: {
      src: [
        'sass/**/*.scss',
        '!sass/**/vendor/**/*.scss', // Ignore /vendor folders
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

    css: {
      src: 'sass',
      dest: 'css',
      autoprefixer: {
        browsers: ['last 3 version']
      },
      sass: {
        indentedSyntax: false // Enable .sass syntax
      },
      extensions: ['scss', 'css']
      // Add in SIZE REPORT ??
    },

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
            'maxSize': 50000 // Max Size in Bytes after gzip
          }
        }
      }
    }
  }
};
