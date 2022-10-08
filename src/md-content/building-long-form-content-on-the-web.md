# Building long-form content on the web: Columns?

There are layouts that are only possible with columns. Thinking about IEEE and ACM paper formats.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1662878901/publishing-project.rivendellweb.net/acm-paper-template/acm-paper-template.png?_i=AA' alt='Example of an ACM paper' width='850'/>
  <figcaption>Example of a two column paper for ACM publications</figcaption>
</figure>

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1662918079/publishing-project.rivendellweb.net/ieee-format-paper/ieee-format-paper.jpg?_i=AA' alt='Example of an IEEE paper' width='791'/>
  <figcaption>Example of a paper formatted for IEEE publication</figcaption>
</figure>

The biggest difference is that the paper formats are paginated so it's relatively easier to shift from one column to another and from page to page. Because the web is one continuous format, reading columns becomes much harder since we have to scroll to get to the bottom of one column and then scroll to the top to start the next one.

If we have small blocks of text then it would be easy to use common column markup like this:

```css
.columns-block {
  columns: 2;
  gap: 4em;
}
```

the `columns` selector tells the browser how many columns to create.
We can also specify a width like `300px` and the browser will try to fit as many columns of that width in the available space.

Controlling the height of the columns is more complex since we don't know how high the text will be and controlling overflow can also be troublesome since there's no way to make overflowing content flow into a different portion of the page.

Fragmentation would help solve the issue by providing ways for the text to flow from one block to another, just as if the layout was paginated but, as far as I know, there are no fragmentation layouts that work to handle flowing text into multiple areas of the same page in any modern browser. Right now the only fragmentation layout deals with breaks in pages and columns. While there are provisions for breaks in regions, there is no implementation of CSS regions in any modern browser.

Both [CSS Regions](https://www.w3.org/TR/css-regions-1/) and [CSS Exclusions](https://www.w3.org/TR/css3-exclusions/) haven't been updated in over five years so there's good reason to think that the specifications are no longer in active development.
