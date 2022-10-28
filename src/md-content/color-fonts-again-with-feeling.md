# Color Fonts (again, with feeling)

I first saw information about color fonts in 2013 in [Color fonts. Overview of the proposals for color extensions of the OpenType font format.](https://www.fontlab.com/news/color-font-format-proposals/) but they haven't taken off despite Safari supporting one type of color fonts (SVG in OT). It's only been in the last couple of years (since 2021) when browsers other than Safari started implementing color fonts (COLRV1) and it's only in 2022 that browsers have implemented the CSS necessary to make color fonts really useful, as documented in [COLRv1 and CSS font-palette: Web Typography Gets Colorful](https://css-tricks.com/colrv1-and-css-font-palette-web-typography/)

This post will discuss the COLRV1 color font format and the currelntly suported  CSS to work with these fonts.

## Figuring out what a font can do

The beta version of [Wakamaifondue](https://wakamaifondue.com/beta/) gives you a list of the available color palettes for the font we're working with. This will become important when it comes to figure out if we want to use the built-in palettes or we want to change the colors individually.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1666019906/publishing-project.rivendellweb.net/wakamaifondue-color-font-palettes/wakamaifondue-color-font-palettes.png?_i=AA' alt='Wakamaifondue color font palette selection' width='800' >
  <figcaption>Wakamaifondue color font palette selection</figcaption>
</figure>

## The new features

There are a few new CSS elements that we need to work with COLRv1 fonts.

## `@font-palette-values`

[@font-palette-values](https://drafts.csswg.org/css-fonts-4/#font-palette-values)
: The `@font-palette-values` rule defines a color palette and associates that color palette with a specific font.
: This is the base for all other COLRV1 CSS that we'll discuss later
: We can have more than one palette assigned per font and we can assign the same palette to multiple fonts
: it defines the name of the palette using CSS Custom Property syntax (`--GraysRemix`)

## base-palette

[base-palette](https://drafts.csswg.org/css-fonts-4/#base-palette-desc) descriptor indicate the color palette we want to use.
: It can take one of three possible values: [light](https://drafts.csswg.org/css-fonts-4/#valdef-base-palette-light), [dark](https://drafts.csswg.org/css-fonts-4/#valdef-base-palette-light) or an integer numerical palette index within the font
: If this descriptor is not present in the `@font-palette-values`, or if the font does not contain a palette at the index of the value of base-palette, it behaves as if 0 were specified

```css
@font-face {
  font-family: "Bungee";
  src: url("/fonts/BungeeColor-Regular-colrv1.woff2");
}

@font-palette-values --PinkAndGray {
  font-family: bungee;
  override-colors: 1 #c1cbed, 2 #ff3a92;
}

.bungee1 {
  font-family: "Bungee";
  font-palette: --PinkAndGray;
}
```

## Override-colors

The [override-colors](https://drafts.csswg.org/css-fonts-4/#override-color) descriptor overrides individual colors in a given `font-palette`
:The override-colors descriptor takes a comma-separated list of palette index entries and colors
: Each item in the comma-separated list represents a tuple of an entry into the palette and a color to replace it with
: Integer values are zero-indexed.
: The default palette is at index 0
: Colors provided from CSS may use any supported colorspace

```css
@font-face {
  font-family: "Rocher";
  src: url("/fonts/RocherColorGX.woff2")
    format("woff2");
}

@font-palette-values --GraysRemix {
  font-family: Rocher;
  base-palette: 9;
  override-colors: 2 rgb(102, 51, 153);
}

.rocher {
  font-family: "Rocher";
  font-palette: --GraysRemix;
}
```

## Color fonts as progressive enhancement

Some issues to consider when deciding if you want to use color fonts in your projects.

From an accesibility standpoint you shouldn't use color alone to convey your message so you should provide alternatives that don't rely in color to convey your message.

Another consideration is what color space. Since the descriptors can use any CSS color spaces you need to be mindful about browser support for the color spaces/formats that you choose to use.

The final consideration is browser support.

<figure>
  <img src="https://caniuse.bitsofco.de/static/v1/colr-v1-1665630575572.webp" alt="Data on support for the colr-v1 feature across the major browsers from caniuse.com">
  <figcaption>Data on support for the colr-v1 feature across the major browsers from caniuse.com</figcaption>
</figure>

Just like with audio and video codecs, different browsers support different color font formats.

Safari has, so far, declined to implement COLRv1 in both desktop and mobile, so developers need to address fallbacks. These fallbacks may include:

* Using color fonts supported on Safari(SVG-OT) as fallback
* Side stepping the issue altogether and letting the font display without colors.
