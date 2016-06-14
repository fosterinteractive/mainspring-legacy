#Commands#

##Local Dev Tasks (Default gulp command)##

```
$ gulp
$ gulp watch
```

- spin up bowsersync local server.
- Watches scss files (default is scss/**.scss)
-- Generates Sass / Sourcemaps
-- Lints Sass
-- CSS - Vendor Auto Prefixes
-- Generates Living Stylguide ./styleguide/*
-- Size report (Warn if too large)
- Watch js folder (default is js/**.js:
-- JS Lint (non minfied, ignores anything in .js/vendor)

## CSS Prod Task ##

```
$gulp css:prod

```
Compliles css minified and without source maps


## CSS Prod Task ##

```
$gulp css:dev

```
Compliles css in expanded format with source maps

##SVG##
```
gulp svgSprite
```

- Copies /svg-src (sub-folders) to /svg
-- by default /svg-src/svg-art is copied as-is
-- all folders _other_ than /svg-src/svg-art have their stroke and fills removed (to allow styling with CSS)
- Minified SVG's
- For each sub-folder, create a sprint of all svg's in the folder
- Gzip All Output Sprites
- Generate Size Report (Warn if too large)

##Images##

```
gulp images
```
- Copies /img-src to /img
- Compresses Images
- Generate Size Report (Warn if too large)

## Bower ##
Run on First install or after updating bower.json

```
$gulp bower
```

- Installs Bower Components
- Copies non-minified core javascript files from bower_components to ./js/vendor
- Created minfied versions of uncompressed js
