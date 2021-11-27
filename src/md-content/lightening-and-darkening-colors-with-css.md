# Lightening and darkening colors with CSS

CSS is adopting a lot of new features that in the past were only available in pre-processors or via Javascript. One of those features is the ability to lighten and darken colors like SASS `darken()` and `lighten()` functions.

There are muliple ways to achieve the desired goal. I've chose to use the [color-mix()](https://drafts.csswg.org/css-color-5/#color-mix) function as defined in the [CSS Color Module Level 5](https://drafts.csswg.org/css-color-5/).

According to the spec:

> This function takes two [&lt;color>](https://drafts.csswg.org/css-color-4/#typedef-color) specifications and returns the result of mixing them, in a given [&lt;color-space>](https://www.w3.org/TR/css-color-5/#typedef-color-space), by a specified amount.

So basically, to use `color-mix()` you need three things:

* The color space you want to work in, most of the time this will be `sRGB` but it can be any color space supported in CSS
* The colors that you want to mix
* The percentage that you want to mix them by

Right now (as of 11/25/2021) the examples below only work in Firefox Nightly. There is an entry in Chromestatus dashboard for the API, but there's no clear timeframe for when it'll be available for testing or production.

The first experiement will lighten a darken color in 10% increments.

We define a variable for our base color (`--color-charcoal`) and then we add nine more variables for the lightened colors.

Each of the lightened colors uses `color-mix()` by mixing the color we want to lighten, the base color (white) and the percentage we want to lighten the color by.

```css
:root {
  --color-charcoal: #222023;

  --text1: color-mix(in srgb, var(--color-charcoal) 10%, white);
  --text2: color-mix(in srgb, var(--color-charcoal) 20%, white);
  --text3: color-mix(in srgb, var(--color-charcoal) 30%, white);
  --text4: color-mix(in srgb, var(--color-charcoal) 40%, white);
  --text5: color-mix(in srgb, var(--color-charcoal) 50%, white);
  --text6: color-mix(in srgb, var(--color-charcoal) 60%, white);
  --text7: color-mix(in srgb, var(--color-charcoal) 70%, white);
  --text8: color-mix(in srgb, var(--color-charcoal) 80%, white);
  --text9: color-mix(in srgb, var(--color-charcoal) 90%, white);
}
```

We then create classes for each of the lightened colors where we use the css custom property in the `background-color` property.

```css
.dark-text1 {
  background-color: var(--text1);
}

.dark-text2 {
  background-color: var(--text2);
}

.dark-text3 {
  background-color: var(--text3);
}

.dark-text4 {
  background-color: var(--text4);
}

.dark-text5 {
  background-color: var(--text5);
}

.dark-text6 {
  background-color: var(--text6);
}

.dark-text7 {
  background-color: var(--text7);
}

.dark-text8 {
  background-color: var(--text8);
}

.dark-text9 {
  background-color: var(--text9);
  color: white;
}
```

View the following Pen in Firefox or Safari TP 122 or later with the `css color-mix()` experimental feature enabled to see the results of the code and how it ligthened the color.

<iframe height="587" style="width: 100%;" scrolling="no" title="Color lightening with color-mix()" src="https://codepen.io/caraya/embed/preview/LYjwLEe?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/LYjwLEe">
  Color lightening with color-mix()</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Darkening a color follows a similar process. We define a variable for our base color (`--color-mint`) and then we add nine more variables for the darkened colors.

```css
:root {
  --color-mint: #98ecc3;

  --light-text1: color-mix(in srgb, var(--color-mint) 10%, black);
  --light-text2: color-mix(in srgb, var(--color-mint) 20%, black);
  --light-text3: color-mix(in srgb, var(--color-mint) 30%, black);
  --light-text4: color-mix(in srgb, var(--color-mint) 40%, black);
  --light-text5: color-mix(in srgb, var(--color-mint) 50%, black);
  --light-text6: color-mix(in srgb, var(--color-mint) 60%, black);
  --light-text7: color-mix(in srgb, var(--color-mint) 70%, black);
  --light-text8: color-mix(in srgb, var(--color-mint) 80%, black);
  --light-text9: color-mix(in srgb, var(--color-mint) 90%, black);
}
```

We then create the classes that use the variables in the `background-color` property.

To ensure proper contrast, I've also set the text color to white in all the darkened colors.

```css
.mint {
  background-color: var(--color-mint);
  color: black;
}

.light-text1 {
  background-color: var(--light-text1);
  color: white;
}

.light-text2 {
  background-color: var(--light-text2);
  color: white;
}

.light-text3 {
  background-color: var(--light-text3);
  color: white;
}

.light-text4 {
  background-color: var(--light-text4);
  color: white;
}

.light-text5 {
  background-color: var(--light-text5);
  color: white;
}

.light-text6 {
  background-color: var(--light-text6);
  color: white;
}

.light-text7 {
  background-color: var(--light-text7);
  color: white;
}

.light-text8 {
  background-color: var(--light-text8);
  color: white;
}

.light-text9 {
  background-color: var(--light-text9);
  color: white;
}
```

The following pen shows the results of the code. It will only work on Firefox Nightly and Safari TP122 or later with the `css color-mix()` experimental feature enabled.

<iframe height="612" style="width: 100%;" scrolling="no" title="Color darkening with color-mix()" src="https://codepen.io/caraya/embed/preview/abyeQdW?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/abyeQdW">
  Color darkening with color-mix()</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

If you're interested in getting this feature in Chromium browsers, follow and star the [chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1092638).
