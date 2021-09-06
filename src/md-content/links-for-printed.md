# Links for printed pages

One of the most frustrating things that happen when I print a web page is that all links appear as underlined text without any reference to what the links point out to.

One way to solve the problem without Javascript is to use generated content to append the full URL to the link and use print specific stylesheets so that it'll only happen when we print the document.

Dudley Storey [provides another way to accomplish the same goal using Javascript](http://thenewcode.com/1186/Better-Links-for-Printed-Web-Pages-with-JavaScript). It doesn't require an additional stylesheet but, depending on the length of the document, may be hard to move back and forth between the link and the list of URLs at the bottom of the page.

## The Stylesheet

The additions for link descriptors for paged media is straightforward. The following rule will append the URL In parenthesis to all the links in the page.

It uses [attribute selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Attribute_selectors) that will match all `a` elements with an `href` attributes that begins with `http`.

It will then use the `:after` pseudo element to append the string `(`, the `href` attribute and the string `)` to the element. The spaces are significant.

```css
a[href^="http"]:after {
  content: " (" attr(href) ")";
```

If you're working in `https://example.com` and don't want to add the URL to local links you can modify the rule as follows:

```css
a[href^='http']:not([href*='example.com']):after {
  content: ' (' attr(href) ')';
}
```

The new rule adds `:not` to indicate that we don't want to apply the rule if the `href` attribute contains `example.com` anywhere.

And that's it we have

## Using the print styles

When it comes to using print media styles we have two options.

We can creeate a print-specific stylesheet and link it from the document. This adds an HTTP roundtrip but shouldn't block the rendering of the page since the media for it is not screen.

The only change we need to make to the regular way we link stylesheets is to add the `media="print"` attribute.

```html
<link rel="stylesheet" media="print" href="print.css">
```

If we're making just a few changes to the stylesheet then we can include them in an existing stylesheet by putting them inside a `@media print` block.

```css
@media print {
  a[href^="http"]:after {
    content: " (" attr(href) ")";
  }
```

If we add information to links in the page we may also want to add more print-related enhancements like those in [Creating Print CSS stylesheets](https://publishing-project.rivendellweb.net/creating-print-css-stylesheets/).

Sadly browser support for paged media and most of the generated content for paged media specs is severely lacking, even in browsers that support reading ebooks in the browser (Edge). So we have to work around these deficits by being creating in how we format our content to print from the web.

## Links and resources

* [Creating Print CSS stylesheets](https://publishing-project.rivendellweb.net/creating-print-css-stylesheets/)
* [A Guide To The State Of Print Stylesheets In 2018](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)
* [I totally forgot about print style sheets](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6)
* [Designing For Print With CSS](https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/)
