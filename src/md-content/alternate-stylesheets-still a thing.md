# Alternate Stylesheets: still a thing?

Alternate styelsheets provide a mechanism for defining additional stylesheets that the user can select to apply to the site they are visiting, usually via the View menu.

In this post we'll talk about how to add alternate stylesheets to a site and show an example of how they work in Firefox.

## How do you write alternate stylesheets and include them in a page?

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
  href="./style/alternates/Ultramarine" 
  title="Ultramarine" 
  type="text/css">

<link media="screen" 
  rel="stylesheet alternate" 
  href="./style/alternates/Steely" 
  title="Steely"
  type="text/css">

<link media="screen" 
  rel="stylesheet alternate" 
  href="./style/alternates/Oldstyle" 
  title="Oldstyle"
  type="text/css">
```

## How do browsers handle them?

Right now, Firefox is the only browser that supports alternate stylesheets.

Using David Baron's website as an example (one of the few sites that has multiple alternate stylesheets), the next two figures show how to enable different alternate stylesheets in Firefox and how does the page changes when you switch stylesheets.

When visiting the site, go to `view > page style` and then select the style that you want to use.
<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1653284239/publishing-project.rivendellweb.net/alternate-stylesheets-firefox1/alternate-stylesheets-firefox1.png?_i=AA' alt='David Baron website using one possible alternate stylesheet' width='800px'>
  <figcaption>David Baron's website using one possible alternate stylesheet</figcaption>
</figure>

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1653284239/publishing-project.rivendellweb.net/alternate-stylesheets-firefox2/alternate-stylesheets-firefox2.png?_i=AA' alt='David Baron website using one possible alternate stylesheet' width='800px'>
  <figcaption>David Baron's website using one possible alternate stylesheet</figcaption>
</figure>

## Additional resources

* <https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets>
* <https://alistapart.com/article/alternate/>
