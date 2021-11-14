# PostCSS Deep Dive: Building a PostCSS workflow

For a while, SASS was all we needed. I was OK with it only being available as a Ruby Gem (the original implementation was written in Ruby), then I was happy when LibSASS came around (written in C) and might have even been OK with the Dart implementation becoming the reference implementation and the SASS team deprecating the Ruby and C implementations, eventually stopping work on them altogether.

But one thing that SASS has never done is give you the possibility of testing new CSS features like Babel does for Javascript.

I first head of [PostCSS](https://postcss.org/) when Autoprefixer became a processor for PostCSS rather than a standalone tool and the tooling used PostCSS to run.

I've always wanted to move my worflow to PostCSS and now think it's time to do it. Other than the program-like functions (`@if`/`@else`, `for` and others) there is little that we can't do with a different preprocessor and, eventually, with CSS alone.

So in this post I will evaluate what it would take to move to PostCSS based on a given set of requirements.

## Feature set

Here's the feature set I want to implement if possible

* A PostCSS equivalent to Babel's `preset-env`
* Color manipulation functions equivalent to SASS @lighten and @darken
* Nesting
  * Nested selectors
  * Relationship notation
* Variables
  * Houdini-style CSS Custom Properties using @property

There is also a nice to have set of features:

* function-like conditionals and iteraators, similar to what we can do in SASS
* Mixins

## Implementation

The first thing to do is decide what features we want to implement. Based on the feature lists that I want to implement the initial list looks like this

[postcss-preset-env](https://github.com/csstools/postcss-preset-env)
: This is the equivalent to Babel's `preset-env`.
: It has configurable support for a large [set of features](https://preset-env.cssdb.org/features) based on four distinct stages
: `preset-env` supports Autoprefixer so  I don't know if it makes sense to leave it as a separate package
: Chose to leave the default settings (stage 2 and supporting all browsers)

[Autoprefixer](https://github.com/postcss/autoprefixer)
: Adds vendor prefixes to properties that require them based on a specified list of browsers and versions
: The plugin uses browserslist to create and access the list, and caniuse to provide a list of browsers that support a given feature
: Because `preset-env` also supports Autoprefixer, I don't know if I want to leave it as a separate package

[postcss-nested](https://github.com/postcss/postcss-nested)
: nested rules and at-rules. It provides a close aproximation to what SASS does with nested selectors and relationship notation

[postcss-color-function](https://github.com/postcss/postcss-color-function)
: Provide CSS-native equivalents to SASS lighten and darken functions (tint and shade respectively)
  While the functionality of the plugin has been removed from the CSS Colors Spec, I still think it's useful to have as it helps not having to add another library to the mix
  : `color-mod` was removed from the Colors Level 4 spec
  : `taint` and `shade` were removed along with the `color-adjust()` function in the Colors Level 5 spec. According to [Adam Aargyle](https://twitter.com/argyleink) (one of the Colors Level 5 spec editors) [tweet](https://twitter.com/argyleink/status/1456301298769297408?s=20) the `color-mix()` function provides equivalent functionality. I'm still working on reasoning through the functionality. It currently only works on Firefox Nightly.

[postcss-register-property](https://github.com/csstools/postcss-register-property/)
: Provides a way for work with Houdini-style custom properties defined in [CSS Properties and Values API Level 1](https://drafts.css-houdini.org/css-properties-values-api/)
: It will require some extra code to make sure we provide adequate feedback for older browsers

[postcss-each](https://github.com/madyankin/postcss-each), [postcss-for](https://github.com/antyakushev/postcss-for), [postcss-conditionals](https://github.com/andyjansson/postcss-conditionals)
: Provide function-like abilities (each, for and if respectively)

[postcss-normalize](https://github.com/csstools/postcss-normalize)
: Selectively applies Normalize.css rules based on your browserslist settings

[postcss-sorting](https://github.com/hudochenkov/postcss-sorting)
: Sorts the rules inside selectors for you so you don't have to do it yourself manually

[postcss-easy-import](https://github.com/TrySound/postcss-easy-import)
: Inline the contents of imported files reducing the number of request and potentially improving performance
: This will work with CSS imports and not necessarily with SASS imports.

[postcss-fail-on-warn](https://github.com/postcss/postcss-fail-on-warn)
: Will stop and fail the build if there are any warnings. This is probably harsher than most would like but I would rather work on errors as they happen rather than have to figure out multiple errors after compilation.

## Implementation: Gulp task V1

```js

```

## Incorporating into a Fractal design system

## Conclusions
