# CSS aspect ratio

In [replaced elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element), [aspect ratio](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) is the ratio of the width to the height of an image.

Until recently we had to rely on browser's calculations of "implicit" aspect ratios.

Over time this was ok and worked well, the jump of text wasn't as bad as it is today or the images loaded fast enough so it wouldn't be a problem.

Over time browsers implemented a more accurate way of calculating the aspect ratio. This would prevent jank and content shifting by setting the dimensions of the image before it is loaded.

```css
img, input[type="image"], video, embed, iframe, marquee, object, table {
  aspect-ratio: attr(width) / attr(height);
}
```

In order for the user agent rule to work the elements must have explicit width and height values assigned to them so that the CSS rule built into browsers works as intended.

## Setting aspect ratio in CSS

To add an explicit aspect ratio to an element in CSS, use the `aspect-ratio` property.

`auto`
: Replaced elements with an intrinsic aspect ratio use that aspect ratio, otherwise the box has no preferred aspect ratio. Size calculations involving intrinsic aspect ratio always work with the content box dimensions.

`<ratio>`
: The box's preferred aspect ratio is the specified ratio of width / height. If height and the preceding slash character are omitted, height defaults to 1
: Size calculations involving preferred aspect ratio work with the dimensions of the box specified by box-sizing.

An example of this attribute shows how we can set the images to use a 4/3 aspect ratio:

```css
img {
  aspect-ratio: 4/3;
}
```

If you leave the /3 portion out in the previous example, it is equivalent to  `4/1`.

```css
img {
  /* The next to values are equivalent */
  aspect-ratio: 4;
  aspect-ratio: 4/1;
}
```

## Links and Resources

* [Let's Learn About Aspect Ratio In CSS](https://ishadeed.com/article/css-aspect-ratio/)
* [Setting Height And Width On Images Is Important Again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)
* [Designing An Aspect Ratio Unit For CSS](https://www.smashingmagazine.com/2019/03/aspect-ratio-unit-css/)
* [Aspect ratio is great](https://css-irl.info/aspect-ratio-is-great/)
* [Mapping the width and height attributes of media container elements to their aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping)
* [Setting Height And Width On Images Is Important Again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)
