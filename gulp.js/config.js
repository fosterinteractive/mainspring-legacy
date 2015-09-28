'use strict';


module.exports = {

  tasks: {

    browserSync: {
      // See http://www.browsersync.io/docs/options/ for options
      proxy: 'mainspring.dev',
      port: 3333,
      // files: [
        // './css/*.css',
        // './styleguide/index.html'], // Watch index.html only - Holgram regenerates every file on update.
      ui:{
        port: 3334
      },
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      }

    },

    // Compile CSS from SCSS
    css: {
      pattern: ['./sass/**/*.scss'],
      dest: 'css',
      autoprefixer: {
        browsers: ['last 2 versions', 'ie >= 9']
      },
      sassConfig: {
        // Node Sass Settings - https://github.com/sass/node-sass
        indentedSyntax: false, // Enable .sass syntax
        precision: 6,
        errLogToConsole: true
      },
      // Add in SIZE REPORT ??
    },


    jsLint: {
      pattern: './js/**/*.js'
    },

    scssLint: {
      pattern: [
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
    },
    hologram: {
      configFile: './hologram_config.yml',
      settings : {
        bundler: true,
        logging: false
      }
    }
  }
};
