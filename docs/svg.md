#SVG Documentation#

Main Spring is setup to make creating SVG sprites easy (Well as easy as it can be ;) - This workflow is setup to handle 2 different kinds of SVG images:

* _SVG Artwork_ have more than 2 colors or colors that we don't every want to control with CSS. Typically these are Logos, or Diagrams.

* _SVG Icons_ where you want to control the color of the SVG with CSS. These are typically part of the site's UI that have 1 or 2 colors. For performance we create an externally loaded sprite (or multiple sprites) so icons loads in fewer requests. Also the browser will cache the sprite once it's loaded.

##How It Works##

1. Create meaningful names for your files. _If the file is to be sprited, the file name will be used as the #ID for the SVG._ So "icon1.svg" is less useful than "close.svg"
2. Put the SVG file in a specific folder depending on whether it's SVG Artwork, SVG Artwork you want in a sprite, or a SVG Icon you want in a sprite.
3. Run the gulp task
```
$ gulp svgSprite
```

###Optimizing Large (non-sprited) SVG Artwork###
Large files that appear in a single place (or few places) in your website should NOT be assembed in a sprite.

Place these files in /svg-src/
```
/svg-src/my-fancy-logo.svg
/svg-src/complex-illustration.svg
```
###Optimizing SVG Artwork###

###Creating SVG Icons###

###Creating SVG Icon Sprites###





By default this command does the following:

* Deletes the contents of the /svg folder
* Minifies & copies SVGs from:
** /svg-src/*.svg >> /svg/*.svg
** /svg-src/svg-art/*.svg >> /svg/svg-art/*.svg
* Deletes Fill and Stroke Attibutes, Minifies & copies SVGs from:
** /svg-src/any-folders-you-create >> /svg/any-folders-you-create
