# CSS revert rule: a more lenient reset?

There are times when you want to reset the CSS of an element as if it hadn't happened.

I'm finding this problem when working with WordPress block themes: There are so many css custom properties that may affect a given element that it's hard to know which ones to override and whether using the Full Site Editor, or `theme.json` is the best way to do it.

I came across [Resetting Inherited CSS with “Revert”](https://cloudfour.com/thinks/resetting-inherited-css-with-revert/) and a particular way to reset styles without having a full reset stylesheet like [normalize.css](https://necolas.github.io/normalize.css/) or Eric Meye's [Reset CSS](https://meyerweb.com/eric/tools/css/reset/)

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/revert):

> The revert CSS keyword reverts the cascaded value of the property from its current value to the value the property would have had if no changes had been made by the current style origin to the current element.
>
> This keyword removes from the cascade all of the styles that have been overridden until the style being rolled back to is reached.
>
> from [revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) at [MDN](https://developer.mozilla.org/en-US/docs/)

1. If used in a site's stylesheet (the author origin), revert rolls back the property parent's value, if one exists; otherwise, it rolls the style back to the user agent's default style
2. If used in a user's custom stylesheet, or if the style was applied by the user (the user origin), revert rolls back the cascaded value to the browser's default style
3. If used within the user user agent or browser's default styles, this keyword is functionally equivalent to unset

However, in most cases this will not address differences in browsers' default stylesheets. In supporting browsers, it will just reset to the individual browser's default, not to a sane default. So you may still need to code accordingly.

## Example 1

The first example shows the effect of revert when there's no parent style to use.

With the following Codepen:

<iframe height="300" style="width: 100%;" scrolling="no" title="Revert Example #1" src="https://codepen.io/caraya/embed/eYMQVPP?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/eYMQVPP">
  Revert Example #1</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Both paragraphs are selected by the `p` selector, making them red, but the class selector on the second paragraph has higher specificity, so the `color: revert;` is applied, changing the text back to black (the browser's default).

## Example 2

The second example uses a parent's style when the child uses `revert`.

The parent uses red as the color.

The first child `p` element changes the color to red.

The second `p` element uses revert so, rather than red, it will use the parent's color and become blue.

<iframe height="300" style="width: 100%;" scrolling="no" title="Revert Example #2" src="https://codepen.io/caraya/embed/WNzYMWd?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/WNzYMWd">
  Revert Example #2</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Browser support

The revert value is fairly well supported, according to [caniuse.com](https://caniuse.com/css-revert-value). The only desktop browser that doesn't support `revert` is IE.

In mobile support is a little more confusing. The following mobile browsers **do not** support the feature:

* Opera Mini
* UC Browser for Android
* QQ Browser
* Baidu Browser
* KaiOS Browser

Check if any of these browsers are a meaningful part of the traffic to your site before making changes to acommodate them. This may be a good use of [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Conditional_Rules/Using_Feature_Queries) (the `@support` at rule)
