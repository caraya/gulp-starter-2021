# Creating responsive typography

One of the most difficult things, for me, to work with on the web is typography.

In an ideal world we would have a single solution that would work the same in a feature phone or a low-end device and across the spectrum of places where the web works: from print to VR.

But we don't live in an ideal world. It is up to the designer and developer to control the size of the text and decide how it will appear on different devices or at different breakpoints using [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries); we have to contend with uneven support for CSS features and having to rely on the information we get from [Caniuse.com](https://caniuse.com) and from our own testing in order to make sure that things work as intended.

This series of posts will explore some basics of typography as we build the typograhical styles for an online version of Peter Pan with text from Project Gutenberg.

## Step 1: Font Selection and Base Measurements

The first thing we need to do when working with fonts is to choose the font that we want to use. There are several steps involved in this process.

### Choosing the font

The font selection will depend on several factors. My preferred way is to test the fonts with the text you want to use.

At this point I'm less worried about perfection but about looks that we'll optimize later.

### Number of Files versus Performance

In a normal situation we would have between one and four files available for each font:

* font-regular.woff2
* font-italic.woff2
* font-bold.woff2
* font-bold-italic.woff2

These numbers can add RTT and weight to the fonts we use so it's a consideration.

We should also consider using the `font-synthesis` descriptor to control how supporting browsers 

### Variable Fonts Considerations

### Fallback fonts and making them match

### Subsetting the fonts?

### Font size

### Line height

## Step 3: Headings

### Modifications for headings

## Step 4: Paragraphs

### Modifications for paragraphs

## Links and Resources

## Step 5: Additional items to consider

### List items

### Blockquotes

### Code blocks

#### With Prism.js

#### Standalone

* [Part 2: Making the typography responsive and laying foundations for more to come](https://rwt.io/typography-tips/part-2-making-typography-responsive-and-laying-foundations-more-come)
* [Accessible Font Sizing, Explained](https://css-tricks.com/accessible-font-sizing-explained/)
* [Reducing Asset Size With Subsetting](https://bytes.zone/posts/reducing-asset-size-with-subsetting/)
* [CSS for internationalisation](https://chenhuijing.com/blog/css-for-i18n/#%F0%9F%A6%8A)
* RWT Newsletter
  * [10/28/2019 - Web Typography News #32: Variable font CSS—what web authors need to know](http://eepurl.com/gHRCE1)
  * [10/18/2019 - Web Typography News #31: What the web wants](http://eepurl.com/gGYZZz)
  * [10/08/2019 - Web Typography News #30: Learning typography—Words have meaning, but letters have emotion](http://eepurl.com/gFMIHL)
  * [09/27/2019 - Web Typography News #29: Display typography—text and image, overlays and fills](http://eepurl.com/gELiQH)
  * [09/18/2019 - Web Typography News #28: Google Fonts APIv2 with variable fonts!](http://eepurl.com/gDMRkL)
  * [08/23/2019 - Zen and the art of knowing what to hold (and what to let slip—or be slippery)](http://eepurl.com/gBd-hz)
  * [08/08/2019 - Web Typography News #23: Dynamic typography, in detail](http://eepurl.com/gzwes5)
  * [07/12/2019 - Web Typography News #21: Contextual Alternations (for a fraction of the price)](http://eepurl.com/gxjhHD)
  * [06/08/2019 - Web Typography News #17: More typographic friction—testing the vertical limits](http://eepurl.com/gudkx9)
  * [05/30/2019 - Web Typography News #16: Typography as friction—intentional tension](http://eepurl.com/gtivG1)
  * [05/24/2019 - Web Typography News #15: Typography as friction in design, Part the First](http://eepurl.com/gsEGPD)
  * [05/10/2019 - Web Typography News #13: Optical sizing and custom axes with variable fonts](http://eepurl.com/gqO0Q9)
  * [05/05/2019 - Web Typography News #12: Variable Fonts and a whole new typography](http://eepurl.com/gp4yRz)
  * [04/26/2019 - Web Typography News #11: Progressive font enrichment (naming things is hard edition)](http://eepurl.com/go6YEn)
  * [04/05/2019 - Web Typography News #8: Putting your best (font-)face forward](http://eepurl.com/gm9S0D )
  * [03/15/2019 - Web Typography News #5: Proportion &amp; practicality, rhythm &amp; flow](http://eepurl.com/gkNDTj)
  * [03/08/2019 - Web Typography News #4: Units of measure](http://eepurl.com/gjOW09)
  * [03/01/2019 - Web Typography News #3: The paragraph](http://eepurl.com/giMAu1)
