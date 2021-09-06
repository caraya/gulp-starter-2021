# Creating svg sprites

The idea behind SVG sprites is similar to [sprite sheets](https://www.codeandweb.com/what-is-a-sprite-sheet) using CSS to place the images on the page.

The structure of the demonstration project is as follows:

```text
svg-sprites
├── gulpfile.js
├── icons
└── package.json
```

We'll use Gulp to create the sprite and the `gulpfile.js` contains the instructions for the build. The details of the process will be described in the next section.

The `icons` directory will hold the individual icons that we'll use in the sprite

`package.json` contains all NPM-related information necessary for the Gulp process to run.

## Creating the sprite sheet

As with all Node projects, first we need to initialize the project's `package.json` file. I choose to automate the file creation and then, if necessaary, change it.

```bash
npm init --yes
```

The next step is to install the packages we need. I've chosen to do this as a standalone project but it can be just as easily included in a larger Gulp-based project.

The packages we will use are

- [Gulp](https://www.npmjs.com/package/gulp) to drive the build process. I am running version 3, not the latest version so the syntax will be different than what you see for Gulp 4 tutorials
- [run-sequence](https://www.npmjs.com/package/run-sequence) allows Gulp to run sequences of files in the specified order
- [gulp-cheerio](https://www.npmjs.com/package/gulp-cheerio) allows for document manipulation using a jQuery-like syntax
- [gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin)minifies SVG using [SVGO](https://github.com/svg/svgo)
- [gulp-svgstore](https://www.npmjs.com/package/gulp-svgstore) combines SVG files into a single file using &lt;symbol&gt;

```bash
npm i -D gulp@3.9.1 \
run-sequence \
gulp-cheerio \
gulp-svgmin \
gulp-svgstore
```

We now start building the tasks that will create the sprite.

The first step is to require the packages we want to use. These are the same as the packages we installed in the previous step.

```js
const gulp = require('gulp');
const runSequence = require('run-sequence');
const cheerio = require('gulp-cheerio');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
```

`svgstore` is the main task of this build.

It takes all the svg files in the `icons` directory, minimizes them using `svgmin`, creates the sprite using `svgstore`, removes the fill attribute (if present) using `Cheerio` and the pushes the resulting `sprite.svg` file to the includes directory.

```js
gulp.task('svgstore', () => {
  return gulp
    .src('icons/*.svg')
    .pipe(svgmin())
    .pipe(
      svgstore({
        fileName: 'sprite.svg',
      }),
    )
    .pipe(
      cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
        },
        parserOptions: {
          xmlMode: true,
        },
      }),
    )
    .pipe(gulp.dest('includes/'));
});
```

The `default` task links to `svgstore` to make sure that using the gulp command without parameters doesn't give an error

```js
gulp.task('default', () => {
  runSequence(['svgstore']);
});
```

## Using the sprites

Using SVG images for the icons requires much less work to implement. We can use a single `svg` element to hold our icons and one additional `svg` element to insert the icons we referenced in our definition element.

To make the explanation easier I've put all the code inside the body of the HTML document.

We start with the SVG sprite we generated with our build process. I've manually copied it to the document. It looks like this (shortened to make it easier to read)

```svg
 <svg xmlns="http://www.w3.org/2000/svg" id="icons">
    <symbol id="codepen" viewBox="0 0 24 24">
      <path
        d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19a1.024 1.024 0 0 0-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z" />
    </symbol>
    <!-- Other symbols go here -->
</svg>
```

The next block is the CSS. In this section I want to highlight three areas:

First how we set the container for the icons, the `social-media-bar` element to be a flex container that takes half the width of the screen and is centered using margins.

The second is a peculliarity of SVG. While we can use CSS to style SVG the primary attribute names are different and we need to be careful not to confuse them. The `fill` attribute handles the background of an SVG element, whatever shape it has.

The last is to make sure we remove the underline for the links inside SVG elements.

Here to, I've removed selectors and attributes to make sure that it's readable without confusing you.

```css
 <style>
    .social-media-bar {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      width: 50%;
      margin: 0 auto;
    }

    .codepen-icon {
      fill: #000;
    }

    .facebook-icon {
      fill: #4267b2;
    }

    a {
      text-decoration: none;
    }
  </style>
```

The last section is the combination of HTML and SVG that actually builds the navigation bar.

Some of the attributes in the svg element look different than those in HTML.

[xmlns](https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course) provides a default namespace, an association between a string and an XML vocabulary, `xmlns:xlink` associates the string `xlink` with the [xlink vocabulary](https://www.w3.org/TR/xlink11/), a way to link between XML vocabularies.

[title](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title) and [desc](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc).

Height and width are presented without units to make sure it scaled appropriately.

The `use` element links to the reference the symbols we added earlier in the document. It's the XML way to link to an anchor... just like HTML's.

```html
<div class="social-media-bar">
  <a href="https://codepen.io">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      title="Codepen"
      desc="Codepen Logo"
      height="50"
      width="50"
      class="icon codepen-icon"
    >
      <use xlink:href="#codepen" />
    </svg>
  </a>

  <a href="https://facebook.com/">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      title="Facebook"
      desc="Facebook Logo"
      height="50"
      width="50"
      class="icon facebook-icon"
    >
      <use xlink:href="#facebook" />
    </svg>
  </a>
</div>
```

So, after all the work, was it worth it?

SVG has advantages and disadvantages. Advantages first

- It eliminates network requestsby inlining the resources
- Vector graphics scale to whatever screen size you need or want. No more responsive images
- You can style them with CSS

Disadvantages

- Vector graphics are only good for line drawings and icons
- They require more work to produce and display
- The format is not well supported among older browsers

With those advantages and limitations I would definitely consider using SVG for icons and other line drawings on the page.
