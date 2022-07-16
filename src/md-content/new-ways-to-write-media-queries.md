# New ways to write media queries

In the past we've had to write media queries that check for screen/device width as something like this.

This query checks if the screen has a minimum width of 768px

```css
@media (min-width: 768px) {
  &hellip;
}
```

and this query checks is the screen is smaller than 768px

```css
@media (max-width: 768px) {
  &hellip;
}
```

You can also combine tests to determine if the value you're testing is within two values.

```css
@media 
  (min-width: 800px)
  and
  (max-width: 1024px) {
  &hellip;
}
```

The new [Media Queries spec](https://www.w3.org/TR/mediaqueries-4/#mq-range-context) explains new syntax for media queries using ranges.

We can write the media queries using smaller or equal than. The new syntax for the query looks like this:

```css
@media (width <= 768px) {
  &hellip;
}
```

The larger than query can use the larger or equal than:

```css
@media (width >= 768px) {
  &hellip;
}
```

And the combined query can be rewriten like this. Width can be larger or equal to 800px and equal or smaller than 1024px.

```css
@media (800px <=width <= 1024px) {
  &hellip;
}
```

The new syntax makes it cleaner and, to me, makes the meaning of the query clearer than it would be in the old syntax.

## Notes and links

* [Media query ranges specification](https://www.w3.org/TR/mediaqueries-5/#mq-range-context)
* [Media query range syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax_improvements_in_level_4) &mdash; MDN
* [New syntax for range media queries in Chrome 104](https://developer.chrome.com/blog/media-query-range-syntax/) &mdash; Chrome Developer blog
* [Media queries range syntax](https://github.com/postcss/postcss-media-minmax) PostCSS plugin
