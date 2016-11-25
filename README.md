# Main Spring
v0.03

Very biased boilerplate templates for generating production CSS &amp; Living
Style Guides w/ SASS, Gulp &amp; other libraries. Essentially this is an
assembly of the work of very clever folks into a single starter package.

Intended for use in Drupal but is easily used in WordPress or similar CMS.

##See /docs for more details##

[Installation](/docs/installation.md)

[Commands](/docs/commands.md)

[SVG: Sprites & Optimizations Docs](docs/svg.md)

##Overview##
Gulp-Sass is the workhorse of this package which runs off of lib-sass which is much faster and has feature parity with ruby-sass.

##Gulp##
[Gulp.js](http://gulpjs.com/) is a task runner. We use it to automate boring repetitive tasks like refreshing your screen after you save. It's also used for optimizing things that are easy to forget to do like compressing images. Finally it takes care of tedious tasks like making SVG sprites.

[Here's a introductory post to Gulp](http://callmenick.com/post/an-introduction-to-gulp)

###Why not Grunt?###
Grunt is awesome, but Gulp is more awesome. Gulp allows you to do everything in memory, and you can choose to run tasks in sequence or asynchronously. End result - It's faster, and we automate MANY tasks in Main Spring so speed counts.

##SVG##
If you can use SVG graphics you should. Icons, logos, diagrams and illustrations are typically better in SVG. They are superior to icon fonts for many reasons.

Main Spring created SVGs sprites automatically from the files in /svg-src folder. *Do not put your files in /svg as they are deleted as part of the build process!*

[SVG: Sprites & Optimizations Docs](docs/svg.md) - Read SVG documentation

###Further Reading on SVGs###
If you're interested in learning more about SVG - Sara Soueidan [@SaraSoueidan](https://twitter.com/SaraSoueidan) is the definitive authority on practical applications of SVGs in websites. Seriously [check out her blog](https://sarasoueidan.com/articles/)

CSS Tricks also has an [amazing resource section](https://css-tricks.com/mega-list-svg-information/).

To wrap your head around the actual SVG format itself checkout the [SVG Pocket Guide](http://svgpocketguide.com/) by Joni Trythall [@JoniTrythall](https://twitter.com/JoniTrythall)



##CS5 Styleguide ##
Living Style guides allow documentation of your UI to be created from comments in your sass partials. It's both a tool to help UI development and a documentation of that UI so you don't accidentally re-invent the wheel in your projects and end up with [20 similar-but-different button styles](http://bradfrost.com/blog/post/interface-inventory/).

Main Spring uses [SC5 Styleguide](https://github.com/SC5/sc5-styleguide#build-options) which is a project that extends [Node-KSS](https://github.com/kss-node/kss-node). Node-KSS is a node.js implementation
of KSS "Knyle Style Sheets" which is syntax for creating comments in your
scss (or css) and generating Living Style Guide Websites

To learn how to write documentation for KSS see the [KSS Spec](https://github.com/kss-node/kss/blob/spec/SPEC.md)

SC5 extends a number of Node-KSS feature and adds fancy search feature and loads the entire styleguide in an angular app. This allows the stylguide in the main website that are documented to not be "polluted" but the styles in the stylguide website.

CS5 Also add a number of useful features that are in the [SC5 Documentation Synatax](https://github.com/SC5/sc5-styleguide#documenting-syntax)


##CSS Architure & Class Naming conventions##
Mainsping uses a [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) based naming pattern for css classes and [SMACSS](https://smacss.com/) inspired folder structure that has been adopted by the Drupal Community as recommended [CSS Architecture for Drupal 8](https://www.drupal.org/coding-standards/css/architecture).

These naming patterns are further extended ideas expressed by Harry Roberts [@CSSWizardry](https://twitter.com/csswizardry) in his post, [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) where class names are extended with profixes and suffix to express more meaning about how they effect the website display.

 _Obsessive_ naming conventions (which are enforced by a sass linter) allows you to understand the relationship bettern UI components and make sure your team all codes to the same specs.

##Inspired / Stolen / Adapted From##

* [Viget Labs Gulp Starter](https://github.com/vigetlabs/gulp-starter)
* [Google Web Starter Kit](https://github.com/google/web-starter-kit)

See [Inspiration](/docs/oh-my-god-its-full-of-stars.md) for more.


##Credits For Assets Used In Demos##
###Icons###
Icons are from Font Awesome Created by Dave Gandy.
- Opened and re-saved in Illustrator to add real-world bloat.

###Web Fonts###
[Roboto](https://www.fontsquirrel.com/fonts/roboto?q%5Bterm%5D=roboto&q%5Bsearch_check%5D=Y) & [Roboto Slab](https://www.fontsquirrel.com/fonts/roboto-slab) by Christian Robertson - Downloaded from [Font Squirrel](https://www.fontsquirrel.com/) Licensed under Apache 2.0



###Image Credits###

Main Spring Image by Hustvedt (Own work) [CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0) or GFDL (http://www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons

Spiral Spring Diagram by Inslack (Ben5 on wikipedia FR) (made by: User:Inslack / Ben5 (wikipedia FR)) [CC BY-SA 2.5 (http://creativecommons.org/licenses/by-sa/2.5), GFDL (http://www.gnu.org/copyleft/fdl.html) or CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons

##Open Source License##
Main Spring is licensed under [GNU General Public License v3.0](LICENSE.txt) .

