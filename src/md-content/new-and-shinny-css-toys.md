# New and shinny CSS toys

## CSS Layers

CSS layers resolve another problem with CSS specificity and rule order.

as I documented in: [Looking forward: CSS Layers and the @layer at-rule](https://publishing-project.rivendellweb.net/looking-forward-css-layers-and-the-layer-at-rule/) CSS Layers or Cascade Layers are a way to group styles together and then apply them in a specific order.

All modern browsers now support cascade layers.

The idea behind layers is that you create layers as groups so that all the styles in a layer have the same priority and cascade together.

There are three ways to create layers:

1. Using the @layer block at-rule, with styles assigned immediately to it:

    ```css
    @layer base {
      &hellip;
    }
    ```

2. Using the @layer statement at-rule, without any styles assigned:

    ```css
    @layer base;
    ```

    With this system we can also define multiple layers and append content to each later.

    ```css
    @layer
      normalize,
      base,
      theme,
      content;
    ```

3. Using @import with the layer keyword or layer() function:

    ```css
    @import url(base.css) layer(base);
    ```

For simplicity's sake we'll use the firt method in the rest of this post.

The following stylesheet will create five layers for different groups of CSS. Rules in each group will cascade together and share the same priority within the author styles.

```css
@layer normalize { &hellip; }
@layer base { &hellip; }
@layer theme { &hellip; }
@layer content { &hellip; }
```

Declarations in the layers defined later in the document will will against declarations in earlier layers. The specificity of the rules inside the layers is not as important as the order in which we declare the layers.

If there are declarations in the `theme` layer that match declarations in either base or normalize then theme will win since it's declared later in the document but it won't win against declarations in the `content` layer since content is declared later in the document.

As Bramus points out in [his article about layers](https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/):

> Once a winning declaration has been determined via Layer Order, the Cascade won’t even check Specificity or Order of Appearance for those declarations anymore. This is because Layers is a separate and higher ranked criterion of the Cascade.

When building a new project, this is the way to go, but the question I have is this: How do we make sure that content in layers works well with existing content that is not in layers?

If I understand it correctly content outside layers will be read last, overriding content in all layers.

### More information

* [CSS Cascade 5 specification](https://www.w3.org/TR/css-cascade-5/#layering)
* [Cascade layers explainer](https://css.oddbird.net/layers/explainer/)
* [Cascade layers](https://developer.mozilla.org/docs/Web/CSS/@layer) &mdash; MDN
* [Cascade Layers](https://developer.chrome.com/blog/cascade-layers/) &mdash; Una Kravets
* [Hello, CSS Cascade Layers](https://ishadeed.com/article/cascade-layers/) &mdash; Ahmad Shadeed

## New ways to write media queries

In the past we've had to write media queries that check for screen/device width as something like this.

This query checks if the screen has a minimum width of 768px

```css
@media (min-width: 768px) {
  &hellip;
}
```

and this query checks is the screen is smaller than 768px

```css
@media (max-width: 768px) {
  &hellip;
}
```

You can also combine tests to determine if the value you're testing is within two values.

```css
@media 
  (min-width: 800px)
  and
  (max-width: 1024px) {
  &hellip;
}
```

The new [Media Queries spec](https://www.w3.org/TR/mediaqueries-4/#mq-range-context) explains new syntax for media queries using ranges.

We can write the media queries using smaller or equal than. The new syntax for the query looks like this:

```css
@media (width <= 768px) {
  &hellip;
}
```

The larger than query can use the larger or equal than:

```css
@media (width >= 768px) {
  &hellip;
}
```

And the combined query can be rewriten like this. Width can be larger or equal to 800px and equal or smaller than 1024px.

```css
@media (800px <=width <= 1024px) {
  &hellip;
}
```

The new syntax makes it cleaner and, to me, makes the meaning of the query clearer than it would be in the old syntax.

### Notes and links

* [Media query ranges specification](https://www.w3.org/TR/mediaqueries-5/#mq-range-context)
* [Media query range syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax_improvements_in_level_4) &mdash; MDN
* [New syntax for range media queries in Chrome 104](https://developer.chrome.com/blog/media-query-range-syntax/) &mdash; Chrome Developer blog
* [PostCSS plugin](https://github.com/postcss/postcss-media-minmax)

## @media (prefers-reduced-data)

The `prefers-reduced-data` media query detects if the user has requested the web content that consumes less internet traffic via the browser or operating system's `data-saver` option.

Until the introduction of the `prefers-reduced-data` media query, there was no way to honor the `data-saver` settings.

In a music shop app or in any other application where we have a lot of images represeting products, we can ask the browser to remove the images if the user has requested to save data using something like this:

```css
@media (prefers-reduced-data: reduce) {
  .album-cover {
    display: none;
  }
}
```

This will reduce the number of requests and will improve loading speed and overall performance of your site.

### Notes and links

* [prefers-reduced-data mediaquery](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-data) spec
* [prefers-reduced-data](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data) &mdash; MDN
* [SaveData And prefers-reduced-data](https://www.smashingmagazine.com/2021/12/core-web-vitals-case-study-smashing-magazine/#savedata-and-prefers-reduced-data) &mdash; Smashing Magazine
* Example: [Media Scroller component](https://web.dev/building-a-media-scroller-component/)

## @custom-media

Of all the new features the one I've been researching is `@custom-media`.

Custom media queries allow you to create, in esence, create variables in CSS where we associate a name with a media query and can reuse it throughout the stylesheet.

This is useful as it gives authors a single place to make changes and prevents errors due to typos and not updating a media query exactly the same way everywhere it is used.

Naming things is also important. As Adam Argyle points out in [No media query variables](https://web.dev/state-of-css-2022/#no-media-query-variables):

> Naming things is very important: it can align purpose with the syntax, making things easier to share and easier to use in teams.

In the following example, we define a narrow window media query using the `@custom-media` at-rule and a syntax using two dashes `--` as the starting chracters in the name. In this example, we also use media query ranges in the definition.

When we call the custom media query we only need to reference it by name, not the full media query. We can do this as many times as it is necessary.

```css
@custom-media --narrow-window ( width <= 30em);

@media (--narrow-window) {
  /* narrow window styles */
}
```

In the same article, Adam provides examples of custom media queries from his [Open Props](https://open-props.style/) project.

```css
/* Viewport Variables */
@custom-media --portrait      (orientation: portrait);
@custom-media --landscape     (orientation: landscape);

@custom-media --md-only       (480px <= width <= 768px);
@custom-media --md-n-above    (width >= 768px);
@custom-media --md-n-below    (width <= 768px);
@custom-media --md-phone      (--md-only) and (--portrait);

@custom-media --xxl-only      (1440px <= width <= 1920px);
@custom-media --xxl-n-above   (width >= 1920px);
@custom-media --xxl-n-below   (width <= 1920px);

/* Capability Variables */
@custom-media --touch    (hover: none) and (pointer: coarse);
@custom-media --stylus   (hover: none) and (pointer: fine);
@custom-media --pointer  (hover) and (pointer: coarse);
@custom-media --mouse    (hover) and (pointer: fine);

@custom-media --HDcolor  (dynamic-range: high);

/* Preference Variables */
@custom-media --highContrast  (prefers-contrast: high);
@custom-media --lowContrast   (prefers-contrast: low);

@custom-media --opacityOK     (prefers-reduced-transparency: no-preference);
@custom-media --opacityNotOK  (prefers-reduced-transparency: reduce);

@custom-media --useDataOK     (prefers-reduced-data: no-preference);
@custom-media --useDataNotOK  (prefers-reduced-data: reduce);
```

### Links and Resources

* [Custom Media Queries specification](https://www.w3.org/TR/mediaqueries-5/#custom-mq)
* [Custom media queries PostCSS plugin](https://github.com/postcss/postcss-custom-media)
* [Chromium Issue](https://bugs.chromium.org/p/chromium/issues/detail?id=1234172) &mdash; star the issue to improve odds of development

## Defining custom properties from Javascript

When I was writing a previous post, I wanted to create custom properties in Javascript that I could use in CSS based on the result of running [color.js](https://colorjs.io/) to convert colors and then test if the browser supports a given colorspace.

This example, as posted in [Using color.js as a bridge between color spaces](https://publishing-project.rivendellweb.net/using-color-js-as-a-bridge-between-color-spaces/), takes a color defined as a new color.js `Color` object, converts it to an sRGB string as a default.

The script then tests if the browser supports different color spaces (LCH and Display-P3) using the [css.supports()](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) method. If the color space is supported then it converts the color to a string in the specified color space

```js
import Color from "colorjs.io";

let rp = new Color("#663399");

// Initialize cssColor
let cssColor;

cssColor = rp.to("srgb").toString();

if (!CSS.supports("p3", cssColor))
  cssColor = rp.to("p3").toString();

if (!CSS.supports("lch", cssColor))
  cssColor = rp.to("lch").toString();

cssColor; 
```

We can then use the value of CSS color as the value of a custom property.

Assuming the following code is part of the same script, we can write code like this:

```css
if (!window.CSS.registerProperty) {
  console.log('Houdini porperties not supported');

  CSS.registerProperty({
  name: "--color-name",
  syntax: "<color>",
  initialValue: `${cssColor}`,
  inherits: false
});
} else {
  document.documentElement.style.setProperty('--color-name', `${cssColor}`);
}
```

## toggle()

## scroll-start

## inert

## Subgrid

## Container-queries

## Color fonts v1

## Viewport unit variants

## :has()
