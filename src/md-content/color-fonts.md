# Color Fonts

CSS Fonts Level 4 introduces support for [color fonts](https://www.w3.org/TR/css-fonts-4/#color-font-support). The idea is that these fonts will be less resource intensive because they will make fewer round trips to the server to manipulate the colors available to display the font.

In theory (there are no browsers that currently support this) defining a custom palette for color fonts looks like this:

* The `@font-paletter-values` at-rule
* The name of the palette we are creating
* The font family that the palette is associated with
* The base palette that we're oveerriding
* A list of one or more override colors

```css
@font-palette-values Cooler {
  font-family: Bradley;
  base-palette: 1;
  override-colors:
    1 rgb(126,183,228);
}
```

Once the palette is defined, we can use it as another attribute for CSS rules:

```css
h1 {
  font-family: Bradley;
  font-palette: Cooler;
  font-size: 10em;
}
```

The code means that all `h1` elements will use the color font and the customized palette. We can use other fonts as we normally would.

## Browser support

Spotty, at best. There is no current browser that supports `@font-palette-values` or the `font-palette` attribute.

Status per browser:

Safari doesn't take the color into consideration at all.
: and turns the font into a black and white affair that looks good but it's not what I wanted
: I would have expected the browser to at least render the colors in the font

Chrome ignores the @font-palete at-rule and the font-palette attribute altogether
: It honors the colors as stored in the font.

Firefox doesn't support color fonts at all
: The font I tested with renders as white letters in black background

## More information

* [COLRv1 Color Gradient Vector Fonts in Chrome 98](https://developer.chrome.com/blog/colrv1-fonts/)
* [Colorful typography on the web: get ready for multicolor fonts](https://pixelambacht.nl/2014/multicolor-fonts/)
