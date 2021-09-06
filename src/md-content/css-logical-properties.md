# CSS Logical Properties

Most of the time it's ok to work with left and right to define elements of our design; that's what we're used to: English and other western languages that read from left to right and top to bottom. However if your design uses right to left text or you plan to internationalize the text you may want to consider logical properties.

[Logical properties](https://drafts.csswg.org/css-logical/) provide styles that control the logical layout of a document as opposed to the phisical layout. In other words, logical layouts are independent of the physical look of the document.

According to the specification:

> This module introduces logical properties and values that provide the author with the ability to control layout through logical, rather than physical, direction and dimension mappings. The module defines logical properties and values for the features defined in [CSS21]. These properties are writing-mode relative equivalents of their corresponding physical properties.

To illustrate what I mean, let's take the following CSS fragment:

```css
.example {
  text-align: block-start;
}
```

In left to right text, this is equivalent to

```css
.example {
  text-align: left;
}
```

but in right to left languages it's equivalent to

```css
.example {
  text-align: right;
}
```

In order to understand logical properties we need to become familiar with the abstract terms `block` and `inline` used to describe the direction in which the content flows. The physical meaning of these terms depends on the writing mode.

<dl>
  <dt>Block dimension</dt>
  <dd>The dimension perpendicular to the flow of text within a line, i.e., the vertical dimension in horizontal writing modes, and the horizontal dimension in vertical writing modes. <em><strong>For standard English text, it is the vertical dimension</strong></em></dd>

  <dt>Inline dimension</dt>
  <dd>The dimension parallel to the flow of text within a line, i.e., the horizontal dimension in horizontal writing modes, and the vertical dimension in vertical writing modes. <em><strong>For standard English text, it is the horizontal dimension</strong></em></dd>
</dl>

So now that we have a basic understanding of what logical styles are and how they change based on the writing mode for the docuent let's look at some things you can do with them.

## Basic equivalencies

While this section lists equivalencies between logical and physical styles it is important to remember that writing modes also affect the meaning of the logical values and, because of it, may not produce the values you're expecting.

CSS Tricks article [CSS Logical Properties](https://css-tricks.com/css-logical-properties/) provides a list of logical properties and their equivalent for English and other LTR/TB languages.

## Examples

All these examples were initially designed for an English site. If you work with right to left or top to bottom languages the result will be different.

### Aligning text

This is equivalent to `text-align; left` in western languages and `text-align: right` in right to left languages.

```css
.align-start {
  text-align: block-start;
}
```

This is the opposite. In left to right languages this is the same as `text-align: right` and `text-align: left` for right to left languages.

```css
.align-end {
  text-align: block-end;
}
```

### Adding Borders To A Div

Using logical properties this is how we add borders to an element. We've chosen to use different values for the different dimensions.

```css
.box-with-borders {
  height: 300px;
  width: 300px;
  border-block-start: 10px dotted red;
  border-inline-start: 10px solid green;
  border-block-end: 10px dotted navy;
  border-inline-end: 10px dashed green;
}
```

For English, the following CSS block is equivalent to the logical properties example.

```css
.box-with-borders2 {
  height: 300px;
  width: 300px;
  border-top: 10px dotted red;
  border-left: 10px solid green;
  border-bottom: 10px dotted navy;
  border-right: 10px dashed green;
}
```

By changing the values of the `direction` and `writing-mode` we can change the placement of the logical borders without changing the CSS code.

## Browser support

The CSS Tricks article referenced earlier contains a full list of what logical properties are available and, in combination with the table below from [caniuse.com](https://caniuse.com/) to build the styles you want to use.


<a href="http://caniuse.com/#feat=css-logical-props">
<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/static/v1/css-logical-props-1575070897336.webp">
<img src="https://caniuse.bitsofco.de/static/v1/css-logical-props-1575070897336.png" alt="Data on support for the css-logical-props feature across the major browsers from caniuse.com">
</picture>
</a>

Test your code as thoroughly as you can in your target browsers. This may also be an opportunity to use feature queries to make sure things work the way you want them to.

## Links and Resources

* [CSS Logical Properties and Values Level 1](https://drafts.csswg.org/css-logical/)
* [CSS Writing Modes Level 3](https://drafts.csswg.org/css-writing-modes-3/)
* [CSS Writing Modes Level 4](https://drafts.csswg.org/css-writing-modes-4/)
* [CSS Logical Properties and Values in Chromium and WebKit](https://blogs.igalia.com/mrego/2018/08/08/css-logical-properties-and-values-in-chromium/)
* [Understanding Logical Properties And Values](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/)
* [CSS Logical Properties](https://css-tricks.com/css-logical-properties/)
