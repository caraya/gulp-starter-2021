# Creating Print CSS stylesheets

Rather than adopt a paged media model for printing HTML5/CSS pages let's look at how to move our content to make for a better printing experience.

This will be very dependent on the layout of your page but there are some common rules we can use everywhere, both css3 and HTML.

>NOTE: All the CSS is written using SCSS syntax. This will allow me to use them with other SASS-based projects and stylesheets while remaining compatible with CSS. 
> Also note that this is by no means a complete print stylesheet. It definitely can be improved. If you have any ideas, please let me know via Twitter ([@elrond25](https://twitter.com/elrond25))or in a comment below

## Defining the print stylesheet

At the most basic level, creating a print specific stylesheet is as simple as indicating its media type. This has been available since CSS 2.1 and it works like this:

```scss
@media print {
  /* style sheet for print goes here */
}
```
We can then use this shortened media query to style the printed output in the way we want. For example, if we want a different font size margins and line height for our printed output, we can do something like this:

```scss
body {
  font-size: 16px;
  line-height: 1.5;
}

@media print {
  body {
    margin: 1in;
    font-size: 12pt;
    line-height: 2;
  }
}
```
Now that we have a basic understanding of how to use the stylesheet let's plan on what do we need to do to get a better print result for our pages.

## What do we need to change?

Because we cannot predict the changes needed for all pages, I will just work on generic aspects of the printed styles.

### Margins and base font sizes (body and headings)

Printed web pages usually go to the border of the paper. We can avoid that by adding margins to the body element. How much depends on how you want the page to look. 

For this example we'll set top, right and left margins to be an inch and the bottom margin to be an 1.5 inch. Most of the time I would leave my margins at 1 inch, but research into layout has made me add the extra space at the bottom.

We've also explicitly set the font size of the body element to be 16px (even thought this may or [may not](http://nicewebtype.com/notes/2012/07/19/leave-default-font-size-alone-and-embrace-the-em/) be necessary). Since I'm setting it to what the default is, I don't think it causes too much of a problem.

To better size the headings I created a [modular scale](http://modularscale.com/scale/?px1=16&px2=24&ra1=1.333&ra2=0) using Scott Brown's website [modularscale.com](http://modularscale.com)

One final note. I only styled h1, h2 and h3. I've never used headings beyond h3 and I don't really see the need to have more than 3 levels of heading. 

```scss
body {
  margin: 1in 1in 1.5in;
  line-height: 1.5;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.75em;
}

h3 {
  font-size: 1.5em;
}
```

### Removing background images and text color

Background images can be a royal pain. They use a lot of ink / toner and they may impact the way the rest of the content displays when printed.

Text color may also impact the way content appears when printed, particularly in black and white printers.

Our simple solution is to remove background and set the text color to black

```scss
body {
  background-image: none;
  color: #000;
}
```

### Removing multimedia objects

Beyond images we don't really need any more multimedia, audio, video and objects elements; printed pages can play them and they will use ink/toner unnecessarily, so we'll hide them for our printed stylesheet.

If you want your readers to see the poster images for video, the first frame of your object or the audio player ignore this rule

```scss
video,audio, object {
  display: none
}
```

### Creating columns

Rather than have one long page of text we can create columns. The mixin below creates columns based on number of columns, gutter, text balance between columns and text span between the columns.

After the mixin we define classes for 2 and 3 column layouts spanning 100% of the available width of the document. We can use them as a model for additional columns with different information.

We could code each individual column setup manually but why reinvent the wheel?

```scss
@mixin column-attribs ($cols, $gap, $fill: balance, $span: none){
  // How many columns
  -moz-column-count: $cols;
  -webkit-column-count: $cols;
  column-count: $cols;

  // Space between columns
  -moz-column-gap: $gap;
  -webkit-column-gap: $gap;
  column-gap: $gap;

  // How do we fill the content of our columns, 
  // default is to balance
  -moz-column-fill: $fill;
  -webkit-column-fill: $fill;
  column-fill: $fill;

  // Column span, defaul is not to span columns
  -moz-column-span: $span;
  -webkit-column-span: $span;
  column-span: $span;
}

.columns2 {
  width: 100%;
  @include column-attribs (2, 20px);
}

.columns3 {
  width: 100%;
  @include column-attribs (3, 10px);
}
```
## Putting it all together

Putting all the elements together the style sheet may look something like this.

```scss
@media print {
  body {
    margin: 1in 1in 1.5in;
    font-size: 12pt;
    line-height: 1.5;
    background-image: none;
    color: #000;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.75em;
  }

  h3 {
    font-size: 1.5em;
  }

  video, audio, object {
    display: none
  }

  .columns2 {
    width: 100%;
    @include column-attribs (2, 20px);
  }

  .columns3 {
    width: 100%;
    @include column-attribs (3, 10px);
  }
}
```

## Where do the print stylesheets fall short?

First of all, this is a simplification of the web page to make printing easier. It is not a dedicated printing solution like CSS Paged Media using generated content and it will not work with Antenna House or PrinceXML. 

If you want to see what that type of stylesheet looks like see my [CSS Paged Media update](http://publishing-project.rivendellweb.net/css-paged-media-update/)

Second, these is a bare bones generic exercise. A lot of the more detailed conversions will depend on your specific page structure and how much fidelity you want to the screen version of the site. 
