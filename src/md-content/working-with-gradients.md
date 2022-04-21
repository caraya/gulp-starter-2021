# Working with gradients

I'm not very partial to working with colors in general and with gradients in particular. They used to only be available when working with SVG and not CSS.

At some point we gained the ability to work with gradients in CSS and, more recently, it became possible to work with multiple kinds of gradients.

This post will dive into linear gradients, the ones that I use most often on web content.

## What is a gradient?

Gradients are images that show a transition between two or more colors. These transitions are shown as either linear, radial, or radial. Gradients can be used anywhere an image might be. The most popular use for gradients would be in a background element.

## Notes Before We Start

These gradients are based on but different from the types of gradients that are available in SVG.

The container that holds the gradient image must have explicit dimensions (width and height).

There are three types of gradients that we can use in CSS: linear, radial, and radial. In this post we'll only discuss linear gradients.

## Linear Gradients

The most traditional kind of gradient is the linear gradient. This gradient represents a gradual transition between two and more colors;

At its most basic, a linear gradient uses the `linear-gradient` function and two color values (any valid CSS color) to indicate the starting and ending color values.

We can use the same gradient changing the colors to RGB values using any available [color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) that our target browsers support.

In this examples, the class declarations are equivalent and will follow the CSS cascade rules, the last declaration for the same element "wins".

```css
.demo01 {
  background: linear-gradient(
    red,
    blue
  );
}

.demo01 {
  background: linear-gradient(
    rgb(255,0,0),
    rgb(0,0,255)
  );
}
```

The next logical progression is to add more colors to the mix. The next example adds a third color.

```css
.demo02 {
  background: linear-gradient(
    red,
    rebeccapurple,
    blue
  );
}
```

We can add as many colors as we want. This example that adds the seven colors of the rainbow using CSS Named Colors.

```css
.demo11 {
  background: linear-gradient(
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
}
```

Just playing with the colors gives usa lot of potential. We'll explore other things we can do with linear gradients.

The first one is controlling the direction of the gradient rather than using the default top to bottom approach.

We can indicate the origin and direction of the gradient using the `to` and a `direction` (like `to left`).

```css
.demo05 {
  background: linear-gradient(to left top, blue, red);
}
```

We can also use an angle to indicate the direction, using any [angle units](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) supported in your browser.

The following example shows a linear gradient using `turn` as the origin for the gradient. 1turn equals 360deg.

```css
.demo03 {
  background: linear-gradient(
    0.75turn,
    red,
    blue
  );
}
```

The next example uses degrees to control the starting point for the gradient.

```css
.demo04 {
  background: linear-gradient(45deg, blue, red);
}
```

The `0deg` value represents a full circle, making the gradient going bottom to top and playing with colors and positioning the transitions.

```css
.demo06 {
  background: linear-gradient(0deg,
    blue,
    green 40%,
    red
  );
}
```

One interesting aspect of the linear gradient is that you can tell it where do you want the trqansitions to happen.

In `demo07`, the gradient goes from left to right getting to the midpoint color but the transition between the colors will happen 10% of the way across the length of the gradient, taking the rest of the 90% of the length to change to blue.

If we have more colors we can then specify where each transition should happen.

```css
.demo07 {
  background: linear-gradient(0.25turn,
    red,
    10%,
    blue
  );
}
```

Normally, the gradient color transition will be gradual from one color to another. You can provide a sharp transition by duplicating the end color value from the previous color as the starting color in the next value.

In `demo08` the ending value of the red color is the same as the starting value of the blue section. This will cause a sharp separation between the colors.

```css
.demo08 {
  background: linear-gradient(45deg,
    red 0 50%,
    blue 50% 100%
  );
}
```

`demo09` uses the same technique to create sharp transitions between colors as the previous example with multiple color transitions.

```css
.demo09 {
  background: linear-gradient(to left,
    #333,
    #333 50%,
    #eee 75%,
    #333 75%
  );
}
```

The final example uses multiple gradients that use combinations of the above techniques. It also illustrates how to use multiple gradients in the same element.

```css
.demo10 {
  /* Multiple gradients */
  background: 
    linear-gradient(217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg,
      rgba(0, 255, 0, 0.8),
      rgba(0, 255, 0, 0) 70.71%
    ),
    linear-gradient(336deg,
      rgba(0, 0, 255, 0.8),
      rgba(0, 0, 255, 0) 70.71%
    );
}
```

To see the demos working, look at the Codepen below:

<iframe height="300" style="width: 100%;" scrolling="no" title="Linear Gradient Demos" src="https://codepen.io/caraya/embed/KKZbpgR?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/KKZbpgR">
  Linear Gradient Demos</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Links and Resources

* [gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) &mdash; MDN
* [A Deep CSS Dive Into Radial And Conic Gradients](https://www.smashingmagazine.com/2022/01/css-radial-conic-gradient/)
