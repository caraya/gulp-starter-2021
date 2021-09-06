# Using material design for typography work

[Material Design](https://material.io/) is Google's Design System. It started as a Google-only system that you bought into whole sale with little to noo chance of customizing it.

The new iteration of Material Design does several things that the original did not do well or at all, including framework integrations.

The "new Material" also allows for easier customization and provides SASS/SCSS mixins and functions to do so.

In this post we'll look at the typograaphy options available to Material Design, both standard and customized.

## Setting up

There are two ways to setup a Material Design project. We'll talk about them below.

### The easy way

The easy way loads the entire library of CSS functions and scripts from a CDN.

We also load Roboto and Material Design Icons from Google Fonts.

```html
<link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
<!-- Fonts -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono|Material+Icons">

<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>

```

This will load all of Material Design, whether we use it or not. We'll have to decide if this is worth the extra download sizes.

This method will not let you customize individual packages so, unless you're OK with the defaults this may not be the best option.

### The hard way

The hard way uses WebPack and SASS. The typography module doesn't use Javascript so we'll skip it in this example.

The first step is to get [WebPack](https://www.npmjs.com/package/webpack) and plugins configured. The plugins are:

* [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server): Development server
* [sass-loader](https://www.npmjs.com/package/sass-loader): Loads a Sass file and compiles it to CSS
* [node-sass](https://www.npmjs.com/package/node-sass): Provides binding for Node.js to Sass, peer dependency to sass-loader
* [css-loader](https://www.npmjs.com/package/css-loader): Resolves CSS @import and url() paths
* [extract-loader](https://github.com/peerigon/extract-loader): Extracts the CSS into a `.css` file
* [file-loader](https://github.com/webpack-contrib/file-loader): Serves the `.css` file as a public URL
* [autoprefixer](https://www.npmjs.com/package/autoprefixer): Automatically adds prefixes to CSS as needed

The command too install the Node modules is:

```bash
npm install --save-dev webpack \
webpack-cli \
webpack-dev-server \
css-loader \
sass-loader \
node-sass \
extract-loader \
file-loader \
autoprefixer
```

We then write a `webpack.config.js` to process the SCSS file that we'll create later in the process.

```js
const autoprefixer = require('autoprefixer');

module.exports = [{
  entry: './scss/app.scss',
    output: {
    // style-bundle.js is necessary
    // for webpack to compile but never used
    filename: 'style-bundle.js',
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }]
    },
  },
];
```

We are then ready to install the specific modules that we want to work with. In this case, typography.

```bash
npm install @material/typography
```

Finally, we need to import the component's SCSS using the `@import` statement.

We can then add any additional styles that we need.

```scss
@import "@material/typography/mdc-typography";
```

## An Example

This example covers the basic layout of site

```html
<body class="mdc-typography">
  <h1 class="mdc-typography--headline1">Towards the Splendid City</h1>

  <h2 class="mdc-typography--headline2">Pablo Neruda</h2>

  <h3 class="mdc-typography--headline3">Nobel Lecture, December 13, 1971</h3>

  <p class="mdc-typography--body1">My speech is going to be a long journey, a trip that I have taken through regions that are distant and antipodean, but not for that reason any less similar to the landscape and the solitude in Scandinavia.&hellip;</p>
<body>
```

All material design components are built with this typograhy already baked in. For elements that are not part of material design we can use the following classes as I did in the example above.

<table>
  <caption>Material Design Typography Classes</caption>
  <thead>
    <tr>
      <th>CSS Class</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>mdc-typography</code></td>
      <td>Sets the font to Roboto</td>
    </tr>
    <tr>
      <td><code>mdc-typography--headline1</code></td>
      <td>Sets font properties as Headline 1</td>
    </tr>
    <tr>
      <td><code>mdc-typography--headline2</code></td>
      <td>Sets font properties as Headline 2</td>
    </tr>
    <tr>
      <td><code>mdc-typography--headline3</code></td>
      <td>Sets font properties as Headline 3</td>
    </tr>
    <tr>
      <td><code>mdc-typography--headline4</code></td>
      <td>Sets font properties as Headline 4</td>
    </tr>
    <tr>
      <td><code>mdc-typography--headline5</code></td>
      <td>Sets font properties as Headline 5</td>
    </tr>
    <tr>
      <td><code>mdc-typography--headline6</code></td>
      <td>Sets font properties as Headline 6</td>
    </tr>
    <tr>
      <td><code>mdc-typography--subtitle1</code></td>
      <td>Sets font properties as Subtitle 1</td>
    </tr>
    <tr>
      <td><code>mdc-typography--subtitle2</code></td>
      <td>Sets font properties as Subtitle 2</td>
    </tr>
    <tr>
      <td><code>mdc-typography--body1</code></td>
      <td>Sets font properties as Body 1</td>
    </tr>
    <tr>
      <td><code>mdc-typography--body2</code></td>
      <td>Sets font properties as Body 2</td>
    </tr>
    <tr>
      <td><code>mdc-typography--caption</code></td>
      <td>Sets font properties as Caption</td>
    </tr>
    <tr>
      <td><code>mdc-typography--button</code></td>
      <td>Sets font properties as Button</td>
    </tr>
    <tr>
      <td><code>mdc-typography--overline</code></td>
      <td>Sets font properties as Overline</td>
    </tr>
  </tbody>
  </table>

## Customizing Material Design Typography

Material design typography also offers you SCSS mixins to customize how typography will work in the document.

<table>
  <thead>
    <tr>
      <th>Mixin</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>mdc-typography-base</code></td>
      <td>Sets the font to Roboto</td>
    </tr>
    <tr>
      <td><code>mdc-typography($style)</code></td>
      <td>Applies one of the typography styles, including setting the font to Roboto. </td>
    </tr>
    <tr>
      <td><code>mdc-typography-overflow-ellipsis</code></td>
      <td>Truncates overflow text to one line with an ellipsis. Only works for content using <code>display: block</code> or <code>display: inline-block</code></td>
    </tr>
    <tr>
      <td><code>mdc-typography-baseline-top($distance)</code></td>
      <td>Sets the baseline height of a text element from top.</td>
    </tr>
    <tr>
      <td><code>mdc-typography-baseline-bottom($distance)</code></td>
      <td>Sets the distance from text baseline to bottom. This mixin should be combined with <code>mdc-typography-baseline-top</code> when setting baseline distance to following text element.</td>
    </tr>
  </tbody>
</table>

Possible values for `$style`

* headline1
* headline2
* headline3
* headline4
* headline5
* headline6
* subtitle1
* subtitle2
* body1
* body2
* caption
* button
* overline

This gives us one level of custmization but it won't change the defaults, it will only use the defaults for the elements we're working with.

If you're familiar with SASS you can use

All styles can be overridden using Sass global variaables with the format `$mdc-typography-styles-{style}` before the component is imported.

The variable should contain a map that with all the properties we want to override for a particular style.

Assuming that the fonts are available on the system or loaded using `@font-face` we can use code like this to change the global font defaults for the document.

```scss
$mdc-typography-font-family: unquote("Arial, Helvetica, sans-serif");

// Imports and the rest of our code goes here
```

**[unquote](https://sass-lang.com/documentation/functions/string) is part of the SASS standard library.**

We can also change the value of multiple elements in the same page. Assuming, again, that Marvin Vision was available on your system we can customize styles for both `headline1` and `headline2`.

We can do the same thing with any style available.

```scss
$mdc-typography-styles-headline1: (
  font-family: unquote("MarvinVision, Helvetica, sans-serif")
);
$mdc-typography-styles-headline2: (
  font-family: unquote("Arial, Helvetica, sans-serif"),
  font-size: 3.25rem
);
​
// Imports and the rest of our code goes here
```

So far we've concentrated on how to use the built-in styles from Material Design. There is nothing to prevent us from mix and matching material design typography with other design element or art directing this kind of mixed applications.

A full example of Material Design typography is in this [Github repo](https://caraya.github.io/mdc-demos/typography/)

Another example is how Una Kravetz created a [Material Design theme using variable fonts](https://material-starter-kit-variable-fonts.glitch.me/) from Google Fonts

It'll be interesting to see what we can do with Material Design moving forward.

## References

* [Material Design: Getting Started](https://material.io/develop/web/docs/getting-started/)
* [Material Design Components: Typography](https://material.io/develop/web/components/typography/)
* [material-starter-kit-variable-fonts](https://material-starter-kit-variable-fonts.glitch.me/)
