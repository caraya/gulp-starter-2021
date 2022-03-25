# The `:any-link` selector

The [:any-link](https://developer.mozilla.org/en-US/docs/Web/CSS/:any-link) styles all `a` elements with an `href` attribute.

This allows us to target all links in a document, regardless of location or parents.

This is particularly useful when playing with `text-decoration-*` attributes.

Safari uses the `-webkit-` prefix for these properties so we need to duplicate work to ensure that the links display the same across browsers.

```css
:any-link {
  border: 1px solid blue;
  color: orange;
}

/* WebKit browsers */
:-webkit-any-link {
  border: 1px solid blue;
  color: orange;
}
```

We can also add link pseudo elements like `:hover` and `:visited` to the `:any-link` selector.

```css
:any-link {
  border: 1px solid blue;
  color: orange;
}

/* WebKit browsers */
:-webkit-any-link {
  border: 1px solid blue;
  color: orange;
}
```

In this example, the default link removes the underline altogether. We then add `text-decoration` attributes with the `:hover` pseudo clases.

```css
:any-link,
:-webkit-any-link {
  text-decoration-line: none;
}

:any-link:hover,
:-webkit-any-link:hover {
  text-decoration-thickness: 2px;
  text-decoration-color: hotpink;
  text-decoration-style: wavy;
  text-decoration-line: underline;
}
```

What we can do with links hasn't changed. How we do it has.
