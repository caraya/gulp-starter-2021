# Learning subgrid

Before subgrid, a grid inside of another grid couldn't align itself to its parent cells or grid lines. Each grid layout was unique and independent from its parents.

This means that CSS couldn't do what many designers do: place a single grid over their whole design and constantly align items within it.

Using subgrid, the grandchild of a grid can adopt its parents’ columns or rows as its own, and align the parents' rows or columns.

If I understand it correctly, it works something like this:

The first parent defines the main grid as we normally would. We also set a border and a background color to indentify it.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, minmax(100px, auto));

  border: 1px solid navy;
  background-color: rgba(0, 0, 255, 0.3);
}
```

The direct child of the grid container sets up both it's location witin the parent and its own grid display.

For whatever axis that we want the child of this inner grid to inherit, we use the `subgrid` value of the corresponding `grid-template-*` rule.

```css
.item {
  /* Item placement */
  grid-column: 2 / 7;
  grid-row: 2 / 4;

  /* Item display */
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: repeat(3, 80px);

  border: 10px dotted red;
  background-color: rgba(255, 0, 255, 0.25);
}
```

As as I understand it, the children of the inner grid inherit their parent's axis that were defined as `subgrid` in the parent. This means that the values for `grid-column` and `grid-row` are relative to their parent, not the base grid.

```css
.subitem {
  grid-column: 2 / 3;
  grid-row: 1 / 3;

  border: 5px dotted blue;
  background-color: rgba(218, 165, 32, 0.7);
}
```

Having this ability, we can now use subgrids to create patterns that were not possible to do before or would require workarounds. I'm starting to explore what we can do with subgrids on their own and combined with other layout techniques.

## Links and Resources

* [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) &mdash; MDN
* Examples to help me understand
  * [Fullbleed Subgrid Items](https://codepen.io/web-dot-dev/pen/JjMQzVV)
  * [Understanding Subgrid](https://codepen.io/caraya/pen/oNEdqRd)
