# Building long form content on the web: Font availability

In a previous post we looked at what font should we choose. Another side of the question is where to get the fonts from.

This post will discuss font availability and how to incorporate the fonts into your CSS stylesheets.

Variable fonts will not be covered here. They are a large topic and will get their own post later in the series.

## Generic font families

Generic font familities are designed as fallback fonts for web font stacks. The idea is that they will map to an existing font on the user's computer so there will be a font to render the contet. It may not match exactly what the designer had in mind but at least it will work.

Generic font families are best used as the last element in a `font-family` declaration, to be used only when no other option is available.

The following table maps to the most common used generic font families

| Font | Description |
| --- | --- |
| **Serif** | Serif fonts represent the formal text style for a script. This often means, but is not limited to, glyphs that have finishing strokes, flared or tapering ends, or have actual serifed endings (including slab serifs). Serif fonts are typically proportionately-spaced.|
| **Sans-Serif** | Glyphs in sans-serif fonts, as the term is used in CSS, are generally low contrast (vertical and horizontal stems have the close to the same thickness) and have stroke endings that are plain (without any flaring, cross stroke, or other ornamentation). Sans-serif fonts are typically proportionately-spaced. They often have little variation between thick and thin strokes, compared to fonts from the serif family. |
| **Monospace** | The sole criterion of a monospace font is that all glyphs have the same fixed width. This is often used to render samples of computer code. |
| System UI | This generic font family lets text render with the default user interface font on the platform on which the UA is running. A cross-platform UA should use different fonts on its different supported platforms. The purpose of system-ui is to allow web content to integrate with the look and feel of the native OS.|

There are other, less frequently used generic font families defined in the specification. See [2.1.3. Generic font families](https://www.w3.org/TR/css-fonts-4/#generic-font-families) in the CSS Fonts Module Level 4 specification.

Other than `system-ui` discussed later in System fonts, generic font families are used as a last resort to provide some level of uniformity to design in case other fonts are not available

## Microsoft webfonts

The first set of fonts designed work on the web are the [Core fonts for the Web](https://en.wikipedia.org/wiki/Core_fonts_for_the_Web) released by Microsoft under a a combination of their own license and licenses from the Monotype foundry.

The included fonts are:

* Andalé Mono
* Arial
* Arial Black
* Comic Sans MS
* Courier New
* Georgia
* Impact
* Times New Roman
* Trebuchet MS
* Verdana
* Webdings

The program released these fonts are freeware with some distribution restrictions until 2002.

Versions of these fonts released after 2002 are not part of the core fonts project and are released under different terms and licenses.

These fonts are still very likely to be in your computer either because you downloaded them or a product that bundles the fonts for you.

Using the fonts would be as simple as using them in a `font-family` attribute.

```css
body {
  font-family: Verdana, sans-serif;
}
```

## Typekit

Web fonts were part of the CSS 2 specification but foundries were afraid that people would streal their fonts so they crafted their licenses in such developers could not use embedable fonts and comply with the license.

Typekit, the first service to offer downloadble fonts, was released in 2009 and acquired by Adobe in 2011.

Typekit provides many ways to load fonts on a site. There is a legcy code, what has been used for years:

```html
<script src="https://use.typekit.net/xxxxxxx.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
```

And a newer asynchronous script that load both the script and the css necessary to run the font. This is the recommended way to add Typekit fonts to your site.

```js
(function() {
  var config = {
    kitId: 'abc1def'
  };
  var d = false;
  var tk = document.createElement('script');
  tk.src = '//use.typekit.net/' + config.kitId + '.js';
  tk.type = 'text/javascript';
  tk.async = 'true';
  tk.onload = tk.onreadystatechange = function() {
    var rs = this.readyState;
    if (d || rs && rs != 'complete' && rs != 'loaded') return;
    d = true;
    try { Typekit.load(config); } catch (e) {}
  };
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(tk, s);
})();
```

In both cases you then reference the font you loaded from your CSS.

```css
body {
  font-family: "chaparrall pro", serif;
}
```

I mention Typekit because it's part of Adobe Creative Suite (as Adobe Fonts), making it easier to work through licenses and use on your web projects.

## Google Fonts

Google fonts was first released in 2010 and currently provides over 1400 fonts, most of them open source under the [SIL Open Font license](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).

To use a font just click `download family` and it will download all available styles for you. You can then pick which styles you want and load them using `@font-face`.

```css
body {
  font-family: Roboto, sans-serif;
}
```

### Potential legal issues

Google fonts used to provide a means to load the fonts from Google servers but that has changed since a German court fined a website for using Google Fonts and passing their user's IP address to Google without notifying the user and giving them a way to decline.

See [Website fined by German court for leaking visitor's IP address via Google Fonts](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/) and [German Court Rules Websites Embedding Google Fonts Violates GDPR](https://thehackernews.com/2022/01/german-court-rules-websites-embedding.html).

How will this affect other font providers is unclear but I fail to see how this would affect only one provider and not others.

## Local web fonts

Given the problems with Google Fonts and the likely problems with other providers the best, and likely only, way to use web fonts and remain compliant with laws like the GDPR is to host fonts locally and loading using the `@font-face` at-rule.

The default way to use `@font-face` looks like this:

We specify the `font-family` name that we will use throughout the stylesheet.

Then we specify a `src` attribute with one or more locations for the file. In this example I'm using a [url](https://developer.mozilla.org/en-US/docs/Web/CSS/url) function to specify the location of the font relative to the stylesheet. The format tells the browser the kind of font it represents.

I specify the weight of the font so that the browser will know what file to associate with what weight declaration.

Specifying the style for the font tells the browser if the font is italic or not.

The final declaraction is [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display). This will control how the font will behave based on when the browser finished downloading the font. The `swap` value will cause the font to swap in with the system font once the web font is downloaded.

You will have to load each font separately with its own `@font-face`. There should be at least four different `@font-face` declarations per font that you want to use.

* Regular font (regular weight, non italic)
* Italic (regular weight)
* Bold (non italic)
* Bold Italic
* Any additional weight that you'd want to use and associated italic and bold italic files

This will prevent [faux bold](https://alistapart.com/article/say-no-to-faux-bold/) and italics if there is no font available in the weight or style you want to use. The browser will then fake the bold or italic in order to show what it thinks the designer wants.

A way to combat faux bold, italics and small caps is to ue the [font-synthesis](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis) that allows developers to control whether the browser synthesis algorithm applies to any/all of bold (weight), italics (style) or small caps.

```css
@font-face {
  font-family: 'Roboto';
  src: url('path/to/roboto.woff2') format("woff2")
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

You would then use the font like normal in your CSS with the addition of being able to use more granular values for `font-weight` and `font-stretch`

## System fonts

One way to improve performance is to default to the system font in the user's computer. This is different than the generic font families in that there is a specific system font per OS and version that is guaranteed to be present, it is not a match to one of many possible fonts.

This uses a similar technique than the one we used for variable fonts but instead of listing different axes, it hardcodes the currently supported fonts for each operating system.

The table below, taken from [System Font Stack](https://css-tricks.com/snippets/css/system-font-stack/) and modified for this article by dropping older operating systems and adding newer versions published after the article.

| OS | Version | System Font |
| --- | --- | --- |
| macOS | Big Sur<br/>Monterey<br/>Ventura (currently in Beta)| [San Francisco Pro](https://github.com/sahibjotsaggu/San-Francisco-Pro-Fonts) (variable) |
| macOS | El Capitan<br/>Sierra<br/>High Sierra<br/>Mojave | San Francisco |
| Windows | 11<br/>10 | [Segoe UI Variable](https://aka.ms/SegoeUIVariable) (variable) |
| Windows | 8.1 | [Segoe UI](https://docs.microsoft.com/en-us/typography/font-list/segoe-ui) |
| Android | Ice Cream Sandwich (4.0) and later | [Roboto](https://fonts.google.com/specimen/Roboto) |
| Ubuntu | All versions | [Ubuntu](http://font.ubuntu.com/) |

Using the information in the prior table we can use something like the following custom property to use system fonts in all operating systems.

In this case, the `system-ui` attribute will match the system default font (San Francisco in macOS) and then will then match the specific fonts, if they are available.

For long-form text system fonts may not be the best solution since the system geared towards UI but if you're OK with the different fonts then this may be a way to improve performance and reduce the number of HTTP requests that you make.

```css
:root {
  --system-ui: 
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Ubuntu,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
}
```
