Unless you already work with a customizer or are familiar with SASS to know what imports to comment out in order to remove a feature from your Bootstrap installation you are bound to have unused features bloating your CSS and making it bigger than it need to be. 

Tools like UnCSS allow you to remove unussed CSS selectors by following these steps:

1. The HTML files are loaded by PhantomJS and JavaScript is executed.
2. Used stylesheets are extracted from the resulting HTML.
3. The stylesheets are concatenated and the rules are parsed by css-parse.
4. document.querySelector filters out selectors that are not found in the HTML files.
5. The remaining rules are converted back to CSS.

## Installing UnCSS

UnCSS requires Node.js to be installed in your system. If you're building a customized version of Bootstrap it should already be installed. To install UnCSS globally for all your applications, run the following command:

```
npm install -g uncss
```

## Command Line Version

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

## Automating the process

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
