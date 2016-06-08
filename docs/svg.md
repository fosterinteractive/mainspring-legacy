#SVG Documentation#

Main Spring is setup to make creating SVG sprites easy... Well as easy as it can be ;)

This workflow is setup to handle 2 different kinds of SVG images:

* **SVG Artwork** have more than 2 colors or colors that we don't every want to control with CSS. Typically these are Logos, or Diagrams.

* **SVG Icons** where you want to control the color of the SVG with CSS. These are typically part of the site's UI that have 1 or 2 colors. For performance we create an externally loaded sprite (or multiple sprites) so icons loads in fewer requests. Also the browser will cache the sprite once it's loaded.

##How It Works##

1. Create meaningful names for your files. If the file is grouped in a sprite, the file name will be used as the #ID for the SVG. So "icon1.svg" is less useful than "close.svg"
2. Put the SVG file in a specific folder depending on whether it's SVG Artwork, SVG Artwork you want in a sprite, or a SVG Icon you want in a sprite. (see below)
3. Run the gulp task
```
$ gulp svgSprite
```

###Optimizing Large SVG Artwork (non-sprited)###
Large files that appear in a single place (or few places) in your website should NOT be assembed in a sprite.

Place these files in /svg-src/ EG:
```
/svg-src/complex-chart.svg
/svg-src/complex-illustration.svg
```
This exports minified and compressed versions to /svg/ EG:
```
/svg/complex-chart.svg
/svg/complex-chart.svgz
/svg/complex-illustration.svg
/svg/complex-illustration.svgz
```

###Optimizing SVG Artwork (Sprited)###
If you have full color icons, or Colourful Badges artwork where each specific file is small, but you don't want to control the SVG's color in CSS then place them in /svg-src/svg-art. EG:
```
/svg-src/svg-art/logo.svg
/svg-src/svg-art/top-10.svg
/svg-src/svg-art/winner.svg
```
Gulp svgSprite task creates a sprite in /svg named after the folder "svg-art"
```
/svg/svg-art.svg
/svg/svg-art.svgz
```
Now you can use it in your HTML as an external SVG sprite
```html
<svg>
  <use xlink:href="/svg/svg-art.svg#logo"></use>
</svg>
<svg>
  <use xlink:href="/svg/svg-art.svg#top-10"></use>
</svg>
<svg>
  <use xlink:href="/svg/svg-art.svg#winner"></use>
</svg>
```
Note: The gulp has a specifically defined list of folders for where stroke and fill colors are left intact. You can change this in (/gulp.js/config.js).

```js
// Default
var svgKeepAttributesPattern = ['svg-src/*.svg','svg-src/**/svg-art/**/*.svg'];
// Removed 'svg-art' folder/sprite added 'badges'
var svgKeepAttributesPattern = ['svg-src/*.svg','svg-src/**/badges/**/*.svg'];

```

###Creating SVG Icon Sprites###
For Icons or other SVG you want to controll their color with CSS do the following.

####Prep Your Files####
* (Optional) In your vector design software, convert "Outlines / Strokes" to Fills. You can style outlines in CSS, but Fills are typically easier to work with.
* Export the Artwork with "attributes" (as opposed to styles)

####Plan Your Sprite(s)####
* Create a folder with the name you would like for your SVG sprite in /svg-src.
* Put your SVGs in the folder. EG.
```
svg-src/sprite-social/facebook.svg
svg-src/sprite-social/twitter.svg
```
Gulp svgSprite task creates a sprite in /svg named after the folder "sprite-social"
```
svg-src/sprite-social.svg
svg-src/sprite-social.svgz
```
Now you can use it in your HTML as an external SVG sprite. All Stroke and Fill Colours have been removed from the SVG so you can define it with css.

```html
<style>
  svg {
    fill: currentColor;
  }

  .btn--icon {
    color: red;
  }

  .btn--icon:hover{
    color: blue;
  }
</style>

<a class="btn--icon" href="#">
  <svg>
    <use xlink:href="/svg/sprite-social#facebook"></use>
  </svg>
</a>
<a class="btn--icon" href="#">
  <svg>
    <use xlink:href="/svg/sprite-social#twitter"></use>
  </svg>
</a>
```

Note: The gulp tasks scans for new folders in the svg-src so you can name folders anything you like.

##Further Reading on SVG Sprites in HTML##

###SVG <use> technique###
https://css-tricks.com/svg-use-with-external-reference-take-2/

###fill: currentColor technique ###
https://css-tricks.com/cascading-svg-fill-color/


## How the Gulp Task Works ##

###To edit the default settings###
/gulp.js/config.js

###Gulp Task: /gulp.js/tasks/svgSprite.js###
By default this command does the following:

1) Deletes the contents of the /svg folder

2) Minifies & copies SVG Artwork from:
```
/svg-src/*.svg -> /svg/*.svg
/svg-src/svg-art/*.svg -> /svg/svg-art/*.svg
```
3) Deletes Fill and Stroke Attibutes, Minifies & copies SVG Icon Sprites from:
```
/svg-src/any-folders-you-create -> /svg/any-folders-you-create
```
4) For each folder in /svg/folders-here create a sprite in /svg/sprite-here.svg

5) Compresses all SVGs in /svg/*.svg with gzip.
