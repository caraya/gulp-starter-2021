# Using Gradients with border-image

Thanks to Kevin Powell and his [video](https://www.youtube.com/watch?v=ypstT5UfCsk) for showing me how to do a trick that has always intrigued me.

<div class="video">
<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/ypstT5UfCsk?t=725" title="YouTube video player" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
</div>

The idea is that we have a border color that fades to transparent or invisible.

This will take two items:

* The [border image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image) property
* The [linear gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient) function

## Setup

the HTML we will use looks like this

```html
<div class="container">
  <div class="row">
    <div class="item">
      <h2>Item Title</h2>
      
      <p>item content</p>
    </div>
    <div class="item">
      <h2>Item Title</h2>
      
      <p>Item content</p>
    </div>
    <div class="item">
      <h2>Item Title</h2>
      
      <p>item content</p>
    </div>
  </div>
```

We will also add some CSS to make make the row-based flex layout:

```css
.row {
  display: flex;
  gap: 2em;
  justify-content: space-evenly;
  padding: 2em;
}
```

## Creating the effect

With all the setup we did, creating the effect is fairly straightforward.

We want the top and left border to start with a solid color and become invisible before the end of the border.
The code does the following:

1. Defines the borders we want to work with using logical properties
   * In English and other Western languages, `block-start` is top and `inline-start` is right
2. Use the [border image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source) property to set the image to a [linear gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)
   * gradients can be used everywhere an image can
3. Use the [border-image-slice](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice) method to make sure the image will appear in full. Otherwise, the image will only appear in the corners

```css
.item {
  /* 1 */
  padding: 1em;
  border-block-start: 5px solid;
  border-inline-start: 5px solid;
  
  /* 2 */
  border-image-source: linear-gradient(45deg, rebeccapurple, transparent 75%);
  /* 3 */
  border-image-slice: 1;
}
```

The code produces the following result:

<iframe height="531.346435546875" style="width: 100%;" scrolling="no" title="gradients in background-image" src="https://codepen.io/caraya/embed/LYmqZqQ?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/LYmqZqQ">
  gradients in background-image</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
