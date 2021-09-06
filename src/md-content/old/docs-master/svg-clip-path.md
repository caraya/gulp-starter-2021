---
title: SVG Clip Path and Shapes. An interesting alternative
category: Technology
status: draft
---

We'll borrow a play from the SVG playbook for this post. We'll use clip path to generate masks around an image to control what the user gets to see and what shapes the image takes without changing the image itself. 

We'll look at the process and then we'll build an e-book with examples to test if this works with iBooks (and whatever other reader you want to test with) and how can we better leverage the feature in our reflowable projects.

## CSS clip-path

CSS clip-path attribute is the star of the show either in CSS, via SVG or a combination of the two of them, it will clip the image and hide portions outside the clipping region (and therefore changing the image's vissible shape) without changing the actual image file.

Rather than figure out the coordinates for each point in the shape or polygon I'll be working on I chose to use [Clippy](http://bennettfeely.com/clippy/), a tool by Bennett Feely. It is certainly not the only one but it is certainly the easiest to use of those I've found. If you use [Brackets](http://brackets.io) you may want to look at the [CSS Shapes Editor](http://blog.brackets.io/2014/04/17/css-shapes-editor/?lang=en) that's available for the editor.

For this example I took a triangle and put it on its side, the same shape in the Demosthenes example but with a different image. 

The code looks like this:

[codepen_embed height="266" theme_id="2039" slug_hash="QwodXb" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/QwodXb/'>Breaking The Box -- Step 1</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

## SVG Clip path 

All is well and good for browsers that support the CSS clip-path property whether prefixed or not. But what happens to older browsers? Fortunately for us support for SVG is wider than the support for CSS clip path. 

SO we take a two-pronged approach, we create an SVG clip path element and then we reference the SVG from our CSS. 

This bit looks like this:

[codepen_embed height="266" theme_id="2039" slug_hash="ogVZjP" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/ogVZjP/'>Breaking The Box -- Step 2</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]


## CSS shapes


I've discussed CSS shapes in other [blog posts](http://publishing-project.rivendellweb.net/css-shapes-an-update-and-an-expansion/) so I won't cover it again here. But it's important to keep this in mind as it'll be what will pull the components together below.

## Putting it all together

We have all the components we need. It's time to put them together. We use `shapte-outside` to tel the CSS engine to put the content closer to the image following the masked shape of the image.

The final code looks like this:

[codepen_embed height="496" theme_id="2039" slug_hash="YPgZyd" default_tab="result" user="caraya"]See the Pen <a href='http://codepen.io/caraya/pen/YPgZyd/'>Breaking The Box -- Step 3</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.[/codepen_embed]

## Moving it to ePub and the result thereof

I had initially targeted iBooks but even within the iBooks platform, the results are inconsistent. I'm working on trying to figure out if it's a code isue or if the different versions of iBooks really are that inconsistent with each other.

iBooks for Mac (1.1.1 (600) running on OS X 10.10.3) produces no visible result. The image is not displayed at all. 

iBooks for iOS in an iPad Air 2 produces a distorted image and not the sharp triangle like the one provided for the open web. 

I'm researching if this is an issue with the way I'm using clip-path or just the fact that it's not supported. 

If you want to help me test the epub I created (with the cover and title for Peter Pan) is availabe [here](https://s3.amazonaws.com/cal-publishing-resources/clip-path-svg-shapes/mybook.epub)

## Links and credits

Idea from [http://demosthenes.info/blog/1007/Combining-CSS-clip-path-and-Shapes-for-New-Layout-Possibilities](http://demosthenes.info/blog/1007/Combining-CSS-clip-path-and-Shapes-for-New-Layout-Possibilities)


Image used in this post courtesy of [Craig Deakin](https://www.flickr.com/photos/deakaz/13540695995/) used under a Creative Commons attribution license


image is available in [codepen](http://codepen.io/caraya/pen/yAEfb/)
