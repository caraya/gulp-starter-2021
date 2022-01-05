One of the things that I find infuriating about multi device development is that people can't seem to agree on a resolution or a device aspect ratio. This has become even more complicated with the advent of retina devices (both hand held, laptops and desktop devices). 

Trying to keep an identical layout in different screen sizes is impossible. Even if we could create identical experiences, the amount of image replacement we have to do to accommodate the different resolutions so our images will not look like crap just is more than I'd like to deal with.

A compromise solution is to use [Media Queries](http://www.w3.org/TR/css3-mediaqueries/) to target the work to the devices that we are planning to work with. This post will discuss a few ways in which we can use media queries to target devices based on resolution and orientation. 

## Before we start

Before we start it's a good idea to gather references and start looking for a solution generic enough to work across our target devices. I found the following resources to start with:

* [List of device pixel ratios](http://bjango.com/articles/min-device-pixel-ratio/)
* [iOS Resolution Reference Guide](http://www.iosres.com/)
* [bourbon hidpi-media-queries file](https://github.com/thoughtbot/bourbon/blob/master/app/assets/stylesheets/css3/_hidpi-media-query.scss)


> NOTE: I used SASS to write all the queries below  and included them in SASS stylesheets. I don't like reinventing the wheel so these queries go into a SASS partial to use when needed.

## The basic query: Device Pixel Ratio

I based the first query on [bourbon hidpi-media-queries file](https://github.com/thoughtbot/bourbon/blob/master/app/assets/stylesheets/css3/_hidpi-media-query.scss) and designed it as a generic query for hdpi browsers. Because it is generic we can't really use it for specific devices or orientations but it provides a good starting point when tied to the information from bjango (see link above). 


```css
// HiDPI mixin. 
@mixin hdpi($ratio: 1.3) {
  @media only screen and (-webkit-min-device-pixel-ratio: $ratio),
  only screen and (min--moz-device-pixel-ratio: $ratio),
  only screen and (-o-min-device-pixel-ratio: #{$ratio}/1),
  only screen and (min-resolution: #{round($ratio*96)}dpi),
  only screen and (min-resolution: #{$ratio}dppx)
  {
    @content;
  }
}
```

One of the things this will allow you to do is substitute images for the appropriate 2x or 3x. The query will only match one value at a time so there should not be a problem in using multiple versions of the query with the DPI we want (1, 1.3, 2 and maybe 3 if we're targeting the really high-resolution devices.)

Apple and other hardware vendors have introduced retina / high DPI screens on desktop and laptop systems. We take this into account by introducing prefixed values for our media query corresponding to the vendors that need the prefix (<code>-webkit</code> for Safari, Chrome and Opera; <code>-Moz</code> for Firefox and <code>-o</code> for older versions of Opera using the Presto rendering engine.)

Where this query falls short is when we try to target specific sizes or devices. That's where our queries get a little more complicated and require more research.

## Device specific queries: iOS devices

Where our first query worried only about DPI, our next set of queries address the following elements of the mobile experience:

* DPI
* Device size
* Device orientation

For each query we create the SASS mixin using a default orientation value of all to use indepeendent of the device orientation. We can also create device specific portrait and landscape rules for each device. 

Here are some queries specific to iPhones from 3 to 6+. Peculiarities for each device will be noted below the query.

### iPhone 3

```css
@mixin iphone3($orientation: all) {
  $deviceMinWidth: 320px;
  $deviceMaxWidth: 480px;
  $devicePixelRatio: 1;

  @if $orientation == all {
    @media only screen and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) {

      @content;
    }
  }
  @else {
    @media only screen and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (orientation:#{$orientation}) {
      @content;
    }
  }
}
```

Since the iPhone 3 is standard DPI I debated whether to include it on the list. Decided to add it because it uses both landscape and portrait orientations issue and because it's as far back as I wanted to go with this

### iPhone 4 and iPhone 5

```css
// iphone4
@mixin iphone4($orientation: all)
{
  $deviceMinWidth: 320px;
  $deviceMaxWidth: 480px;
  $devicePixelRatio: 2;
  $deviceAspectRatio: '2/3';

  @if $orientation == all
  {
    @media only screen 
    and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) {
      @content;
    }
  }
  @else {
    @media only screen and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) 
    and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```

```css
/* iphone-5 */
@mixin iphone5($orientation: all)
{
  $deviceMinWidth: 320px;
  $deviceMaxWidth: 568px;
  $devicePixelRatio: 2;
  $deviceAspectRatio: '2/3';

  @if $orientation == all {
    @media only screen 
    and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) {
      @content;
    }
  }
  @else {
    @media only screen 
    and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) 
    and (orientation:#{$orientation}) {
      @content;
    }
  }
}
```

The main difference between the iPhone 4 and iPhone 5 is the device's speed. Screen size and device pixel ratio are the same for both devices. 


### iPhone 6 and 6+

```css
// iphone 6
@mixin iphone6($orientation: all)
{
//1334 ×750
  $deviceMinWidth: 750px;
  $deviceMaxWidth: 1334px;
  $devicePixelRatio: 2;
  $deviceAspectRatio: '40/71';

  @if $orientation == all
  {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) {
      
      @content;
    }
  }
  @else {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) 
      and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```

```css
// iPhone 6+
// 1242 × 2208 px

@mixin iphone6plus($orientation: all) {
//1334 ×750
  $deviceMinWidth: 1242px;
  $deviceMaxWidth: 2208px;
  $devicePixelRatio: 3;
  $deviceAspectRatio: '40/71';

  @if $orientation == all
  {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) {
      
      @content;
    }
  }
  @else {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) 
      and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```

Unlike the iPhone 4 and 5 there is a real difference between the iPhone 6 and 6+. They have different device pixel ratio and different sizes. If we will support both devices then we need to use both queries.

### Non Retina iPads


```css
/* non-retina ipads (1 and 2) */
@mixin ipad($orientation: all) {
  $deviceMinWidth: 768px;
  $deviceMaxWidth: 1024px;

  @if ($orientation == all) {
    @media only screen and (min-device-width: $deviceMinWidth)
      and (max-device-width: $deviceMaxWidth) {
      
      @content;
    }
  }
  @else {
    @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (orientation:#{$orientation}) {
      @content;
    }
  }
}
```

iPad 1 and 2 use the same size display, the same device pixel ratio and device aspect ratio. We don't need specialized queries for each. 

### Retina iPad (iPad 3 and 4)

```css
/* ipad-retina */
@mixin ipad-retina($orientation: all) {
$deviceMinWidth: 768px;
$deviceMaxWidth: 1024px;
$devicePixelRatio: 2;
$deviceAspectRatio: '4/3';

@if ($orientation == all)   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) {
      @content;
  }
}
@else   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio)
    and (orientation:#{$orientation}) {

    @content;
  }
}
```

iPad 3 and 4 are retina devices

## Device specific queries: Kindle Fire devices

I'm also working on queries specific to the Kindle Fire line of devices. These queries have not been tested as extensively as the iOS queries. If you use them and they work, please let me know via email or by posting an issue to report the results. 

### Non HDPI Kindle Fire

As with iPhones and iPads we use the non hdpi Kindle Fire as our baseline device. 

```css
/* Kindle fire*/
@mixin kindle-fire($orientation: all){
//Model           resolution      PPCM (PPI)  Pixel Ratio
//Kindle Fire     1024x600        67 (170)    1.0 (notHDPI)
$deviceMinWidth: 600px;
$deviceMaxWidth: 1024px;


@if ($orientation == all) {
@media only screen 
  and (min-device-width: $deviceMinWidth)
  and (max-device-width: $deviceMaxWidth) {
      
  @content;
  }
}

@else {
@media only screen 
  and (min-device-width: $deviceMinWidth)
  and (max-device-width: $deviceMaxWidth)
  and (orientation:#{$orientation}) {
  @content;
  }
}
```

### Kindle Fire 7 Inch

```css
@mixin kindlef-fire7in($orientation:all){
//                     resolution      PPCM (PPI)  Pixel Ratio
//Kindle Fire HD 7"    1280x800        85 (216)    1.5 hdpi
//Kindle Fire HDX 7"   1920x1200       127 (323)   1.5 xhdpi
$deviceMinWidth: 800px;
$deviceMaxWidth: 1200px;
$devicePixelRatio: 1.5;

@if ($orientation == all)   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) {

    @content;
  }
}
@else   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio)
    and (orientation:#{$orientation}) {

    @content;
  }
}
```

There are two Kindle devices with 7" screens. One uses HDPI and one uses as an XHDPI device. Need to do further testing to see if they both work well with the same resolution image or if we need to split the query into specific PPI devices

### Kindle Fire 8.9 Inch

```css
@mixin kindle-fire89in($orientation:all) {
//Model                   resolution  PPCM (PPI)  Pixel Ratio
//Kindle Fire HD 8.9"     1920x1200   100 (254)   1.5 hdpi
//Kindle Fire HDX 8.9"    2560x1600   133 (339)   1.5 xhdpi
$deviceMinWidth: 1200px;
$deviceMaxWidth: 1600px;
$deviceAspectRatio: '40/71';
$devicePixelRatio: 1.5;

@if ($orientation == all)   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) {

    @content;
  }
}
@else   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio)
    and (orientation:#{$orientation}) {

    @content;
}
}
```

## So how do we use these queries?

As of SASS 3.2 we can use the <code>@content</code> attribute to pass values to the function, not just parameters. 

Using the mixins as defines above. We can do something like this to take into account for different pixel densities: 

```css
body {
/* Add other attributes as needed */

@include iphone5() { 
  /* styles independent of orientation*/
}
@include iphone5(portrait) {
  background-image: url(http://example.com/bck-iphone-portrait-x2.png);
}
@include iphone5(landscape) {
  background-image: url(http://www.example.com/bck-iphone-portrait-x2.png);
}

@include iphone6plus() {
  background-image: url(http://www.example.com/bck-iphonex3.png);
}

  
@include ipad(){ 
  background-image: url(http://www.example.com/bck-ipadx1.png);
}
```

If we're only worried about pixel ratio, we can use our generic query to just replace some aspects of our content without worrying about device size or other device specific aspects. The sass rule looks like this:

```css
body {

  /* generic content goes here */

  @include hdpi(1.3) {
    /* content for 1.3 HDPI devices */
  }

  @include hdpi(1.5) {
    /* content for 1.5 HDPI devices */
  }

  @include hdpi(2.0) {
    /* content for 2.0 HDPI devices */
  }

  @include hdpi(3.0) {
    /* content for 3.0 HDPI devices */
  }
}
```
## Outstanding questions

Trying to future proof the queries I found out that the current editor draft of [Media Queries Level 4](http://dev.w3.org/csswg/mediaqueries-4/) deprecates <code>device-aspect-ratio</code> as a valid media query. 

I'm exploring whether to replace it with resolution as the CSS working group wants to use moving forward (as indicated in the email thread starting [here](http://lists.w3.org/Archives/Public/www-style/2013Nov/0124.html)) or wait until Media Queries Level 4 moves to Candidate Recommendation, at which point there will be several interoperable implementations (meaning Apple and Microsoft will get on with the program and adopt the same attributes as everyone else.

It is important to note that for iPhone and iPad queries we are ok with using <code>device-pixel-ratio</code> as it's an Apple device and Safari supports it, where it will become problematic moving forward is non-Apple devices.# Using media queries to handle HDPI screens

One of the things that I find infuriating about multi device development is that people can't seem to agree on a rsolution or a device aspect ratio. This has become even more complicated with the advent of retina devices (both hand held, laptops and desktop devices). 

Trying to keep an identical layout in different screen sizes is impossible. Even if we could create identical experiences, the ammount of image replacement we have to do to accomodate the different resolutions so our images will not look like crap just is more than I'd like to deal with.

A compromise solution is to use [Media Queries](http://www.w3.org/TR/css3-mediaqueries/) to target the work to the devices that we are planning to work with. This post will discuss a few ways in which we can use media queries to target devices based on resolution and orientation. 

## Before we start

Before we start it's a good idea to gather references and start looking for a solution generic enough to work across our target devices. I found the following resources to start with:

* [List of device pixel ratios](http://bjango.com/articles/min-device-pixel-ratio/)
* [iOS Resolution Reference Guide](http://www.iosres.com/)
* [bourbon hidpi-media-queries file](https://github.com/thoughtbot/bourbon/blob/master/app/assets/stylesheets/css3/_hidpi-media-query.scss)


> NOTE: All the queries below are written as SCSS sass queries to be included in SASS stylesheets. I don't like reinventing the wheel so these go into a SASS partial to be used when needed.

## The basic query: Device Pixel Ratio

Our first query is based on [bourbon hidpi-media-queries file](https://github.com/thoughtbot/bourbon/blob/master/app/assets/stylesheets/css3/_hidpi-media-query.scss) and it is meant as generic query for hdpi browsers. Because it is generic we can't really use it for specific resolution or devices but it provides a good starting point when tied to the information from bjango (see link above). 


```scss
// HiDPI mixin. 
@mixin hdpi($ratio: 1.3) {
  @media only screen and (-webkit-min-device-pixel-ratio: $ratio),
  only screen and (min--moz-device-pixel-ratio: $ratio),
  only screen and (-o-min-device-pixel-ratio: #{$ratio}/1),
  only screen and (min-resolution: #{round($ratio*96)}dpi),
  only screen and (min-resolution: #{$ratio}dppx)
  {
    @content;
  }
}
```

One of the things this will allow you to do is substitute images for the appropriate 2x or 3x. The query will only match one value at a time so there shouldn't be a problem in using multiple versions of the query with the DPI we want (1, 1.3, 2 and maybe 3 if we're targeting the really high resolution devices.)

Apple and other hardware vendors have introduced retina / high DPI screens on desktop and laptop systems. We take this into account by introducing prefixed values for our media query corresponding to the vendors that need the prefix (<code>-webkit</code> for Safari, Chrome and Opera; <code>-Moz</code> for Firefox and <code>-o</code> for older versions of Opera using the Presto rendering engine.)

Where this query falls short is when we try to target specific sizes or devices. That's where our queries get a little more complicated and require a more research.

## Device specific queries: iOS devices

Where our initial query worried only about DPI, our next set of queries address the following elements of the mobile experience:

* DPI
* Device size
* Device orientation

For each query we create the SASS mixin using a default orientation value of all to use indepeendent of the device orientation. We can also create device specific portrait and landscape rules for each device. 

Here are some queries specific to iPhones from 3 to 6+. Peculiarities for each device will be noted below the query.

### iPhone 3

```scss
@mixin iphone3($orientation: all) {
  $deviceMinWidth: 320px;
  $deviceMaxWidth: 480px;
  $devicePixelRatio: 1;

  @if $orientation == all {
    @media only screen and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) {

      @content;
    }
  }
  @else {
    @media only screen and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (orientation:#{$orientation}) {
      @content;
    }
  }
}
```

Since the iPhone 3 is standard DPI I debated whether to include it on the list. Decided to add it because it has an orientation issue and because it's as far back as I wanted to go with this

### iPhone 4 and iPhone 5

```scss
// iphone4
@mixin iphone4($orientation: all)
{
  $deviceMinWidth: 320px;
  $deviceMaxWidth: 480px;
  $devicePixelRatio: 2;
  $deviceAspectRatio: '2/3';

  @if $orientation == all
  {
    @media only screen 
    and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) {
      @content;
    }
  }
  @else {
    @media only screen and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) 
    and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```

```scss
/* iphone-5 */
@mixin iphone5($orientation: all)
{
  $deviceMinWidth: 320px;
  $deviceMaxWidth: 568px;
  $devicePixelRatio: 2;
  $deviceAspectRatio: '2/3';

  @if $orientation == all {
    @media only screen 
    and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) {
      @content;
    }
  }
  @else {
    @media only screen 
    and (min-device-width: $deviceMinWidth) 
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) 
    and (device-aspect-ratio: $deviceAspectRatio) 
    and (orientation:#{$orientation}) {
      @content;
    }
  }
}
```

The main difference between the iPhone 4 and iPhone 5 is the device's speed. Screen size and device pixel ratio are the same for both devices. 


### iPhone 6 and 6+

```scss
// iphone 6
@mixin iphone6($orientation: all)
{
//1334 ×750
  $deviceMinWidth: 750px;
  $deviceMaxWidth: 1334px;
  $devicePixelRatio: 2;
  $deviceAspectRatio: '40/71';

  @if $orientation == all
  {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) {
      
      @content;
    }
  }
  @else {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) 
      and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```

```scss
// iPhone 6+
// 1242 × 2208 px

@mixin iphone6plus($orientation: all) {
//1334 ×750
  $deviceMinWidth: 1242px;
  $deviceMaxWidth: 2208px;
  $devicePixelRatio: 3;
  $deviceAspectRatio: '40/71';

  @if $orientation == all
  {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) {
      
      @content;
    }
  }
  @else {
    @media only screen 
      and (min-device-width: $deviceMinWidth) 
      and (max-device-width: $deviceMaxWidth)
      and (-webkit-device-pixel-ratio: $devicePixelRatio) 
      and (device-aspect-ratio: $deviceAspectRatio) 
      and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```

Unlike the iPhone 4 and 5 there is a real difference between the iPhone 6 and 6+. They have different device pixel ratio and different sizes. If we will support both devices then we need to use both queries.

### Non Retina iPads


```scss
/* non-retina ipads (1 and 2) */
@mixin ipad($orientation: all) {
  $deviceMinWidth: 768px;
  $deviceMaxWidth: 1024px;

  @if ($orientation == all) {
    @media only screen and (min-device-width: $deviceMinWidth)
      and (max-device-width: $deviceMaxWidth) {
      
      @content;
    }
  }
  @else {
    @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (orientation:#{$orientation}) {
      @content;
    }
  }
}
```

iPad 1 and 2 use the same size display, the same device pixel ratio and device aspect ratio. We don't need specialized queries for each. 

### Retina iPad (iPad 3 and 4)

```scss
/* ipad-retina */
@mixin ipad-retina($orientation: all) {
$deviceMinWidth: 768px;
$deviceMaxWidth: 1024px;
$devicePixelRatio: 2;
$deviceAspectRatio: '4/3';

@if ($orientation == all)   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) {
      @content;
  }
}
@else   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio)
    and (orientation:#{$orientation}) {

    @content;
  }
}
```

iPad 3 and 4 are retina devices

## Device specific queries: Kindle Fire devices

I'm also working on queries specific to the Kindle Fire line of devices. These queries have not been tested as extensively as the iOS queries. If you use them and they work, please let me know via email or by posting an issue to report the results. 

### Non HDPI Kindle Fire

As with iPhones and iPads we use the non hdpi Kindle Fire as our baseline device. 

```scss
/* Kindle fire*/
@mixin kindle-fire($orientation: all){
//Model           resolution      PPCM (PPI)  Pixel Ratio
//Kindle Fire     1024x600        67 (170)    1.0 (notHDPI)
$deviceMinWidth: 600px;
$deviceMaxWidth: 1024px;


@if ($orientation == all) {
@media only screen 
  and (min-device-width: $deviceMinWidth)
  and (max-device-width: $deviceMaxWidth) {
      
  @content;
  }
}

@else {
@media only screen 
  and (min-device-width: $deviceMinWidth)
  and (max-device-width: $deviceMaxWidth)
  and (orientation:#{$orientation}) {
  @content;
  }
}
```

### Kindle Fire 7 Inch

```scss
@mixin kindlef-fire7in($orientation:all){
//                     resolution      PPCM (PPI)  Pixel Ratio
//Kindle Fire HD 7"    1280x800        85 (216)    1.5 hdpi
//Kindle Fire HDX 7"   1920x1200       127 (323)   1.5 xhdpi
$deviceMinWidth: 800px;
$deviceMaxWidth: 1200px;
$devicePixelRatio: 1.5;

@if ($orientation == all)   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) {

    @content;
  }
}
@else   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio)
    and (orientation:#{$orientation}) {

    @content;
  }
}
```

There are two Kindle devices with 7" screens. One uses HDPI and one is labeled as an XHDPI device. Need to do further testing to see if they both work well with the same resolution image or if we need to split the query into specific PPI devices

### Kindle Fire 8.9 Inch

```scss
@mixin kindle-fire89in($orientation:all) {
//Model                   resolution  PPCM (PPI)  Pixel Ratio
//Kindle Fire HD 8.9"     1920x1200   100 (254)   1.5 hdpi
//Kindle Fire HDX 8.9"    2560x1600   133 (339)   1.5 xhdpi
$deviceMinWidth: 1200px;
$deviceMaxWidth: 1600px;
$deviceAspectRatio: '40/71';
$devicePixelRatio: 1.5;

@if ($orientation == all)   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio) {

    @content;
  }
}
@else   {
  @media only screen and (min-device-width: $deviceMinWidth)
    and (max-device-width: $deviceMaxWidth)
    and (-webkit-device-pixel-ratio: $devicePixelRatio)
    and (orientation:#{$orientation}) {

    @content;
}
}
```

## So how do we use these queries?

As of SASS 3.2 we can use the <code>@content</code> attribute to pass values to the function, not just parameters. 

Using the mixings as defines above. We can do something like this to take into account for different pixel densities: 

```scss
body {
/* Add other attributes as needed */

@include iphone5() { 
  /* styles independent of orientation*/
}
@include iphone5(portrait) {
  background-image: url(http://example.com/bck-iphone-portrait-x2.png);
}
@include iphone5(landscape) {
  background-image: url(http://www.example.com/bck-iphone-portrait-x2.png);
}

@include iphone6plus() {
  background-image: url(http://www.example.com/bck-iphonex3.png);
}

  
@include ipad(){ 
  background-image: url(http://www.example.com/bck-ipadx1.png);
}
```

If we're only worried about pixel ratio, we can use our generic query to just replace some aspects of our content without worrying about device size or other device specific aspects. The sass rule looks like this:

```scss
body {

  /* gneric content goes here */

  @include hdpi(1.3) {
    /* content for 1.3 HDPI devices */
  }

  @include hdpi(1.5) {
    /* content for 1.5 HDPI devices */
  }

  @include hdpi(2.0) {
    /* content for 2.0 HDPI devices */
  }

  @include hdpi(3.0) {
    /* content for 3.0 HDPI devices */
  }
}
```
## Outstanding questions

Trying to future proof the queries I found out that the current editor draft of [Media Queries Level 4](http://dev.w3.org/csswg/mediaqueries-4/) deprecates <code>device-aspect-ratio</code> as a valid media query. 

I'm exploring whether to replace it with resolution as it seems to be the way the CSS working group wants to move forward (as indicated in the email thread starting [here](http://lists.w3.org/Archives/Public/www-style/2013Nov/0124.html)) or wait until Media Queries Level 4 moves to Candidate Recommendation, at which point there will be several interoperable implementations (meaning Apple and Microsoft will get on with the program and adopt the same attributes as everyone else.

It is important to note that for iPhone and iPad queries we are ok with using <code>device-pixel-ratio</code> as it's an Apple device and Safari supports it, where it will become problematic moving forward is non-Apple devices.