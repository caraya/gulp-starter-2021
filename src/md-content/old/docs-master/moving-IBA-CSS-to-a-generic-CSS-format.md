# moving IBA CSS to a generic CSS format

Notes and observations of what happens when you crack an ibook and try to make a web page look like it.

Using iBook author 2.1.3(463) in Yosemite (10.10) Beta 4. This should make a difference but you never know what changes Apple made between versions.

Since most ebook readers use the webkit rendering engine you can use [caniuse.com]

## Observations

* Shapes can be duplicated using SVG, a core type for epub (see below for support of native shapes, paths and exclusions)

* Tables need to have a clear:both before and after the table. If you want them to span columns in multicolumn text, see below

* If your content uses  columns you can use CSS3's column attributes to make the columns work ([See https://developer.mozilla.org/en-US/docs/Web/CSS/column-span](https://developer.mozilla.org/en-US/docs/tag/CSS%20Multi-columns) for a list of  column attributes you can use).

* Be aware that while [shapes](http://alistapart.com/article/css-shapes-101),  [regions](http://html.adobe.com/webplatform/layout/regions/) and [exclusions](http://dev.w3.org/csswg/css-exclusions/) are at different stages of the W3C recommendation track, they are not fully supported, so jumping content from a column in one page to a different column in another one when using a fixed layout or trying to create text on a path like you can in Illustrator may not work as designed or intended (If it makes your browser explode, don't blame me)

* Just by looking at the CSS it seems that iBooks Author (and as a result iBooks) use specifications that are old, not widely used, where development is slow or that were dropped altogether. Exclusions are only supported by IE10+ (Blink/Webkit )

* -ibooks-layout-hint: anchor page shape; This may indicate paged media but I'm not certain if it's that or shapes.

* -ibooks-list-text-indent: 0.0000pt; This could be easily accomplished with CSS. Something like:

```css
ul li,
ol li {
  text-indent: 0;
}
```

* -ibooks-strikethru-type: none; and -ibooks-strikethru-width: 1.0000px; can be accomplished using the new [CSS Text Level 3 module](http://www.w3.org/TR/css3-text/). It provides much the same functionality as the ibook specific commands except for one detail: Thickness/width cannot be defined with CSS as it is font dependent

* -ibooks-underline-type: none; and -ibooks-underline-width: 1.0000px; can also be accomplished using the new [CSS Text Level 3 module](http://www.w3.org/TR/css3-text/). It provides much the same functionality as the ibook specific commands except for one detail: Thickness/width cannot be defined with CSS as it is font dependent

the CSS would look somethinng like this. I define classes for each element as the strikethrough (strike) and underline elements are not valid HTML5.

[https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration] for reference

```css
.strikethrough {
  text-decoration: line-through;
}

.underline {
  text-decoration: none;
  /* if we're setting text decoration to none, why the hell do we also set a width?*/
}
```

* -ibooks-column-width:  20% 30% 20%; and -ibooks-column-gap:  25px 30px; can be easily done in css using columns
*  ([See https://developer.mozilla.org/en-US/docs/Web/CSS/column-span](https://developer.mozilla.org/en-US/docs/tag/CSS%20Multi-columns)

Code looks like this:

```css
div .3col {
  column-count: 3; /* This wil make the 3 columns as wide as there is space on screen */
  /* we could also specify width by doing column-width: 20em; but this will stick to 20 em regardless of available space*/
  column-gap: 2em;
}
```
* The rest of the instructions on the post:

```css
-ibooks-slot: textShape-2;
-ibooks-box-wrap-exterior-path: directional contour both 12.0pt 0.500000 false;
-ibooks-stroke: none;
-ibooks-gutter-margin-left: 50.0pt;
-ibooks-positioned-slots: media-24, textShape-123, ... ;
@page ::nth-instance
    {
            height: 748.0pt;
            width: 1024.0pt;

            ::slot(media-24)
            {
                    height: 748.000pt;
                    left: 0.000pt;
                    top: 0.000pt;
                    width: 1024.000pt;
                    z-index: 1;
            }
    }
```

can be replaced with a combination of SVG for shapes (can also be animated), fixed positioning for the boxes and some additional css for the different elements on the pages.

[Liz Castro's Book](http://store.kagi.com/cgi-bin/store.cgi?storeID=6FHNX_LIVE&page=FixedLayoutMiniguide) is the best reference I've been able to find.

The css would look something like this:

```css

body {
  width: 1200px;
  height: 1700px;
  margin: 0;

}


.leftside p, .rightside p {
  color: white;
  font-family: "Trebuchet MS", sans-serif;
  top: 400px;
  left: 150px;
  position: relative;
  font-size: 48px;
  line-height: 48px;
  width: 800px;
  margin: 0;
}

/*
  This example uses images so it colors the CSS some
*/
img {
    position: absolute;
    height: 1700px;
    z-index: -1;

}


/*
  Facing pages have different classes
*/
.leftside,.rightside {
    width: 1200px;
    height: 1700px;
    overflow: hidden;
    position: relative;

}

.rightside > img {
    left: -100%;
}

.page001 #folre {
  position:absolute;
  top: 100px;
  left: 80px;
    width: auto;
  height: auto;

  }

.page001 #folre_caption {
  font-family: "Trebuchet MS";
  font-size: 36px;
  position:absolute;
  top: 70px;
  left: 710px;
  width: 400px;
  }

.page001 #pillar {
  position: absolute;
  top: 750px;
  left: 530px;
  width: auto;
  height: auto;
}

.page001 #pillar_caption {
  position: absolute;
  top: 730px;
  left: 210px;
  width: 300px;
  font-family: "Trebuchet MS";
  font-size: 36px;
  text-align:right;
  }

.page02, .page03 {
  width:1200px;
  height: 1700px;
  }

.page03 img {
  width: auto;
  height: auto;
  position: absolute;
  top: 300px;
  left: 100px;
  }

.page03 p {
  position: absolute;
  top: 350px;
  left: 150px;
  width: 700px;
  font-size: 48px;
  color: green;
  font-family: "Trebuchet MS";
  }

```

