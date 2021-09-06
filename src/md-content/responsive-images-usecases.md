# When To Use Responsive Images

Baased on Andreas Bovens' article [Responsive Images: Use Cases and Documented Code Snippets to Get You Started](https://dev.opera.com/articles/responsive-images/) we will look at four use cases for responsive images:

* Change image sizes based on responsive design rules (the sizes use case)
* Optimize for high-dpi screens (the dpi use case)
* Serve images in different image formats to browsers that support them (the mime use case)
* Serve different art depending on certain contextual factors (the art direction use case)

We'll look at some example native responsive images and how they apply to these use cases.

## Viewport Size Based

The most basic case is to provide different images based on the width of the viewport.

The idea is to not load huge images for devices that don't need or want them. Since we're only worried about sizes we can use `srcset` to indicate the sizes that we want to use.

```css
<img
	srcset="home-300.jpg 300w,
			home-400.jpg 400w,
			home-800.jpg 800w,
			home-1200.jpg 1200w">
	src="opera-400.jpg" alt="My House"
```

## DPR based

We can also use responsive images to handle images that will look goood regardless of the DPR factor of the device.

Some modern displays have up to 5x resolution so the standard imag

```css
<img
  src="museum-outside-1x.jpg"
    alt="The Oslo Opera House"
  srcset= "museum-outside-2x.jpg 2x,
           museum-outside-3x.jpg 3x,
           museum-outside-4x.jpg 4x,
           museum-outside-5x.jpg 5x">

```
## Media Query-like conditions

```css
<img
  sizes="(max-width: 30em) 100vw,
         (max-width: 50em) 50vw,
         calc(33vw - 100px)"
  srcset="swing-200.jpg 200w,
          swing-400.jpg 400w,
          swing-800.jpg 800w,
          swing-1600.jpg 1600w"/>
```

When you use the srcset and sizes attributes on an `<img>` element, you are providing information that the browser can use to make an informed decision about what image is appropriate for the user based on factors you as a developer won't see or won't care about.

If we provide browsers with information via srcset and sizes then browsers can make smarter decisions about the appropriate image source.

But none of that is possible when you use the `<picture>` element and its media attributes:

```css
<picture>
  <source
    srcset="large.jpg"
    media="(min-width: 45em)"></source>
  <source
    srcset="med.jpg"
    media="(min-width: 32em)"></source>
  <img
    src="small.jpg"
    alt="The president giving an award." />
</picture>
```

When you use the `<picture>` element you're telling the browser that it **must** use the first element where the media matches oor the default element if none do.

The order of sources matters and you have to be sure that you have enough media conditions to cover all your cases and a good default.

## Different Images for Portrait or Landscape

There are times when we may want to use different images for portrait and landscape modes.

This picture element will check for the device orientation and use the appropriate source material.

We could further refine this with viewport or DRP elements in the `srcset` attribute.

```css
<picture>
  <source
    media="(orientation: portrait)"
    srcset="portrait.jpg"></source>
  <source
    media="(orientation: landscape)"
    srcset="med.jpg"
    ></source>
  <img
    src="portrait.jpg"
    alt="The president giving an award." />
</picture>
```

## Different Formats for Different Browsers

Before WebP became [widely supported](https://caniuse.com/#feat=webp) (IE and Safari are the only browsers that don't support it) we had to make sure that we served the right images for the right browsers.

In this picture element both sources match the media so the browser will take the first source in document order and use that one if the browser supports the format and the second one if it doesn't.

Finally, if it doesn't understand the picture element, the browser will ignore it altogether and use the img element inside the picture.

```css
<picture>
	<source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="museum-fullshot-200.webp 200w,
      museum-fullshot-400.webp 400w,
      museum-fullshot-800.webp 800w,
      museum-fullshot-1200.webp 1200w"
		type="image/webp">
	<source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="museum-fullshot-200.jpg 200w,
      museum-fullshot-400.jpg 400w,
      museum-fullshot-800.jpg 800w,
      museum-fullshot-1200.jpg 1200w">
	<img
    src="museum-closeup-400.jpg"
    alt="Museum Closeup"
    sizes="(min-width: 640px) 60vw, 100vw"
    srcset="museum-closeup-200.jpg 200w,
      museum-closeup-400.jpg 400w,
      museum-closeup-800.jpg 800w,
      museum-closeup-1200.jpg 1200w">
</picture>
```
## Combining different techniques

This is a more extreme example of combining different techniques. We use multiple sources and multiple formats to make sure we reach as wide a userbase as possible.

```css
<picture>
	<source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="museum-fullshot-200.webp 200w,
      museum-fullshot-400.webp 400w,
      museum-fullshot-800.webp 800w,
      museum-fullshot-1200.webp 1200w"
		type="image/webp" />
	<source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="museum-fullshot-200.jpg 200w,
      museum-fullshot-400.jpg 400w,
      museum-fullshot-800.jpg 800w,
      museum-fullshot-1200.jpg 1200w" />
	<source
    sizes="(min-width: 640px) 60vw, 100vw"
    srcset="museum-closeup-200.webp 200w,
      museum-closeup-400.webp 400w,
      museum-closeup-800.webp 800w,
      museum-closeup-1200.webp 1200w"
    type="image/webp" />
	<source
    sizes="(min-width: 640px) 60vw, 100vw"
    srcset="museum-closeup-200.jpg 200w,
      museum-closeup-400.jpg 400w,
      museum-closeup-800.jpg 800w,
      museum-closeup-1200.jpg 1200w" />
	<img
    src="museum-closeup-400.jpg"
    alt="Museum Closeup"
    sizes="(min-width: 640px) 60vw, 100vw"
    srcset="museum-closeup-200.jpg 200w,
      museum-closeup-400.jpg 400w,
      museum-closeup-800.jpg 800w,
      museum-closeup-1200.jpg 1200w">
</picture>
```

We have a lot of options regarding responsive images. This barely scratches the surface of leveraging responsive images but it's a good start and a good tool to add to the arsenal.

## Links and resources

* [Use Cases and Requirements for Standardizing Responsive Images](http://usecases.responsiveimages.org/)
* [Retina revolution](https://www.netvlies.nl/tips-updates/algemeen/algemeen/retina-revolution/)
* [Don’t use <picture> (most of the time)](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/)
* [Native Responsive Images](https://dev.opera.com/articles/native-responsive-images/)
* [https://cloudfour.com/thinks/sensible-jumps-in-responsive-image-file-sizes/](https://cloudfour.com/thinks/sensible-jumps-in-responsive-image-file-sizes/)
* [Why we need responsive images](https://timkadlec.com/2013/06/why-we-need-responsive-images/)
* [Why we need responsive images: part deux](https://timkadlec.com/2013/11/why-we-need-responsive-images-part-deux/)
* [Responsive Images Done Right: A Guide To And srcset](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/)
* [Srcset and sizes](https://ericportis.com/posts/2014/srcset-sizes/)
