# Building a PostCSS workflow (part 2)

In the last post we built a basic PostCSS workflow using Gulp. This post will cover additional features that are nice to have in a workflow but are not required to run it.

We will also look in some detail at [postcss-preset-env](https://preset-env.cssdb.org/), what it would allow us to do and how it would work.

## The plugins (thoughts)

The list of plugins that I want to use shows what they are, what I expect them to do and a little research on SASS equivalency.

`postcss-color-function`
: [postcss-color-function](https://github.com/postcss/postcss-color-function) provides color manipulation functions equivalent to SASS `@lighten` and `@darken`.
: The color functions in this plugin were removed from the CSS Color Module level 5 spec so they are not available in browsers at all, at least not directly.
: According to [Adam Argyle](https://twitter.com/argyleink), one of the [CSS Color Module Level 5 spec](https://drafts.csswg.org/css-color-5/) editors, [tweet](https://twitter.com/argyleink/status/1456301298769297408?s=20) ***"no replacements planned, rather succession via relative color syntax. they had too much overlap, so 1 was removed"***
: See the following [Codepen](https://codepen.io/argyleink/pen/WNoWadG?editors=1100) for a demo of the [color-mix()](https://drafts.csswg.org/css-color-5/#color-mix) function
: See this [Codepen](https://codepen.io/argyleink/pen/poNXLwW?editors=1100) for a demo of relative color syntax and the [color-contrast()](https://drafts.csswg.org/css-color-5/#colorcontrast) function (**this demo only work in Safari Technical Preview 125 and later**)

Conditional logic
: [postcss-conditionals](https://www.npmjs.com/package/postcss-conditionals) offers an if/else statement equivalent to SASS @if
: [postcss-each](https://www.npmjs.com/package/postcss-each) gives you the ability to loop over an array of values and act on each one
: [postcss-for](https://github.com/antyakushev/postcss-for) allow writing conditional logic in a way that mostly mirror SASS.

`postcss-fail-on-warn`
: This plugin will treat warning as errors causing the termination of the script.
: This is useful when you want to make sure that you actually fix any warnings or errors in your CSS. However, `gulp-sass` seems to terminate the script on errors and warnings regardless, so this may be less of an issue

`postcss-simple-vars`
: [postcss-simple-vars](https://www.npmjs.com/package/postcss-simple-vars) allows us to use SASS variables (beginning with $) in our CSS.
: Even though it was implemented in the initial version of the Gulpfile, I'm documenting here because I'm not sure if this is something I want to use over CSS native custom properties

`postcss-define-property`
: [postcss-define-property](https://www.npmjs.com/package/postcss-define-property) allows us to use CSS Custom Properties as defined in [CSS Properties and Values API Level 1](https://drafts.css-houdini.org/css-properties-values-api/), a Houdini specification.
: The definitions of these properties are more complete since they allow you do define the syntax of the property, a default value and whether it inherits or not. The down side is that `@property` only supported on Chromium browsers so you will likely have to define multiple versions of a given property, likely using `@support` to target different browsers (chromium browsers and everyone else).
: The order of the plugins you use matters. See the plugin's [compatibility wiki](https://github.com/daleeidd/postcss-define-property/wiki/Compatibility) for more information.

`postcss-at-rules-variables`
: [postcss-at-rules-variables](https://www.npmjs.com/package/postcss-at-rules-variables) allows us to use variables in the `@media` and `@supports` at-rules.
: I've chosen not to implement this yet as I'm not ceertain this is not taken care of by other plugins.

`postcss-preset-env`
: This is the PostCSS equivalent to Babel for Javascript. The idea is that it will allows us to use a set of new CSS features at different level of maturity in the CSS specification process.
: The problem is that the list is likely to change over time and it doesn't account for properties that have been removed from the corresponding specification.

## Adding the plugins to the workflow

Because we've already created the Gulpfile the process is simpler when adding additional functionalityis a two-step process instead of three steps that we discussed in the previous post.

1. Install the plugins and require them at the top of the gulpfile
2. Add the plugins to the processors constant

The additional properties look like this:

```js
const property = require(`postcss-define-property`);
const condition = require('postcss-conditionals');
const each = require('postcss-each');
const pcfor = require('postcss-for');
const colors = require('postcss-color-function');
```

The full list of processors, including the new ones, is as follows:

```css
const processors = [
  importer({
    glob: true
  }),
  property,
  simpleVars,
  nesting,
  autoprefixer,
  sorting({
    order: [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],
    'properties-order': 'alphabetical',
    'unspecified-properties-position': 'bottom',
  }),
  colors,
  condition,
  each,
  pcfor,
];
```

The final test is to actually use the styles in selectors that use the functions and rules.
