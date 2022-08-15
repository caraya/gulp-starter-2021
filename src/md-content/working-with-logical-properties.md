# Working with logical properties and writing modes

When the web first about, it was primarily in English and we didn't have to worry about laying out content for other languages.

But now the web has become universal. Unicode covers most, if not all, languages and we can have content written in many languages other than English.

Some of these languages are written from right to left, some are written top to bottom and some are written both top to bottom and left to right.

This post will look at [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) as a way to make styles less dependent on the actual direction of the contnent without having to write much more additional code.

## Block vs. inline

To understand how Logical Properties work, we need to understand the concepts of `Block` and `Inline` as they relate to logical properties and their relationship with writing modes.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1660078570/publishing-project.rivendellweb.net/logical-intro-2/logical-intro-2.jpg?_i=AA' alt='alt text' width=1400>
  <figcaption>Description of logical properties in horizontal and vertical languages<br><br>Credit: <a target="_blank" href="https://ishadeed.com/article/css-logical-properties/" rel="noreferrer noopener">Ahmad Shadeed</a></figcaption>
</figure>

Block dimension
: The dimension perpendicular to the flow of text within a line
<!-- : In horizontal languages the block dimension is presented as top and bottom
: In vertical languages the block dimension is equivalent to right and left -->

Inline dimension
: The dimension parallel to the flow of text within a line
<!-- : In horizontal languages the inline dimension is presented as left and right
: In vertical languages the inline dimension is equivalent to top and bottom -->

With these two properties we can write CSS code that is generic. It will change based on the writing mode to acommodate the writing mode for the text we're working with

In top to bottom, horizontal languages, logical properties are equivalent to what we are used to.

<iframe height="471.49951171875" style="width: 100%;" scrolling="no" title="Logical styles in top-to-bottom language" src="https://codepen.io/caraya/embed/qBoyGxZ?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/qBoyGxZ">
  Logical styles in top-to-bottom language</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

For vertical languages we make only one change. We add the `writing-mode: vertical-{direction};` rule to the `.container` to indicate the vertical and horizontal directions.

The possible values for direction is:

* `ltr` for left to right text
* `rtl` for right to left text

<iframe height="540.510" style="width: 100%;" scrolling="no" title="Logical styles in top-to-bottom and left-to-right language" src="https://codepen.io/caraya/embed/LYdBoQZ?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/LYdBoQZ">
  Logical styles in top-to-bottom and left-to-right language</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## So what can we do with logical properties

So what can we use logical properties for?

We've seen them used for margins and paddings but there is a long list of logical properties we'll concentrate on a few of them:

<div class="message info">
<p><strong>Note:</strong></p>
<p></p>
<p>All these equivalencies are for top to bottom and left to right languages.</p>
</div>

### dimensions

These control height and width-related attributes.

| Logical Property | Physical Property
| --- | --- |
| [inline-size](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/inline-size) | [width](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/width) |
| [block-size](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/block-size) | [height](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/height) |
| [min-block](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/min-block-size) | [min-height](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/min-height) |
| [max-block](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/max-block-size) | [max-height](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/max-height) |
| [min-inline](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/min-inline-size) | [min-width](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/min-width) |
| [max-inline](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/max-inline-size) | [max-width](https://developer.mozilla.org/en-US/en-US/docs/Web/CSS/max-width) |

### Resize

You can use `inline` and `block` as the values for the resize attribute.

* `resize: inline` is equivalent to `resize: horizontal`
* `resize: block` is equivalent to `resize: vertical`

```css
.logical1 {
  inline-size: 200px;
  block-size: 100px;
  resize: inline;
}

.logical2 {
    inline-size: 200px;
    block-size: 100px;
    resize: block;
}

.logical3 {
    inline-size: 200px;
    block-size: 100px;
    resize: both;
}
```

### Floating and positioning

| Logical Property | Physical Property
| --- | --- |
| [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float): inline-start | [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float): left |
| [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float): inline-end | [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float): right |
| [inset-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start) | [left](https://developer.mozilla.org/en-US/docs/Web/CSS/left) |
| [inset-inline-end](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-end) | [right](https://developer.mozilla.org/en-US/docs/Web/CSS/right) |
| [inset-block-start](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-start) | [top](https://developer.mozilla.org/en-US/docs/Web/CSS/top) |
| [inset-block-end](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-end) | [bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom) | [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align): start | [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align): left |
| [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align): end | [text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align): right |

### Margins

These are the logical properties that I use the most often. Yes, they are more verbose but they are also more flexible regarding writing modes and once you've worked through block and inline directions they are more descriptive of what they do.

| Logical Property | Physical Property
| --- | --- |
| [border-block-end](https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end) | [border-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom) |
| [border-block-start](https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start) |  [border-top](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top) |
| [border-inline-end](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end) | [border-right](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right) |
| [border-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start) |  [border-left](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left) |
| [margin-block-end](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-end) | [margin-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom) |
| [margin-block-start](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-start) | [margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top) |
| [margin-inline-end](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end) | [margin-right](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right) |
| [margin-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start) | [margin-left](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left) |
| [padding-block-end](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-end) | [padding-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom) |
| [padding-block-start](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-start) | [padding-top](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top) |
| [padding-inline-end](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end) | [padding-right](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right) |
| [padding-inline-start](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start) | [padding-left](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left) |

### Shorthand properties

One other tihng logical properties do is provide a set of shortcuts that may or may not have equivalents with physical properties.

| Logical Property | Physical Property
| --- | --- |
| [border-block](https://developer.mozilla.org/en-US/docs/Web/CSS/border-block) | Sets [border-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color), [border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style), and [border-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width) for both block borders |
| [border-block-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-color) | Sets `border-color` for both block borders |
| [border-block-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-style) | Sets `border-style` for both block borders |
| [border-block-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-width) | Sets `border-width` for both block borders |
| [border-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline) | Sets `border-color`, `border-style`, and `border-width` for both inline borders |
| [border-inline-color](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-color) |  Sets `border-color` for both inline borders |
| [border-inline-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-style) | Sets `border-style` for both inline borders |
| [border-inline-width](https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-width) | Sets `border-width` for both inline borders |
| [margin-block](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block) | Sets all the block margins |
| [margin-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline) | Sets all the inline margins |
| [padding-block](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block) | Sets the block  padding |
| [padding-inline](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline) | Sets the inline padding |

These properties reduce the number of properties you have to write for every selector. Rather than writing:

```css
.example {
  margin-inline-start: 2em;
  margin-inline-end: 2em;
}
```

You can write this instead:

```css
.example {
  margin-inline: 2em;
}
```

For a full list of logical properties, check the following guides at MDN:

* [Basic concepts of logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts)
* [Logical Properties for sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Sizing)
* [Logical Properties for margins, borders and padding](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Margins_borders_padding)
* [Logical Properties for floating and positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Floating_and_positioning)

## Links and resources

* [Basic concepts of logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Basic_concepts)
  * [Logical Properties for sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Sizing)
  * [Logical Properties for margins, borders and padding](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Margins_borders_padding)
  * [Logical Properties for floating and positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Floating_and_positioning)
* Writing modes
  * [CSS writing modes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes)
  * [Styling vertical Chinese, Japanese, Korean and Mongolian text](https://www.w3.org/International/articles/vertical-text/)
  * [Japanese Writing, A Beautifully Complex System](https://www.smashingmagazine.com/2012/03/japanese-a-beautifully-complex-writing-system/)
