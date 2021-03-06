# CSS revert rule: a more lenient reset?

There are times when you want to reset the CSS of an element as if it hadn't happened.

I'm finding this problem when working with WordPress block themes: There are so many css custom properties that may affect a given element that it's hard to know which ones to override and whether using the Full Site Editor, or `theme.json` is the best way to do it.

I came across [Resetting Inherited CSS with “Revert”](https://cloudfour.com/thinks/resetting-inherited-css-with-revert/) and a particular way to reset styles without having a full reset stylesheet like [normalize.css](https://necolas.github.io/normalize.css/)

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/revert):

> The revert CSS keyword reverts the cascaded value of the property from its current value to the value the property would have had if no changes had been made by the current style origin to the current element.
>
> This keyword removes from the cascade all of the styles that have been overridden until the style being rolled back to is reached.
>
> from [revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) at [MDN](https://developer.mozilla.org/en-US/docs/)

So, if I'm understanding this correctly, using this rule:

```css
body {
  all: revert;
}
```

will revert all properties of the body element depending on where it was called.

* If used by a site's own styles (the author origin), revert rolls back the property's cascaded value to the user's custom style, if one exists; otherwise, it rolls the style back to the user agent's default style
* If used in a user's custom stylesheet, or if the style was applied by the user (the user origin), revert rolls back the cascaded value to the browser's default style.
* If used within the user agent's (browser's) default styles, this keyword is functionally equivalent to unset
