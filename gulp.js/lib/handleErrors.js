'use strict';

var notify = require('gulp-notify');
var gutil = require('gulp-util');

module.exports = function(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  // Keep gulp from hanging on this task

  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};
