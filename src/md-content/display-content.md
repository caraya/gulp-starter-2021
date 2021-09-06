# display: content

The best explanation I've seen for why we would want to use [display: content](https://www.w3.org/TR/css-display-3/#valdef-display-contents) is as an imperfect alternative to subgrid.

If I understood it correctly, `display: content` becomes useful when we want to replace an element with its children for layout purposes.

The example, taken from a Codepen from Rachel Andrew, is straightforward. In the [Codepen](https://codepen.io/caraya/pen/KKKBaGR?editors=1100) there are two nested elements



## Browser support

<a href="http://caniuse.com/#feat=css-display-contents">
<picture>
<source type="image/webp" srcset="https://res.cloudinary.com/ireaderinokun/image/upload/v1573090267/caniuse-embed/static/css-display-contents-2019-11-7.webp">
<img src="https://res.cloudinary.com/ireaderinokun/image/upload/v1573090267/caniuse-embed/static/css-display-contents-2019-11-7.png" alt="Data on support for the css-display-contents feature across the major browsers from caniuse.com">
</picture>
</a>

Some issues to be aware of when using the property taken from caniuse.com:

1. It is enabled in Chrome and Chromium-based broowsers through the "experimental Web Platform features" flag
2. Chrome has a [severe implementation bug](https://hiddedevries.nl/en/blog/2018-04-21-more-accessible-markup-with-display-contents) that renders the content inaccessible.
3. Safari support is buggy, see WebKit [bug 188259](https://bugs.webkit.org/show_bug.cgi?id=188259) & WebKit [bug 193567](https://bugs.webkit.org/show_bug.cgi?id=193567)
