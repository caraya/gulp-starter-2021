# Inspecting a font with fontkit.js

Several times I've found myself working with fonts where I want to know what's available in the font without using tools like [Wakmaifondue](https://wakamaifondue.com/).

Recently, I discovered [fontkit.js](https://github.com/foliojs/fontkit/), a tool that will read and manipulate fonts so I decided to use it in a test script to see what a font has available to use.

This is a node script so it assumes one of two things:

* there is a `package.json` where you've installed fontkit
* You've installed fontkit globally

The script also imports the [argv](https://nodejs.org/docs/latest/api/process.html#processargv) from the built-in process module to capture the full path to the font we wat to process.

Next, we create two constants:

* One to capture the value of the first parameter, the path tot he font
* One to use Fontkit's `openSync` method to open the font. We will use this constant throughout the script to gather the data we want

```js
import { argv } from 'node:process';
import * as fontkit from 'fontkit';

const fontPath = argv[2];
const font = fontkit.openSync(fontPath);
```

The first block of data we output is metadata about the font:

* The full name of the font
* The family name of the font
* Version of the font
* Font Copyright

This is not essential but it's good information to have if you're working with a font for the first time.

Note that whitespace is signficant in string literals. We don't need to use `\n\n` inside literals, we can just press return.

```js
console.log(`Font metadata


Font name: ${font.fullName}
Font family name: ${font.familyName}
Version: ${font.version}
Copyright: ${font.copyright}`)
```

The next block tackles font metrics. These are particularly useful when you're trying to match your fallback font as they give you ascender, desncender and gap values to use.

It also lists the Unicode codpoints the font supports.

```js
console.log(`Font Metrics


Units Per Em: ${font.unitsPerEm}
Ascent: ${font.ascent}
Descender ${font.descent}
Line Gap: ${font.lineGap}
Underline Position: ${font.underlinePosition}
Underline Thickness: ${font.underlineThickness}
Italic Angle: ${font.italicAngle}
Cap Height: ${font.capHeight}
bbox: ${font.bbox.minX} x ${font.bbox.minY}
      ${font.bbox.maxX} x ${font.bbox.maxX}
Number of glyphs: ${font.numGlyphs}

Supported Unicode Codepoints:
${font.characterSet}


`)
```

Next, we look at the OpenType Features available on the font.

On their own, the four-letter codes for the available features won't do much good, but at least they tell us what's available.

```js
console.log('Available OpenType features')
console.table(font.availableFeatures);
```

Font variation axes are single aspects of a typeface's design that can be altered by the user.

If an axis is listed in lowercase the axis is a default axis defined in the OpenType specification. If the axis is listed in uppercase the axis is a custom axis to the font.

The listing also presents the minimal, default, and maximum values for each listed axis.

```js
console.log(`\n\n`)
console.log('Font variation axes supported')
console.table(font.variationAxes)
```

The final item listed is the set of named instances for the font. This is only applicable to variable fonts.

In addition to providing information about the available axes, variable fonts may present one or more named instances.

The named instances are a combination of available axes values that produce a predetermined effect.

```js
console.log(`\n\n`)
console.log('Font named instances')
console.table(font.namedVariations)
```

This gives us the information th at we want but it's not really usable unless you know what you're doing and how to create the CSS for it.

We could use the same data to generate a CSS stylesheet that we can either copy or download for our use.

It could also include one or more backup fonts that address content shift using ascenders or descenders.

There are other possibilities worth exploring, we're just scratching the surface.
