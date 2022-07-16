# New and Upcoming CSS: @custom-media

Of all the new features the one I've been researching is `@custom-media`.

Custom media queries allow you to create, in esence, create variables in CSS where we associate a name with a media query and can reuse it throughout the stylesheet.

This is useful as it gives authors a single place to make changes and prevents errors due to typos and not updating a media query exactly the same way everywhere it is used.

Naming things is also important. As Adam Argyle points out in [No media query variables](https://web.dev/state-of-css-2022/#no-media-query-variables):

> Naming things is very important: it can align purpose with the syntax, making things easier to share and easier to use in teams.

In the following example, we define a narrow window media query using the `@custom-media` at-rule and a syntax using two dashes `--` as the starting chracters in the name. In this example, we also use media query ranges in the definition.

When we call the custom media query we only need to reference it by name, not the full media query. We can do this as many times as it is necessary.

```css
@custom-media --narrow-window ( width <= 30em);

@media (--narrow-window) {
  /* narrow window styles */
}
```

In the same article, Adam provides examples of custom media queries from his [Open Props](https://open-props.style/) project.

```css
/* Viewport Variables */
@custom-media --portrait      (orientation: portrait);
@custom-media --landscape     (orientation: landscape);

@custom-media --md-only       (480px <= width <= 768px);
@custom-media --md-n-above    (width >= 768px);
@custom-media --md-n-below    (width <= 768px);
@custom-media --md-phone      (--md-only) and (--portrait);

@custom-media --xxl-only      (1440px <= width <= 1920px);
@custom-media --xxl-n-above   (width >= 1920px);
@custom-media --xxl-n-below   (width <= 1920px);

/* Capability Variables */
@custom-media --touch    (hover: none) and (pointer: coarse);
@custom-media --stylus   (hover: none) and (pointer: fine);
@custom-media --pointer  (hover) and (pointer: coarse);
@custom-media --mouse    (hover) and (pointer: fine);

@custom-media --HDcolor  (dynamic-range: high);

/* Preference Variables */
@custom-media --highContrast  (prefers-contrast: high);
@custom-media --lowContrast   (prefers-contrast: low);

@custom-media --opacityOK     (prefers-reduced-transparency: no-preference);
@custom-media --opacityNotOK  (prefers-reduced-transparency: reduce);

@custom-media --useDataOK     (prefers-reduced-data: no-preference);
@custom-media --useDataNotOK  (prefers-reduced-data: reduce);
```

## Links and Resources

* [Custom Media Queries specification](https://www.w3.org/TR/mediaqueries-5/#custom-mq)
* [Custom media queries PostCSS plugin](https://github.com/postcss/postcss-custom-media)
* [Chromium Issue](https://bugs.chromium.org/p/chromium/issues/detail?id=1234172) &mdash; star the issue to improve odds of development
