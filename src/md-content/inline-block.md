# Difference between inline and inline-block

As I was working on a side project, the same one where I was using buttons I saw examples using `display: inline-block` used in the button styles.

Why should I use `inline-block` instead of inline styles? What difference does it make?

## Difference between inline-block and inline

`display: inline-block` respect top and bottom margins & paddings. `display: inline`, doesn't.

In the example below we use both inline and inline block elements in the same paragraph to illustrate the process.

```html
<p>Cheese and wine ricotta danish fontina.
Brie cheesy grin paneer squirty cheese taleggio
cheesecake <span class="inline-block-box">goat
taleggio</span> <span class="inline-box">goat
taleggio</span>. Bavarian
bergkase emmental fromage cheesecake
cheese slices cheesy grin queso caerphilly.</p>
```

The styles for the span elements are identical except for display.

Again, the difference is that `inline-block` will honor dimensions and padding but `inline` will not.

```css
span.inline-block-box {
  display: inline-block;
  width: 100px;
  height: 100px;
  padding: 1em;
  background-color: rebeccapurple;
  color: white;
}

span.inline-box {
  display: inline;
  width: 100px;
  height: 100px;
  padding: 1em;
  background-color: rebeccapurple;
  color: white;
}
```

You can see multiple examples using the styles described above in Codepen: [https://codepen.io/caraya/pen/wvvpEQo](https://codepen.io/caraya/pen/wvvpEQo)

The first example uses `inline-block` for two span elements.

The second example uses `inline` for both span elements

The last example combines the two. It uses `inline-block` for the fiirst span and `inline` for the second.

## Why would we use inline block?

There may be times when we want to style inline elements with attributes that will only work with `inline-block` elements.

