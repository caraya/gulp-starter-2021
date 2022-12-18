# Updates to @font-face

`@font-face` has been around for a while and it works fine for the existing monochrome, one file per style.

[CSS Fonts level 4](https://w3c.github.io/csswg-drafts/css-fonts/) introduced a new property related to font types (`tech()`) to the `src` attribute of `@font-face` at-rules. I also looked again at the `format()` attribute of the `src` descriptor; particularly what benefits would we get from using it.

We will discuss each of these in turn.

## `format()`

This attribute specifies the font format of the font it is attached to.

If the value for `format()` is not supported or invalid, the browser will not download the resource, potentially saving bandwidth and improving performance.

If omitted, the browser will always download the font and then detect the format. The font will still work but it may take the browser longer to download and use.

The preferred value type is a keyword, with or without quotes.

The following table shows the following information for each supported format that appears in the specification:

* The quoted string format
* The equivalen unquoted syntax
* The font format
* The format name
* Commons extensions associated with the format

Even though `format()` is not as important as it used to be since most modern browsers support WOFF and WOFF2 fonts, it is still a good habit to get into.

| String Format | Equivalent Syntax | Font Format | Format Name | Common extensions |
| --- | --- | --- | ---| ---|
| format("woff2") | format(woff2) | woff2 | WOFF 2.0 | .woff2 |
| format("woff") | format(woff) | woff | WOFF 1.0 | .woff |
| format("truetype") | format(truetype) | truetype | TrueType | .ttf |
|format("opentype") | format(opentype) | opentype | OpenType | .otf, .ttf |
| format("collection" | format(collection) | collection | OpenType Collection  | .otc, .ttc |
| format("woff2-variations") | format(woff2) tech(variations) | woff2 | WOFF 2.0 | .woff2 |
| format("woff-variations") | format(woff) tech(variations) | woff | WOFF 1.0 | .woff |
| format("truetype-variations") | format(truetype) tech(variations) | truetype | TrueType | .ttf |
| format("opentype-variations") | format(opentype) tech(variations) | opentype | OpenType | .otf, .ttf |
| format(embedded-opentype) | format("embedded-opentype") | Embedded OpenType | Embedded OpenType | .eot |
| format(svg) | format("svg") | SVG (deprecated) | SVG | .svg, .svgz |

Loading a font and explicitly stating that it's a WOFF2 variable font would look like this:

```css
@font-face {
  font-family: "Recursive";
  src: url("/path/to/recursive.woff2") 
    format(woff2)
    tech(variations),
  url("/path/to/recursive.woff") 
    format(woff)
    tech(variations);
}
```

## `tech()`

This is an optional descriptor that indicates the technologies that the font supports.

The value for this property is one of the following keywords:

* variations
* palettes
* incremental
* features-opentype
* features-aat
* features-graphite
* color-COLRv0
* color-COLRv1
* color-SVG
* color-sbix
* color-CBDT.

The following table shows several old unnormalized format() values and their new equivalent syntax:

| Old syntax | Equivalent syntax |
| --- | --- |
| format("woff2-variations") | format(woff2) tech(variations) |
| format("woff-variations")  | format(woff) tech(variations) |
| format("opentype-variations") | format(opentype) tech(variations) |
| format("truetype-variations") |format(truetype) tech(variations) |

## Using @support with the new @font-face features

What I find most intriguing is that we can target font technology and format using `@supports`.

## Testing for specific font technologies

You can use `@supports` and the `tech()` attribute of the `src` descriptor to test if a browser supports a given font technology.

The list of technologies you can test for is listen in the following table

| Technology | Supports |
| --- | --- |
| color-colrv0 |  Color Fonts using the COLR version 0 table |
| color-colrv1 | Color fonts using the COLR version 1 table |
| color-svg | SVG multi-colored tables |
| color-sbix | Standard bitmap graphics tables |
| color-cbdt | Color bitmap data tables |
| features-opentype |OpenType GSUB and GPOS tables |
| features-aat | TrueType morx and kerx tables
| features-graphite |[Graphite](https://en.wikipedia.org/wiki/Graphite_(smart_font_technology)) features, namely Silf, Glat , Gloc , Feat, and Sill tables
| incremental |Incremental font loading
| variations | Font variations in TrueType and OpenType variable fonts to control variable font axes |
| palettes | Font palettes by means of font-palette to select one of many color palettes in the font |

The syntax for the `@supports` at rule is:

```css
@supports font-tech(name-of-tech) {
  /* 
  Code that supports the
  technology goes here
  */
}
```

This example imports the Bungee Spice Color V1 font from Google Fonts and will only use in the body element if the browser supports COLRv1 font technology

```css
@import url("https://fonts.googleapis.com/css2?family=Bungee+Spice");

@supports font-tech(color-COLRv1) {
  .bungee-example {
    font-family: "Bungee Spice";
  }
}
```

## Format()

We use `font-format` as the value of the feature we're testing with `@supports`. A list of valid values is show in the following table.

| Format | Description | File extensions |
| --- | --- | --- |
|collection | OpenType Collection | .otc, .ttc |
| embedded-opentype | Embedded OpenType | .eot |
| opentype | OpenType | .ttf, .otf |
| svg | SVG Font (deprecated) | .svg, .svgz |
| truetype | TrueType | .ttf |
| woff | WOFF 1.0 (Web Open Font Format) | .woff |
| woff2 | WOFF 2.0 (Web Open Font Format) | .woff2 |

```css
@supports: font-format(woff2) {

}
```
