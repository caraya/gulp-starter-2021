# Centering with Flexbox

One of the most frustrating things for me is how to center things using CSS.

There are many ways to do it and everyone disagrees with everyone else. It is also true that there is no one-size-fits-all solution because what works with modern browsers doesn't necessarily work in older versions.

That said, my favorite way to center content is using Flexbox.

For example, the code below will center its children both verticallly and horizontally on the available screen size (100vw by 100vh).

Because we're using a right-to-left and top-to-bottom language we've set the direction to column, otherwise second and subsequent elements would appear next to each other.

We can choose whether to align vertically or horizontally and we can also choose the size of the area where we want to center content if using it as a standalone element.

```css
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* Vertical alignment*/
  align-items: center;
  /* Horizontal alignment */
  justify-content: center;
}
```

Using this code as a starting point we can experiment with what it would take to center content that is nested or inside grid cells.

