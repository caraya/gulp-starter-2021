# Exploring Canvas

In its simplest form `<canvas>` can be used to draw graphics via scripting (usually JavaScript). This can, for instance, be used to draw graphs, combine photos, or create simple (and not so simple) animations.

This post will only discuss the 2D drawing canvas mode. You can also use the canvas element to host 3D WebGL models, but that's a whole other set of articles, so we'll skip it for now.

## Getting started

In our HTML document we need to add a `canvas` element where we will draw our content. The `id` attribute is the name that we'll use in the script to reference the `canvas` element.

Height and width are not required but it's always better to write them out

```html
<canvas id="tutorial" width="600" height="600">
  <p>Your browser doesn't support Canvas</p>
</canvas>
```

We also need a script that will generate whatever we want to do in the canvas. In this example we'll generate a square and an arrow. How we generate them is not as important, we'll discuss it later.

```js
// Procedural Canvas generation
const canvas =
  document.getElementById('tutorial');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

// This draws a rectangle
  ctx.strokeRect(100, 100, 125, 125);

  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}
```

## Understanding the Canvas gird

<figure>
  <img src="https://mdn.mozillademos.org/files/224/Canvas_default_grid.png" alt="Graphic showing the canvas coordinate system">
  <figcaption>Canvas coordinates space. Taken from <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid">MDN</a></figcaption>
</figure>

To better understand the material that we'll cover next, we need to talk about the canvas coordinate space.

Normally 1 unit in the grid corresponds to 1 pixel on the canvas. The origin of this grid is positioned in the ***top left*** corner at coordinate (0, 0) with all elements placed relative to this origin.

So the position of the top left corner of the blue square becomes x pixels from the left and y pixels from the top, at coordinate (x,y).

Later in this tutorial we'll see how we can translate the origin to a different position, rotate the grid and even scale it, but for now we'll stick to the default.


## Drawing primitives

Canvas supports two primitives for drawing: rectangle and path. All other forms are derived from these two primitives.

### Rectangles

Rectangles draw either rectangles or squares,

<dl>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect"><code>fillRect(x, y, width, height)</code></a></dt>
 <dd>Draws a filled rectangle.</dd>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect"><code>strokeRect(x, y, width, height)</code></a></dt>
 <dd>Draws a rectangular outline.</dd>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect"><code>clearRect(x, y, width, height)</code></a></dt>
 <dd>Clears the specified rectangular area, making it fully transparent.</dd>
</dl>

## Paths

Now let's look at paths. A path is a list of points, conected by segments of lines that can be of different shapes, curved or not, of different width and of different color. A path, or even a subpath, can be closed. To make shapes using paths takes some extra steps:

* First, you create the path
* Then you use drawing commands to draw into the path
* Once the path has been created, you can stroke or fill the path to render it.

Here are the functions used to perform these steps:

<dl>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath"><code>beginPath()</code></a></dt>
 <dd>Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.</dd>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths">Path methods</a></dt>
 <dd>Methods to set different paths for objects.</dd>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath"><code>closePath()</code></a></dt>
 <dd>Adds&nbsp;a straight line&nbsp;to&nbsp;the path, going to the start of the current sub-path.</dd>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke"><code>stroke()</code></a></dt>
 <dd>Draws the shape by stroking its outline.</dd>
 <dt><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill"><code>fill()</code></a></dt>
 <dd>Draws a solid shape by filling the path's content area.</dd>
</dl>

The first step to create a path is to call the `beginPath().` Internally, paths are stored as a list of sub-paths (lines, arcs, etc) which together form a shape. Every time this method is called, the list is reset and we can start drawing new shapes.

The second step is calling the methods that actually specify the paths to be drawn. We'll see these shortly.

The third, and an optional step, is to call closePath(). This method tries to close the shape by drawing a straight line from the current point to the start. If the shape has already been closed or there's only one point in the list, this function does nothing.

<div class="message info">
<h2>Notes</h2>
<p>When the current path is empty, such as immediately after calling beginPath(), or on a newly created canvas, the first path construction command is always treated as a moveTo(), regardless of what it actually is. For that reason, you will almost always want to specifically set your starting position after resetting a path.</p>
<p><strong>Note:</strong> When you call fill(), any open shapes are closed automatically, so you don't have to call closePath(). This is not the case when you call stroke().</p>
</div>

## Styles and colors

<dl>
  <dt><code>fillStyle = color</code></dt>
  <dd>Sets the style used when filling shapes</dd>
  <dt><code>fillStroke = color</code></dt>
  <dd>Sets the style for shapes' outlines</dd>
</dl>

<div class="message info">
<strong>Note</strong>: When you set the strokeStyle and/or fillStyle property, the new value becomes the default for all shapes being drawn from then on. If you want to use a different color, you must reassign <code>fillStyle</code> or <code>strokeStyle</code>.
</div>

You can also control transparency either globally, using `globalAlpha` which takes a value between 0 and 1 and will affect all shapes drawn after it's set up, or on per-element basis using `strokeStyle` and `fillStyle` with RGBA or another color format that supports transparency.

```js
// Assings default transparency value
ctx.globalAlpha = 0.2;

// Assigning transparent colors
// to stroke and fill style

ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
```

## Images

Importing images into a canvas is a two step process:

1. Get a reference to a supported image type. It is also possible to use images by providing a URL.
2. Draw the image on the canvas using the `drawImage()` function.

### Supported image types

<dl>
  <dt><code>HTMLImageElement</code></dt>
  <dd>&lt;img> elements or images made using the <code>Image()</code> constructor, as well as any  element</dd>
  <dt><code>HTMLImageElement</code></dt>
  <dd>These are images embedded using the &lt;image> SVG element</dd>
  <dt><code>HTMLVideoElement</code></dt>
  <dd>Using an HTML &lt;video> element as your image source grabs the current frame from the video and uses it as an image</dd>
  <dt><code>HTMLCanvasElement</code></dt>
  <dd>You can use another &lt;canvas> element as your image source</dd>
</dl>

Using an existing image in an external URL, we can use the following HTML

```html
<canvas id='demo'>
  <h2>Your browser doesn't support Canvas</h2>
</canvas>
```

And the following JavaScript to insert an image into the Canvas element.

```js
// Capture the canvas element
const canvas = document.getElementById('demo');
// Sets up a 2d context for the canvas
const ctx = canvas.getContext('2d');

// Image constrouctor and src assignment
const img = new Image();
img.src =
'https://s3-us-west-2.amazonaws.com/0168.JPG';

// Draw the image at the given coordinates
ctx.drawImage(img, 0,0);
```

We can then do further drawing on top of the image we just added using the primitives discussed earlier.

<div class="message info">
  <h2>Idea</h2>

  <p>Using an image in a canvas element lends itself pretty well to having an outline and then draw on top of the outlines.</p>
</div>

## Where to next?

There are many other things you can do with canvas. Some ideas are:

* Image blending and transformations
* Mouse and pointer interaction
* Animations
* Image compositing and clipping

Canvass gives you a huge playground to play in. Play responsibly :)

## Links, tutorials and resources

* [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) (MDN)
* [HTML5 Canvas Tutorials Home](https://www.html5canvastutorials.com/)
* Flavioo Copes [HTML Canvas API Tutorial](https://flaviocopes.com/canvas/)
* http://slicker.me/javascript/image_transition_effect.htm
