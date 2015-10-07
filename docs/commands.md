#Commands#

##Local Dev Tasks##

```
$ gulp watch
```

- spin up bowsersync local server.
- Watches sass/*.scss:
-- Generates Sass / Sourcemaps
-- Lints Sass
-- CSS - Vendor Auto Prefixes
-- Generates Living Stylguide ./styleguide/*
-- Size report (Warn if too large)
- Watch js/*.js:
-- JS Lint

## Build Task ##

@Todo - Build Build Task ;)

Temporary Solution

```


##SVG##
Known Issue: Sometimes Task sequence misses gzipping sprites. Run twice.

```
gulp svgSprite
```

- Copies ./svg-src to ./svg
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

Known Issue: Copy doesn't wait for delete task to complete? Run twice.

```
$gulp bower
```

- Installs Bower Components
- Copies non-minified core javascript files from bower_components to ./js/vendor
