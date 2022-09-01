# Building long-form content on the web

# Building long-form content on the web: OpenType features

OpenType fonts, both static and variable, make additional features available for developers to use.

CSS makes these features available via the `font-feature-settings` property.

Just like with font variations in variable fonts, we can use tools like [Wakamaifondue](https://wakamaifondue.com) to see what OpenType features are available (since they vary based on the font) and to download a stylesheet with all CSS necessary to use the features on your own project.

We first set custom properties for each of the available OpenType layout feature on the `:root` pseudo element. We set them disabled by default so we can enable them for specific elements and classes.

```css
:root {
  --recursive-aalt: "aalt" off;
  --recursive-afrc: "afrc" off;
  --recursive-case: "case" off;
  --recursive-dlig: "dlig" off;
  --recursive-dnom: "dnom" off;
  --recursive-frac: "frac" off;
  --recursive-numr: "numr" off;
  --recursive-ordn: "ordn" off;
  --recursive-pnum: "pnum" off;
  --recursive-sinf: "sinf" off;
  --recursive-ss01: "ss01" off;
  --recursive-ss02: "ss02" off;
  --recursive-ss03: "ss03" off;
  --recursive-ss04: "ss04" off;
  --recursive-ss05: "ss05" off;
  --recursive-ss06: "ss06" off;
  --recursive-ss07: "ss07" off;
  --recursive-ss08: "ss08" off;
  --recursive-ss09: "ss09" off;
  --recursive-ss10: "ss10" off;
  --recursive-ss11: "ss11" off;
  --recursive-ss12: "ss12" off;
  --recursive-ss20: "ss20" off;
  --recursive-sups: "sups" off;
  --recursive-titl: "titl" off;
  --recursive-zero: "zero" off;
}
```

We then define how we'll change and use these custom properties. Wakamaifondue uses a combination of [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Conditional_Rules/Using_Feature_Queries) and classes to define where the properties will change and how to use the correct [font-variant-*](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) in browsers that support the properties.

<div class="message info">
  <p>The `font-variant-*` properties currently in the specification are:

  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures">font-variant-ligatures</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position">font-variant-position</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps">font-variant-caps</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric">font-variant-numeric</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates">font-variant-alternates</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian">font-variant-east-asian</a></li>
  </ul>
</div>

```css
.recursive-aalt {
    --recursive-aalt: "aalt" on;
}

.recursive-afrc {
    --recursive-afrc: "afrc" on;
}

@supports (font-variant-numeric: stacked-fractions) {
    .recursive-afrc {
        --recursive-afrc: "____";
        font-variant-numeric: stacked-fractions;
    }
}

.recursive-case {
    --recursive-case: "case" on;
}

.recursive-dlig {
    --recursive-dlig: "dlig" on;
}

@supports (font-variant-ligatures: discretionary-ligatures) {
    .recursive-dlig {
        --recursive-dlig: "____";
        font-variant-ligatures: discretionary-ligatures;
    }
}

.recursive-dnom {
    --recursive-dnom: "dnom" on;
}

.recursive-frac {
    --recursive-frac: "frac" on;
}

@supports (font-variant-numeric: diagonal-fractions) {
    .recursive-frac {
        --recursive-frac: "____";
        font-variant-numeric: diagonal-fractions;
    }
}

.recursive-numr {
    --recursive-numr: "numr" on;
}

.recursive-ordn {
    --recursive-ordn: "ordn" on;
}

@supports (font-variant-numeric: ordinal) {
    .recursive-ordn {
        --recursive-ordn: "____";
        font-variant-numeric: ordinal;
    }
}

.recursive-pnum {
    --recursive-pnum: "pnum" on;
}

@supports (font-variant-numeric: proportional-nums) {
    .recursive-pnum {
        --recursive-pnum: "____";
        font-variant-numeric: proportional-nums;
    }
}

.recursive-sinf {
    --recursive-sinf: "sinf" on;
}

.recursive-ss01 {
    --recursive-ss01: "ss01" on;
}

.recursive-ss02 {
    --recursive-ss02: "ss02" on;
}

.recursive-ss03 {
    --recursive-ss03: "ss03" on;
}

.recursive-ss04 {
    --recursive-ss04: "ss04" on;
}

.recursive-ss05 {
    --recursive-ss05: "ss05" on;
}

.recursive-ss06 {
    --recursive-ss06: "ss06" on;
}

.recursive-ss07 {
    --recursive-ss07: "ss07" on;
}

.recursive-ss08 {
    --recursive-ss08: "ss08" on;
}

.recursive-ss09 {
    --recursive-ss09: "ss09" on;
}

.recursive-ss10 {
    --recursive-ss10: "ss10" on;
}

.recursive-ss11 {
    --recursive-ss11: "ss11" on;
}

.recursive-ss12 {
    --recursive-ss12: "ss12" on;
}

.recursive-ss20 {
    --recursive-ss20: "ss20" on;
}

.recursive-sups {
    --recursive-sups: "sups" on;
}

@supports (font-variant-position: super) {
    .recursive-sups {
        --recursive-sups: "____";
        font-variant-position: super;
    }
}

.recursive-titl {
    --recursive-titl: "titl" on;
}

@supports (font-variant-caps: titling-caps) {
    .recursive-titl {
        --recursive-titl: "____";
        font-variant-caps: titling-caps;
    }
}

.recursive-zero {
    --recursive-zero: "zero" on;
}

@supports (font-variant-numeric: slashed-zero) {
    .recursive-zero {
        --recursive-zero: "____";
        font-variant-numeric: slashed-zero;
    }
}
```

The final step is to apply the current state of all custom properties whenever a class is being used.

Like with the `font-variation-settings`, we are using the low-level `font-feature-settings` property and can't just change one and expect it to work so whenever we change one custom property, we propagate the changes everywhere.

```css
.recursive-aalt,
.recursive-afrc,
.recursive-case,
.recursive-dlig,
.recursive-dnom,
.recursive-frac,
.recursive-numr,
.recursive-ordn,
.recursive-pnum,
.recursive-sinf,
.recursive-ss01,
.recursive-ss02,
.recursive-ss03,
.recursive-ss04,
.recursive-ss05,
.recursive-ss06,
.recursive-ss07,
.recursive-ss08,
.recursive-ss09,
.recursive-ss10,
.recursive-ss11,
.recursive-ss12,
.recursive-ss20,
.recursive-sups,
.recursive-titl,
.recursive-zero {
    font-feature-settings: var(--recursive-aalt), var(--recursive-afrc), var(--recursive-case), var(--recursive-dlig), var(--recursive-dnom), var(--recursive-frac), var(--recursive-numr), var(--recursive-ordn), var(--recursive-pnum), var(--recursive-sinf), var(--recursive-ss01), var(--recursive-ss02), var(--recursive-ss03), var(--recursive-ss04), var(--recursive-ss05), var(--recursive-ss06), var(--recursive-ss07), var(--recursive-ss08), var(--recursive-ss09), var(--recursive-ss10), var(--recursive-ss11), var(--recursive-ss12), var(--recursive-ss20), var(--recursive-sups), var(--recursive-titl), var(--recursive-zero);
}
```

### Font size and reading distance

### Justification and hyphenation

### Drop caps?

### Underlines

* [text-decoration-line](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line)
* [text-decoration-color](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color)
* [text-decoration-style](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style)
* [text-decoration-thickness](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness)

.

* [text-underline-offset](https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset)

## Columns?

[When Do You Use CSS Columns?](https://css-tricks.com/when-do-you-use-css-columns/)

## Skip to content

[A Deep Dive on Skipping to Content](https://css-tricks.com/a-deep-dive-on-skipping-to-content/)

[How to Create a “Skip to Content” Link](https://css-tricks.com/how-to-create-a-skip-to-content-link/)

## Giving users control

control panel idea.

## Making it work on mobile

## Further thoughts

### The web is not apps

### The web can be like print

## The webby part of long-form content

### Use the web to enhance the text

[hi](https://hi.co) (there is an archive available at [hitotoki.org](https://hitotoki.org/)

Art Space Tokyo (the [essay about it](https://craigmod.com/journal/platforming_books/) and the [online version](https://read.artspacetokyo.com/) of the book)

[the shape of design](https://shapeofdesignbook.com/)

### Working offline and updating your content

### Handling images

### Links and Resources

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