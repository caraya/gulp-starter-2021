# CSS Containment and container queries

It looks like [CSS containment](https://publishing-project.rivendellweb.net/css-containment/) will finally bring container queries into browsers without the need for a polifill.

This post will discuss the current implementation in Chromium browsers.

<div class="message warning">
<p><strong>Note:</strong></p>
<p>The specification for container queries hasn't been finalized. It is possible but unlikely that the specification and the corresponding CSS will change.</p>
<p>Don't use <code>@container</code> in production until the feature is finalized.</p>
</div>

## What problem do container queries solve?

Container queries give developers finer control over the layout of components. Rather than using [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) that provide responsiveness based on the viewport state, they give responsiveness based on the parent container or the next ancestor that has containment applied to it.

This means that we can have both large elements and layouts that are use media queries and smaller components that use container queries to provide finer-controlled layouts based on the status of elements on the page, not on the page overall.

## How they work?

```html
<div class="card-container">
  <div class="card">
    <figure>
      <!-- image and caption go here -->
    </figure>
    <div>
      <header>
        <!-- Header and related information -->
      </header>
      <div class="notes">
        <!-- content related data -->
      </div>
      <button>Click me</button>
    </div>
  </div>

  <!-- additional cards -->
</div>
```

Becfore we can use use `@container`, we need to create a parent element that has [containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) by setting `contain: layout inline-size`.

`contain: layout inline-size` creates a new [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block) and new [block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context), letting the browser separate it from the rest of the layout.

```css
.card-container {
  contain: style layout inline-size;
  width: 100%;
}
```

Then we can use the `@container` pseudo element to change the layout of our elements based on the width of the constrained parent.

The syntax is similar to media queries and the `@media` pseudo element but with different results.

The example below uses four container queries to change the way content will look based on the parent element's width.

```css
@container (max-width: 850px) {
  /* 
  if the width of the parent is less than 850px
  */
}

@container (max-width: 650px) {
  /* 
  if the width of the parent is less than 650px
  */
}

@container (max-width: 460px) {
  /* 
  if the width of the parent is less than 460px
  */
}

@container (max-width: 300px) {
  /* 
  if the width of the parent is less than 300px
  */
}
```

## Alternatives for browsers that don't support `@container`

I'm still researching the way to get container queries to work in older browsers.

To make sure we don't break things we use a feature query to wrap the `@container` style selectors to make sure that it will only run in browsers that support containment.

```css
@supports (contain: inline-size) {
  @container (max-width: 850px) {}

  @container (max-width: 650px) {}
}
```

Once we have the native container queries handled, we can use third party libraries like [eqio](https://github.com/stowball/eqio) to provide equivalent functionality for browsers that don't support it natively.

First we load the script. This example uses the [unpkg](https://unpkg.com/) CDN.

```html
<script src="https://unpkg.com/eqio/umd/eqio.min.js"></script>
```

Once the script is loaded you can use code like the one below to make sure you initialize all the elements you want eqio with.

We wrap this on a feature detection for Intersection observer, and would load a polyfill if the feature is not supported natively.

```js
function supportsIntersectionObserver() {
  return ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype)
}

if (!supportsIntersectionObserver) {
  console.log('loading Intersection Observer polyfill');
  // Load Intersection Observer polyfill
} else {
  console.log('browser supports Intersection observer. Keep going');
  // if the browser supports 
  // Intersection Observer then do nothing
}

// run eqio code
const els = Array.from(document.getElementsByClassName('eqio'));

const eqios = [];

els.forEach((el) => {
  eqios.push(new Eqio(el));
});

```

Then add the following attribute to the HTML elements that you want to use container queries:

* The `eqio` class to the element in addition to any other class you need
* A `data-eqio-sizes` attribute whose value is a JSON-serializable array of sizes that you want to match on
* A `data-eqio-prefix` attribute to tell eqio the prefix for your class names.

```html
<div
  class="media-object eqio"
  data-eqio-sizes='["<400", ">700"]'
  data-eqio-prefix="media-object"
>
  …
</div>
```

The example component will:

* be customised when its width is 400 or smaller ("<" is a synonym for `max-width`, not “less than”)
* be customised when its width is 700 or greater (">" is a synonym for `min-width`, not “greater than”).
* apply the following classes `media-object-eqio-<400` and `media-object-eqio->700` as appropriate

The final step is to create the CSS for each matching condition. The query is a combination of the `data-eqio-prefix` HTML attribute and the value of the query we want to match, `<400` or `>700`.

`<` and `>` are special characters in CSS so they need to be escaped as `\<` and `\>`.

```css
@supports not (contain: inline-size) {
  .media-object-eqio-\<400 {
    /* less than or equal to 400px */
  }

  .media-object-eqio-\>700 {
    /* greater than or equal to 700px */
  }
}
```

Both solutions should be functionally identical but, as with everything on the web, please test it with your oown project to make sure it works as intended in all browsers.

## Links and resources

* [An introduction to CSS Containment](https://blogs.igalia.com/mrego/2019/01/11/an-introduction-to-css-containment/)
* [The new responsive: Web design in a component-driven world](https://web.dev/new-responsive/)
* [Next Gen CSS: @container](https://css-tricks.com/next-gen-css-container/)
* [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) &mdash; MDN
* [CSS Podcast, Episode 43: Containment](https://thecsspodcast.libsyn.com/043-containment)
* [CSS Containment Module Level 1](https://www.w3.org/TR/css-contain-1/)
* [Can I use: CSS containment](https://caniuse.com/#feat=css-containment)
* [CSS Triggers](https://csstriggers.com/) &mdash; What gets triggered by mutating a given property
* [CSS Containment in Chrome 52](https://developers.google.com/web/updates/2016/06/css-containment)
* [Avoid Large, Complex Layouts and Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [CSS Contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
