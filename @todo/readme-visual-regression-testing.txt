@TODO - Update this stuff!

Learning About it
https://www.youtube.com/watch?v=cZtN6xvPcPk

---- Backdrop JS (simple tool)
https://css-tricks.com/automating-css-regression-testing/
https://github.com/garris/BackstopJS

#Running Tests#

##To run tests agains saved reference images##

$ cd bower_components/backstopjs
$ gulp test

To regenerate new reference images

$ cd bower_components/backstopjs
$ gulp reference
$ git add bitmap_reference -f

Commit new baseline images with each commit as needed ensuring all tests pass.



#Local Dev Setup#

##install Casper JS / Phantom JS Node Module Globally##

(sudo)?

$ npm install -g phantomjs@1.9.2-6
$ npm install -g casperjs

<cd to theme root>

## Note: The installed bower_component has a minor hack
to allow /bitmap_reference past .gitignore ##

$ cd bower_components/backstopjs
$ npm install
$ cd ../..


## TODO for more complex interactions with Phantom CSS ##

https://helloanselm.com/2014/testing-css-states-with-phantomcss/

