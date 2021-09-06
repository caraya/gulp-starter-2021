# Handling Responsive Images in CSS

When researching material for another post I came accross an `image-set` attribute in CSS. I thought it would be interesting to take a look at how it works and whether it has any limitations we should be aware of.

Using `image-set` as the value of the `background-image` attribute we can add a set of images that use rules similar to what the HTML responsive images would use.

```css
.img {
  background-image: url(examples/images/image-regular.jpg);
  background-image: 
    -webkit-image-set(
      url(examples/images/image-regular.jpg) 1x,
      url(examples/images/image-large.jpg) 2x,
    );
}
```

The idea is that, if the browser supports the image-set attribute (unprefixed or not), it will then take the appropriate image based on the display density indicated with the `x` attribute (1x for regular density screen and 2x for high density screens). If the browser doesn't support the property it will ignore the rule.

As of right now only Safari and Chromium-based browsers support the `-webkit` prefixed version of image-set. According to [caniuse.com](https://caniuse.com/css-image-set) there's no browser, yet, that supports the unprefixed property.

For other ways in which CSS can handle responsive images, see CSS Trick's [Responsive Images in CSS](https://css-tricks.com/responsive-images-css/) and for a discussion on how it works see <https://cloudfour.com/thinks/safari-6-and-chrome-21-add-image-set-to-support-retina-images/>
