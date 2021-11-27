# Color Contrast in CSS

The CSS Color Level 5 specification defines a way to provide contrast between background and foreground colors.

The `color-contrast()` function takes the followng arguments:

* A color for the background
* Two or more colors to compare against the background color. The one with the highest constrast ratio will be used as the foreground color with an optional [target constrast level](https://www.w3.org/TR/WCAG21/#contrast-minimum) can be a number or the strings: AA, AA-large, AAA or AAA-large each representing a a different requirement for body text versus large text (they have different contrast requirements) and AA versus AAA WCAG 2.1 compliance levels.

```css
  color: color-contrast(#f8efec vs #1438bd, #1e456e, #f3ebad to AA-large);
```

```css
.demo-box {
  width: 300px;
  height: 300px;
  border: 1px solid black;
  background-color: #f8efec;
  msrgin: 2em auto;

  color: color-contrast(#f8efec vs #1438bd, #1e456e, #f3ebad to AA-large);
}
```
