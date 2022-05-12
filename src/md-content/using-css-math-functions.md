# Using CSS math functions

CSS provides four mathematical expression functions: `calc()`, `min()`, `max()`, and `clamp()`. We'll take look at each one in some detail and we'll also talk about how we can use them in CSS variables.

## calc()

The calc() function supports four arithmetic operations: addition (`+`), subtraction (`-`), multiplication (`*`) and division (`/`).

This will allow you to combine different types of values (like `vw` and `px`) to create a new value.

In this example, you can set the margins of an element minus a fixed amount:

```css
div {
  width: calc(80vw - 20px);
}
```

## min()

The min() function is used to set the smallest acceptable value.

It takes 2 different values separated by a comma and may change.

```css
font-size: min(25px,1vw);
```

In this example the font-size will never be larger than 25px and will shrink to 1vw depending on the viewport size.

## max()

Out of the two values, we specify inside max() – the largest one will be prioritized.

## clamp()

The clamp() function is used to define the acceptable range of various values for a layout element: minimum, preferred, and maximum. Most commonly, clamp() is used to set a range of acceptable values for typography, to create the effect of fluid typography.

It is, in essence, the culmination of both min() and max() features.

An example:

font-size: clamp(1rem, 4vw + 1rem, 4rem);

## Combining math fuctions with CSS variables

<https://stackdiary.com/css-math-functions/>
