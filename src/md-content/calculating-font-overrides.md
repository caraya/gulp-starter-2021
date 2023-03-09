# calculating font overrides

As a followup to the prior post on converting JSON/JSON5 to CSS, we will look at providing font override metrics for fallback fonts and how to use them.

Katie Hempenius  provides a [spreadsheet with the override values](https://github.com/khempenius/font-fallbacks-dataset) for all fonts in the Google Fonts collection.

If the font is not available in Google Fonts or you have the font available, you can use tools like [Fontkit](https://www.npmjs.com/package/fontkit) to query the font and get metrics for font fallbacks.

The metrics that we need are:

* ascent
* descent
* lineGap
* UnitsPerEm

And we use them to calculate the override values as follows:

* `ascent-override` = ascent/unitsPerEm
* `descent-override` = descent/unitsPerEm
* `line-gap-override` = line-gap/unitsPerEm

The rest of the post will look at one way of generating these metrics and how to use them.

The following block of text does the following:

1. Opens a font with FontKit
2. calculates each override metric and assigns it to a variable that we can later push into an array

```js
function getFontMetrics(font) {
  const myFont = fontkit.openSync(font);

  let ascentOverride = `${myFont.ascent / myFont.unitsPerEm}`;
  let descentOverride = `${myFont.descent / myFont.unitsPerEm}`;
  let lineGapOverride = `${myFont.lineGap / myFont.unitsPerEm}`;
}
```

This function will produce the values that we need to define overrides in the fallback font.

When running the code with Recursive we get the following values:

* Ascent override: 0.95
* Descent override: -0.25
* Line-gap override: 0

Now we can create the fallback  `@font-face` declarations.

The next example defines two fallback fonts, Arial and Roboto, with overrides based on Recursive, our primary font.

Note how we define local sources for the fonts using `local` plus the font name.

We then define the font stack in the `body` element.

```css
@font-face {
  font-family: "Fallback1";
  src: local("Arial");
  ascent-override: 95%;
  descent-override: -25%;
  line-gap-override: 0;
}

@font-face {
  font-family: "Fallback2";
  src: local("Roboto");
  ascent-override: 95%;
  descent-override: -25%;
  line-gap-override: 0;
}

body {
  font-family: "Recursive", "Fallback1", "Fallback2";
}
```

This is a first reduction of layout shift caused by font substitutions.

One thing I'm curious about is whether the system fonts stack may help reduce the shift further.
