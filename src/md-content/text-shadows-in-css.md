# Text Shadows in CSS

I've always liked shadows as a way to give depth to content that would otherwise be flat and uninspiring.

My first approach at creating shadows in CSS was to use [box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow), primarily in title boxes where the entire container would have a shadow and not the individual laters.

[text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow) does the same thing for text that `box-shadow` does for boxes.

As presented in the example below, the four values for the `text-shadow` property are:

* offset-x
* offset-y
* blur-radius
* color

```css
h1 {
  color: rebeccapurple;
  font-size: 160px;
  text-shadow: 8px 4px 2px darkgrey;
}
```

Shadows are a nice way to provide depth to content that would normally be flat. `text-shadow` does this for text and it makes for more dynamic text.

## Links and Resources

* [text-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow) &mdash; MDN
* [CSS Text Decoration Module Level 3](https://drafts.csswg.org/css-text-decor-3/#text-shadow-property) `text-shadow` specification
