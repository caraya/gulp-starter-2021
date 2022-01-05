---
title: CSS shapes: an update and an expansion
date: 2014-09-25
category: Technology
status: draft
---

CSS Shapes ([spec](http://dev.w3.org/csswg/css-shapes/)) allow you a finer grained control of how you flow the text around shapes and images. 

Only Chrome and Opera (both using the Blink rendering engine) and the beta version of Safari (iOS 8 and OS X 10.10) support css shapes.

To illustrate the idea of shapes, look at the following image, taken from Sara Souedan's A List Apart article:

![Examples of CSS Shapes](http://alistapart.com/d/394/shape-outside-example.jpg)

Look at the way the list of ingredients on the second and third recipes. That effect is achieved with shapes.


The HTML is fairly simple, we create the shape by placing the element we want to float (the paragraph) and the element we want to float around (the image)

In the CSS portion we define three elements: 

* The container for the document (<code>#circle-shape-example</code>)
* paragraph text (<code>#circle-shape-example p</code>)
* image (<code>#circle-shape-example .curve</code>). 

The result can be see in the [Codepen](http://codepen.io/caraya/pen/pgIEk) below:

<p data-height="430" data-theme-id="2039" data-slug-hash="lFdyI" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/lFdyI/'>Wrapping Text Around A Circular Shape</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

The specification has one shape type:

* shape-inside()
* shape-outside()

Only shape outside is currently supported. The original specification included both <code>shape-inside</code> and <code>shape-outside</code> but the complexity of shape-inside made the CSS working group defer shape-inside until the [level 2 specification](http://dev.w3.org/csswg/css-shapes-2/) is released.

There are 5 shape functions defined in the specification for outside shapes:

* circle()

  + shape-outside: circle();
  
  The default version will just create a circle centererd around the object being shaped around. 
  
  + shape-outside: circle(250px);
  + shape-outside: circle(100%);
  
  + shape-outside: circle(closest-side);
  + shape-outside: circle(farthest-side);

The value inside the circle function indicates the radius of the circle being used. This will in turn affect the way the shape wraps around the content, particularly if it's an image.
  
You can use a percentage value instead of an absolute measurement. In the case of a circle the value is computed from the used width and height of the reference box as  *sqrt(width2+height2)/sqrt(2)* (from the [specification](http://dev.w3.org/csswg/css-shapes/#funcdef-circle))

Closest and farthest side refer to two predefined values of  ([shape radius](http://dev.w3.org/csswg/css-shapes/#typedef-shape-radius)). 

Closest side will make the content fit into the box assigned to it. The content will not clip but will be shrunk to keep within the bounding box.

Farthest side uses the length from the center of the shape to the farthest side of the reference box. For circles, this is the farthest side in any dimension.

  + shape-outside: circle(250px at center);
  + shape-outside: circle(farthest-side at center);
  + shape-outside: circle(closest-side at center);

Position values are defined in the [CSS background level 3](http://dev.w3.org/csswg/css-backgrounds-3/#position) specification. You can specify this position by using the <code>at {position}</code> syntax.
  

* ellipse()

  + shape-outside: ellipse();
  + shape-outside: ellipse(25%);
  + shape-outside: ellipse(25% 10%)
  + shape-outside: ellipse(closest-side);
  + shape-outside: ellipse(closest-side closest-side);

Ellipse is very similar to circle in terms of syntax but it work with ellipses rather than circles and it sues 2 values to define the shape. An example can be seen below:

<p data-height="487" data-theme-id="2039" data-slug-hash="HehgJ" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/HehgJ/'>CSS Shapes Demo #6</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

If the floated element is a circle then an ellipse works the same way as a circle shape. 

* inset()

  + shape-outside: inset(0px round 50px) border-box;
  + shape-outside: inset(10px 10px round 50px) border-box;
  + shape-outside: inset(10px 10px 10px round 50px);
  + shape-outside: inset(10px 10px 10px 10px round 50px);
  
Inset allows you to create rectangular areas to float content around. This works with either for images that are a rectangles or where we want to overlap text over a rectangular shape.
  
Inset shapes also allow us to create rounded corners for the text to float around as show in examples 2, 3 and 4 above and in the pen below:

<p data-height="558" data-theme-id="2039" data-slug-hash="tDJGr" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/tDJGr/'>CSS Shape inset demo</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Pen forked from [http://codepen.io/SaraSoueidan/pen/05e7894a0a7dbffed0a1c9f5e0840ec9](http://codepen.io/SaraSoueidan/pen/05e7894a0a7dbffed0a1c9f5e0840ec9)

* polygon()

Polygon values for shape-outside allow designers to create layouts wraping text around irregularly shaped closed polygons.

The minimum number of vertices for a polygon shape is three (a triangle). 

  + shape-outside: polygon(0 0, 0 300px, 300px 600px);

Using percentages makes our polygon responsive.

  + shape-outside: polygon(0 0, 0 100%, 100% 100%);

Another value imported from SVG is [fill-rule](http://www.w3.org/TR/SVG/painting.html#FillRuleProperty) which handles how to handle self-intersecting paths or enclosed shapes. Joni Trythall wrote a tutorial about [Understanding the SVG fill-rule Property](http://www.sitepoint.com/understanding-svg-fill-rule-property/). 

Posible values are <code>non-zero</code> and <code>even-odd</code>. Thedefault value if you choose not to fill it, is <code>non-zero</code>

The pen below shows one possible use for polygons where we create a trapezoid-shaped image and then float the text ouside the image which gives the full page the appearance of a magazine layout.

<p data-height="775" data-theme-id="2039" data-slug-hash="BmsLF" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/BmsLF/'>CSS Shapes Demo #11</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

* url(), images and thresholds

  + shape-outside: url(path/to/image-with-shape.png);
  + shape-image-threshold: 0.5;

To me, one of the coolest features of the shape specification is the ability to use images as the object we wrap text around.

The URL to the image specified an arbitrary image that we can wrap our content around. 

The image-threshold attribute indicates the minimal opacity of the pixels making up the shape that content will flow around. 

<p data-height="543" data-theme-id="2039" data-slug-hash="ihLgy" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/ihLgy/'>CSS Shapes Demo #9</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

See the SVG section for a way to use masks in addition to the images to create more nuanced shapes to wrap the text around.

## Positioning the shape

There are addition values for the shape-outside element: <code>margin-box</code>, <code>border-box</code>, <code>padding-box</code> and <code>content-box</code> can be used to place the shape within the different margins associated with an object.

According to HTML 5 Rocks' [Getting started with CSS Shapes](http://www.html5rocks.com/en/tutorials/shapes/getting-started/) you can also use the bounding boxes on their own or with other CSS rules to create shapes.

The author gives two examples: 

The first one creates a circle shape with <code>border-radius</code> and <code>shape-outside: border-box;</code>

The second example creates a pullquote-type effect using <code>shape-outside: content-box;</code>

They may not be as flashy as having text wrap around a 20 vertice polygon but the effects are just as useful. 

[Razvan Caliman](http://razvancaliman.com/writing/css-shapes-reference-boxes/) explain the different boxes, their location and how they interact with the different types of shapes currently implemented.

<p data-height="655" data-theme-id="2039" data-slug-hash="pobcx" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/pobcx/'>CSS Shapes Demo #10</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

## Simulating shape-inside

When first released the shapes specification included both <code>shape-inside</code> and <code>shape-outside</code>. Shape inside has been deferred to the next level of the specification.

Even <code>shape-inside</code> is not part of the current specification, it can be simulated using a couple non semantic elements and two elements styled with <code>shape-outside</code> placed in opposite sides of the window.

To see an example of this type of use of shapes, look at Adobe's [Alice in Wonderland](http://webplatform.adobe.com/Demo-for-Alice-s-Adventures-in-Wonderland/) demo.

Be aware that performance is definitely below ideal. The way the example implements the text scrolling triggers a lot of relayout and paint events. This will reduce performance. This performance issue will be solved when native implementations of <code>shape-inside</code> appear in browsers. Until then we need to be aware of the performance hit the current technique implies.



## CSS masks and shapes working together

The [CSS Masking specification](http://www.w3.org/TR/css-masking/) provides two additional rules we can use in working with our shapes: <code>clip-path</code> and <code>mask-image</code>.

Fortunately for us the syntax for <code>clip-path</code> is identical to the syntax for <code>shape-outside</code> so you can do the following to make sure that only the shape you select appears on screen:

<pre><code>img {
  -webkit-shape-outside: circle(50%);
  shape-outside: circle(50%);
  -webkit-clip-path: circle(50%);
  clip-path: circle(50%);
}</code></pre>

I code deffensively. The unprefixed versions of the code may not be necessary but I add it anyways to make sure that when/if browser vendors decide to drop prefixes my code will not break down right away.

[Using masks in SVG and CSS](http://www.html5rocks.com/en/tutorials/masking/adobe/) talks about general use of masks and clip paths both generated directly from CSS and masks generated with SVG.

Sara Soueidan [further explains](http://sarasoueidan.com/blog/css-svg-clipping/) how to use clipping in CSS and what effects you can achieve with the technique.

Rebecca Hauck [shows how to](http://sarasoueidan.com/blog/css-svg-clipping/) use Adobe Photoshop to create more refined masking image.

## Limitations

Shape implementations **only** work with floated content. Updates to the specifications will work with non-floated content but we're not there yet, it is expected for the second edition of the shape specification.

You must specify dimensions for the object you're floating around. The browser will use those dimensions to establish a coordinate set for the element. This may or may not be accurate but I've always been a fan of coding defensively so I add explicit dimensions in the css class(es) assigned to regions, if needed, change them with Javascript later.

## Browser support

Data obtained from [caniuse.com](http://caniuse.com/#search=shapes%20level%201) accessed 09/15/2014

* Firefox: **Not suported** 
* IE: **Under Consideration** ([per status.modern.ie](http://status.modern.ie/shapes))
* Safari / Safari Mobile: 8 (using -webkit prefix)
* Opera: Since version 24
* Opera Mini: **Not supported**
* Chrome / Chrome for Android: Since version 37 (must enable "experimental Web Platform features" flag in chrome://flags)
* Android Browser: **Not supported**

## Working examples and sources of inspiration (both print and online)

* [Adobe demo for National Geographic Forest Giant](http://webplatform.adobe.com/Demo-for-National-Geographic-Forest-Giant/browser/src/)
* [Adobe demo for National Geographic Orphan Elephants](http://webplatform.adobe.com/Demo-for-National-Geographic-Orphan-Elephants/)
* [https://www.behance.net/collection/25035325/Shapes](https://www.behance.net/collection/25035325/Shapes)
* [Award winning newspaper designs](http://www.smashingmagazine.com/2008/02/11/award-winning-newspaper-designs/)
* [A List Apart](http://alistapart.com/article/css-shapes-101)
* [Sara Soueidan](http://sarasoueidan.com/blog/css-shapes/)
* [http://codepen.io/caraya/pen/pxoLI](http://codepen.io/caraya/pen/pxoLI)
* [http://codepen.io/caraya/pen/eDgoJ](http://codepen.io/caraya/pen/eDgoJ)

## Tools to create CSS shapes

* [CSS Shapes Chrome extension](http://blogs.adobe.com/webplatform/2014/09/03/css-shapes-editor-for-chrome/) described in this [blog post](http://razvancaliman.com/writing/css-shapes-editor-chrome/)
* [CSS Shapes Brackets extension](https://github.com/adobe-webplatform/brackets-css-shapes-editor) described [here](http://blog.brackets.io/2014/04/17/css-shapes-editor/)

## Looking at the future of shapes

[CSS Shapes Level 2](http://dev.w3.org/csswg/css-shapes-2/#shape-inside-property) editor draft from the W3C CSS working group is the next iterations of the shapes specifications.

Unless it is deferred again, the next specification should contain both <code>shape-outside</code> **and** <code>shape-inside</code> which will make even better shape related models possible. Until then let's play with what we have. 