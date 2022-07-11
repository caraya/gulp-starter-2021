# Testing color contrast in CSS: the color-contrast() function

The `color-contrast()` CSS function checks the contrast between two colors, usually a background color and black or white text.

At its simplest, `color-contrast()` works like this:

We first set up a background color with a variable specified in the `:root` element.

We then set the color to be the one that provides the highest constrast with the background color among out choices the color we want to test against and our color choices are separaated by the string `vs`.

```css
.item1 {
  background-color: var(--color1);
  color: color-contrast(var(--color1) vs black, white);
}
```

But the colors to use for the text color are not limited to black and white. They can also be your brand text colors or any color that you want to use.

```css
.item {
  background-color: #111111;
  color: color-contrast(#111111 vs indigo, rebeccapurple, hotpink);
}
```

There may be times when we want to match the contrast to WCAG AA or AAA conformance levels. `color-constrast()` provides you with a way to do that by adding a third argument to the function that is the string `to` and one of the following:

* The keyword `aa` (equivalent to 4.5)
* The keyword `aa-large` (equivalent to 3 for large text)
* The keyword `aaa` (equivalent to 7)
* The keyword `aaa-large` (equivalent to 4.5 for large text)
* A number represeting the desired contrast level.

```css
.item {
  --bg-color: rebeccapurple;
  --my-accent: hotpink;

  background-color: var(--bg-color);

  color: color-contrast(
    var(--bg-color)
    vs 
      wheat,
      tan,
      sienna,
      var(--my-accent),
      #d2691e
    to AA
  );

}
```

The colors in the list (after the keyword `vs`) are tested sequentially, from left to right; a color is the temporary winner if it has the highest contrast of all those tested so far.

The browser will stop checking the colors on the list once a color meets or exceeds the target constrat value.

If there is no target contrast that matches or exceeds the target value once the browser reaches end of the list, the current temporary winner is the overall winner. If two colors in the list have the same contrast, the first value in the list wins because the later one has the same contrast, not higher.

If none of the colors match the target contrast (the value after the `to` keyword) then white or black is returned as the winner, whichever has the higher contrast.

## Notes

The `color-contrast()` function has been moved to level 6 of the color specification, meaning that it's unlikely to be fully implemented soon.

The feature is only available in Safari Technical Preview under a flag as of the time of this writing (mid July 2022).
