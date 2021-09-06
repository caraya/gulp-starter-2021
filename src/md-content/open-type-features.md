# Open Type Features in CSS

I've been playing a little with Open Type font variations (and their CSS equivalents) for a few weeks now and I've revisited a few areas I had played with before and left because, at the time, I didn't see the need or usefulness.

That said, there are projects where good typography is just as important than size, line height, and other basic elements. In this essay we'll look aat some less common features of OpenType fonts and how to use them in CSS, both the original specification using `font-feature-settings` and the newer version using `font-variants-*`. We'll also look at ways to DRY our code and keep ourelves from repeating code.

CSS [Fonts Module Level 3](https://www.w3.org/TR/css-fonts-3/#font-rend-props) defines the set of OpenType features supported by spec-compliant browsers

Older browsers may support a [font-feature-settings](https://css-tricks.com/almanac/properties/f/font-feature-settings/), a lower level syntax to control access to the OpenType features.

To cover all our bases we'd have to do something like this:

```css
.liga {
  @supports not (font-variant-ligatures: common-ligatures) {
    font-feature-settings: "liga";
  }

  /* IE doesn’t support @supports; explicitly use the prefixed version. */
  -ms-font-feature-settings: "liga";

  /* Best case scenario, just use `font-variant-*`. */
  font-variant-ligatures: common-ligatures;
}
```

We test if the browser does `not` support font feature settings. If it doesn't we fall back to font feature settings for ligatures.

Because neither Edge nor IE support the `@supports` command. Because of this we need to add the Microsoft specific

The final case uses `font-variant-ligatures`.

A more elegant, and efortless, solution is to use the Utility OpenType library from Kenneth Normandy that takes a slightly different approach to using the different supported way of doing things.

It sets up the default values and then tests if either the `webkit-` or the regular value for `font-variant-ligatures` are not supported and if the tests fails (meaning they `are` supported) it changes the support to use `font-feature-settings` and the webkit prefixed version.

```css
.liga {
  -ms-font-feature-settings: "liga";
  -webkit-font-variant-ligatures: common-ligatures;
          font-variant-ligatures: common-ligatures;
}

@supports not ((-webkit-font-variant-ligatures: common-ligatures) or
              (font-variant-ligatures: common-ligatures)) {
  .liga {
    -webkit-font-feature-settings: "liga", "liga", "clig";
    font-feature-settings: "liga", "liga", "clig";
  }
}
```

[Wakamaifondue](https://wakamaifondue.com/) provides both a visual demonstration of all the features a font support, whether they are Variable Font Axes or Open Type features and a CSS stylesheet that you can incorporate into your own projects to ake advantage of these features.

[Utility OpenType](https://github.com/kennethormandy/utility-opentype) provides classes for OpenType features reducing the conginitive load of having to know how to use each feature. You're still required to know if the font support the features you want to use.

Using these features in combination with [variable fonts](https://caraya.github.io/vfonts-demo/) that support the OpenType features we need gives us a lot of flexibility when it comes to typography.

## Links and Resources

- Specifications
  - [CSS Fonts Module Level 3](https://www.w3.org/TR/css-fonts-3/) - Candidate Recommendation
  - [CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/) - First Public Working Draft
- Tools
  - [Wakamaifondue](https://wakamaifondue.com)
  - [Utility OpenType](http://utility-opentype.kennethormandy.com/) library by Kenneth Normandy
- Books
  - [Elements of typographic style](https://www.wikiwand.com/en/The_Elements_of_Typographic_Style) - Robert Binghurst
  - [The Elements of Typographic Style Applied to the Web](http://webtypography.net/intro/) - Richard Rutter
  - [On Web Typography](https://abookapart.com/products/on-web-typography) - Jason Santa María
  - [Webfont Handbook](https://abookapart.com/products/webfont-handbook)
  - [Responsive Web Typography](http://shop.oreilly.com/product/0636920034063.do) - Jason Pamental
  - [Web Typography](http://book.webtypography.net/) - Richard Rutter

