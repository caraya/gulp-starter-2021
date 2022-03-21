# Underlines in CSS

CSS provides ways to play with the underline of elements beyond removing the underline from links and only showing it on hover.

[CSS Text Decoration Module Level 4](https://drafts.csswg.org/css-text-decor-4/) provides four longhand properties one shorthand property for underlining text.

This post will cover the `text-decoration-*` properties and some adjacent properties:

* The `text-decoration-skip-*` properties
* `text-underline-position`
* `text-underline-offset`

We will also discuss [When to Avoid the text-decoration Shorthand Property](https://css-tricks.com/when-to-avoid-css-text-decoration-shorthand/). Using the shorthand property is nice as it saves typing but it's not always the best option. The post explains when and why it may be a good idea to use the longhand properties.

## text-decoration-*: managing underlines

The four properties we can use to manage underlines in the page are:

* `text-decoration-line` controls the type of line we underline with
* `text-decoration-style` controls the style of the underline
* `text-decortion-color` handles the color of the underline
* `text-decoration-thickness` controls the thickness of the underline

With these four properties we can do some really interesting things to the underlined text in the page.

Note that all these examples will use the longhand property names and the `:all-links` pseudo class selector to make sure we only target links with an `href` attribute.

Using `text-decoration-thickness` controls how thick the underline is.

```css
:any-link {
  text-decoration-thickness: 0.085rem;
}
```

The color of the link is controlled using `text-decoration-color`

```css
:any-link {
  text-decoration-color: hotpink;
}
```

The style of the underline is controlled using `text-decoration-style`.

```css
:any-link {
  text-decoration-style: wavy;
}
```

A different set of styles can be applied using the `text-decoration-line` property.

```css
:any-link {
  text-decoration-line: overline;
}
```

There is a shorthand property, `text-decoration`, that can be used to set all four properties at once.

```css
:any-link {
  color: blue;
  text-decoration: underline;
  text-decoration: navy dotted underline; /* Ignored in CSS1/CSS2 UAs */
}
```

If you skip a property the value will be inherited from the parent element.

### When not to use the text-decoration shorthand

As discussed in [When to Avoid the text-decoration Shorthand Property](https://css-tricks.com/when-to-avoid-css-text-decoration-shorthand/) you shouldn't use the shorthand `text-decoration` property if you've customized underlines with long hand properties.

In the following example, the `text-decoration-color will not be inherited from the parent element.

```css
:any-link {
  text-decoration-thickness: 0.08em;
}

header :any-link {
  text-decoration: none;
}

header :any-link:hover {
  text-decoration: underline;
}
```

`text-decoration` is a shorthand property and `text-decoration-thickness` its associated longhand property. Setting `text-decoration` to none or underline without setting the values for the other properties reinitializes the other three text decoration components (thickness, style, and color).

## Related properties

There are three related properties that can be used to control underlining

### `text-decoration-skip-*`

The `text-decoration-skip` property and its longhand properties (`text-decoration-skip-self`, `text-decoration-skip-box`, `text-decoration-skip-inset`, `text-decoration-skip-spaces`, `text-decoration-skip-ink`) control interruptions in line decorations for which the element or an ancestor is the decorating box. The none value sets all sub-properties to none, and the auto value sets all sub-properties to their initial values.

The one I use most often is `text-decoration-skip-ink` to cause the underline on links to skip descenders and, in my opinion, makes the text easier to read.

See the draft spec for [text-decoration-skip](https://drafts.csswg.org/css-text-decor-4/#text-decoration-skipping) for more details. **It is also important to note the section in the specification is a rough draft and has not yet been vetted by the CSSWG**.

### `text-underline-position`

This property, which is not a sub-property of the text-decoration shorthand (meaning you have to set it separately from  `text-decoration` ), sets the position of an underline with respect to the text, and defines its zero position for further adjustment by text-underline-offset.

This is most useful in non latin languages, particularly those that use vertical writing modes.

The possible values are:

`auto`
:The user agent may use any algorithm to determine the underline’s position; however it must be placed at or under the alphabetic baseline.
: Note: It is suggested that the default underline position be close to the alphabetic baseline, unless that would either cross subscripted (or otherwise lowered) text or draw over glyphs from Asian scripts such as Han or Tibetan for which an alphabetic underline is too high: in such cases, shifting the underline lower or aligning to the em box edge as described for `under` may be more appropriate.

`from-font`
: If the first available font has metrics indicating a preferred underline offset, use that offset, otherwise behaves as auto.

`under`
: The underline is positioned under the element’s text content. In this case the underline usually does not cross the descenders. (This is sometimes called **accounting** underline.) This value can be combined with left or right if a particular side is preferred in vertical typographic modes.
: Because `text-underline-position` inherits, and is not reset by the text-decoration shorthand, the following example switches the document to use under underlining, which can be more appropriate for writing systems with long, complicated descenders. It is also often useful for mathematical or chemical texts that use many subscripts.
: Note: The under value does not guarantee that the underline will not conflict with glyphs, as some fonts have descenders or diacritics that extend below the font’s descent metrics.

`left`
: In vertical typographic modes, the underline is aligned as for under, except it is always aligned to the left edge of the text. If this causes the underline to be drawn on the "over" side of the text, then an overline also switches sides and is drawn on the "under" side.

`right`
: In vertical typographic modes, the underline is aligned as for under, except it is always aligned to the right edge of the text. If this causes the underline to be drawn on the "over" side of the text, then an overline also switches sides and is drawn on the "under" side.
  
### `text-underline-offset`

This property, which is **not** a sub-property of the text-decoration shorthand, sets the offset of underlines from their zero position. Positive offsets represent distances outward from the text; negative offsets inward.

Values have the following meanings:

`auto`
: The UA chooses an appropriate offset for underlines.
: However, this offset must be zero if the computed value of text-underline-position is from-font and the UA was able to extract an appropriate metric to use from the font.

`<length>`
: Specifies the offset of underlines as a fixed length.
: **Note**: A length will inherit as a fixed value, and will not scale with the font.

`<percentage>`
: Specifies the offset of underlines as a percentage of 1em.
: **Note**: A percentage will inherit as a relative value, and will therefore scale with changes in the font as it inherits.

When the value of the `text-decoration-line` property is either `spelling-error` or `grammar-error`, the UA may ignore the value of `text-underline-position`.
