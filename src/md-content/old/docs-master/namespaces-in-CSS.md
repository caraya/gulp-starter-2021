#namespaces in CSS

## What are you talking about?

```css
@namespace url(http://www.w3.org/1999/xhtml);
@namespace svg url(http://www.w3.org/2000/svg);

/* This matches all XHTML <a> elements, as XHTML is the default namespace */
a {}

/* This matches all SVG <a> elements */
svg | a {}

/* This matches both XHTML and SVG <a> elements */
*|a {}
```