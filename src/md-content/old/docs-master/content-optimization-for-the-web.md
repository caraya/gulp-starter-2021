## Intro

The tools for making content performant have improved considerably in the last few years. As designers we can now influence the size and the type of resources that the end users will see when they view our content. 

In this series we'll discuss strategies and tools to minimize the size of our web content: CSS, Javascript, HTML, images, video and audio, along with best practices in serving the content.

A good overview of the topic is Ilya Grigorik's [High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545/index.html) available free from O'Reilly Books.

A final note: This covers my experience and research. It is by no means an exhaustive guide. For more and deeper research into tooling and performance check Addy Osmani's [blog](http://addyosmani.com/blog/) and [Totally Tooling Tips](https://www.youtube.com/playlist?list=PLNYkxOF6rcIB3ci6nwNyLYNU6RDOU3YyL) on Youtube.

## CSS

CSS can become very large and very convoluted if we're not careful. This is particularly important when using third party libraries like Bootstrap or Zurb Foundation where most users download the full framework with large chunks of the library that they will never use but still load and push over the wire bloating the application and slowing everything down.

When you work with your own code it's easier to slim down but it still makes sense to build a default set of CSS stylesheets for our applications and then selectively choose which ones to use based on the page or pages I'm currently working on.

I've chosen to address these size issues in the following ways:

* Use SASS/SCSS as my CSS pre-processor to be able to compress the resulting CSS if needed
* Autoprefixer to eliminate the need to prefix elements if not needed
* UnCSS will remove CSS selectors that are not used in your HTML documents
* Creating stylesheets inline to render a page's critical path as fast as possible will also reduce the size of the CSS we bring from the network

### Using SASS

SASS (syntactically awesome style sheets) is a superset of CSS 2 and 3 with added scripting features such as:

* Program flow control (@if/@then/@else, @for, @while)
* Convenience functions to automate CSS work (lighten/darken, saturate/desaturate colors)
* Ability to nest selectors to keep our code DRY
* Use of variables and placeholder variables
* Mixins
* The ability to work with partial files that we can import into our main SASS

For purposes of performance optimization we'll worry about SASS output. Out of the box SASS provides multiple formats for the transformed CSS:

* :nested
* :compact
* :expanded
* :compressed

To understand the difference let's look at the following example:

```scss
.widget-social {
  text-align: right;

  a,
  a:visited {
    padding: 0 3px;
    color: #222222;
    color: rgba(34, 34, 34, 0.77);
   }

  a:hover {
      color: #B00909;
  }
}
```

#### :nested

```scss
.widget-social {
  text-align: right; }
  .widget-social a,
  .widget-social a:visited {
    padding: 0 3px;
    color: #222222;
    color: rgba(34, 34, 34, 0.77); }
  .widget-social a:hover {
    color: #B00909; }
```

#### :expanded

```scss
.widget-social {
  text-align: right;
}
.widget-social a,
.widget-social a:visited {
  padding: 0 3px;
  color: #222222;
  color: rgba(34, 34, 34, 0.77);
}
.widget-social a:hover {
  color: #B00909;
}
```

#### :compact

```scss
.widget-social { text-align: right; }
.widget-social a, .widget-social a:visited { padding: 0 3px; color: #222222; color: rgba(34, 34, 34, 0.77); }
.widget-social a:hover { color: #B00909; }
```

#### :compressed

> Note that the compressed stylesheep appears in one line. It's wrapped here for display purposes

```scss
.widget-social{text-align:right}.widget-social a,.widget-social a:visited{padding:0 3px;color:#222222;color:rgba(34,34,34,0.77)}.widget-social a:hover{color:#B00909}
```

Which one you use will depend on the situation. My build process has two versions of the SASS conversion task: One will create an expanded version to use during development and the other will create a compressed version suitable for development. Because I use partials for most of the styles the local content will be one stylesheet, we only need to worry about external resources such as `normalize.css` stored in separate stylesheets.  Since there are versions of normalize written in SCSS so we should be able to convert it to a partial (by prepending an underscore to the name) and import it so we only have one stylesheet to work with.

See [Different SASS output styles](https://web-design-weekly.com/2014/06/15/different-sass-output-styles/) for more information.

### Uncss

Unless you already work with a customizer or are familiar with SASS to know what imports to comment out in order to remove a feature from your CSS framework you are bound to have unused features bloating your CSS and making it bigger than it need to be.

Or it may be that your CSS has grown too large after accommodating feature after feature... without removing them your file will bloat to larger and large sizes.

Tools like UnCSS allow you to remove unussed CSS selectors by following these steps:

1. The HTML files are loaded by PhantomJS and JavaScript is executed.
2. Used stylesheets are extracted from the resulting HTML.
3. The stylesheets are concatenated and the rules are parsed by css-parse.
4. document.querySelector filters out selectors that are not found in the HTML files.
5. The remaining rules are converted back to CSS.

#### Installing UnCSS

UnCSS requires Node.js to be installed in your system. If you're building a customized version of Bootstrap it should already be installed. To install UnCSS globally for all your applications, run the following command:

```
npm install -g uncss
```

#### Command Line Version

Installing UnCSS globally gives you the `uncss` command to work with UnCSS from the command line. Using this tool you can indicate the file or URL that contains the HTML and CSS. 

```
Usage: uncss [options] <file or URL, ...>
    e.g. 
        uncss http://getbootstrap.com/examples/jumbotron/ > stylesheet.css
        uncss index.html > stylesheet.css

Options:

  -h, --help                            output usage information
  -V, --version                         output the version number
  -i, --ignore <selector, ...>          Do not remove given selectors
  -m, --media <media_query, ...>        Process additional media queries
  -C, --csspath <path>                  Relative path where the CSS files are located
  -s, --stylesheets <file, ...>         Specify additional stylesheets to process
  -S, --ignoreSheets <selector, ...>    Do not include specified stylesheets
  -r, --raw <string>                    Pass in a raw string of CSS
  -t, --timeout <milliseconds>          Wait for JS evaluation
  -H, --htmlroot <folder>               Absolute paths' root location
  -u, --uncssrc <file>                  Load these options from <file>
```

Using the command will produce a new css file (stylesheet.css) containing only the CSS rules used on the page. You can also use a wildcard match to pick all the html files in a directory (`uncss dist/*.html > stylesheet`.)

For more information refer to [UnCSS's Readme file](https://github.com/giakki/uncss/blob/master/README.md) 

#### Automating the process

There are UnCSS plugins from several task runners and build systems that would allow developers to incorporate UnCSS into their development workflows:

* [Grunt](https://github.com/addyosmani/grunt-uncss)
* [Gulp](https://github.com/ben-eb/gulp-uncss)
* [Broccoli](https://github.com/sindresorhus/broccoli-uncss)
* [Brunch](https://github.com/jakubburkiewicz/uncss-brunch)

You can incorporate the plugin into your workflow where it makes sense to you. Working with Grunt you can do the following to create a new css files with only the selectors used in your application html files:

```javascript
uncss: {
  dist: {
    files: {
      'dist/css/tidy.css': ['app/*.html']
    }
  }
}
```

an equivalent Gulp task looks like this:

```javascript
var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('default', function () {
    return gulp.src('site.css')
        .pipe(uncss({
            html: ['app/*.html']
        }))
        .pipe(gulp.dest('./out'));
});
```

And in Broccoli:

```javascript
var uncss = require('broccoli-uncss');
tree = uncss(tree, {html: ['index.html']});
```

For more detailed information, refere to the respective plugin documentation. 


### Autoprefixer

CSS vendor prefixes are both a blessing and a curse. 

They are a blessing because, as originally designed, they allow browser vendors to implement new CSS features that were not part of any final specification in a way that could be easily changed when the specification changes or is withdrawn; and, once the specification is finalized, vendors can drop the prefix and developers can use the new properties as they would any other CSS property.

They are a curse because, as good as the theory was, it never really worked that way. The web is littered with prefixed selectors long after the specification in question was finalized. In order to maintain backwards compatibility developers have to do multiple prefixed versions of a property even when the final version has been released.

For example, depending on how far back you need to support browsers, the code for rounded corners look like this:

```css
.round {
  -webkit-border-radius: 12px; 
  -moz-border-radius: 12px; 
  border-radius: 12px;
  
  /* 
  Prevent background color leak outs 
  See: 
    https://css-tricks.com/almanac/properties/b/border-radius/
    http://tumble.sneak.co.nz/post/928998513/fixing-the-background-bleed
  */
  -webkit-background-clip: padding-box; 
  -moz-background-clip:    padding-box; 
  background-clip:         padding-box;
}
```

We can all agree that doing this kind of repetitive tasks is a pain. Fortunately there are several ways in which we can eliminate the duplication of work. We can create SASS mixins and place holder selectors where we can hardcode the prefixed versions. That would be good for the short term but doesn't address the bloat problem in our CSS... eventually we will no longer need the prefixed versions but the CSS code will still be littered with prefixes that no one but older browsers really need or want. 

A second alternative is use tools like Autoprefixer. It is another Node based tool that installs with the NPM command, like so:

```sh
[23:49:19] carlos@Rivendell npm install -g autoprefixer
```

and provides a command line tool by default. To get and idea of the options available you can use the `autoprefixer --help` command that produces a result like the one below.

```sh
[23:49:19] carlos@Rivendell typography-sass 16563$ autoprefixer --help
Usage: autoprefixer [OPTION...] FILES

Parse CSS files and add prefixed properties and values.

Options:
  -b, --browsers BROWSERS  add prefixes for selected browsers
  -o, --output FILE        set output file
  -d, --dir DIR            set output dir
  -m, --map                generate source map
      --no-map             skip source map even if previous map exists
  -I, --inline-map         inline map by data:uri to annotation comment
      --annotation PATH    change map location relative from CSS file
      --no-map-annotation  skip source map annotation comment is CSS
      --sources-content    Include origin CSS into map
      --no-cascade         do not create nice visual cascade of prefixes
      --safe               try to fix CSS syntax errors
  -i, --info               show selected browsers and properties
  -h, --help               show help text
  -v, --version            print program version
```

Given a list of browsers to support and a list of CSS files to inspect it will query [Caniuse.com](http://caniuse.com/) data to determine what, if any, vendor prefixes need to be added to your code and will insert those prefixes where appropriate.

Take for example the following CSS code:

```css
a {
  width: calc(50% - 2em);
  transition: transform 1s;
}
```

and running Autoprefixer to add prefixes for the last 2 versions of major browsers using this command: 

```sh
autoprefixer -b "last 2 versions"
```

produces:

```css
a {
  width: calc(50% - 2em);
  -webkit-transition: -webkit-transform 1s;
          transition: transform 1s
}
```

While SASS mixins may be easier to work with if you're just writing CSS; Autoprefixer makes a nice addition to a development toolchain. You don't have to remember what supported browser need an extension for what property, particularly if you consider that different versions of a browser may have different prefixes for a property or none at all.

* [CSS Tricks article](https://css-tricks.com/autoprefixer/)

### CSS Critical Path

> Optimizing the critical rendering path is critical for improving performance of our pages: our goal is to prioritize and display the content that relates to the primary action the user wants to take on a page.
>
> Ilya Grigorik ([Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/index?hl=en))

The sad truth is that we've become obsessed with speed and how fast does a page load and, for a fast page load, we need to know what to load when.  "Above the fold" is a concept inherited from printed media. In the context of web design/development:

> Above the fold is also used in website design (along with "above the scroll") to refer to the portion of the webpage that is visible without scrolling.[1] As screen sizes vary drastically[2] there is no set definition for the number of pixels that define the fold. This is because different screen resolutions will show different portions of the website without scrolling. Further complicating matters, many websites adjust their layout based on the size of the browser window, such that the fold is not a static feature of the page.

> A 2006 study by Jakob Nielsen found that 77% of visitors to a website do not scroll,[3] and therefore only see the portion of the website that is above the fold. There has been considerable controversy about this finding with other broad studies finding the 76% of visitors scrolled vertically to some extent[4] and 22% of visitors scroll to the bottom of the webpage.[5] Most web design advice available today encourages designers to place important information at the top of the website, but to prioritize usability and design.[6][7][8]

> From [Wikipedia](https://www.wikiwand.com/en/Above_the_fold)

So not only we have to worry about creating a fast experience (or one that appears fast, at least) but we also need to worry about how to accomplish this in devices that are as diverse as an iPhone 3, a Samsung Note 5 or a 27 in iMac Retina desktop computer. 

We'll worry about the what first, then we'll look at the how and, finally, we'll explore some ways to automate the process as part of a build toolchain.

#### What is Critical Path for Web Dev.

To put it simply Critical Path in the context of web development are all the assets that we need to load the above the fold section of the document we are working on or the user is viewing. We then put those asses inline inside the HTML document. 

Bydoing this we speed up the load of the page (or at least the perceived page load speed) because the browser no longer has to go into the network to fetch the resource.

#### How do we build the Critical Path CSS

**Command Line**

Penthouse provides a command line tool that works in tandem with Phantom.js to generate the critical path CSS. However when I tested it, the resulting critical path css file was truncated and I couldn't figure out why it truncated it.

There is also discussion about removing the standalone command tool altogether so I won't go into further details. If you're interested you can [grab it from Github](https://raw.githubusercontent.com/pocketjoso/penthouse/master/penthouse.js)

**Build System**

I use Grunt as my build system so it makes sense that I'll go with that to build my Critical Path CSS. I use the [Critical CSS plugin](https://github.com/bezoerb/grunt-critical) for Grunt which takes care of creating the Critical Path CSS and then inlining it into the page for me.

Once the plugin is installed you can add a task to your `Gruntfile.js` like this:

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    critical: {
      typography: {
        options: {
          base: './',
          css: [
            'css/main.css'
          ],
          width: 1200,
          height: 800
        },
        src: 'typography.html',
        dest: 'dist/typography.html'
      }
    }
  });
}
```

This will take the CSS necessary to render the dimensions indicated (1200 x 800 in this case) and insert in the document, along with scripts to load the rest of the content asynchronously. 

Inlining the CSS for our 'above the fold' content will speed up the display of the page, even as it downloads the rest of the content. From a user's perspective the page will have already loaded and scrolling down will just show the rest of it.

#### Links and Resources

* [Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/index?hl=en) (Google)
* [Authoring Critical Fold CSS](https://css-tricks.com/authoring-critical-fold-css/) (CSS Tricks)
* [How we make RWD sites load fast as heck](https://www.filamentgroup.com/lab/performance-rwd.html) (Filament Group)

Tools:

* [grunt-criticalcss](https://github.com/filamentgroup/grunt-criticalcss)
* [penthouse](https://github.com/pocketjoso/penthouse)
* [critical](https://github.com/addyosmani/critical)
* [grunt-ctirical](https://github.com/bezoerb/grunt-critical)

## Javascript

Optimizing Javascript is nothing more than eeliminating as much white space as we possibly can and, if we want to, to mangle the names of variables down to as few letters as possible. The idea is that the fewer characters the smaller the file will be and the less bandwidth it'll consume and the faster it will transfer and the quicker your scripts will become available and run.

**Be particularly careful when mangling variables. The mangling may have unexpected results**

### Uglify

Uglify was the first command line and build process minimizer I found for Javascript. It will both minimize and mangle scripts. It also provides additional functionality but, for the purpose of this article, we'll only concentrate on compressing and mangling Javascript files. 

### Command Line

Uglify's fist version is the command line interface installed through Grunt:

```sh
[16:30:21] carlos@rivendell books-as-apps 16542$ npm install -g uglifyjs
```

That runs using 

```sh
uglifyjs [input files] [options]
```
You can revert the order (options first and then input files) but you need to put 2 dashes (--) between the options and the input so Uglify will not consider the files part of the input. The command looks like this:

```sh
uglifyjs --compress --mangle -- input.js
```

### Grunt and other build tools

Uglify has plugins for Grunt, Gulp and other build systems and task runners.  The Grunt task below will perform the following steps:

* Combine `video.js` and `highlight.pack.js` into `script.min.js`
* Avoid any mangling of text by setting mangle to false under options
* Create a sourcemap (`script.min.map`)


```javascript
uglify: {
  dist: {
    options: {
      mangle: false,
      sourceMap: true,
      sourceMapName: 'css/script.min.map'
    },
    files: {
      'js/script.min.js': [ 'js/video.js', 'lib/highlight.pack.js']
    }
  }
},
```

### Closure Compiler

Google's [Closure Compiler](https://developers.google.com/closure/compiler/?hl=en) is another tool, written in Java, that allows you to compress your scripts. It is part of the [Closure collection](https://developers.google.com/closure/?hl=en) of tools that facilitate web development. 

> Closure Compiler requires a version of Java (either JDK or JRE) to be installed on your system. You can download Java (if not already installed on your system) from [Oracle Technology Network](http://www.oracle.com/technetwork/java/index.html) or the [Open JDK Project](http://openjdk.java.net/install/)

[Compressing Javascript](https://developers.google.com/speed/articles/compressing-javascript) provides a good introduction to using the command line tool to compress your files. According to the documentation the different parameters for compression are:

* Whitespace Only mode simply removes unnecessary whitespace and comments. Selecting "Whitespace Only" mode and pressing compile presents you with a single file of JavaScript with 164K of source code, 28% smaller than the original 227K of source code.

* Simple mode is a bit more sophisticated. It optimizes JavaScript function bodies in several ways, including renaming local variables, removing unneeded variables and code, and replacing constant expressions with their final value (such as converting "1+3" to "4"). It, however, won't remove any functions or variables that might be referenced outside your JavaScript. It shrinks the code by 42% from 227K to 132K

* Advanced mode does even more sophisticated changes to your code. Try selecting "Advanced" optimizations, compile the code, and look at the results. This code looks much less like your original code; it renames all functions to short names, deletes functions it does not believe are used, replaces some function calls with the function body, and does several other optimizations that shrinks the code even further. Typically, you can't use Advanced Mode on existing JavaScript code without providing some additional information about functions in the code that need to be visible elsewhere and code elsewhere that might be called from within your JavaScript. However, it's worth noting that the Advanced mode cut the code size from 227K to 86K - 62% smaller than the original code. If you'd like this file to load in 1/3 the time of the original, you might find it worthwhile to give Advanced mode all the information to do this change correctly.

The code 

```javascript
  'closure-compiler': {
    frontend: {
      closurePath: '/src/to/closure-compiler',
      js: 'static/src/frontend.js',
      jsOutputFile: 'static/js/frontend.min.js',
      maxBuffer: 500,
      options: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS',
        language_in: 'ECMASCRIPT5_STRICT'
      }
    }
  }
```

### Tools

* [UglifyJS 2](http://lisperator.net/uglifyjs/)
* [Uglify Grunt Task](https://github.com/gruntjs/grunt-contrib-uglify)
* [Uglify Gulp Plugin](https://github.com/gruntjs/grunt-contrib-uglify)
* [Google Closure Compiler](https://developers.google.com/closure/compiler/?hl=en)
* [Closure Compiler Grunt Task](https://github.com/gmarty/grunt-closure-compiler)
* [Closure Compiler Gulp Plugin](https://www.npmjs.com/package/gulp-closure-compiler)

## HTML

Compressing HTML.

Tasks that minimize HTML are available for [Grunt](https://github.com/gruntjs/grunt-contrib-htmlmin) and [Gulp](https://github.com/jonschlinkert/gulp-htmlmin) and both are based on the [HTML minifier](https://github.com/kangax/html-minifier) tool. 


| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `removeComments`               | [Strip HTML comments](http://perfectionkills.com/experimenting-with-html-minifier/#remove_comments) | `false` |
| `removeCommentsFromCDATA`      | [Strip HTML comments from scripts and styles](http://perfectionkills.com/experimenting-with-html-minifier/#remove_comments_from_scripts_and_styles) | `false` |
| `removeCDATASectionsFromCDATA` | [Remove CDATA sections from script and style elements](http://perfectionkills.com/experimenting-with-html-minifier/#remove_cdata_sections) | `false` |
| `collapseWhitespace`           | [Collapse white space that contributes to text nodes in a document tree.](http://perfectionkills.com/experimenting-with-html-minifier/#collapse_whitespace) | `false` |
| `conservativeCollapse`         | Always collapse to 1 space (never remove it entirely). Must be used in conjunction with `collapseWhitespace=true` | `false` |
| `preserveLineBreaks`           | Always collapse to 1 line break (never remove it entirely) when whitespace between tags include a line break. Must be used in conjunction with `collapseWhitespace=true` | `false` |
| `collapseBooleanAttributes`    | [Omit attribute values from boolean attributes](http://perfectionkills.com/experimenting-with-html-minifier/#collapse_boolean_attributes) | `false` |
| `removeAttributeQuotes`        | [Remove quotes around attributes when possible.](http://perfectionkills.com/experimenting-with-html-minifier/#remove_attribute_quotes) | `false` |
| `removeRedundantAttributes`    | [Remove attributes when value matches default.](http://perfectionkills.com/experimenting-with-html-minifier/#remove_redundant_attributes) | `false` |
| `preventAttributesEscaping`    | Prevents the escaping of the values of attributes. | `false` |
| `useShortDoctype`              | [Replaces the doctype with the short (HTML5) doctype](http://perfectionkills.com/experimenting-with-html-minifier/#use_short_doctype) | `false` |
| `removeEmptyAttributes`        | [Remove all attributes with whitespace-only values](http://perfectionkills.com/experimenting-with-html-minifier/#remove_empty_or_blank_attributes) | `false` |
| `removeScriptTypeAttributes`   | Remove `type="text/javascript"` from `script` tags. Other `type` attribute values are left intact. | `false` |
| `removeStyleLinkTypeAttributes`| Remove `type="text/css"` from `style` and `link` tags. Other `type` attribute values are left intact. | `false` |
| `removeOptionalTags`           | [Remove unrequired tags](http://perfectionkills.com/experimenting-with-html-minifier/#remove_optional_tags) | `false` |
| `removeIgnored`                | Remove all tags starting and ending with `<%`, `%>`, `<?`, `?>` | `false` |
| `removeEmptyElements`          | [Remove all elements with empty contents](http://perfectionkills.com/experimenting-with-html-minifier/#remove_empty_elements) | `false` |
| `lint`                         | [Toggle linting](http://perfectionkills.com/experimenting-with-html-minifier/#validate_input_through_html_lint) | `false` |
| `keepClosingSlash`             | Keep the trailing slash on singleton elements                            | `false` |
| `caseSensitive`                | Treat attributes in case sensitive manner (useful for custom HTML tags.) | `false` |
| `minifyJS`                     | Minify Javascript in script elements and on* attributes (uses [UglifyJS](https://github.com/mishoo/UglifyJS2)) | `false` (could be `true`, `false`, `Object` (options)) |
| `minifyCSS`                    | Minify CSS in style elements and style attributes (uses [clean-css](https://github.com/GoalSmashers/clean-css)) | `false` (could be `true`, `false`, `Object` (options)) |
| `minifyURLs`                   | Minify URLs in various attributes (uses [relateurl](https://github.com/stevenvachon/relateurl)) | `false` (could be `Object` (options)) |
| `ignoreCustomComments`         | Array of regex'es that allow to ignore certain comments, when matched  | `[ ]` |
| `processScripts`               | Array of strings corresponding to types of script elements to process through minifier (e.g. `text/ng-template`, `text/x-handlebars-template`, etc.) | `[ ]` |
| `maxLineLength`                | Specify a maximum line length. Compressed output will be split by newlines at valid HTML split-points. |
| `customAttrAssign`             | Arrays of regex'es that allow to support custom attribute assign expressions (e.g. `'<div flex?="{{mode != cover}}"></div>'`) | `[ ]` |
| `customAttrSurround`           | Arrays of regex'es that allow to support custom attribute surround expressions (e.g. `<input {{#if value}}checked="checked"{{/if}}>`) | `[ ]` |
| `customAttrCollapse`           | Regex that specifies custom attribute to strip newlines from (e.g. `/ng\-class/`) | |
| `quoteCharacter`               | Type of quote to use for attribute values (' or ") | " |


### Installation Instructions

From NPM for use as a command line app:
```bash
npm install html-minifier -g
```

From NPM for programmatic use:
```bash
npm install html-minifier
```

From Git:
```bash
git clone git://github.com/kangax/html-minifier.git
cd html-minifier
npm link .
```

### Usage

For command line usage please see `html-minifier --help`

#### Node.js

```js
var minify = require('html-minifier').minify;
var result = minify('<p title="blah" id="moo">foo</p>', {
  removeAttributeQuotes: true
});
result; // '<p title=blah id=moo>foo</p>'
```

#### Grunt Task

```javascript
grunt.initConfig({
  htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'dist/index.html': 'src/index.html',     // 'destination': 'source'
        'dist/contact.html': 'src/contact.html'
      }
    },
    dev: {                                       // Another target
      files: {
        'dist/index.html': 'src/index.html',
        'dist/contact.html': 'src/contact.html'
      }
    }
  }
});
```

#### Gulp Plugin

```javascript
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});
```

### HTML versus web components

Over the past few weeks I've been looking at Polymer and web components again and it led me to wonder if web components are a better solution to transport and performance issues we are discussing in this series.


## Images

Unless we are careful when creating them or manupulating them with Photoshop or its equivalent images can become huge very quickly. If we're not careful when saving the images we will find ourselves with images that are way larger than they need to be. 

### imagemin

```sh
Running "imagemin" task

Running "imagemin:png" (imagemin) task
Verifying property imagemin.png exists in config...OK
Files: images/Mosaic_Netscape_0.9_on_Windows_XP.png 
  -> dist/images/Mosaic_Netscape_0.png
Files: images/Navigator_1-22.png 
  -> dist/images/Navigator_1-22.png
Files: images/cern-webservices-archive.png 
  -> dist/images/cern-webservices-archive.png
Files: images/coffee2.png 
  -> dist/images/coffee2.png
Files: images/font-in-chrome-mac.png 
  -> dist/images/font-in-chrome-mac.png
Files: images/font-in-spartan-win-vm.png 
  -> dist/images/font-in-spartan-win-vm.png
Files: images/font-terms.png 
  -> dist/images/font-terms.png
Files: images/fonts-in-use-example.png 
  -> dist/images/fonts-in-use-example.png
Files: images/full-width-translated-object.png
  -> dist/images/full-width-translated-object.png
Files: images/hyperreal-org-1996-archive.png 
  -> dist/images/hyperreal-org-1996-archive.png
Files: images/kerning.png 
  -> dist/images/kerning.png
Files: images/mag_001.png
  -> dist/images/mag_001.png
Files: images/mag_002.png 
  -> dist/images/mag_002.png
Files: images/mag_003.png 
  -> dist/images/mag_003.png
Options: interlaced, optimizationLevel=3, progressive
✔ images/Mosaic_Netscape_0.9_on_Windows_XP.png (saved 824 B - 1%)
✔ images/font-terms.png (saved 23.85 kB - 39%)
✔ images/cern-webservices-archive.png (saved 22.08 kB - 19%)
✔ images/Navigator_1-22.png (saved 19.64 kB - 63%)
✔ images/kerning.png (saved 854 B - 5%)
✔ images/font-in-spartan-win-vm.png (saved 77.43 kB - 43%)
✔ images/font-in-chrome-mac.png (saved 31.71 kB - 23%)
✔ images/coffee2.png (saved 17.9 kB - 13%)
✔ images/fonts-in-use-example.png (saved 23.59 kB - 13%)
✔ images/hyperreal-org-1996-archive.png (saved 21.84 kB - 17%)
✔ images/full-width-translated-object.png (saved 39.8 kB - 15%)
✔ images/mag_003.png (saved 150.86 kB - 14%)
✔ images/mag_001.png (saved 230.09 kB - 31%)
✔ images/mag_002.png (saved 139.05 kB - 24%)
Minified 14 images (saved 799.53 kB)

Running "imagemin:jpg" (imagemin) task
Verifying property imagemin.jpg exists in config...OK
Files: images/espresso.jpg -> dist/images/espresso.jpg
Files: images/exclusion-example.jpg -> dist/images/exclusion-example.jpg
Files: images/mag_004.jpg -> dist/images/mag_004.jpg
Files: images/rhombic.jpg -> dist/images/rhombic.jpg
Files: images/shape-outside-example.jpg -> dist/images/shape-outside-example.jpg
Files: images/type-explain.jpg -> dist/images/type-explain.jpg
Files: images/typography.jpg -> dist/images/typography.jpg
Files: images/unknown-known.jpg -> dist/images/unknown-known.jpg
Options: interlaced, optimizationLevel=3, progressive, use=[null]
✔ images/unknown-known.jpg (saved 657 B - 4%)
✔ images/type-explain.jpg (saved 2.81 kB - 19%)
✔ images/rhombic.jpg (saved 46.08 kB - 59%)
✔ images/espresso.jpg (saved 17.2 kB - 34%)
✔ images/exclusion-example.jpg (saved 60.83 kB - 55%)
✔ images/mag_004.jpg (saved 36.53 kB - 32%)
✔ images/shape-outside-example.jpg (saved 36 kB - 26%)
✔ images/typography.jpg (saved 25.44 kB - 14%)
Minified 8 images (saved 225.54 kB)
```

## Video

* [How To: Video Compression](http://www.ppmag.com/web-exclusives/2013/05/video-compression.html)
* [Video](http://diveintohtml5.info/video.html) from [Dive into HTML5](http://diveintohtml5.info/)
* [How to compress large video files without losing quality using Handbrake](http://blogs.it.ox.ac.uk/adamweblearn/2013/10/how-to-compress-large-video-files-without-losing-quality-using-handbrake/)


## Tools

### Grunt

[Grunt](http://gruntjs.com/) is a task runner

[youtube=https://www.youtube.com/watch?v=TMKj0BxzVgw&w=500]

### Gulp

[Gulp](http://gulpjs.com/) is a streatming build system

[youtube=https://www.youtube.com/watch?v=dwSLFai8ovQ&w=500]

## Final Testing

### Performance Budget

```sh
14:10:26] carlos@rivendell images 16552$ grunt perfbudget
Running "perfbudget:all" (perfbudget) task
>> -----------------------------------------------
>> Test for https://caraya.github.io/books-as-apps/typography.html 	  FAILED
>> -----------------------------------------------
>> visualComplete: 3100 [PASS]. Budget is 4000
>> SpeedIndex: 1702 [FAIL]. Budget is 1500
>> Summary: http://www.webpagetest.org/result/150828_TC_162F/
```

### Page Speed Insight

Goggle [Page Speed Insights service](https://developers.google.com/speed/pagespeed/insights/)



## Conclusion
