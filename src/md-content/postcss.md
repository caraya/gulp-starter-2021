PostCSS is an interesting project. In a nutshell, It takes CSS and turns it into an Abstract Syntax Tree, a form of data that JavaScript can manipulate. JavaScript-based plugins for PostCSS then performs different code manipulations. **PostCSS itself doesn’t change your CSS**, it allows plugins to perform transformations they’ve been designed to make.

There are essentially no limitations on the kind of manipulation PostCSS plugins can apply to CSS. If you can think of it, you can probably write a PostCSS plugin to make it happen.

It's important to also know what PostCSS is not. This material is adapted from Envato-tuts+ [PostCSS Deep Dive: What You Need to Know](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-what-you-need-to-know--cms-24535)

**PostCSS is Not a Pre-processor**

Yes, you can absolutely use it as a preprocessor, but you can also use PostCSS without any preprocessor functionality. I only use Autoprefixer and, some times, CSS Nano. Neither of these tools is a pre-processor.

**PostCSS is Not a Post-processor**

Post processing is typically seen as taking a finished stylesheet comprising valid/standard CSS syntax and processing it, to do things like adding vendor prefixes. However PostCSS can do more than just post process the file; it's just limited by the plugins you use and create.

**PostCSS is Not “Future Syntax”**

There are some excellent and very well known PostCSS plugins which allow you to write in future syntax, i.e. using CSS that will be available in the future but is not yet widely supported. However PostCSS is not inherently about supporting future syntax.

Using future syntax is your choice and not a requirement. Because I come from SCSS I do all weird development there and use PostCSS in a much more limited capability. If I so choose I can turn to PostCSS and use future looking features without being afraid that my target browsers will not support it.

**PostCSS is Not a Clean Up / Optimization Tool**

The success of the Autoprefixer plugin has lead to the common perception of PostCSS as something you run on your completed CSS to clean it up and optimize it for speed and cross browser compatibility.

Yes, there are many fantastic plugins that offer great clean up and optimization processes, but these are just a few of the available plugins.

## Why I picked PostCSS and what we'll do with it

I initially decided not to use PostCSS until I discovered that Autoprefixer and CSSNano, some of my favorite tools, are actually PostCSS plugins. That made me research PostCSS itself and see what it's all about. What I found out is a basic tool and a rich [plugin ecosystem](https://www.postcss.parts) that can do a lot of the things you may want to do with your CSS from adding vendor prefixes based on what you expect your users to have to analyzing your code for compliance with a given methodology like BEM.

I also like how PostCSS advocates for the single responsibility principle as outlined by Martin:

> The single responsibility principle is a computer programming principle that states that every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class.
>
> Wikipedia Entry: [Single responsibility principle ](https://www.wikiwand.com/en/Single_responsibility_principle)

Basically each PostCSS plugin should handle only one task and do it well. We should not create classes that do more than one thing and we shouldn't duplicate functionality that is already available through another PostCSS plugin.

In this post we'll explore how to build a PostCSS workflow using Gulp, how to build a plugin and how would you add plugins to the PostCSS workflow we created.

## Running PostCSS

I work primarily in a Gulp environment so I built this task to work with PostCSS plugins and Autoprefixer in particular. Assuming you haven't done before, install Gulp globally

```bash
npm i -g gulp
```

And then install the plugins we need: `gulp`, `postcss` and `autoprefixer` into the project you're working it. the `-D` flag will save the plugins as development dependency.

```bash
npm i -D gulp gulp-postcss autoprefixer
```

The task itself is currently made of two parts:

- The list of processors to use
- The task itself

The task pipes the input through sourcemaps, then it runs postCSS and Autoprefixer that has already been configured with what versions of browsers to prefix for. It then writes the sourcemap and the output to the destination directory.

```javascript
gulp.task("processCSS", () => {
  // What processors/plugins to use with PostCSS
  const PROCESSORS = [
    autoprefixer({browsers: ['last 3 versions']})
  ];
  return gulp
    .src("src/css/**/*.css")
    .pipe($.sourcemaps.init())
    .pipe(postcss(PROCESSORS))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("src/css"))
    .pipe($.size({
      pretty: true,
      title:
        "processCSS"
    }));
});
```

If we run this task last in our CSS handling process we can change the destination from `src/css` to `dest/css` but the process where this task was first used there was an additional compression process beyond what SASS gave me; I wasn't using CSSNano so I had to keep the files in the source directory to do further processing.  We'll revisit this when we discuss other plugins we can use.

## Adding a second plugin

Even through the CSS for this task is compressed using SASS compressed format.  I want more compression so we'll use [CSS Nano](http://cssnano.co/) to do further compression.

To use it we first need to install the plugin

```bash
npm i -D cssnano
```

Next we need to modify our build script to require CSS Nano:

```javascript
const cssnano = require('cssnano');
```

And, finally, we need to modify the task to incorporate CSS Nano. We do this by adding CSS Nano to our `PROCESSORS` array. The modified task now looks like this:

```javascript
gulp.task("processCSS", () => {
  // What processors/plugins to use with PostCSS
  const PROCESSORS = [
    autoprefixer({browsers: ['last 3 versions']}),
    ccssnano()
  ];
  return gulp
    .src("src/css/**/*.css")
    .pipe($.sourcemaps.init())
    .pipe(postcss(PROCESSORS))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest("src/css"))
    .pipe($.size({
      pretty: true,
      title:
        "processCSS"
    }));
});
```

We can add further processors following the same formula: install and require the plugin, add the plugin (and any configuration) to the `PROCESSORS` array and test to make sure that it does what you want it to.

## Building a plugin

<div class="info message">
  <p>The code for this section originally appeared in Tuts+ <a href="https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-create-your-own-plugin--cms-24605">PostCSS Deep Dive: Create Your Own Plugin</a></p>
</div>

What I find the most intriguing about PostCSS is the API and how easy it makes it for developers to create plugins to address specific needs.

### What the CSS code will look like

Let's assume, for example, that we have a set of fonts that Marketing has decided we should use in our content. Rather than type the full string of all the fonts in the stack you can do something like this instead:

```css
html {
  font-family: stack("Arial");
  weight: normal;
  style: normal;
}
```

And the resulting CSS will appear like this:

```css
html {
  font-family: 'Arial, "Helvetica Neue", Helvetica, sans-serif';
  weight: normal;
  style: normal;
}
```

### Configuring the project

To initialize the plugin project we have to create a folder and initialize the package with NPM and accept the defaults automatically. We do this with the following commands:

```bash
mkdir local-stacks # Creates the directory
cd local-stacks # Changes to the directory we just created
npm init --yes # Inits NPM accepting all defaults automatically
```

Now we must create the file we'll use as our plugin's entry point, `index.js`. We can create this with:

```bash
touch index.js
```

Or create the file in your text editor. I normally use Visual Studio Code.

### Writing the code

To get the plugin going we need to install and require two plugins: The PostCSS core engine (`postcss`) and [Underscore](http://underscorejs.org/) (`underscore`) that we will use to merge local and plugin configurations.  I am not using ES6 module import syntax (although it would make the code simpler) because I want to use the module with older versions of Node.

We then define an array of the font stacks that we want to use. The name we want to use for the stack is the key and the stack itself is the value for the key.

```javascript
const postcss = require('postcss');
const _ = require('underscore');

// Font stacks from http://www.cssfontstack.com/
const fontstacks_config = {
  'Arial': 'Arial, 'Helvetica Neue', Helvetica, sans-serif',
  'Times New Roman': 'TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif',
  'Lucida Grande':, 'Lucida Sans Unicode', 'Lucida Sans', Geneva, Verdana, sans-serif;
}
```

toTitleCase will convert the string passed to it so that the first letter of each word is capitalized. The regular expression that we use to capture the string to title case is a little complicated (it was for me when I first saw it) so I've unpacked it below:

- \w matches any word character (equal to `[a-zA-Z0-9_]`)
- \S* matches any non-whitespace character (equal to `[^\r\n\t\f ]`)
- \* Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
- g modifier - Return all matches (don't return after first match)

```javascript
// Credit for this function to http://bit.ly/1hJj9jb in SO
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() +
    txt.substr(1).toLowerCase();});
}
```

The module we're exporting is the actual plugin. We give it a name, `local-stacks`, and we define it as function. In the function:

- We walk through all the rules in the stylesheet using `walkRules`, part of the PostCSS API
- For each rule we walk through all the declaractions using `walkDecls`, also part of the PostCSS API
- We test if there is a fontstack call in the declaration. If there is one we:
  1. Get the name of the fontstack requested by matching the value inside the parenthesis and then replacing any quotation marks
  1. Title case the resulting string in case the user didn't
  1. Look the name of the font stack in the `fontstack_config` object
  1. Capture any value that was in the string before the fonstack call
  1. Create a new string with both the first font and the value of our font stack
  1. Return the new value as the value of our declaration

```javascript
module.exports = postcss.plugin('local-stacks', function (options) {

	return function (css) {

	  options = options || {};

    fontstacks_config = _.extend(fontstacks_config, options.fontstacks);

    css.walkRules(function (rule) {

      rule.walkDecls(function (decl, i) {
        var value = decl.value
        if (value.indexOf( 'fontstack(' ) !== -1) {

          var fontstack_requested = value.match(/\(([^)]+)\)/)[1]
            .replace(/["']/g, "");

          fontstack_requested = toTitleCase(fontstack_requested);

          var fontstack = fontstacks_config[fontstack_requested];

          var first_font = value.substr(0, value.indexOf('fontstack('));

          var new_value = first_font + fontstack;

          decl.value = new_value;

          }
        });
      });
    });
  }
});
```


## Next Steps and Closing

This is a very simple plugin as far as plugins go. You can look a Autoprefixer and CSS Nano for more complex examples and ideas of what you can do with PostCSS. If you're interested in exploring the API, it is fully documented at [http://api.postcss.org/](http://api.postcss.org/).

<div class="message info">
  <p>An important reminder, <strong>you don't have to reinvent the wheel</strong>. There is a large plugin ecosystem available at <a href="http://www.postcss.parts/">www.postcss.parts</a>. We can use these plugins to get the results we want.</p>

  <p>This makes writing your own plugin a fun but not always necessary exercise.</p>
</div>

Once you've scoped your CSS project you can decide how much of PostCSS you need and how your needs can be translated into existing plugins and custom code.

## Links, Resources and Ideas

- Tuts+ [Post CSS Deep Dive](https://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889)
  - [Roll Your Own Preprocessor](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-roll-your-own-preprocessor--cms-24584)
  - [PostCSS Shortcuts and Shorthand](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-shortcuts-and-shorthand--cms-24602)
  - [PostCCSS Miscellaneous Goodies](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-miscellaneous-goodies--cms-24603)
  - [Create Your Own Plugin](https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-create-your-own-plugin--cms-24605)
- [It's time for everyone to learn about PostCSS](http://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/)
- [Some Things You May Think About PostCSS And You Might Be Wrong](http://julian.io/some-things-you-may-think-about-postcss-and-you-might-be-wrong)
- [A look into writing future CSS with PostCSS and cssnext](https://bigbitecreative.com/a-look-into-writing-future-css-with-postcss-cssnext/)
- [Breaking up with Sass: it’s not you, it’s me](https://benfrain.com/breaking-up-with-sass-postcss/Breaking)
- [Extending Sass with PostCSS](https://ashleynolan.co.uk/blog/extend-sass-with-postcss)
- [How to Build Your Own CSS Preprocessor With PostCSS](https://www.sitepoint.com/build-css-preprocessor-postcss/)
- [I'm Excited About PostCSS](http://davidtheclark.com/excited-about-postcss/)
- [Improving the Quality of Your CSS with PostCSS](https://www.sitepoint.com/improving-the-quality-of-your-css-with-postcss/)
- [PostCSS - Future of CSS after preprocessors](http://www.meetpostcss.com/Meet )
- https://ashleynolan.co.uk/blog/postcss-a-reviewPostCSS – Sass Killer or Preprocessing Pretender?
- [Musings from Someone Discovering PostCSS](https://taupecat.com/blog/2016/04/28/musings-from-someone-discovering-postcss/)
- [So you want to make a PostCSS plugin](https://css-tricks.com/want-make-postcss-plugin/ )
- [That postcss. Its so hot right now](https://cantina.co/that-postcss-its-so-hot-right-now/)
- [Introduction to Postcss](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
- [7 Postcss Pluguins to Ease You Into Postcss](https://www.sitepoint.com/7-postcss-plugins-to-ease-you-into-postcss/)
- [So you want to make a PostCSS plugin](https://css-tricks.com/want-make-postcss-plugin/)
- [Awesome PostCSS](https://github.com/jjaderg/awesome-postcss/blob/master/README.md)
