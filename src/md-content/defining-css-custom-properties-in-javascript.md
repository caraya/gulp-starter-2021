# Defining custom properties from Javascript

When I was writing a previous post, I wanted to create custom properties in Javascript that I could use in CSS based on the result of running [color.js](https://colorjs.io/) to convert colors and then test if the browser supports a given colorspace.

This example, as posted in [Using color.js as a bridge between color spaces](https://publishing-project.rivendellweb.net/using-color-js-as-a-bridge-between-color-spaces/), takes a color defined as a new color.js `Color` object, converts it to an sRGB string as a default.

The script then tests if the browser supports different color spaces (LCH and Display-P3) using the [css.supports()](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) method. If the color space is supported then it converts the color to a string in the specified color space

```js
import Color from "colorjs.io";

let rp = new Color("#663399");

// Initialize cssColor
let cssColor;

cssColor = rp.to("srgb").toString();

if (!CSS.supports("p3", cssColor))
  cssColor = rp.to("p3").toString();

if (!CSS.supports("lch", cssColor))
  cssColor = rp.to("lch").toString();
```

We can then use the value of CSS color as the value of a custom property.

Assuming the following code is part of the same script, we can do a naive first pass with code like this:

```js
if (window.CSS.registerProperty) {
  console.log('Browser supports Houdini Custom Props');

  CSS.registerProperty({
  name: "--color-name",
  syntax: "<color>",
  initialValue: `${cssColor}`,
  inherits: false
});

} else {
  console.log('Houdini porperties not supported');

  document.documentElement.style.setProperty('--color-name', `${cssColor}`);
}
```

There are three big issues with the above code.

* There is no way to specify the name of the property that we want to create. If you have more than one property then this will be a problem.
* The code is not DRY. As written the code would work for just one color variable. Further iterations of the code would overwrite the variable each time
* The third issue has more to do with my knowledge of string literals and the `CSS.registerProperty` method. I am not able to pass strings to the default value and trying to create an external variable for the content 

## Creating a function
