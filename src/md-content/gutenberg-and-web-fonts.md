# Gutenberg and web fonts

<div class="message warning">
  <h3>Note:</h3>
  <p>This is another example of expectation management when working with Gutenberg and the full site editor.</p>
  <p>As currently implemented in the Gutenberg plugin, the API will only work with the Full Site Editor... it will not allow you to use the fonts you defined in <code>theme.json</code> to change the fonts for content inside the templates.</p>
  <p>I am still researching if it's possible to change the font for inline elements inside blocks or specific blocks in a page.</p>
</div>

Gutenberg 12.8 introduced the web fonts API intro the Gutenberg plugin to give theme creators and customizers the ability to use web fonts in their themes.

It does so by introducing the `fontFace` property in the `typography` object. This is similar to how you define `@font-face` in CSS.

The `@font-face` attributes that I've seen used most often are:

`"fontFamily"`
: The stack we will use for the font, including any fallback options.

`"fontWeight"`
: One or two numbers indicating the numeric weight of the font.
: If one number is used then it represents the absolute value of the font weight (for example 700)
: If two numbers are used they represent the range of acceptable values of the font-weight attribute. This is commonly used in [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
: The values used in the two number value are font dependent. Not all fonts have the same ranges

`"fontStyle"`
: Either `italic` or `normal` to indicate if the font is italics or not.
: If the font makes available a `slnt` custom axis then you can use code like this: `oblique 14deg` and change the degree angle to what works with your font
: Some fonts may use custom axes for italics including `slnt`. Those are not covered in the `@font-face` CSS attribute or the `fontFace` attribute we're discussing here.

`"fontStretch"`
: The property uses single keyword value or a single percentage value
: Numerical values are limited to 50% to 200% (inclusive). **Negative values are not allowed**
: If you use a keyword value then the following values are allowed: `ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed` `normal`, `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`
: It also allows for the `normal` value for the property

`"src"`
: Gives the source to the file relative to the `theme.json` file and wrapped as a JSON object.
: You can use any font format supported by your target browsers but see performance notes below

```json
{
  "typography": {
  "fontFamilies": [
    {
      "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
      "slug": "system-fonts",
      "name": "System Fonts"
    },
    {
      "fontFamily": "Geneva, Tahoma, Verdana, sans-serif",
      "slug": "geneva-verdana"
    },
    {
      "fontFamily": "Cambria, Georgia, serif",
      "slug": "cambria-georgia"
    },
    {
      "fontFamily": "Recursive, sans-serif",
      "name": "Recursive",
      "slug": "recursive",
      "fontFace": [
        {
          "fontFamily": "Recursive",
          "fontWeight": "300 1000",
          "fontStyle": "normal",
          "fontStretch": "normal",
          "fontDisplay": "swap",
          "src": [
            "file:./assets/fonts/recursive-latin-subset.woff2"
          ]
        }
      ]
    }
  ],
}
```

## Performance Notes

These notes cover some basic aspects of web fonts, particularly format and size reduction.

### What formats to use?

The four most used formats for fonts are:

* [TTF](https://en.wikipedia.org/wiki/TrueType) (True Type Fonts)
* [OTF](https://en.wikipedia.org/wiki/OpenType) (Open Type Fonts)
* [WOFF](https://www.w3.org/TR/WOFF/) (Web Open Font Format 1.0)
* [WOFF2](https://www.w3.org/TR/WOFF2/) (Web Open Font Format 2.0)

The decision will depend on what browsers your users have on their devices. Most modern browsers support WOFF2, which is smaller than the other alternatives

### subset your fonts

You can further reduce the site by subsetting a WOFF2 font. While the gains may be marginal, it may still be a good idea to do so.

I've documented the font compression and subsetting process in [Font formats for the web and converting from one to another](https://publishing-project.rivendellweb.net/?p=803748)
