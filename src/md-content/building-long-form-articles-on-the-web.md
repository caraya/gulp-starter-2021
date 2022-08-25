# Building long-form articles on the web

It's been a while since I've researched and written about long-form content for the web.

New technologies and APIs make it easier to create contet that is a far cry from [Bibliotype](https://craigmod.com/bibliotype/).

This post will look at what we need to do to create long-form content that is comfortable to read from a screen.

This post will not deal with **how** people read online. We will only address technical aspects that I consider necessary to provide good long-form reading experiences.

## Use space wisely

The first area to consider is how we use the space in the page. Because we have different screen sizes and resolutions, we have to be mindfull how we organize the space.

### Content width

One of the biggest issues with working with long-form content is how many characters wider should we go.

According to the [The Elements of Typographic Style Applied to the Web](http://webtypography.net/) the optimal measure (length of a line) is between 45 and 75 characters.

We will have problems if the line is too long or too short. According to the [Baymard Institute](https://baymard.com/blog/line-length-readability):

> If a line of text is too long the reader’s eyes will have a hard time focusing on the text. This is because the line length makes it difficult to gauge where the line starts and ends.
>
> If a line is too short the eye will have to travel back too often, breaking the reader’s rhythm. Too-short lines also tend to stress readers, making them begin on the next line before finishing the current one (hence skipping potentially important words).

Until recently it was impossible to create a measure based on character count. We couldn't say the width of this paragraph is 75 characters. [CSS Values and Units Module Level 3](https://www.w3.org/TR/css-values-3/) introduced the `ch` unit of measurement that addresses this issue. It is defined as:

> Equal to the used advance measure of the "0" (ZERO, U+0030) glyph found in the font used to render it. (The advance measure of a glyph is its advance width or height, whichever is in the inline axis of the element.)

They go on to explain that:

> The advance measure of a glyph depends on writing-mode and text-orientation as well as font settings, text-transform, and any other properties that affect glyph selection or orientation.

One important thing to consider is that the width of the "0" (ZERO, U+0030) glyph will be different based on the font you use and the direction of your text. This may mean you will have to adjust the line height and other typographical elements of the page.

Using `ch` as the unit for our measure we can get consistent width for the content.

Support is pretty good, with Opera Mini being the only browser that doesn't support the unit.

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/static/v1/ch-unit-1661308329918.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/static/v1/ch-unit-1661308329918.png">
<img src="https://caniuse.bitsofco.de/static/v1/ch-unit-1661308329918.jpg" alt="Data on support for the ch-unit feature across the major browsers from caniuse.com">
</picture>

### Line height

> “Vertical space is metered in a different way [to horizontal space]. You must choose not only the overall measure – the depth of the column or page – but also a basic rhythmical unit. This unit is the leading, which is the distance from one baseline to the next.”
>
> Source: [Choose a basic leading that suits the typeface, text and measure](http://webtypography.net/2.2.1)

In addition to measuring the width of our content, we need to also account for vertical spacing between the lines of our text. This is called Leading (pronounced “ledding”), a byproduct of mechanical presses, where strips of lead are placed between lines of type to space the lines apart.

Four web content, we control leading via the `line-height` property. The following example will produce a separation of 1.5 units between lines in paragraphs:

```css
p {
  line-height: 1.5;
}
```

However, there is a little trick that I have to constantly remind myself of. CSS adds half the value of the `line-height` attribute above and below the line it applies to. Otherwise we would get double our desired value.

The preferred way to use line height is with unitless values (like 1.25 or 1.5). The used value is this unitless number multiplied by the element's own font size. The computed value is the same as if we specify a length (like 15px or 2em).

## Typography

Typography has always been interesting to me.

I'm not a type designer and I consider myself addequate as a font user on the web, I've been around for the full progression of fonts on the web.

We will not review the full history of webfonts. If interested I'll refer you to [Brief History of Webfonts](https://www.typotheque.com/articles/brief_history_of_webfonts)

### Font selection

I follow this list, taken from Google Font's [A checklist for choosing type](https://fonts.google.com/knowledge/choosing_type/a_checklist_for_choosing_type). It provides a good overview of what's necessary to choose a good font for the project.

* The typeface suits the purpose of the project
  * Its personality will prompt the appropriate emotional response(s) from our audience
  * Its design fits the intended use
* The typeface’s design is comprehensive
  * It has enough multi-language support
  * It contains legible details
  * It has at least the basic weights and styles
    * Even better: It has alternate glyphs
    * Even better: It has additional weights and styles (or grades)
    * Even better: It has multiple widths
    * Even better: It has different optical sizes
* The font files are reliable
  * All of the design features checked above are actually included in the font files being used
  * The fonts are properly spaced
* The fonts are usable in the situation(s) required
  * If serving as a secondary typeface to a primary choice, there’s a suitable balance between distinction and harmony
  * We have, or our client has, the appropriate font license(s)
  
### Differe places to pick fonts from

One of the first questions to ask if how do we choose the fonts that we want to use in our long-form content.

To answer that question we need to dig a little deeper into the types of fonts that are available and where do they work best.

We will also discuss how to load them.

#### Generic font families

Generic font familities are designed as fallback fonts for web font stacks. The idea is that they will map to an existing font on the user's computer so there will be a font to render the contet. It may not match exactly what the designer had in mind but at least it will work.

The following table maps to the most common used generic font families

| Font | Description |
| --- | --- |
| **Serif** | Serif fonts represent the formal text style for a script. This often means, but is not limited to, glyphs that have finishing strokes, flared or tapering ends, or have actual serifed endings (including slab serifs). Serif fonts are typically proportionately-spaced.|
| **Sans-Serif** | Glyphs in sans-serif fonts, as the term is used in CSS, are generally low contrast (vertical and horizontal stems have the close to the same thickness) and have stroke endings that are plain (without any flaring, cross stroke, or other ornamentation). Sans-serif fonts are typically proportionately-spaced. They often have little variation between thick and thin strokes, compared to fonts from the serif family. |
| **Monospace** | The sole criterion of a monospace font is that all glyphs have the same fixed width. This is often used to render samples of computer code. |
| System UI | This generic font family lets text render with the default user interface font on the platform on which the UA is running. A cross-platform UA should use different fonts on its different supported platforms. The purpose of system-ui is to allow web content to integrate with the look and feel of the native OS.|

There are other, less frequently used generic font families defined in the specification. See [2.1.3. Generic font families](https://www.w3.org/TR/css-fonts-4/#generic-font-families) in the CSS Fonts Module Level 4 specification.

Other than `system-ui` discussed later in System fonts, generic font families are used as a last resort to provide some level of uniformity to design in case other fonts are not available

#### Microsoft webfonts

The first set of fonts designed work on the web are the [Core fonts for the Web](https://en.wikipedia.org/wiki/Core_fonts_for_the_Web) released by Microsoft under a a combination of their own license and licenses from the Monotype foundry.

The included fonts are:

* Andalé Mono
* Arial
* Arial Black
* Comic Sans MS
* Courier New
* Georgia
* Impact
* Times New Roman
* Trebuchet MS
* Verdana
* Webdings

The program released these fonts are freeware with some distribution restrictions until 2002.

Versions of these fonts released after 2002 are not part of the core fonts project and are released under different terms and licenses.

These fonts are still very likely to be in your computer either because you downloaded them or a product that bundles the fonts for you.

Using the fonts would be as simple as using them in a `font-family` attribute.

```css
body {
  font-family: Verdana, sans-serif;
}
```

#### Typekit

Web fonts were part of the CSS 2 specification but foundries were afraid that people would streal their fonts so they crafted their licenses in such developers could not use embedable fonts and comply with the license.

Typekit, the first service to offer downloadble fonts, was released in 2009 and acquired by Adobe in 2011.

Typekit provides many ways to load fonts on a site. There is a legcy code, what has been used for years:

```html
<script src="https://use.typekit.net/xxxxxxx.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>
```

And a newer asynchronous script that load both the script and the css necessary to run the font. This is the recommended way to add Typekit fonts to your site.

```js
(function() {
    var config = {
      kitId: 'abc1def'
    };
    var d = false;
    var tk = document.createElement('script');
    tk.src = '//use.typekit.net/' + config.kitId + '.js';
    tk.type = 'text/javascript';
    tk.async = 'true';
    tk.onload = tk.onreadystatechange = function() {
      var rs = this.readyState;
      if (d || rs && rs != 'complete' && rs != 'loaded') return;
      d = true;
      try { Typekit.load(config); } catch (e) {}
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tk, s);
  })();
```

In both cases you then reference the font you loaded from your CSS.

```css
body {
  font-family: "chaparrall pro", serif;
}
```

I mention Typekit because it's part of Adobe Creative Suite (as Adobe Fonts), making it easier to work through licenses and use on your web projects.

#### Google Fonts

Google fonts was first released in 2010 and currently provides over 1400 fonts, most of them open source under the [SIL Open Font license](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).

To use a font just click `download family` and it will download all available styles for you. You can then pick which styles you want and load them using `@font-face`.

##### Potential legal issues

Google fonts used to provide a means to load the fonts from Google servers but that has changed since a German court fined a website for using Google Fonts and passing their user's IP address to Google without notifying the user.

See [Website fined by German court for leaking visitor's IP address via Google Fonts](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/) and [German Court Rules Websites Embedding Google Fonts Violates GDPR](https://thehackernews.com/2022/01/german-court-rules-websites-embedding.html).

How will this affect other font providers is unclear but I fail to see how this would affect only one provider and not others.

#### Local web fonts

Given the problems with Google Fonts and the likely problems with other providers the best, and likely only, way to use web fonts and remain compliant with laws like the GDPR is to host fonts locally and loading using the `@font-face` at-rule.

The default way to use `@font-face` looks like this:

We specify the `font-family` name that we will use throughout the stylesheet.

Then we specify a `src` attribute with one or more locations for the file. In this example I'm using a [url](https://developer.mozilla.org/en-US/docs/Web/CSS/url) function to specify the location of the font relative to the stylesheet. The format tells the browser the kind of font it represents.

I specify the weight of the font so that the browser will know what file to associate with what weight declaration.

Specifying the style for the font tells the browser if the font is italic or not.

The final declaraction is [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display). This will control how the font will behave based on when the browser finished downloading the font. The `swap` value will cause the font to swap in with the system font once the web font is downloaded.

You will have to load each font separately with its own `@font-face`. There should be at least four different `@font-face` declarations per font that you want to use.

* Regular font (regular weight, non italic)
* Italic (regular weight)
* Bold (non italic)
* Bold Italic
* Any additional weight that you'd want to use and associated italic and bold italic files

This will prevent [faux bold](https://alistapart.com/article/say-no-to-faux-bold/) and italics. This is wher there is no font available in the weight or style you want. The browser will then fake the bold or italic in order to show what it thinks the designer wants.

A way to combat faux bold, italics and small caps is to ue the [font-synthesis](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis) that allows developers to control whether the browser synthesis algorithm applies to any/all of bold (weight), italics (style) or small caps.

```css
@font-face {
  font-family: 'Roboto';
  src: url('path/to/roboto.woff2') format("wwoff2")
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

The `@font-face` declaration for [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) is similar to the previous example with some differences.

The values for `font-weight` and `font-stretch` take a range of two values for the respective property.

Instead of multiples of 100, you can use any value in the range. In a variable font, `font-weight: 451` and `font-stretch: 75%` are valid values in a selector.

```css
@font-face {
    font-family: "Roboto Flex Regular";
    src: url("./fonts/RobotoFlex-VariableFont_GRAD,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.woff2") format('woff2-variations');
    font-weight: 100 1000;
    font-stretch: 25% 151%;
    font-style: normal;
}
```

The value for `font-style` will depend on whether the font provides italics, slant

You would then use the font like normal in your CSS with the addition of being able to use more granular values for `font-weight` and `font-stretch`

#### System fonts

```css
:root {
  --system-ui: 
    system-ui,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
}

.element {
  font-family: var(--system-ui);
}
```

### Font size and reading distance

### To Justify or not?

### Drop caps?

### Underlines

* [text-decoration-line](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line)
* [text-decoration-color](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color)
* [text-decoration-style](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style)
* [text-decoration-thickness](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness)

.

* [text-underline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset)

## Skip to content

[A Deep Dive on Skipping to Content](https://css-tricks.com/a-deep-dive-on-skipping-to-content/)

[How to Create a “Skip to Content” Link](https://css-tricks.com/how-to-create-a-skip-to-content-link/)

## Giving users control

control panel idea.

## Making it work on mobile

## Further technical considerations

### The web is not apps

### The web can be like print

### Leverage the web for what it's good for

hi and artspacetokyo

### Updating your content

### Variable fonts for the win

## Links and Resources

* Frank Chimero
  * [The Web's Grain](https://frankchimero.com/blog/2015/the-webs-grain/)
  * [What The Web Wants](https://frankchimero.com/blog/2013/what-screens-want/)
* Apps and publishing
  * [Post artifact books and publishing](http://craigmod.com/journal/post_artifact/)
    * [Newspapers and Thinking the Unthinkable](Newspapers%20and%20Thinking%20the%20Unthinkable%0A)
    * [On Wikipedia, Cultural Patrimony, and Historiography](http://booktwo.org/notebook/wikipedia-historiography/)
      * You own your content
        * [Amazon zaps purchased copies of Orwell's 1984 and Animal Farm from Kindles](http://boingboing.net/2009/07/17/amazon-zaps-purchase.html)
      * [Forever](https://aworkinglibrary.com/writing/forever) - Things never last forever on the web
      * [The social life of marginalia](http://bobulate.com/post/5013829096/the-social-life-of-marginalia)
        * Bookmarking, annotations and sharing
          * [openbookmarks.org](http://www.openbookmarks.org/)
          * [Hypothes.is](https://hypothes.is/)
          * [emphasis](https://github.com/NYTimes/Emphasis) from the New York Times
  * [Subcompact Publishing](https://craigmod.com/journal/subcompact_publishing/)
  * [What books will become](http://kk.org/thetechnium/what-books-will/)
    * [As we may read](http://craigmod.com/sputnik/as_we_may_read/) and [Future Reading](https://aeon.co/essays/stagnant-and-dull-can-digital-books-ever-replace-print)
  * [Our new shrines](http://contentsmagazine.com/articles/our-new-shrines/)
    * [How apps are made](http://contentsmagazine.com/articles/our-new-shrines/)
  * [ebooks for all](http://craigmod.com/sputnik/worldreader/)
  * [Pull back](https://medium.com/@craigmod/pull-back-17a9ebc060d3#.lv3ix13z9)
  * [Unbinding and edges](https://craigmod.com/essays/unbinding/)
    * [A Turn of the Page for Newsweek](http://www.thedailybeast.com/articles/2012/10/18/a-turn-of-the-page-for-newsweek.html)
    * [The digital - physical](http://craigmod.com/journal/digital_physical/)
      * [Christo and Jeanne-Claude: Gentle Disturbances](http://www.artagogo.com/commentary/christo/christo.htm)
      * [The Umbrellas](http://christojeanneclaude.net/projects/the-umbrellas)
  * [Publishing Startups and the Great Fuzziness](http://craigmod.com/sputnik/publishing_startups/)
  * [Platforming books](http://craigmod.com/journal/platforming_books/)
    * [Amazon: Kindle Ebooks Now Outsell All Paper Books Combined](http://www.cultofmac.com/182864/amazon-kindle-ebooks-now-outsell-all-paper-books-combined/)
  * [Hack the cover](http://craigmod.com/journal/hack_the_cover/)
    * [Has Kindle Killed the Book Cover?](Has%20Kindle%20Killed%20the%20Book%20Cover?)
    * [Scan this book!](http://www.nytimes.com/2006/05/14/magazine/14publishing.html?pagewanted=all)
    * [The End of Authorship](http://www.nytimes.com/2006/06/25/books/review/25updike.html?pagewanted=print&pagewanted=all)
    * [The book cover archive](http://bookcoverarchive.com/)
    * [Why aren’t there words in the cover of our books?](http://www.thedominoproject.com/2011/02/why-arent-there-words-on-the-cover-of-our-books.html)
  * [The shape of our future book](http://craigmod.com/sputnik/our_future_book/)
  * [Bookcubes: souvenirs of Digital Reading](http://booktwo.org/notebook/bookcubes/)
  * [Subcompact Publishing](http://craigmod.com/journal/subcompact_publishing/)
    * [Clay Christensen on the news industry: “We didn’t quite understand…how quickly things fall off the cliff”](http://www.niemanlab.org/2012/10/clay-christensen-on-the-news-industry-we-didnt-quite-understand-how-quickly-things-fall-off-the-cliff/)
  * [Subcompact roundup and The Daily](http://craigmod.com/sputnik/subcompact_round_up/)
    * [Tablets are waiting for their Movable Type](https://signalvnoise.com/posts/3334-tablets-are-waiting-for-their-movable-type)
    * [A new model for the musician-to-listener relationship](https://medium.com/the-future-of-publishing/a-new-model-for-the-musician-to-listener-relationship-44e778827320#.u22ff8gs9)
    * [Sub-compact media: Rethinking the way we publish online](https://gigaom.com/2012/11/30/sub-compact-media-rethinking-the-way-we-publish-online/)
    * [Get ready for the age of premium micropublishing](https://pando.com/2012/12/03/get-ready-for-the-age-of-premium-micropublishing/)
    * [Trend alert: small internet publications](http://kottke.org/12/12/trend-alert-small-internet-publications)
    * [A Response to ‘Subcompact Publishing’](http://www.foliomag.com/2012/response-subcompact-publishing/#.UMET28pU7jL)
    * [How To Publish a "Minimum Viable Magazine" Online](https://www.technologyreview.com/s/508166/how-to-publish-a-minimum-viable-magazine-online/)
    * [Some lessons from the demise of The Daily: Was it the platform, the content, the structure, or the business model?](http://www.niemanlab.org/2012/12/some-lessons-from-the-demise-of-the-daily-was-it-the-platform-the-content-the-structure-or-the-business-model/)
* Technology
  * Progressive Web Appllications
    * Background
      * [Progressive Web Apps: Escaping Tabs Without Losing Our Soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)
      * [Service Workers and PWAs: It’s About Reliable Performance, Not “Offline”](https://infrequently.org/2016/05/service-workers-and-pwas-its-about-reliable-performance-not-offline/)
    * How to
      * [Your First Progressive Web App](https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/?hl=en)
      * [Why Progressive Web Apps Are The Future Of Web Development](https://arc.applause.com/2015/11/30/application-shell-architecture/)
    * Forward thinking
      * [What Progressive Web Apps Mean for the Web](http://developer.telerik.com/featured/what-progressive-web-apps-mean-for-the-web/)
      * [Are Progressive Web Apps the Future?](http://developer.telerik.com/featured/are-progressive-web-apps-future/)
  * Application Shell Architecture
    * [Instant Loading Web Apps with An Application Shell Architecture](https://developers.google.com/web/updates/2015/11/app-shell)
    * [Architect the App Shell](https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/step-01?hl=en)
    * [Instant Loading Web Apps With An Application Shell Architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73#.w7icv2hw9)
    * Examples
      * [iFixIt PWA](https://ifixit-pwa.appspot.com/)
      * [Service Workers in Production: Google I/O 2015 app](https://developers.google.com/web/showcase/case-study/service-workers-iowa)
  * Service Workers
    * [Is ServiceWorker Ready](https://jakearchibald.github.io/isserviceworkerready/)
    * [Service Workers Sepcification](https://www.w3.org/TR/service-workers/) at W3C
  * Examples and tutorials
    * Jake Archibald
      * [Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/)
      * [Simple Service Worker tutorial](https://github.com/jakearchibald/simple-serviceworker-tutorial)
    * Making A Service Worker: A Case Study
      * [Smashing Magazine Article](https://www.smashingmagazine.com/2016/02/making-a-service-worker/)
      * [Accompanying code](https://github.com/lyzadanger/serviceworker-example)
    * The Guardian
      * [Building an offline page for Guardian.com](https://www.theguardian.com/info/developer-blog/2015/nov/04/building-an-offline-page-for-theguardiancom)
    * Jeremy Keith’s Example
      * [My first Service Worker](https://adactio.com/journal/9775)
    * Nicolás Bevacqua
      * [ServiceWorker: Revolution of the Web Platform](https://ponyfoo.com/articles/serviceworker-revolution)
    * Vendor Examples
      * [Service Worker Samples](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker) (Google)
      * [The Service Workers Cookbook](https://serviceworke.rs/) (Mozilla)
        * [Caching from a zip file](https://serviceworke.rs/cache-from-zip_worker_doc.html) (mozilla)
  * Tools
    * From Google
      * [Workbox.js](https://developers.google.com/web/tools/workbox)
  * Things that sit on top of service workers
    * [Background Sync](https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md)
    * Push Notifications
      * [Specification](https://www.w3.org/TR/push-api/) at W3C
      * Current Implementations
        * [Chrome](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en)
    * [Background Sync with Service Workers](https://davidwalsh.name/background-sync)
    * [Periodic Background Sync](https://web.dev/periodic-background-sync/)
    * [Update Broadcasts](https://web.dev/broadcast-updates-guide/)
* Other digital reading experiences
  * [Pelican Books](https://www.pelicanbooks.com) → read online (Unreachable Host)
    * [How Pelican Books is reimagining the cover in the digital age of eBooks](http://www.fastcodesign.com/3038698/how-pelican-books-is-reimagining-the-cover-in-the-age-of-e-books)
    * [Pelican Books: an unrivalled online reading experience](https://www.creativereview.co.uk/cr-blog/2014/november/pelican-books-an-unrivalled-online-reading-experience/)
  * [The Shape of Design](http://shapeofdesignbook.com) by Frank Chimero
    * [Designing in the borderlands](http://www.frankchimero.com/writing/designing-in-the-borderlands/)
  * Butterick’s [Practical Typography](http://practicaltypography.com)
    * The publishing system that powers the book: [Pollen](http://docs.racket-lang.org/pollen/)
  * [Hi](https://hi.co/) (No longer active)
    * [Background](https://craigmod.com/essays/hitotoki_narrative_mapping/)
  * [Art Space Tokyo](http://read.artspacetokyo.com/)
    * [Platforming Books](http://craigmod.com/journal/platforming_books/)
  * [Pubpub](https://www.pubpub.org/)
