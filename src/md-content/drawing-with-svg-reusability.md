# Drawing with SVG: Reusability

As we saw, drawing with SVG can be cumbersome and duplicating each element we draw can be a pain. Fortunately SVG provides means to reuse content without having to draw it multiple times.

This post will discuss the tools that SVG provides for reusing elements of your design.

The basic element for reusability is &lt;defs&gt;

**&lt;defs&gt;** defines reusable assets. It is equivalent to the &lt;head&gt; element:  Nothing placed inside the &lt;defs&gt; element will not be visible until it's used elsewhere in the SVG.

```svg
<svg viewBox="0 0 100 100">
  <defs>
    <!-- definitions go here -->
  </defs>
</svg>
```

## Defining Reusable Content: `g`

The following two elements define reusable content inside the `defs`. All the content created with these elements will be inert until we instantiate it.

&lt;g&gt; Wraps multiple shapes into a group. Using `g` instead of creating individual elements inside `defs` means that the entire group

```svg
<svg viewBox="0 0 100 100">
  <defs>
    <g id="circle">
      <ellipse cx="12" cy="12" rx="10" ry="10" />
    </g>
  </defs>
</svg>
```

When we display this in the browser nothing happens. Even though we've defined the element, we haven't used it so there's nothing in the SVG for the browser to show.

Note that we haven't defined stroke or fill colors in the definition of the circle. The reason will become clear when we use the element

## Defining Reusable Content: `symbol`

The `symbol` element is similar to `g` but with some differences. You can add its own viewBox and preserveAspectRatio attributes to the symbol element. This allows you to control the way the symbol is rendered in the viewport instead of fitting in the default way.

```svg
<svg height="400" width="400" viewbox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="myDot" width="5" height="5" viewBox="0 0 5 5">
      <circle cx="1" cy="1" r="1" />
    </symbol>
  </defs>

  <!-- put the uses of the definition here -->
</svg>
```

## Using reusable pieces: `use`

&lt;use&gt; Takes assets defined in the &lt;defs&gt; section and makes them visible in the SVG using the `xlink` namespace.

XML namespaces are the XML equivalent to hyperlinks (the `a` element) on regular web pages. This is what you use to create relationships between elements or between items inside the same element.

```svg
<svg height="400" width="400" viewbox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="myDot" width="5" height="5" viewBox="0 0 5 5">
      <circle cx="1" cy="1" r="1" />
    </symbol>
  </defs>

  <use xlink:href="#myDot" x="5" y="10" style="opacity:1; fill:rebeccapurple"/>
</svg>
```

In this case we've defined `myDot` as a symbol in our `defs` block and, outside the block, we reference it inside a `use` element using `xlink:href` to link to the `id` attribute we've defined for the element.

We could use the element as many times as we need with different parameters as necessary.

```svg
<svg height="400" width="400" viewbox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="myDot" width="5" height="5" viewBox="0 0 5 5">
      <circle cx="1" cy="1" r="1" />
    </symbol>
  </defs>

  <use xlink:href="#myDot" x="5" y="10" style="opacity:1; fill:rebeccapurple"/>
  <use xlink:href="#myDot" x="30" y="10" style="opacity:.75; fill:rebeccapurple"/>
  <use xlink:href="#myDot" x="55" y="10" style="opacity:.50; fill:navy"/>
  <use xlink:href="#myDot" x="30" y="30" style="opacity:.50; fill:steelblue"/>
</svg>
```

The same example using `g` instead of symbols. The only difference is in the way we've configured the reusable element itself. When using `g` elements in the definition we only define the shape without a view box or any other detail.

```svg
<svg height="400" width="400" viewbox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <g id="myDot">
      <ellipse cx="15" cy="15" rx="20" ry="20"/>
    </g>
  </defs>

  <use xlink:href="#myDot" x="5" y="10" style="opacity:1; fill:rebeccapurple"/>
  <use xlink:href="#myDot" x="30" y="10" style="opacity:.75; fill:rebeccapurple"/>
  <use xlink:href="#myDot" x="55" y="10" style="opacity:.50; fill:navy"/>
  <use xlink:href="#myDot" x="30" y="30" style="opacity:.50; fill:steelblue"/>
</svg>
```

