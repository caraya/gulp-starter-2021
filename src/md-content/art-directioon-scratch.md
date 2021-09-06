To add a little more flexibility I use custom properties to define the number of columns and the value of the gap.

With those changes the baseline code looks like this:

```css
:root {
  --grid-columns: 12;
  --grid-gap: 10;
}

.page-container {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  grid-gap: calc(var(--grid-gap)* 1px);
}
```

Just by changing the value of `--grid-columns` in the `:root` pseudo element we can change the number of columns (that will still take equal portioons of the space on screen) and the gap between those columns.  With this flexibility we can create custom grids without having to add too much code. For example a 6-column grid in the same page could look like this:

```css
.six-col-grid {
  --grid-columns: 6;
  --grid-gap: 10;

  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  grid-gap: calc(var(--grid-gap)* 1px);
}
```
