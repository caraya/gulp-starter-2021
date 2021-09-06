# Adding information based on the type of resource

For a long time I've seen icons attached to links to help users figure out what type of links they are.

This was particularly important in the days of plugins because users haad to have the right plugins to view different types of content.

Taking the following HTML fragment,

```html
<h2 id="stats">
  Stats <span aria-hidden="true"
    data-icon="&#x21dd;"></span>
</h2>
```

We can use the following css to add an icon after the string `Stats`:

```css
[data-icon]:after {
  font-family: icons;
  content: attr(data-icon);
  speak: none;
}
```

For modern browsers we can use atttribute selectors to change add the icon as a background image and then move it to where we need to. This works particularly well with SVG images

```css
a[href$=".pdf"] {
  background: url('icons/pdf.png')
    0 50% no-repeat;
  padding-left: 20px;
}
```

We can also use other [attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to tailor the way we display icons for links and what icon we want to display for each link.

We can use the `[attribute^=value]` selector to add a link to all external resources to differentiate them from internal links that jump to other parts of the same document or other documents on the same site.

Note that, in this case, we don't care if the link is `http` or `https`; They both start with http.

```css
a[href^=http] {
  background: url('icons/external.svg')
    0 50% no-repeat;
  padding-left: 20px;
}
```

We can also use the `[attribute*=value]` to match at least a single ocurrence of value. In the examples below we look for link attributes that match Twitter or Facebook and add the corresponding link.

```css
a[href*="twitter.com"] {
  background:url(icons/twitter-icon.svg)
    0 50% no-repeat;
  padding-left:19px;
}

a[href*="facebook.com"] {
  background:url(icons/11facebook-icon.svg)
    0 50% center;
  padding-left:19px;
}
```
