# prefers-color-scheme in CSS and Javascript

`prefers-color-scheme` is geared towards acommodating user preferences.

With `prefers-color-scheme` we can control the color scheme we use based on the operating system preferences for the user. It supports three values:

* `no-preference`: The user has not specified a preference. This keyword value evaluates as false
* `light`: The user has indicated that uses a light theme (dark text on light background)
* `dark`: The user has notified the system that they prefer a page that has a dark theme (light text on dark background).

The example below taken from [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/) shows one way to use `prefers-color-scheme` to prirotize download and use of a given color scheme stylesheet.  We're guaranteed to have a light scheme if the media query is not supported.

The browser will load the light or dark stylesheet based on what media query matches. They are mutually exclusive so only one will be active at a time.

```html
<script>
  if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="/light.css" onload="document.documentElement.style.display = \'\'">'
    );
  }
</script>

<link rel="stylesheet" href="/css/dark.css" media="(prefers-color-scheme: dark)">
<link rel="stylesheet" href="/css/light.css" media="(prefers-color-scheme: no-preference), (prefers-color-scheme: light)">
<!-- The main stylesheet will always load -->
<link rel="stylesheet" href="/css/style.css">
```

Then we have our traditional CSS way of styling using media queries. In this example the light color scheme is the default and we don't need to change it manually, whenever the browser detects that the operating system changed to dark mode it will automatically change the color scheme to match.

```css
.circle {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: yellow;
  border: 3px solid black;
}

@media (prefers-color-scheme: dark) {
  .circle {
    background-color: black;
    border: 5px solid red;
  }
}
```

For more information see [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/)

