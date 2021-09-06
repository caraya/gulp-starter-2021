# Books as applications

What would it take to make our books in to applications for the web? In this article we'll explore what is an application, what is a web application, why it now makes sense to turn our books in to web applications.

## What is an application? What is a web application?

>Application software (an application) is a set of one or more programs designed to permit the user to perform a group of coordinated functions, tasks, or activities. Application software cannot run on itself but is dependent on system software to execute. Examples of an application include a word processor, a spreadsheet design and management system, an aeronautical flight simulator, a console game, a drawing, painting, and illustrating system, or a library management system. [1]

>From [Wikipedia](https://www.wikiwand.com/en/Application_software)


> A web application or web app is any software that runs in a web browser. It is created in a browser-supported programming language (such as the combination of JavaScript, HTML and CSS) and relies on a web browser to render the application.[1][2][3]

>Web applications are popular due to the ubiquity of web browsers, and the convenience of using a web browser as a client, sometimes called a thin client. The ability to update and maintain web applications without distributing and installing software on potentially thousands of client computers is a key reason for their popularity, as is the inherent support for cross-platform compatibility. Common web applications include webmail, online retail sales, online auctions, wikis and many other functions.

>From [Wikipedia](https://www.wikiwand.com/en/Web_application)

## Open Web versus OS-specific Apps

It hasn't been long since browser (Chrome and Firefox) and Operating System Vendors (Microsoft) allow web content to live in the OS as applications subject to packaging and usage restrictions.

I've chosen to remain platform neutral as much as possible.

The idea is that we'll use 'The Web' as out application environment where both mobile and desktop users can use the same content. The moment we introduce OS specific features we invite what I call the 'why not my OS' syndrome... it's just not worth it when the web is getting more and more powerful as an application environment all the time.

Mobile devices also have web browsers so we can use the web version in Mobile and we'll take advantage of that for some mobile browsers (See iOS icons and splash screens, below.)

## The DRM/EME monster rears its ugly head

One issue that needs to be addressed is Digital Rights Management or DRM.

People look at DRM as a way to preserve intellectual property and to keep people from giving away or lending books that they did not buy.

But DRM is not a perfect (or even a good) solution. Here are some reasons:

* The DRM schemas can be broken and the content can still be given away. It is not a trivial exercise, true. But it's not very difficult either
* If your ebook provider goes under you will loose access to your books unless the seller has made arrangements to continue supporting the DRM scheme
* You're locked to your vendor. Amazon, Apple and Barnes and Nobles all use different DRM schemes and they are not compatible. You may still be locked to your vendor without DRM but it would make switching readers easier if they use a common format without restrictions

Ian Hickson [writes about DRM](https://plus.google.com/+IanHickson/posts/iPmatxBYuj2). In one of the last paragraphs of the post, Hickson observes that:

> Arguing that DRM doesn't work is, it turns out, missing the point. DRM is working really well in the video and book space. Sure, the DRM systems have all been broken, but that doesn't matter to the DRM proponents. Licensed DVD players still enforce the restrictions. Mass market providers can't create unlicensed DVD players, so they remain a black or gray market curiosity. DRM failed in the music space not because DRM is doomed, but because the content providers sold their digital content without DRM, and thus enabled all kinds of players they didn't expect (such as "MP3" players). Had CDs been encrypted, iPods would not have been able to read their content, because the content providers would have been able to use their DRM contracts as leverage to prevent it.

This is not just an academic exercise on freedom of expression. Publishers like O'Reilly (described [here](http://toc.oreilly.com/2010/01/2009-oreilly-ebook-revenue-up-104-percent.html) and [here](http://boingboing.net/2010/01/22/oreilly-drops-ebook.html)) and [Tor](http://www.tor.com/blogs/2013/04/tor-books-uk-drm-free-one-year-later) have removed DRM from their books and, while the books have been widely pirated, sales have not decreased and have seen a modest improvement. I'll try to get information from O'Reilly with updated figures and will update the article when/if I received an answer.

In 2009, David Pogue, a technology columnist from the New York Times, wrote a piece about [ebooks and copy protection](http://www.nytimes.com/2009/12/17/technology/personaltech/17pogue-email.html). In the article one of his readers sums up what, to me, the real issue:

>"When the iPod introduced music lovers to the idea of copy protection, a years-long war ensued between consumers and the RIAA (and others). The primary issue was that if I purchased a song for my music player, it would only play on that player; I didn't really own it, per se. Years later, we finally have digital music without copy protection."

This was reinforced when Amazon [deleted books from Kindle readers in 2009](http://www.nytimes.com/2009/07/18/technology/companies/18amazon.html) and later in 2012 allegedly [wiped a user's entire Kindle library](http://www.theguardian.com/money/2012/oct/22/amazon-wipes-customers-kindle-deletes-account).

While I understand publishers' positions, DRM is not the answer any more than it was in the Music industry when Apple introduced the iPod. If we can consistently prove that removing DRM will not damage sales and will improve t he user experience the more we can get publishers to stop thinking in terms of absolute sales as the only goal that matters.

Although not directly related to DRM, in the sense that they don't provide the full set of access restrictions DRM does, [Encrypted Media Extensions (EME)](http://www.w3.org/TR/encrypted-media/) provide a similar platform for building restrictions to video content on the web. 

I mention EME briefly because it will become the next battleground in the fight between content distributors and content consumers. The best explanation of what EME is and how it affects the web and its ideals is a page titled [What is EME](https://hsivonen.fi/eme/) by Henri Sivonen.

What worries me the most is the fact that in the case of Firefox:, as mentioned by [Cory Doctorow](http://www.theguardian.com/technology/2014/may/14/firefox-closed-source-drm-video-browser-cory-doctorow):

>The inclusion of Adobe’s DRM in Firefox means that Mozilla will be putting millions of its users in a position where they are running code whose bugs are illegal to report. So it’s very important that this code be as isolated as possible.

All browsers have some level of support for EME. Firefox has announced their [intent to implement EME](https://hacks.mozilla.org/2014/05/reconciling-mozillas-mission-and-w3c-eme/), Google and Apple already support parts (in the case of Google) and all of the specs (Apple) to fully encrypt video content. At least 3 of these browsers: Firefox, Chrome and Opera (or Chrome Jr.) have open bug reporting systems; how will they be affected by these new restrictions on the propietary software that makes EME?

Netflix [seems to have gotten away with EME](http://techblog.netflix.com/2014/06/html5-video-in-safari-on-os-x-yosemite.html), at least for now. MSE, EME, and Web Cryptography APIs to fully control when, how and who can access their content. An earlier post in their [http://techblog.netflix.com/2013/04/html5-video-at-netflix.html](technlogy blog) seems to indicate that the technologies are also supported in ChromeOS (with the exception of the Crypto API) and that when Web Crypto is implemented in Chrome then they will move to encrypting all content viewable in Chrome for all platforms.

It'll be interesting to see how this evolves and what other areas it moves to beyond video. It wouldn't surprise me if publishers moved for a similar scheme for epub books and mixed epub/web content. For an interesting discussion about DRM listen to [The Web Ahead, Episode 73](http://thewebahead.net/73) with Doug Scheppers and Jeremy Keith. 

##Online versus offline

One specific type of enhancement we'll discuss before jumping into the bells and whistles is whether we should add offline caching.

The APIs are in progress. Chrome supports most of the APIs we need to create offline capable applications as part of ServiceWorkers (they support cache, through polyfill, push messaging and notification) whether the page using them is open or not. While the Chrome implementation only support [Google Cloud Messaging](https://developer.chrome.com/apps/cloudMessaging) the idea is that we'll soon have an open source solution to the push and notification challenges we currently face. So, unless you're already working with GCM and ther other required technologies it may be better to see what the open web has to offer when the specifications are finalized.

The idea behind push and background notificationscan is that now build we can build a fully responsive user experience that will work on and offline and notify the user on specified events, such as updated content, and the application doesn't even need to be running to do so.

I've written about ServiceWorkers when discussing [Athena](http://publishing-project.rivendellweb.net/athena-what-an-ofline-web-reading-experience-may-look-like/) as an offline reading experience so I won't repeat all the rationale and code here.

In an [HTML5 Rocks](http://updates.html5rocks.com/2015/02/offline-first-with-sw-precache) article Jeff Posnick describes how we can automate the creation of a caching service worker using Gulp.

```javascript
gulp.task('generate-service-worker', function(callback) {
  var fs = require('fs');
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache({
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, function(error, swFileContents) {
    if (error) {
      return callback(error);
    }
    fs.writeFile(path.join(rootDir, 'service-worker.js'), swFileContents, callback);
  });
});
```

## Enhancing the user experiences

Offline content caching is just part of the exercise. The other part is what additional tools, libraries and scripts we add to our web documents and how will they work in an offline environment.

For each of the technologies discussed below I'll provide a brief summary and why I chose the technology.

One thing to realize from the beginning is that, while I chose to show all possible technologies, some of these are part of the build process for our site/app they are still important and need to be mentioned

### Modernizr and Modernizr.load

[Modernizr](http://modernizr.com/) makes it easier to use new HTML5 tags and APIs and CSS3 technologies in a way that will also provide graceful degradation for our content.

We can leverage Modernizr from both CSS and Javascript.

For CSS Modernizr will add classes for each feature tested depending on whether it supports a feature (regions would be the class if regions are supported) or not (no-regions in that case).

```javascript
.video .highlight {}

.no-video .highlight {}
```

For Javascript Modernizr creates an object and attaches all successful tests. for examplle, if we wanto to test if a browser supports video we can do something like this:

```javascript
if (modernizr.video) {
  console.log ('we can play video');
  // load the vide or do furhter testing
} else {
  console.log ('we cannot play video, need polyfill');
  // load an alternative, perhaps the solution from
  // video for everyone
}
```

Modernizr.load uses Modernizr's feature detection libarry to conditionally load content based on feature availability. Continuing with our video example, if the browser supports HTM5 video and can play h264 (MP4) video we load the `video.js` otherwise (cannot play h264 or cannot play HTML5 video altogher) we load a polyfill library or, most likely the solution presented in [Video for everybody](http://camendesign.com/code/video_for_everybody) by Kroc Camen.

```javascript
Modernizr.load({
  test: Modernizr.video &amp;&amp; Modernizr.video.h264,
  yep : 'video.js',
  nope: 'video-polyfill.js'
});
```

There are ways to test for features without using Modernizr, but they all require lots of testing and they are not guaranteed to work on every browser.

### Normalize.css

Normalize is a CSS library that provides an event and better playing field. In addition to providing the functionality of a CSS Reset library (Like Eric Meyer's [CSS Reset](http://meyerweb.com/eric/tools/css/reset/) with added functionality.

>It [Normalize] fixes common desktop and mobile browser bugs that are out of scope for resets. This includes display settings for HTML5 elements, correcting font-size for preformatted text, SVG overflow in IE9, and many form-related bugs across browsers and operating systems.

For a more detailed explanation see Nicolas Gallagher [post abut Normalize.css](http://nicolasgallagher.com/about-normalize-css/)

### Singularity / Susy Grid System

[Singularity](http://singularity.gs/) is a Grid System designed with repsponsive grids in mind. From the documentation:

>Singularity is a next generation grid framework built from the ground up to be responsive. What makes Singularity different? Well, a lot of things. Singularity is based on internal ratios instead of context based which allows for better gutter consistency across breakpoints. Ratio based math also allows for non-uniform grids in any unit you want to use.

If you're used to working with SASS and Compass then it's a breeze to work with Singularity; however that's where the problem is: you must work with the Ruby version of SASS and you must work with Compass. Integrating Ruby, SASS installation and compilation and Compass is not a small undertaking so I try to avoid it where possible.

[Susy](http://susy.oddbird.net/) is a more flexible framework; It provides the same functionality without requiring Compass. It also plugs in with existing Grunt SASS tasks, something like this (ignore the syntax for the moment, we'll revisit Grunt and Gulp later in the article):

```javascript
// Gruntfile.js
sass: {
  dist: {
    options: {
      style: 'expanded',
      require: 'susy'
    },
    files: {
        'css/style.css': 'scss/style.scss'
    }
  }
}
```

Beyond the obvious use of grids to provide a consistent interface to layout content they provide answer to more complicated questions: How do we create layouts with columns of arbitrary width (using percentages or rem units)? How do we span multiple columns? How do we change the gutter for our layout (or parts of the layout)?

### Media Queries Support

I am lazy. Even though I have defined my own set of media queries and even took into account different screen sizes and resolutions, it's not something that I want to maintain long-term. [Breakpoint](http://breakpoint-sass.com/) to the rescue!

Breakpoint abstracts a lot of the work in creating Mediaqueries. It includes support for [when queries are not supported](http://github.com/at-import/breakpoint/wiki/No-Query-Fallbacks), ability to [pass a context to your own mixins](https://github.com/at-import/breakpoint/wiki/Breakpoint-Context) and [advanced media queries](https://github.com/at-import/breakpoint/wiki/Advanced-Media-Queries) including: compound queries, density-based and media types.

In an ideal world all browsers would have the same support for the same features and we wouldn't have to deal with inconsistencies. Media Queries are one step in solving these issues.

### Prefix Free and UNCSS

If I don't have to write it usually I won't. On the other hand there are times when the accumulation of cruft (old classes the are no longer used) or the sheer size of a framework (think Twitter Bootstrap, Zurb Foundation or Adobe Top Coat) versus the classes from the framework we actually use make for bloated CSS and unnecessary data being sent over the wire.

Addy Osmani [has written about this problem along with a potential solution](http://addyosmani.com/blog/removing-unused-css/). UNCSS will load the HTML and CSS using Phantom.js and then create a new CSS file using only those selectors that match content in the HTML files. The savings can reach the 100k mark (!).

PrefixFree is a Javascript library that automates vendor prefixes for CSS selectors. The classic example is border radius, there are 5 nearly identical ways to address the same property (WebKit, Chrome/Opera, Mozilla, IE and Standard). Prefix Free takes care of the differences so we don't have to

When we discuss tooling we'll talk about grunt-autorprefixer, which removes the Javascript library while achieving the same effect of prefixing content as needed for the browsers we specify.

As I mentioned, I'm lazy and don't want to write any more code than absolutely necessary have to. This is one way to reduce the code count

### Typography

[Compass Typography](http://compass-style.org/reference/compass/typography/) suffers from the same issues as all Compass-related plugins do. They depend on Compass which in turns depends on having Ruby installed on your system. Again, don't get me wrong, I think compass is awesome but it's not always necessary and it adds bloating to the resulting CSS.

[Typeplate](http://typeplate.com/) takes a minimalist approach to framework development. It doesn't do much but what it does well and it does simply. It provides a minimal set of HTML models and corresponding SCSS/CSS templates. You can use it as-is or you can enhance it

The idea of using SASS/CSS typography solutions is that it makes it easier to create your content. You don't always have to stick with what the framework has to offer... I've always considered CSS frameworks to be a starting point for my own work and not and end in and of itself.

Neither of the alternatives offers answers to how to load the fonts on the page. Depending on the fonts we may be able to leverage services like [fonts.com](http://www.fonts.com/), [Adobe Typekit](https://typekit.com/), [Font Squirrel](http://www.fontsquirrel.com/), [Google](http://www.google.com/fonts/) and [Font Deck](http://fontdeck.com/), among others, to handle the download of your fonts.

Some of the best fonts are not available through font services. If you're sure the font matches your needs and the license available (in most cases it's a different license for web and ebooks) you can host the font on your server and use it from there. There are ups and downs like having to provide for font obfuscation and other security measures to having a wider selections of fonts to license and use.

Note the different versions of the same font you have to support to be compatible with most (all?) existing browsers. You probably can do away with supporting IE6 - IE8 if you can but that still leaves you with 5 different formats for each font you want to support (you can convert your woff font to woff2 using this [online converter](https://everythingfonts.com/woff-to-woff2).)

We can embed fonts in our web sites (assuming that we have the license for doing so) with a command like this in our main CSS style sheet:

```css
@font-face {
  font-family: Open Sans';
  src: url('opensans.eot'); /* IE9 Compat Modes */
  src: url('opensans.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('opensans.woff2') format('woff2'), /* Super Modern Browsers */
       url('opensans.woff') format('woff'), /* Pretty Modern Browsers */
       url('opensans.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('opensans.svg#svgFontName') format('svg'); /* Legacy iOS */
}
```

And then use the font as you would normally in a font-family instructions.

```css
body {
  background: #efefef;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 24px;
  padding: 50px;
}
```

CSS Tricks has an interesting [article](https://css-tricks.com/snippets/css/using-font-face/) explaining how to use web fonts.

#### WebFont Loader

The [Web Font Loader](https://github.com/typekit/webfontloader) is a joint project between Typekit and Google that provides tighter control over your fonts loadings process. Main advantage of a system like this is that you can work with fonts from different vendors and reduce the likelihood of the dreaded 'Flash of Unstyled Content'.

#### Modular scales

[modularscale.com](http://www.modularscale.com/) and its companion [SASS Module](https://github.com/modularscale/modularscale-sass) provide an easier way to incorporate the scale into you projects.

#### Drive before you buy

Services like [Typecast.com](http://typecast.com/) allow you to test fonts in a fully responsive environment with your own text before you commit to using the font in your project. Until recently I thought that was not necessary and that we'd only have to test on devices. This is no longer the case, we should test as much as possible in as many devices as possible.

#### References

I love The Web Ahead. I think Jenn Simmons does an awesome job in selecting her guests and having meaningful and insightful conversations about the web; not just the technology but what makes the web work.

This was specially true about the typography episodes where she's talked to people who have changed the way that I look at fonts and how we use them on the web. The podcasts (in reverse chronological order) are:

* [Delivering Typography](http://thewebahead.net/87) with Jason Pamental
* [Wrangling Typefaces](http://thewebahead.net/83) with Jason Santa Maria
* [Typography](http://thewebahead.net/30) with Richard Rutter

### Picture elements and responsive images

Wouldn't it be nice if we could use something like Media Queries for images? We can... it's the `picture` element.

The picture element attempts to solve 4 issues / Answer 4 questions:

* Can I serve different image sizes based on some attribute of the browser accessing the page?
* Can I provide different images based on DPI?
* Can I provide different image formats based on device capability? (For example, not all browsers support WebP)
* Can I provide different images based on my art direction requirements? (full size images may be overkill for smaller devices)

The example below, taken from Opera Developer's site[article on responsive images](https://dev.opera.com/articles/responsive-images/) takes the extreme view of supporting all 4 use cases for responsive images.

For browser windows with a width of 1280 CSS pixels and wider, a full-shot photo with a width of 50% of the viewport width is used; for browser windows with a width of 640-1279 CSS pixels, a photo with a width of 60% of the viewport width is used; for less wide browser windows, a photo with a width that is equal to the full viewport width is used. In each case, the browser picks the optional image from a selection of images with widths of 200px, 400px, 800px, 1200px, 1600px and 2000px, keeping in mind image width and screen DPI. These photos are served as WebP to browsers that support it; other browsers get JPG.

```html
&lt;picture>
  &lt;source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="opera-fullshot-200.webp 200w,
            opera-fullshot-400.webp 400w,
            opera-fullshot-800.webp 800w,
            opera-fullshot-1200.webp 1200w,
            opera-fullshot-1600.webp 1600w,
            opera-fullshot-2000.webp 2000w"
    type="image/webp">
  &lt;source
    sizes="(min-width: 640px) 60vw, 100vw"
    srcset="opera-closeup-200.webp 200w,
            opera-closeup-400.webp 400w,
            opera-closeup-800.webp 800w,
            opera-closeup-1200.webp 1200w,
            opera-closeup-1600.webp 1600w,
            opera-closeup-2000.webp 2000w"
    type="image/webp">
  &lt;source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="opera-fullshot-200.jpg 200w,
            opera-fullshot-400.jpg 400w,
            opera-fullshot-800.jpg 800w,
            opera-fullshot-1200.jpg 1200w,
            opera-fullshot-1600.jpg 1800w,
            opera-fullshot-2000.jpg 2000w">
  &lt;img
    src="opera-closeup-400.jpg" alt="The Oslo Opera House"
    sizes="(min-width: 640px) 60vw, 100vw"
    srcset="opera-closeup-200.jpg 200w,
            opera-closeup-400.jpg 400w,
            opera-closeup-800.jpg 800w,
            opera-closeup-1200.jpg 1200w,
            opera-closeup-1600.jpg 1600w,
            opera-closeup-2000.jpg 2000w">
&lt;/picture>
```

Sure, this takes a lot more work to setup both in terms of preparing images of different sizes and resolutions and in terms of preparing your HTML to accomodate all your needs but we can now finally stop depending on servers to convert our images or provide a one-size-fits all solution.

### ServiceWorker caching

I ran my first experiment with ServiceWorkers as part of my [Athena Framework](https://github.com/caraya/athena-framework) Experiment where the idea was (and still is) to cache content for offline viewing so that network becomes another layer of enhancement as we only need to be online the first time we access out content and the cache will display the content whether we are online or not.

If you use Chrome as your primary development platform you can take advantage of Push Messaging (Google Cloud Messagin) and Background notification to enhance your users' experience but only tied to the Google echo system.

Despite the advantages I've decided to hold off on Push and Background Notification and concentrate on caching the content. Once the open APIs for Push and Background notification reach candidate recommendation status (meaning that there are two interoperable implementations available in the wild) I will revisit the issue.

### Emphasis deep Linking

The [Emphasis Library](https://github.com/NYTimes/Emphasis) was initially developed by [The New York Times](http://open.blogs.nytimes.com/2011/01/11/emphasis-update-and-source/) as a highlighting and deep linking library. What caught my attention is that you're not limited to single user linking; you can share the link and it will display the same highlights and annotations that you created.

Emphasis was initially developed as a jQuery plugin which made it less attractive as someone who wanted to develop a dependecy-free framework. When I revisited the plugin I had decided to use jQuery anyways and the pluging had moved away from jQuery as a dependency.

Even though I chose to make jQuery available I was still pleasantly surprised to see the code be made jQuery-free.

### Highlight.js

A lot of what I write is web-related with lots of code examples for HTML, CSS and Javascript. I know for certain that I don't want to do the highlighting by hand.

There are many code highlighting libraries available. I chose [highlight.js](http://open.blogs.nytimes.com/2011/01/11/emphasis-update-and-source/) for HTML as well as PDF generated from XML.

I love the library's breadth of supported languages and the work it saves makes it totally worth it.

Another library worth looking at is [Prism.js](http://prismjs.com/)
      

### Regions and Shapes

If we'll push the envelope then I want to be able to push the envelope in terns of the technologies that will make the user experience more engaging and interactive content.

I've written about shapes both [as a new technology](http://publishing-project.rivendellweb.net/css-shapes-an-update-and-an-expansion/) and [in conjunction with svg clip paths](http://publishing-project.rivendellweb.net/svg-clip-path-and-shapes-an-interesting-alternative/).

Shapes can provide better drop cap support (by wrapping closer to the shape of the letter) and can provide better floated text with different shapes.

Support is inconsistent and must be polyfilled in order to work accross the board. See the [polyfill readme file](https://github.com/adobe-webplatform/css-shapes-polyfill/blob/master/README.md) for more information on how to use the polyfill and what browsers are supported.

[Regions](http://publishing-project.rivendellweb.net/css-regions-part-2/) provide a different way to layout the content that doesn't involve tables and doesn't require Javascript.

### OS Specific Home Screen Icons and Splash Screens

While I remain committed to keeping this project on the web, there are enhancements we can make to provide a better experience in mobile without loosing the desktop experience.

The downside is that these enhancements are platform specific. Every time we add this functionality we must do so for each browser.

#### iOS icons and splash screens

When iOS was first introduced one of the features that first caught my attention was the ability to save web sites to the home screen and use them as an online-only web application. I always thought that it was something only full applications or apps from larger companies could do. It wasn't until I read the [Configuring Web Applications](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) section of the Safari Web Content Guide that I realized that it was hard work but it was doable by anyone.

We add the following elements to the head of our content page (not 100% sure if this is for every page or only for the index). The first set of resources deal with fixing the width of the device to a 1 to 1 scale window, full screen and no app bar at the top of the application.

```html
&lt;meta name="viewport" content="user-scalable=no, initial-scale=1.0" />
&lt;meta name="apple-mobile-web-app-capable" content="yes" />
&lt;meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

The second block adds the application icons that will appear in the home screen when we add the site/app. We have to add multiple icons to account for different screen size/resolution/DPI combinations available to different devices.

```html
&lt;!-- iOS ICONS AND START SCREENS -->
&lt;link rel="apple-touch-icon" href="/images/misc/apple-touch-icon-57x57.png" />
&lt;link rel="apple-touch-icon" sizes="72x72" href="/images/misc/apple-touch-icon-72x72.png" />
&lt;link rel="apple-touch-icon" sizes="114x114" href="/images/misc/apple-touch-icon-114x114.png" />
```

The final step is to add the spalsh screen that will appear while the site is loading. As with the icons, we have to account for different size/resolution/DPI combinations for different devices.

```html
&lt;!-- iPhone/iPod Touch Portrait – 320 x 460 (standard resolution) -->
&lt;!-- These are not all available resolutions, do your homework -->
&lt;link rel="apple-touch-startup-image" href="/images/misc/splash-screen-320x460.png" media="screen and (max-device-width: 320px)" />

&lt;!-- For iPad Landscape 1024x748 -->
&lt;link rel="apple-touch-startup-image" sizes="1024x748" href="/images/misc/splash-screen-1024x748.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)" />

&lt;!-- For iPad Portrait 768x1004 (high-resolution) -->
&lt;link rel="apple-touch-startup-image" sizes="1536x2008" href="/images/misc/splash-screen-1536x2008.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) and (-webkit-min-device-pixel-ratio: 2)"/>
```
#### Windows8 application tiles

Windows 8 (in tablets and phones) allows applications to be tiled on the start screen. We can take advantage of this feature by going to [buildmypinnedsite.com](http://www.buildmypinnedsite.com/en) completing the form and download the resulting kit. We can the paste the code below on the head of our pages and upload the associated images to the server.

```html
&lt;-- Windows 8+ tile stuff -- Assumes all content is uploaded to server -->
&lt;meta name="application-name" content="My Awesome Site"/>
&lt;meta name="msapplication-TileColor" content="#e809e8"/>
&lt;meta name="msapplication-square70x70logo" content="tiny.png"/>
&lt;meta name="msapplication-square150x150logo" content="square.png"/>
&lt;meta name="msapplication-wide310x150logo" content="wide.png"/>
&lt;meta name="msapplication-square310x310logo" content="large.png"/>
```

#### Chrome on Android

Chrome takes a two-prong approach to adding web apps to the homescreen. First it asks to link to a json manifest file (in the example below I called it `manifest.json`

```html
&lt;link rel="manifest" href="manifest.json">
```

The manifest itself looks like this:

```json
{
  "name": "Web Application Manifest Sample",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36",
      "type": "image/png",
      "density": "0.75"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48",
      "type": "image/png",
      "density": "1.0"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72",
      "type": "image/png",
      "density": "1.5"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96",
      "type": "image/png",
      "density": "2.0"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144",
      "type": "image/png",
      "density": "3.0"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192",
      "type": "image/png",
      "density": "4.0"
    }
  ],
  "start_url": "index.html",
  "display": "standalone",
  "orientation": "portrait"
}
```

More information on the [Chrome Developers' site](https://developer.chrome.com/multidevice/android/installtohomescreen)
      

### jQuery

jQuery has always been a touchy subject for me. On the one hand it is still a good library to smooth out browser idiosyncracies and to provide a common interface for developers to work. I usually chose jQuery over Dojo (even though I think Dojo is the better library) because of all the plugins available and the relative ease of implementing your own.

The problem I have is not really with jQuery but with the people who use the technology without understanding what it does, how it works and how to modify it when needed.

I tend not to use jQuery much but make it available in case there are plugins that the creator may want to use.

#### The two sides of jQuery

Below are 2 views on the jQUery debate. I will let you decide for yourself if this is worth it.

[@zackbloom](http://twitter.com/zackbloom) and [adamfschwartz](http://twitter.com/adamfschwartz) created [You Might Not Need jQuery](http://youmightnotneedjquery.com/) to show developers that jQuery is not the only way to achieve web effect and support older browsers. They use IE as an example, probably because older versions of IE is the most problematic of browsers

John-David Dalton, Paul Irish created a document outlining [browser bugs jQuery fixes](https://docs.google.com/document/d/1LPaPA30bLUB_publLIMF0RlhdnPx_ePXm7oW02iiT6o/edit#) as an answer to You May Not Need jQuery. They point out that:

>While the sentiment of youmightnotneedjquery is great, developers should be aware that ditching libraries, like jQuery, can easily require large amounts of research on their end to avoid bugs (even in modern browsers). The snippets provided by youmightnotneedjquery are a starting point but hardly scratch the surface of being a solid robust replacement to jQuery.

> The great thing about an established library, like jQuery, is it’s hammered on by lots of talented people, transparently improved, and refined by the community. jQuery core is very careful not to bloat their codebase and does not add features or fixes without serious consideration and peer review. If it’s in jQuery that means it’s addressing real compatibility issues. 

### stayInApp jQuery Plugin

One of the annoyances of working on mobile browsers is that clicking on links takes you out of the full screen experience into Safari's interface.There is a jQuery plugin designed to keep you in your web application when you click on links and, thus, preserving your application's experience.

[The Plugin](https://github.com/mrmoses/jQuery.stayInWebApp) only works for iOS and it takes advantage of the ability to detect when iOS is in [full screen mode](http://www.bennadel.com/blog/1950-detecting-iphone-s-app-mode-full-screen-mode-for-web-applications.htm)

I'm looking for ways to provide and equivalent functionality for Android and Windows.

## Tooling and Automation

For most web-related project I've used Grunt as my task runner. Grunt was the first software I used to run commands like I used to do with Ant and Make in a pure Javascript environment. sometimes it gets painfully slow but nowhere near as slow as Ant used to be.

Grunt automates all the tasks that I need in a project: convert from SASS to CSS, concatenate and minnify all third party Javascript libraries and plugins, use Autoprefixer and UNCSS on the generated CSS and save it with the same name, copy all the resources needed into a distribution folder and even publish the distribution to Github's gh-pages branch.

Gulp is similar to Grunt but it starts from a different premise. Where Grunt puts the emphasis on configuring the task to run, Gulp gives developers the flexibility to create their own tasks to work anyway they want and only enforces how these tasks connect to each other. put in another way: "Grunt focuses on configuration, while Gulp focuses on code." 

```javascript
sass: {
  dev: {
    options: {
      style: 'expanded'
    },
    files: [ {
      expand: true,
      cwd: 'scss',
      src: [ '*.scss'],
      dest: 'css',
      ext: '.css'
    }]
  },
  production: {
    options: {
      style: 'compact'
    },
    files: [ {
      expand: true,
      cwd: 'scss',
      src: [ '*.scss'],
      dest: 'css',
      ext: '.css'
    }]
  }
},
```
The best way I've found to do this with Gulp is create two separate tasks, one for development and one for production. They would looks something like this:

```javascript
gulp.task('sass-dev', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('dist/assets/css'))
});
```

Gulp allows you to pipe commands to output of the previous command. The example below will do the following:

* Convert the SASS files into CSS
* Minify the CSS
* Rename the CSS file and convert it to .min.css
* Write the resulting file out

```javascript
//declare the task
gulp.task('sass', function(done) {
  gulp.src('sass/main.scss')
    .pipe(sass({ style: 'compressed'}))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
```

As you can see, each Gulp tasks does one thing and then passes its output as the input the next task.

### Grunt / Gulp links and resources

* [http://blog.cohaesus.co.uk/post/98963160289/managing-your-tasks-with-grunt-and-gulp](http://blog.cohaesus.co.uk/post/98963160289/managing-your-tasks-with-grunt-and-gulp)
* [https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4)
* [Gulp visual editor](http://gulpfiction.divshot.io/)

## Towards Subcompact Publishing

In [Platforming books](http://craigmod.com/journal/platforming_books/) Craig Mod proposes a multi platform approach to book publishing anchored in the success of his Artspace Tokyo Kickstarter project.

He suggests that books should have: An open web presence with the complete book content, an iBooks version to enjoy the advanced capabilities available to the format, Kindle and PDF versions of the book with the advantages of each format and the things you can get out of it.

Then in [Subcompact Publishing](http://craigmod.com/journal/subcompact_publishing/) he proposes a departure from tradition in the digital publishing business. It advocates for a system that has/is:

* Small issue sizes (3-7 articles / issue)
* Small file sizes
* Digital-aware subscription prices
* Fluid publishing schedule
* Scroll (don’t paginate)
* Clear navigation
* HTML(ish) based
* Touching the open web

While some of these areas apply to periodical publications (magazines and such) several of these elements are applicable to a wider publishing channels.

## Examples

Note that not all examples listed are books or book-like web experiences. Some, like Unnumbered Sparks, are listed because there was some aspect I thought important to highlight.

      <h3>Books and magazines</h3>

* [Offline Reader](https://jeffy.info/offline-ereader/index.html). I'm not much for paginated content but think this is an example of how to make it work. It is also built with Polymer so it's become a good model of how this can be done
* [Artspace Tokyo](http://read.artspacetokyo.com/) by Craig Mod and Ashley Rawlings. It highlights a lot of the ethos of Subcompact Publishing and how to Platform books
* [Shape of Design](http://read.shapeofdesignbook.com/) by Fran Chimero. The navigation was a little hard to understand at first but once I understood the metaphor it became very easy to navigate
* [The Magazine](http://the-magazine.com) provides a good example of what a SubCompact publication may look like. What I loved the most was t he speed of publication, how long it took to download and read and, particularly, the little link trick where clicking on a link will pop up a small window with information about the link and the giving you the option of actually going to the link

### Other Online

* [Liz Danzico's blog](http://bobulate.com/tagged/words) provides a clean and crisp interface. I particularly love the way the site (designed by Jason Santa Maria) uses white space
* [Climbing Everest](http://www.washingtonpost.com/graphics/world/scaling-everest/) presents a fully interactive experience and it draws the reader to interact with the content
* [Tokyo Otaku](https://www.facebook.com/tokyootakumode) Mode started as a Facebook page and reached over 3 million subscribers before developing apps and how to subvert the publishing and marketing worlds
* [Unnumbered Sparks](http://www.unnumberedsparks.com/) is the largest web browser I've ever seen. There is a Chrome instance about 10 million pixels that projects users' interactions into the hanging structure. Every time I see this project (both the video and the material available at the Autodesk Museum in San Francisco) makes me think I'm not thinking big enough
* [Cabbibo's website](http://cabbibo.com/) makes extensive use of WebGL and 3D web as an expressive medium. It is in the convergence of 2D and 3D where we can find the trully expressive potential of the web
* [Forest Giant](http://webplatform.adobe.com/Demo-for-National-Geographic-Forest-Giant/browser/src/) and [Alice in Woderland](http://webplatform.adobe.com/Demo-for-Alice-s-Adventures-in-Wonderland/) are technology demonstrations from Adobe that push the envelope of what you can do with web technologies. Unfortunately some of the CSS technologies have been caught in what I call "specification hell" with a very uncertain future (which makes me really sad)

