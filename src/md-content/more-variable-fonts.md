# More information about variable fonts

One of the things I've recently learned about variable fonts is that we're not always required to use `font-variation-settings` when using variable fonts. Using a declaration like this:

```css
@font-face {
  font-family: "Roboto VF";
  src:('../fonts/Roboto-vf.woff2')
      format('woff2-variations);
  font-weight: 100 900;
  font-stretch: 75% 100%;
  font-style: oblique 0deg 12deg;
}
```

Note that the attributes have two attributes representing the upper and lower boundaries of the corresponding variable axis.

Once we've defined the `@font-face` like this, we can use the standard attributes:

* `font-weight`
* `font-stretch`
* `font-style`

Furthermore, we're not limited to 100 unit increments. These are perfectly legal values:

```css
h1 {
  font-weight: 450;
  font-stretch: 85.5%;
}
```

We still have to use CSS variables and `font-variation-settings` to ensure that we have coverage for older browsers that don't support the syntax  but we should keep in mind that this will be the way moving forward.
