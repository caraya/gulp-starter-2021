# Using CSS math functions

CSS provides four mathematical expression functions: `calc()`, `min()`, `max()`, and `clamp()`. We'll take look at each one in some detail and we'll also talk about how we can use them in CSS variables.

## calc()

The calc() function supports four arithmetic operations: addition (`+`), subtraction (`-`), multiplication (`*`) and division (`/`).

This will allow you to dynamically calculate the width and height of a container to create responsive layouts.

In this example, you can set the margins of an element minus a fixed amount:

```css
div {
  width: calc(80vw - 20px);
}
```

## min()

The min() function is used to set the smallest acceptable value for a rule.

It takes 2 different comma-separate values that offer the values the browser will choose from.

In this example the font-size will be `1vw` unless the computer value of 1vw is smaller than `25px` (I can only think of this happening in very large screens).

```css
font-size: min(25px,1vw);
```

## max()

The `max()` function takes two values, like the `min()` function, and uses the largest of the two values.

In this example the font will be at least 25px and never larger than 1vw if the 1vw is larger than 25px.

```css
font-size: max(25px,1vw);
```

## clamp()

The `clamp()` function defines an acceptable range of various values for a layout element: minimum, preferred, and maximum.

The function takes three values separated by a comma and the values may be of different types.

* The first value representsthe minimum value. If the preferred value is less than this value, the minimum value will be used
* The second value represents the preferred value. The value will be used as long as it stays between the minimum and maximum values
* The third value represents the maximum allowed value. If the preferred value is larger than this value, this value will be used

It is, in essence, the combination of both `min()` and `max()` features where the value will never be smaller than the minimum value or larger than the maxium value.

In this example, the font-size will be 4vw + 1rem, as long as the calculated value based on the base font size of the page and the size of the viewport is no smaller than 1rem or larger than 4rem.

```css
.example {
  font-size: clamp(
    1rem,
    4vw + 1rem,
    4rem
  );
}
```

## Combining math fuctions with CSS variables

<https://stackdiary.com/css-math-functions/>
