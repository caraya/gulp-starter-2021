# Better Links for Print

When we print web pages we see links as underlined text either black or, if we printed in a color printer, blue or whatever color we made our links. That doesn't help us know what the actual links is.

A possible solution is to use generated content for paged media and the `:after` selector to insert the text of the URL after the link.

## The code

We're saving all the code in this section in a `print.css` file. Why we're doing this will become clear when we actually use the styles.

The easiest way to start is to tell the browser to add the content of the `href` attribute after all anchor elements (`a`).

```css
a::after,
a:visited::after {
  content: " (" attr(href) ") ";
  font-size: 90%;
}
```

There is a problem, this won't work with relative links, those pointing to pages within the same site that don't use a full URL or to anchors within the same document. We can use the `^=` attribute selector to only target those links that start with `http` and this will only target external links, whether they are `http` or `https`; they both start with http :)

So now our code looks like this:

```css
a[href^=http]::after,
a[href^=http]:visited::after {
  content: " (" attr(href) ") ";
  font-size: 90%;
}
```

The final problem to deal with is overcrowding. If a paragraph has many links, the text of the links will make the paragraph hard to read, particularly if you have many long links. This will require case-by-case testing and decisions, but I've created a special case to remove the link.

If you add the no-print class to a link it will not print the URL.

That code looks like this:

```css
a.no-print::after,
a.no-print:visited::after {
  content: "";
}
```

So now we have both a way to print the URL of a link in parenthesis after the link and a special case to avoid printing the links when it makes sense.

## Using it

Using the styles we creaated is easy to link it using a `link` element in the head of the page and the `media="print"` attribute to make sure it will only get triggered when we print the page.

```html
<link rel="stylesheet" href="main.css">
<link rel="stylesheet" media="print" href="print.css" />
```
