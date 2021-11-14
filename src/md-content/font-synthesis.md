# Font synthesis in CSS

There are times when browsers are too helpful. When there is no font to render bold, italic or small-caps text the browser will "make up" or synthetize the styles with unpredictable results but, likely, not what you want.

The [font-synthesis](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis) descriptor allows authors to control whether supporting browsers will synthetize boldface, italics, small caps or a combination of one more of these when there are no fonts available to render the correct.

The possible values for the descriptor are:

`none`
: Neither bold, italic, nor small-caps typefaces may be synthesized.

`weight`
: A bold typeface may be synthesized.

`style`
: An italic typeface may be synthesized.

`small-caps`
: A small-caps font may be synthesized

A combination of 1 or more values from the above list
: The selected value(s) may be synthesized

The following table presents a list of the possible values for font-synthesis along with the equivalen values for the individual properties (discussed later).

| font-synthesis value | font-synthesis-weight value | font-synthesis-style value | font-synthesis-small-caps value |
| --- | --- | --- | --- |
| none | none | none | none |
| weight | auto | none | none |
| style | none | auto | none |
| small-caps | none | none | auto |
| weight style | auto | auto | none |
| weight small-caps | auto | none | auto |
| style small-caps | none | auto | auto |
| weight style small-caps | auto | auto | auto |

The default value for the descriptor is `style weight small-caps` meaning that all three options are enabled if needed.

you chose the value `non` then there will be no italics and boldface styles applied to the document. This may significantly change the looks and the semantics of the document so be careful when and how you use it.

You can also work on propertys for each individual `font-synthesis` property. The values are:

`font-synthesis-weight`
: Controls whether bold typefaces are synthesized. Equivalent to the `weight` value in `font-synthesis`

`font-synthesis-style`
: Controls whether bold typefaces are synthesized. Equivalent to the `style` value in `font-synthesis`

`font-synthesis-small-caps`
: Controls whether bold typefaces are synthesized. Equivalent to the `small-capts` value in `font-synthesis`

This falls into the category of "It's nice to have but be careful how you use it". In an ideal world, we would load all the faces of the fonts we need but we don't always have that luxury since, at the very least we need four different files to cover the basic variants of the font without synthesizing:

* Regular (weight 400)
* Italic (weight 400)
* Bold (weight 700)
* Bold Italic (weight 700)

Plust two additional files for each additional weight we might want to cover

* Regular (weight 200)
* Italic (weight 200)

or

* Extra Bold (weight 900)
* Extra Bold Italic (weight 900)

Variable fonts reduce the need for many files at the cost of larger font files.
