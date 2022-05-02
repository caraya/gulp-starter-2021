# CSS revert rule: a more lenient reset?

There are times when you want to reset the CSS of an element as if it hadn't happened.

I'm finding this problem when working with WordPress block themes: There are so many css custom properties that may affect a given element that it's hard to know which ones to override and whether using the Full Site Editor, or `theme.json` is the best way to do it.

I came across [](https://cloudfour.com/thinks/resetting-inherited-css-with-revert/)
)

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/revert):

> The revert CSS keyword reverts the cascaded value of the property from its current value to the value the property would have had if no changes had been made by the current style origin to the current element. Thus, it resets the property to its inherited value if it inherits from its parent or to the default value established by the user agent's stylesheet (or by user styles, if any exist). It can be applied to any CSS property, including the CSS shorthand property all.
>
> This keyword removes from the cascade all of the styles that have been overridden until the style being rolled back to is reached.

So, if I'm understanding this correctly, using this rule:

```css
body {
  all: revert;
}
```

will revert all properties of the body element (the root element) to the values defined in the browser's stylesheet or any user styles defined elsewhere.
