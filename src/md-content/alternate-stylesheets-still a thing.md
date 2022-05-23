# Alternate Stylesheets: still a thing?

Alternate styelsheets provide a mechanism for defining additional stylesheets that the user can select to apply to the site they are visiting, usually via the Vie menu.

In this post we'll talk about how to add alternate stylesheets to a site and show an example of how they work in Firefox.

## How do you write them?

Each alternate stylesheet is a complete and valid stylesheet. From the CSS perspective, there's no syntactic difference bewtween an alternate stylesheet and the primary one.

To include the alternate stylesheet in a page, you use the `link` element as normal, the difference is in the `rel` attribute, which is set to `alternate stylesheet`.

The `title` attribute is what Firefox will use to display the stylesheet in the Page Style menu.

```html
<!-- default stylesheet -->
<link media="screen" 
  rel="stylesheet" 
  href="./style/default.css" 
  type="text/css">

<!-- Alternate stylesheets -->
<link media="screen" 
  rel="stylesheet alternate" 
  href="//www.w3.org/StyleSheets/Core/Ultramarine" 
  title="Ultramarine" 
  type="text/css">

<link media="screen" 
  rel="stylesheet alternate" 
  href="//www.w3.org/StyleSheets/Core/Steely" 
  title="Steely"
  type="text/css">

<link media="screen" 
  rel="stylesheet alternate" 
  href="//www.w3.org/StyleSheets/Core/Oldstyle" 
  title="Oldstyle"
  type="text/css">
```

## How do browsers handle them?

## An example using Firefox

## Additional resources

* <https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets>
* <https://alistapart.com/article/alternate/>
