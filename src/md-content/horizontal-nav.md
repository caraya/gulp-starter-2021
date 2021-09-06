# Creating an horizontal nav menu

One of the biggest pain points for me has been to create horizontal menus for navigation or other data we want to display across the page.

If we're using the following HTML...
```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/layouts">Layout Experiments</a></li>
    <li><a href="/webgl">Webgl</a></li>
  </ul>
</nav>
```

Until I saw flexbox working I used to do tables for this type of layout. It was a pain the ass and it took a lot of work to make them line up and stay in a single line (multiple lines are an even worse nightmare).

The CSS I need to use Flexbox is very simple and it does to things.

the `nav ul` selector sets the ul container to be a flexbox and specifies how we want the content laid out: in rows that wrap around. We also set the spacing between the children to take equal space between them.

The `li` selector hides the bullet from each element.

```scss
nav ul {
  display: flex;
  flex-direction: row wrap;
  justify-content: space-between;

  li {
    list-style: none;
  }
}
```

And that's it... you can see a basic, unstyle demo in [Codepen](https://codepen.io/caraya/pen/aaRQeK)
