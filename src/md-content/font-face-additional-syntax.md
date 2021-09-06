# Additional Syntax for @font-face

During Chrome Dev Summit I learned an interesting trick when working with variable fonts. Rather than use the default values for the font properies you need to specify the boundaries (upper and lower) for each font property: weight, width and style.

Using Roboto and its values as an example, the `@font-face` declaration looks like this
```css
@font-face: Roboto;
src:  url('../../fonts/Roboto-min-VF.woff') format('woff')
      url('../../fonts/Roboto-min-VF.woff2') format('woff2');
font-weight:  250 900;
font-width: 75 100;
font-style: -12 0;
```

We can then use the attributes as we would normally do but using the values in the range we defined in the decllration:

```css
.semibold {
  font-weight: 575.25;
}
```

Make sure that you test the `font-style` declarations as there is a mismatch between the Open Type and CSS specs regarding the direction of negative numbers.

Future versions of browsers will change the behavior by respecting default values but even in this case is better to explicitly set the values when creating the `@font-face` declaration... just to be on the safe side.
