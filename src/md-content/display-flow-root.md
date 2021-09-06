# display: flow-root

> The post talks about elements of a W3C candidate recommendation, [CSS Display Module Level 3](https://drafts.csswg.org/css-display/#valdef-display-flow-root). It's possible, but highly unlikely, that things will change before the recommendation is finalized.

Most developers (myself included) will be familiar with some values for the `display` property:

* block
* inline
* inline-block
* grid
* flex

And we use these in most of our everyday design, dating to the "age of floats" design philosophy. To see the full list check out the [MDN article on the display property](https://developer.mozilla.org/en-US/docs/Web/CSS/display).

## Using flow-root. The end of clearfix?

Rachel Andrew's [The end of the clearfix hack?](https://rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/) explains a new way to avoid the clerfix hack.

From [Clearfix: A Lesson in Web Development Evolution](https://css-tricks.com/clearfix-a-lesson-in-web-development-evolution/)

> The clearfix, for those unaware, is a CSS hack that solves a persistent bug that occurs when two floated elements are stacked next to each other. When elements are aligned this way, the parent container ends up with a height of 0, and it can easily wreak havoc on a layout. All you might be trying to do is position a sidebar to the left of your main content block, but the result would be two elements that overlap and collapse on each other. To complicate things further, the bug is inconsistent across browsers. The clearfix was invented to solve all that.

The idea is that, using the `::after` pseudo element we add attributes that fill force the clearing of the floats and get us the layout we want.

The most basic clearfix looks like this:

```css
.container::after {
  content: "";
  display: block;
  clear: both;
}
```

`display: flow-root` replaces the clearfix with a single attribute. it creates a new block formatting context for the element using [flow layout formatting](https://www.w3.org/TR/css-display-3/#valdef-display-flow), fixing the layout without needing additional attributes.

Using `flow-root` the element itself now looks like this:

```css
.container {
  display: flow-root;
}
```

We don't need to use the `::after` pseudo element to generate a clearfix anymore.

To see what issues `display: flow-root` solves see [this Codepen](https://codepen.io/rachelandrew/pen/RKgevX?editors=1100#0) from Rachel Andrew.

### Browser support

Browser support for `display:flow-root` is not quite there yet. Current (non-Chromium versions) of Edge and iOS Safari support the feature, although desktop Safari does.

<a href="http://caniuse.com/#feat=flow-root">
<figure>
<source type="image/webp" srcset="https://res.cloudinary.com/ireaderinokun/image/upload/v1572812568/caniuse-embed/static/flow-root-2019-11-3.webp">
<img src="https://res.cloudinary.com/ireaderinokun/image/upload/v1572812568/caniuse-embed/static/flow-root-2019-11-3.png" alt="Data on support for the flow-root feature across the major browsers from caniuse.com">
<figcaption>Data on support for the flow-root feature across the major browsers from caniuse.com</figcaption>
</figure>
</a>

Until support is normalized code defensively and either use `@support` to target browsers that support the feature and use the clearfix for browsers that don't support either `@supports` or `display: flow-root`

