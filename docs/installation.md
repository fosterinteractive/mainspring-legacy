# Installation Instructions #
Tested on OSX 10.10, 10.11

Now that mainsping only runs node.js modules (it used to run ruby) it will probably be much easier to get running in windows and unix platforms. This is untested.

##Software Prerequisites##

- Install node.js (Via Homebrew)

##Global Install Gulp Node Modules#

Gulp must be installed globally to install it locally. If you curious as to why (read this post)[http://blog.dwaynecrooks.com/post/110903139442/why-do-we-need-to-install-gulp-globally-and]

````
// Global Install of Gulp
$ npm install -g gulp
````

##Locally Installed Components (Per Project)##

```
// Install Local Node and Gulp Modules
$ npm install

// Use Gulp to Download and Install Bower Packages
// & move assets to various folders
$ gulp bower
```
##Customize For Your Project##

###Review & Update Configuration Variables ###
/gulp.js/config.js

- There are a number of config options at the top of the file.
- *REQUIRED* BrowserSync Proxy - Update to Your Local Server Name
- Review maxGzippedSize and maxSize for images, svg, and css output warnings

