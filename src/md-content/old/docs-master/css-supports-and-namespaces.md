# CSS Support and namespaces... about time!

There are two new @rules in CSS (well, they may not be new but they are new to me) that open an awesome set of possibilities for CSS development with or without a pre-processor.

## @namespace

[CSS namespaces](https://developer.mozilla.org/en-US/docs/Web/CSS/@namespace) are the CSS implementation of [XML namespaces] (http://www.w3.org/TR/xml-names11/); the nifty technology that allows elements from different XML vocabularies to live in the same document .

In the case of CSS, namespaces allow us to style elements with the same name from different vocabularies differently. For example, let's look at the <code>a</code> from both XHTML and SVG vocabularies

```css
@namespace url(http://www.w3.org/1999/xhtml);
@namespace svg url(http://www.w3.org/2000/svg);

/* This matches all XHTML <a> elements, as XHTML is the default namespace */
a {}

/* This matches all SVG <a> elements */
svg | a {}


/* This matches both XHTML and SVG <a> elements */
*|a {}
```

In this example we define a default namespace <code>@namespace url(http://www.w3.org/1999/xhtml);</code> and a namespace for the SVG vocabulary <code>@namespace svg url(http://www.w3.org/2000/svg);</code>. This will allow us to style the elements based on whether it's an HTML link or an SVG one.

Rather than have to build separate stylesheets or different selectors for each of our vocabularies we can now create one stylesheet and prefix our selectors based on the language they work with thus making them match only if both the namespace prefix and the selector match.


## @supports (also known as feature queries)

Feature queries using the [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) at-rule make it possible to write feature detection in CSS. In principle, feature queries are similar to [media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries) (described in this [CSS Tricks](http://css-tricks.com/css-media-queries/) article) but with a different emphasis. 

Where media queries concentrate on the device capabilities (as seen in the example below for a screen wider than 1024 pixels)

```css
@media screen and (min-width: 1025){
  /* content for devices matching the query goes here */
}
```

Feature queries work by testing for a CSS capability, similar to how we should be doing feature detection in Javascript, as show below:

```css
@supports (display: flex) {
  /* content for browsers that support the condition goes here */
}
```

Bear Travis, from Adobe, presents a more realistic example on his [blog post](http://blogs.adobe.com/webplatform/2014/08/21/coming-soon-css-feature-queries/)about feature queries, copied below:

```css
@supports (background-blend-mode: multiply) {
  body {
  background-blend-mode: multiply;
  background: linear-gradient(rgb(59, 89, 106), rgb(63, 154, 130)),
  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/28727/tree_bark.png');
  }
}
```

Furthermore we can do more complext detections using <code>and</code>, <code>not</code> and <code>or</code> operators. For example we can test for multiple display features by using something like this:

```css
@supports     (display: table-cell) 
          and (display: list-item){
  /* code goes here for browsers that support 
  table-cell and list-item display */
}
```

One of my favorite uses of feature detection in CSS is to test for prefixed properties using the <code>or</code> operator. This makes the code less brittle because, as vendors drop prefixes for a property, the style will still match the unprefixed version of the rule and, at the same time, we provide backwards compatibility for those browsers that still need the prefixed properties.

This technique does not eliminate the need for Prefix Free or Autoprefixer but it allows designers to code deffensively without having to worry about which browser dropped each prefix when. 

```css 
@supports (
               (perspective: 10px) 
            or (-moz-perspective: 10px)
            or (-webkit-perspective: 10px)
            or (-ms-perspective: 10px) 
            or (-o-perspective: 10px) 
          ) {
  /* specific CSS applied when 3D transforms, eventually prefixed, are supported */
}
```

The final trick to add to the CSS feature detection arsenal is the <code>not</code> operator which negates the test being performed. For example, we can test for lack of support for text-align-last or its Mozilla prefixed counterpart. 

```css
@supports ( not ((text-align-last:justify)or (-moz-text-align-last:justify)) ){
  /* specific CSS applied to simulate text-align-last:justify */
}
```

Note the parentheses. When using compound expressions they are required, otherwise the css parser will not know how to process the query.

@support allows progressive enchancement on the CSS side of the design equation. Using the CSS cascade we can do something like this:

```css
/* First we do a plain color body background for older browsers */
body {
  background-color: #ff8;
}

/* If the browser supports rgb colors we use that */
@supports (background-color: rgb(255, 255, 255)){
  background-color: rgb(255, 255, 128);
}

/* test for hsla color space, if supported, use it*/
@supports (background-color: hsla(50, 33%, 25%, 0.75){
  background-color: hsla(50, 33%, 25%, 0.75);
}

/* finally we try a blended background and use it if supported. */
@supports (background-blend-mode: multiply) {
  body {
  background-blend-mode: multiply;
  background: linear-gradient(rgb(59, 89, 106), rgb(63, 154, 130)),
  url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/28727/tree_bark.png');
  }
}
```

Only the last supported rule will be used so we can set up for as many capabilities of the browser as we need to. 

## Specification status and browser support. 

[CSS Conditional Rules Module Level 3](http://dev.w3.org/csswg/css-conditional/) (the recommendation that contains  [feature queries](http://dev.w3.org/csswg/css-conditional/#at-supports)) is at the Candidate Recommendation stage. I'm concerned that the @supoort rule is at risk but the blink implementation is not included on the test case suite. 
As far as support the matrix looks like this (although I'm not certain if the Opera included below is pre or post-blink adoption, it appears it's post):

**Desktop**

* Chrome: 28.0
* Firefox (Gecko): 22
* Internet Explorer: Not Supported	
* Opera: 12.1
* Safari: Not Supported

**mobile**

* Android: Not supported
* Firefox Mobile (Gecko): 22
* IE Mobile: Not supported
* Opera Mobile: 12.1
* Safari Mobile: Not supported
