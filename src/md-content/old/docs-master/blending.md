<a href="http://dev.w3.org/fxtf/compositing-1/">Compositing and Blending Level 1</a> candidate recommendation provides a way to composite elements in HTML and SVG using CSS. Think of the way you can create non destructive clips and masks in Photoshop; the idea is the same but rather than use Photoshop we can use CSS in the browser. We'll look at the basics of CSS Blend Modes and some examples of their applications to text.

The specification is supported in Firefox, Chrome and Opera with partial support in Safari and, as far as I can tell, without prefixes (according to <a href="http://caniuse.com/#feat=css-backgroundblendmode">caniuse.com</a>)

<h2>Getting started</h2>

One of the first examples I found interesting is how to create masks in CSS. This pen, from Dudley Storey, illustrates the idea. The text, and only the text, will show the underlying image. The rest of the screen. See the <a href="http://demosthenes.info/blog/1032/Easy-Cross-Browser-Text-Masks-with-Blend-Modes">accompanying article</a> for more detail of the process and how to incorporate this into your own work.

[codepen_embed height="266" theme_id="2039" slug_hash="pJPyRq" default_tab="result" user="caraya"]See the Pen <a href="http://codepen.io/caraya/pen/pJPyRq/">Text Clipping Masks with CSS Blend Modes</a> by Carlos Araya (<a href="http://codepen.io/caraya">@caraya</a>) on <a href="http://codepen.io">CodePen</a> Original Pen by Dudley Storey.[/codepen_embed]

When you highlight the word Chicago you can see other parts of the image that were not used as part of the mask. The image itself has not been edited. THis is similar to how you can move the image when you do layer blending in Photoshop. The underlying image will move but the text will remain the same.

## Deep Dive

By necessity this post does not cover all the possibilities for blending in CSS/HTML. The specification is very technical and uses a lot of formulas and equations to explain what it does and how it does it. 

Instead I'll reference blog posts mostly from [Dudley Storey](http://demosthenes.info) who, in my opinion, has done an excellent job of explaining what blending is and how to use it, along with some effects that are accomplished with the technique. 

### Where the compositing spec comes from

Surprisingly, compositing comes from Photoshop the changes are made at the layer level. According to [Photoshop blend modes explained](http://photoblogstop.com/photoshop/photoshop-blend-modes-explained), in Photoshop: 

> The Opacity slider in the Layers Panel allows you to blend the active layer with the layers below by making the active layer translucent, which in turn allow the layers below to show through. The blend modes found in Photoshop allow the same process to take place, but by using different mathematical calculations for each blend mode. As of Photoshop CS5, there are 27 blend modes—2 new blend modes, Subtract and Divide, where recently added. Any changes made using blend modes are parametric, i.e., the changes are non-destructive, and you can always revisit your blend mode settings and readjust them as needed without damaging the pixels in your original image.

This becomes slightly less surprising when you note that one of the original specification authors is from Adobe and that Adobe has been an active participant in the CSS Working Group. 

CSS works slightly different by using rules and attributes to accomplish the same goal of non-destructive image manipulation. 

### Different types of blends

The Compositing and Blending specification lists the following blend modes for user agents:

* Normal blend mode
  * multiply blend mode
  * screen blend mode
  * overlay blend mode
  * ***darken blend mode***
  * ***lighten blend mode***
  * color-dodge blend mode
  * color-burn blend mode
  * hard-light blend mode
  * soft-light blend mode
  * difference blend mode
  * exclusion blend mode
* Non-separable blend modes
  * hue blend mode
  * saturation blend mode
  * color blend mode
  * luminosity blend mode

I'll refer you to the specicification for more specific details about each blend mode. 

### Basic blending

The two most basic blend modes are `light` and `darken` that lighten and darken the blended colors or image as shown in the Codepen below (originally by Dudley Storey.) And their 'next of kin' are screen and overlay that have a similar purpose using different mathematical formulas

To better understand what blending does, let's look at some basic color examples. The basis for the examples below is three colors 

<p data-height="345" data-theme-id="2039" data-slug-hash="PqXKyy" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/PqXKyy/'>Base For Blending Examples</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Now that we have that base setup, we can play with different blend modes and test whether they meet the requirements for our project.

### Lighten

Lighten removes blacks and lighten the image altogether. Notice in the pen below how the black square disappeared and the center square lightened in color to become closer to the background. The white color remains unchanged.

[codepen_embed height="306" theme_id="2039" slug_hash="oXJeOp" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/oXJeOp/'>Lighten Blending Example</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

### Darken

Darken is the opposite of lighten. It removes white and darkens the overall image. The hue of the gray center square darkens compared to the background. The black square remains unaffected.

[codepen_embed height="292" theme_id="2039" slug_hash="gpZxJQ" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/gpZxJQ/'>Darken Blending Example</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

### Screen

Screen is very similar to lighten discussed above but the effect is slightly different. Imagine two projectors splashing images onto the same screen, the image can't be "more dark" and the lighter hues will look washed out.

Compare the results of using screen to the colors you get when using lighten.

[codepen_embed height="304" theme_id="2039" slug_hash="VLqMYd" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/VLqMYd/'>Screen Blending Example</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]


### Multiply

The opposite of screen and similar to darken: it ignores white and makes things darker. Light moves easily through overlapped areas that are clear or bright, but darktones reinforce each other.

Compare the results of using multiply with those from darken.

[codepen_embed height="306" theme_id="2039" slug_hash="yNGzNO" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/yNGzNO/'>Multiply Blending Example</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

### Overlay

Overlay is a compromise between screen and multiply. It ignores midtones and increases contrast everywhere. 

[codepen_embed height="315" theme_id="2039" slug_hash="rVoGVj" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/rVoGVj/'>Overlay Blending Example</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

Note that the order of the layers `does` matter when blending and that different orders will require a different belnding effect. As with many other things on the web: Test, test and then test again to make sure the blending work as intended in your target devices.

## Working with images

So far we've only worked with discrete colors but the effect works with images too. Look 

[codepen_embed height="292" theme_id="2039" slug_hash="mJaBbz" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/mJaBbz/'>Books and circuit boards</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

## One final note</h2>

The cool thing about working with CSS is that you can combine different specs to create really stunning work. In this particular case I'm thinking about filters. They are partially supported in Chrome/Opera, Firefox and Safari (prior to the Blink split).

A combination of blend and filters may look like this, where the image in the foreground was made sepia and then blended with the circuit boards. 

[codepen_embed height="299" theme_id="2039" slug_hash="waRrKV" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/waRrKV/'>Books and circuit boards with filters</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]


 

## Fully realized example

See a more elaborate example below. This was forked from a pen from [Dudley Storey](http://codepen.io/dudleystorey/full/yyxKRq/)

[codepen_embed height="718" theme_id="2039" slug_hash="rVoWqJ" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/rVoWqJ/'>CSS Blend Visualisation: Lighten & Darken Modes</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a> Original code by Dudley Storey.[/codepen_embed]



<h2>Tutorials and Links</h2>


Specification

  <ul>
    <li><a href="https://drafts.fxtf.org/compositing-1/">Compositing and Blending Level 1</a> W3C Candidate Recommendation</li>
  </ul>

Background

  <ul>
    <li><a href="http://demosthenes.info/blog/707/PhotoShop-In-The-Browser-Understanding-CSS-Blend-Modes">http://demosthenes.info/blog/707/PhotoShop-In-The-Browser-Understanding-CSS-Blend-Modes</a></li>
    <li><a href="http://photoblogstop.com/photoshop/photoshop-blend-modes-explained">http://photoblogstop.com/photoshop/photoshop-blend-modes-explained</a></li>
    <li><a href="http://demosthenes.info/blog/999/Understanding-CSS-Blend-Part-1-Darken-and-Lighten">http://demosthenes.info/blog/999/Understanding-CSS-Blend-Part-1-Darken-and-Lighten</a></li>
  </ul>

Examples

  <ul>
    <li><a href="http://demosthenes.info/blog/1039/More-Text-Effects-with-Blend-Modes">http://demosthenes.info/blog/1039/More-Text-Effects-with-Blend-Modes</a></li>
    <li><a href="http://demosthenes.info/blog/1029/Automatic-Text-Contrast-with-CSS-Blend-Modes">http://demosthenes.info/blog/1029/Automatic-Text-Contrast-with-CSS-Blend-Modes</a></li>
    <li><a href="http://demosthenes.info/blog/1020/HTML5-Video-Effects-with-CSS-Blend-Modes">http://demosthenes.info/blog/1020/HTML5-Video-Effects-with-CSS-Blend-Modes</a></li>
    <li><a href="http://demosthenes.info/blog/1014/3D-Glasses-with-CSS-Blend-Modes">http://demosthenes.info/blog/1014/3D-Glasses-with-CSS-Blend-Modes</a></li>
    <li><a href="http://demosthenes.info/blog/1012/MultiLayer-Effects-With-CSS-Clip-Paths-Filters-and-Blend-Modes">http://demosthenes.info/blog/1012/MultiLayer-Effects-With-CSS-Clip-Paths-Filters-and-Blend-Modes</a></li>
    <li><a href="http://demosthenes.info/blog/974/Using-CSS-mix-blend-mode-for-Better-Product-Photos">http://demosthenes.info/blog/974/Using-CSS-mix-blend-mode-for-Better-Product-Photos</a></li>
    <li><a href="http://demosthenes.info/blog/960/Animated-Image-Changes-with-background-blend-mode">http://demosthenes.info/blog/960/Animated-Image-Changes-with-background-blend-mode</a></li>
    <li><a href="http://demosthenes.info/blog/914/Animating-CSS-Background-Blend-Modes">http://demosthenes.info/blog/914/Animating-CSS-Background-Blend-Modes</a></li>
    <li><a href="http://demosthenes.info/blog/888/Create-Monochromatic-Color-Tinted-Images-With-CSS-blend">http://demosthenes.info/blog/888/Create-Monochromatic-Color-Tinted-Images-With-CSS-blend</a></li>
    <li><a href="http://demosthenes.info/blog/1035/Better-Backgrounds-with-Blend-Modes">http://demosthenes.info/blog/1035/Better-Backgrounds-with-Blend-Modes</a></li>
  </ul>
