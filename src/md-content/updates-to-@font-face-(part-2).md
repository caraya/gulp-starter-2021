# Updates to @font-face (part 2)

After looking at `format()` and `tech()` (discussed in the [Updates to @font-face](https://publishing-project.rivendellweb.net/updates-to-font-face/)) I thought it would be good to look at other aspects of the `@font-face` at-rule that changed or are new since the last time I looked at.

## font-weight, font-style and font-stretch

These descriptors will still work with a single value.

[font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight) and [font-stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-stretch) can take two values to represent the lower and upper boundaries of the variable font range for the descriptor.

[font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style) can also use ranges but it's a little more complex than `font-weight` and `font-stretch`. The possible valyes for the descriptor are:

normal
: Selects the normal version of the font-family
: If you use this value then it must be the only value for `font-style`

italic
: Specifies that font-face is an italicized version of the normal font
: If you use this value then it must be the only value for `font-style`

oblique
: Specifies that the font-face is an artificially sloped version of the normal font

oblique with angle
: Selects a font classified as oblique, and additionally specifies an angle for the slant of the text

oblique with angle range
: Selects a font classified as oblique, and additionally specifies a range of allowable angle for the slant of the text
: This will only work with variable fonts that make a range available
: Note that a range is only supported when the font-style is oblique

```css
@font-face {
  font-family: "myFont";
  src: local("myFont"), local("myfont"), url("myFont.ttf");
  font-stretch: 50% 200%;
  font-style: oblique 20deg 50deg;
  font-weight: 100 400;
}
```

## line-gap-override

Defines the line gap metric for the font.

## ascent-override and descent-override

[ascent metric](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override) controls the ascent metric for the font.

The ascent metric is the height above the baseline that CSS uses to lay out line boxes in an inline formatting context.

[descent override](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/descent-override) Defines the descent metric for the font.

The descent metric is the height below the baseline that CSS uses to lay out line boxes in an inline formatting context.

## font-display

[font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) etermines how a font face is displayed based on whether and when it is downloaded and ready to use.

the `font-display` behavior is closely related to the font display timeline. The timeline is divided into the three periods which dictate the rendering behavior of any elements using the font face.

The three periods are:

**Font block**
: If the font face is not loaded, any element attempting to use it must render an invisible fallback font face
: If the font face successfully loads during this period, it is used normally which may lead to font swapping of active elements in the viewport

**Font swap**
: If the font face is not loaded, any element attempting to use it must render a fallback font face
: If the font face successfully loads during this period, it is used normally  which may lead to font swapping of active elements in the viewport

**Font failure**
: If the font face is not loaded, the user agent treats it as a failed load causing normal font fallback.

Given the three timelines above, valid values for font display and how they are impacted by the font display timeline:

auto
: The font display strategy is defined by the user agent.
: This is the default

block
: Gives the font face a short block period and an infinite swap period.

swap
: Gives the font face an extremely small block period and an infinite swap period.

fallback
: Gives the font face an extremely small block period and a short swap period.

optional
: Gives the font face an extremely small block period and no swap period.

## font-feature-settings

Controls advanced typographic features in OpenType fonts.

Whenever possible, authors should use the [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) shorthand property or an associated longhand property such as:

* [font-variant-ligatures](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures)
* [font-variant-caps](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps)
* [font-variant-east-asian](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian)
* [font-variant-alternates](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates)
* [font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
* [font-variant-position](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position)

<div class="message warning">
<p><strong>Warning:</strong></p>

<p>Using <code>font-feature-settings</code> inside a <code>@font-face</code> at-rule is only supported in Firefox.</p>
<p></p>
<p>The longhand <code>font-variant-*</code> descriptors have varying level of browser support, according to <a href="https://caniuse.com/?search=font-variant">caniuse</a></p>
</div>

## font-variation-settings

Allows low-level control over OpenType or TrueType font variations, by specifying the four letter axis names of the features to vary, along with their variation values. This allows developers to control variable fonts

You must set all the features of the font that you want to use. Otherwise they will be reset to their initial values. See [Boiling eggs and fixing the variable font inheritance problem](https://pixelambacht.nl/2019/fixing-variable-font-inheritance/) for a solution to the problem.

Getting these features is not intuitive. I recommend using tools like [Wakamaifondue](https://wakamaifondue.com/beta/) to get information about `font-feature-settings` and `font-variation-settings` along with a CSS stylesheet implementing a [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) solution to the inheritance problem.

## size-adjust

Defines a multiplier for glyph outlines and metrics associated with this font. This particularly useful when working with fallback fonts.

All metrics associated with the font are scaled by the given percentage. This includes glyph advances, baseline tables, and overrides provided by `@font-face` descriptors.

## src

Specifies font resources to load. A comma-separated list representing the resource fallback order, each resource specified by [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) or local() functions. If the previous resource is loaded successfully, the latter resources will not be used. The `url()` can be followed by `format()` and `tech()`.
Specifies font resources to load. A comma-separated list representing the resource fallback order, each resource specified by [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) or `local()` functions. Browsers will use the first font they support, whether it's loaded locally or remotely.

<div class="message warning">

<p><strong>Warning</strong></p>

<p>Local fonts can be used as a vector for fingerprinting, particularly if you have company-specific fonts installed on your computer. For example, if you have Google Sans installed on your system, it is likely that you work for Google since the font has not been released for public use.</p>
</div>

The `url()` function can be followed by `format()` and `tech()`.


