# CSS Display,  Positioning and Related Concepts

One of the hardest things for me to understand in CSS is positioning: how to position an item the way I want it on the page.

Over the years I've found out that there are multiple concepts associated with positioning:

* Display
* Box Model
* Containing Block
* Parent element
* Position
* z-index

You can also work with `perspective` in CSS but that is not part of positioning so it will not be covered in this post

## Display

The display CSS property defines an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.

The traditional syntax is a single keyword. Modern browsers also support a two keyword syntax that defines an inner and outer display attributes.

The first attribute is either `block` or `inline`. This describes how the element plays in the page layout alongside other elements.

The second attribute describes the behavior of the element's children.

Until the level 3 specification was released we use a single value for display, like so:

```css
.demo {
  display: grid;
}
```

With the level 3 specification the equivalent declaration is:

```css
.demo {
  display: block grid;
}
```

The single-value versions are still supported but may create unexpected results.

For more details on the `display` property check MDN's [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) and [Digging Into The Display Property: The Two Values Of Display](https://www.smashingmagazine.com/2019/04/display-two-value/) for more information.

There are two values for the display property that are important to understand

## Box model

All content it a web page is a box. The Box Model describes how these boxes surrounding the content behaves and how it interacts with other content in the page.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1671221486/publishing-project.rivendellweb.net/box/box.png?_i=AA' width='800' style="background-color:white">
  <figcaption>CSS Box Model</figcaption>
</figure>

There are multiple boxes around the content. They are:

Content box
: The area where your content is displayed
: size it using properties like `inline-size` and `block-size` or `width` and `height`.

Padding box
: The padding sits around the content as white space
: Size it using `padding` and related properties.

Border box
: The border box wraps the content and any padding
: Size it using `border` and related properties.

Margin box
: The margin is the outermost layer, wrapping the content, padding, and border as whitespace between this box and other elements
: Size it using `margin` and related properties.

## Containing block

The size and position of an element are often impacted by its containing block. It is worth exploring what makes the containing block as this will impact the position of an element in the page.

The default containing block is the content area of the element itself. Identifying the actual containing block is hard since it'll depend on the value of the `position` property.

1. If the position property is `static`, `relative`, or `sticky`, the containing block is the content box of the nearest ancestor that is either a `block` container (such as an `inline-block`, `block`, or `list-item` element) or establishes a formatting context (such as a `table`, `flex`, or `grid` container)
2. If the position is `absolute`, the containing block is formed by the padding box of the nearest ancestor element with a position value other than `static`
3. If the position is `fixed`, the containing block is established by the viewport (for continuous media like the browser viewport) or the page area (for paged media)
4. If the position is `absolute` or `fixed`, the containing block may also be formed by the edge of the padding box of the nearest ancestor element that has one of the following:
   1. A transform or perspective value other than `none`
   2. A will-change value of `transform` or `perspective`
   3. A contain value of `paint` (e.g. `contain: paint;`)
   4. A backdrop-filter other than `none` (e.g. `backdrop-filter: blur(10px);`)

## Parent Element

## Position

## z-index
<!--
<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/86nTToBm2uQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
-->
