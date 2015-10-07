# Installation Instructions #
Tested on OSX 10.10.5

##Software Prerequisites##

- Install Rbenv (Via Homebrew)
- Install node.js (Via Homebrew)

##Global Gems & Node Modules##

````
// Install Bundler.io (Ruby Gem)
$(sudo) gem install bundler

// Global Install of Gulp
$ npm install -g gulp

// Global Install of Bower
$ npm install -g bower
````

##Locally Installed Components (Per Project)##

```
// Install Local Gems w/ Bundler
$ bundle install --path .vendor/bundle

// Install Local Node and Gulp Modules
$ npm install

// Use Gulp to Download and Install Bower Packages
// & move assets to various folders
$ gulp bower
```
##Customize For Your Project##

###Update to your preferred Ruby Version###
.ruby-version

###Review & Update Configuration Variables ###
/gulp.js/config.js

- BrowserSync Proxy - Update to Your Local Server Name
- Review maxGzippedSize and maxSize for images, svg, and css output warnings

