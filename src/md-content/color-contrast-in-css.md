# Color Contrast in CSS

The CSS Color Level 5 specification defines a way to provide contrast between background and foreground colors.

The `color-contrast()` function takes the followng arguments:

* A color for the background
* Two or more colors to compare against the background color. The one with the highest constrast ratio will be used as the foreground color with an optional [target constrast level](https://www.w3.org/TR/WCAG21/#contrast-minimum) will be used.
  * The target contrast level can be a number or the strings: AA, AA-large, AAA or AAA-large each representing a a different requirement for body text versus large text (they have different contrast requirements) and AA versus AAA WCAG 2.1 compliance levels.

The example below shows how to use the `color-contrast()` function to provide a contrast ratio of at least 3.0 for the text color.

```css
  color: color-contrast(#f8efec vs 
    #1438bd, #1e456e, #f3ebad 
    to AA-large);
```

What the example is saying is: For a background color of #f8efec, find the color with the highest contrast ratio among the three colors I gave you (#1438bd, #1e456e, #f3ebad) that matches the crteria for AA-large WCAG 2.1 compliance.

We can also flip the requirement around and use color contrast to provide a background color that meets the requirements.

This function presents an interesting way to do contrast ratio calculations in CSS and provide color alternatives for the user
