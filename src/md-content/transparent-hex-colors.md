# adding transparency to hex colors

One thing hidden somewhere in the CSS specifications is the fact that you can use four or eight digits to represent an hexadecimal color, three or six to represent the color and one or two to represent the alpha transparency. For clarity sake, the post will only cover the eight-digit version.

## What is this?

If you're familiar with the rgb/rgba color space in CSS you will see two different types of color, one solid color and one with some level of transparency.

RGB colors use values from 0 to 255 or 1 to 100% to represent color and values from 0 to 1 to represent transparency.

The example below shows an example of rgb and rgba colors and how the look in the browser.

<span style="background-color:rgba(6,52,164,.45)">Partially transparent: rgba(6,52,164, .45)</span>
<br/>
<span style="background-color:rgba(6,52,164, 1);color:white;">Fully Opaque: rgba(6,52,164, 1)</span>

## Hex and Hex + Transparency Colors

For mosot develoopers (myself among them), Hexadecimal (hex) colors are the first type of colors we've used with CSS.

It came as a surprise that you could expand the format to include alpha channel transparency.

The following examples show three of the syntaxes available for Hex colors:

1. The traditional 6 digit syntax
2. The "new" 8 color syntax using full opacity
3. The "new" syntax using transparency

<span style="background-color:#0634a4;color:white;">Fully Opaque:; #0634a4</span>
<br/>
<span style="background-color:#0634a4ff;color:white;">Fully Opaque (with trasparency): #0634a4ff</span>
<br/>
<span style="background-color:#0634a466">Partially transparent: #0634a466</span>

The hardest part of this is to figure out how the transparency works in hexadecimal numbers.

Remember that rgba colors work with transparency between 0 and 1, but working with values from 00 to FF is conceptually harder (at least for me). It'll take a lot of trial and error to get the numbers right.

## Browser support

Browser support is pretty good with Edge, the last outlier coming into the fold once the Chromium version of Edge goes into regular release.

<a href="http://caniuse.com/#feat=css-rrggbbaa">
<picture>
<source type="image/webp" srcset="https://res.cloudinary.com/ireaderinokun/image/upload/v1572749852/caniuse-embed/static/css-rrggbbaa-2019-11-3.webp">
<img src="https://res.cloudinary.com/ireaderinokun/image/upload/v1572749852/caniuse-embed/static/css-rrggbbaa-2019-11-3.png" alt="Data on support for the css-rrggbbaa feature across the major browsers from caniuse.com">
</picture>
</a>


