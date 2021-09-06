# Removing specificity from a CSS rule with `:where`

One of the benefits of the `:where` pseudo selector is that it removes the specificity of the selector inside it.

This becomes a powerful solution when we want to create base styles that we can override without having to worry about specificity.

```css
:where(ul[class]) {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.restaurant-list {
  list-style-type: disclosure-closed;
}
```

In this example, the first rule has no specificity (`0, 0, 0`) so the second rule will be applied regardless of its specificity.

So, when build base styles, we can use `:where` to remove the specificity of a selector and make it easier for authors to override. The downside is that it's an all or nothing proposition. Any style targeting the same element will override the base style and that might both be a good thing and a bad thing.

A few notes:

All browsers [support the `:where` pseudo selector](https://caniuse.com/mdn-css_selectors_where). However Safari, Opera Mobile and Samsung Internet [do not support forgiving selector lists](https://caniuse.com/mdn-css_selectors_where_forgiving_selector_list). In the later group of browsers, an error in the selector list will render the entire selector invalid and will render it useless.
