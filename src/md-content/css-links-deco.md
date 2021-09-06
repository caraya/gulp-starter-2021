# Playing with link styles

First we had links that were underlined, next we had links and the capability to underline text with the [u](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u) element.

Then we wanted more control of what we could do with underlines so we moved to using `border-bottom` for our underlining playground because it gave us more flexibility than what the native underlinining tools gave us at the time.

But now Firefox has introduced new text-decoration and text-underline rules that make it easier to customize our underlines to do what we want to do.

**As far as I know and tested, `text-decoration-thickness` and `text-underline-offset` are Firefox only for now.**

```scss
a {
  text-decoration-thickness: 3px; // 1
  text-underline-offset: 6px; // 2
  color: #ff2908; // 3
  text-decoration-color: rebeccapurple; // 4
  text-decoration-skip-ink: auto; // 5
  text-decoration-style: solid; // 6
}
```

The idea is that we can declare rules to better control underlines and it's characteristics. The rules do the following:

1. [text-decoration-thickness](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness) sets the thickness of the underline
2. [text-underline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset) sets the offset distance of an underline line from its original position
3. `color` determines the color of the link
4. [text-decoration-color](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color) sets the color of decorations
5. [text-decoration-skip-ink](https://css-tricks.com/almanac/properties/t/text-decoration-skip-ink/) controls the behavior of underline and overline (but not line-through) when the line passes above the top or hang below the bottom of a line.
6. [text-decoration-style](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style) indicates what type of line to use in the underline

I don't think we need to wrap this in a feature query since the browsers that don't understand thickness and offset will ignore them but keep the ones it understands. So now we have a way to progressively enhance the way our underlined elements look without resorting to hacks.
