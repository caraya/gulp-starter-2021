# Animating variable fonts

One of the things I find the most interesting about variable fonts is that you can animate them between different values.

This post will explore how to create animations using a Variable font axes, both default axes like weight and custom axes like casual available in [Recursive](https://recursive.design)

I will be using the following HTML:

```html
<h1 class="weight">Hello World</h1>

<h1 class="casual">Hello World</h1>
```

The CSS is broken in multiple blocks for readability and ease of explanations.

The first block performs the follwing tasks

1. Load the variable font using a modified [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) syntax
   * The format for the font changes to reflect that it's a variable font
   * We repeat the url to accommodate two values for the format attribute
   * `font-weight` takes two values representing the boundary values for the attribute
2. Define the default values for the variable fonts in the `:root` attribute. We use `:root` rather than `html` because `:root` has higher specificity
3. Add a set of default attributes to the universal selector. This will match all elements on the page so we don't have to add them individually to all elements
4. We add padding to the HTML and enlarge `h1` elements

```css
@font-face {
  font-family: "Recursive VF"; <!-- 1 -->
  src:  url("fonts/recursive.woff2") format("woff2 supports variations"),
        url("fonts/recursive.woff2") format("woff2-variations");
  font-weight: 300 1000;
  font-display: swap;
}
:root { <!-- 2 -->
  --recursive-mono: 0;
  --recursive-casual: 0;
  --recursive-weight: 400;
  --recursive-slant: 0;
  --recursive-italic: 0.5;
}

* {
  font-family: "Recursive VF", Verdana, sans-serif; <!-- 3 -->
  font-weight: var(--recursive-weight);
  font-variation-settings:
    "MONO" var(--recursive-mono),
    "CASL" var(--recursive-casual),
    "slnt" var(--recursive-slant),
    "ital" var(--recursive-italic);
}

body { <!-- 4 -->
  padding: 2em;
}

h1 { <!-- 4 -->
  font-size: 3em;
}
```

Then for each animation we need to do two things:

1. Define the animation using the [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) using either the shorthand or individual attributes
   * Both examples use the shorthand syntax
2. Create the keyframes sets using the [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) at-rule
   * The name must match the animatioon property defined in the previous step

```css
.weight {
  opacity: 0;
  animation: weightAnim linear 2s forwards; /* 1 */
}

@keyframes weightAnim { /* 2 */
  from {
    opacity: 0;
  }
  to {
    font-weight: 1000;
    opacity: 1;
  }
}
```
```css
.casual {
  animation: casualAnim linear 4s forwards; /* 1 */
}

@keyframes casualAnim { /* 2 */
  from {
    font-variation-settings: "CASL" 0;
  }
  to {
    font-size: 8em;
    font-variation-settings: "CASL" 1;
  }
}
```

Tools like [Splitting.js](https://splitting.js.org/), [Lettering.js](http://letteringjs.com/) or its jQuery-less counterpart (in this [Gist](https://gist.github.com/adactio/1682367)) allow for more complex effects targetting portions of a sentence or even individual characters.

See Mandy Michael's [Interactivity and Animation with Variable Fonts](https://24ways.org/2019/interactivity-and-animation-with-variable-fonts/) for a more in-depth coverage of how to animate variable fonts and examples of what this looks like.
