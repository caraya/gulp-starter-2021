# Learning subgrid

Before subgrid, a grid inside of another grid couldn't align itself to its parent cells or grid lines. Each grid layout was unique. Many designers place a single grid over their whole design and constantly align items within it, which couldn't be done in CSS.

After subgrid, a child of a grid can adopt its parents’ columns or rows as its own, and align itself or children to them!

In the following demo, the body element creates a classic grid of three columns: the middle column is called main, and the left and right columns name their lines fullbleed. Then, each element in the body, &lt;nav> and &lt;main>, adopts the named lines from body by setting grid-template-columns: subgrid.

```css
​​body {
  display: grid;
  grid-template-columns:
    [fullbleed-start] 
    auto [main-start] min(90%, 60ch) [main-end] auto 
    [fullbleed-end]
  ;
}

body > * {
  display: grid;
  grid-template-columns: subgrid;
}
```

[Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) &mdash; MDN

[Subgrid](https://codepen.io/caraya/pen/MWQmmwr) &mdash; fork from [CodePen Home
Fullbleed Subgrid Items](https://codepen.io/web-dot-dev/pen/JjMQzVV)
