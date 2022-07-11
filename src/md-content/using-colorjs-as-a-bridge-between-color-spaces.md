# Using color.js as a bridge between color spaces

[Color.js](https://colorjs.io) has been oficially released ([post by Lea Verou](https://lea.verou.me/2022/06/releasing-colorjs/), [post by Chris Lilley](https://svgees.us/blog/colorjs-release.html)).

Now I feel safe using it to play with some of the new color spaces available in the [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) specification, particularly the color conversion functions in the library.

```js
import Color from "colorjs.io";

let rp = new Color("#663399");
let cssColor = rp.toString();
if (!CSS.supports("p3", cssColor)) {
  cssColor = rp.to("p3").toString();
}
if (!CSS.supports("lch", cssColor)) {
  cssColor = rp.to("lch").toString();
}

cssColor;
```

