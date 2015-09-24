'use strict';


module.exports = {
  root: {
    // Default exports in this project folder.
    src: '', // EG - './src',
    dest: '' // EG - './public'
  },

  tasks: {
    js: {
      src: 'javascripts',
      dest: 'javascripts',
      extractSharedJs: true,
      entries: {
        app: ['./app.js'],
        page: ['./page.js']
      },
      extensions: ['js']
    },

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
      // Add in SIZE REPORT
    },

    images: {
      src: 'img-src',
      dest: 'img',
      extensions: ['jpg', 'png', 'gif']
    },

    fonts: {
      src: 'fonts',
      dest: 'fonts',
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
    },

    svgSprite: {
      src: 'sprites',
      dest: 'images',
      extensions: ['svg']
    }
  }
};
