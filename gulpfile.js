/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.

*/

var requireDir = require('require-dir');

// Require all tasks in gulpfile.js/tasks, including subfolders

requireDir('./gulp.js', { recurse: true });
