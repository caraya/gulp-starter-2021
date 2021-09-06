# Athena: What an ofline web reading experience may look like

With the latest set of web technologies coming down the W3C/WHATWG pipeline it is now possible to create top-of-the-line responsive experiences that can also work as ofline applications. 

HTML5 web is more than capable of competing with native applications. Chrome and Windows apps have shown as much capability as native apps, if we let them. What needs to happen now is the developer shift to thinking about the web in terms of application logic rather than the rules we want the web to play by.

Athena is a proof of concept for such an application. It uses [ServiceWorkers](https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md) for caching application resources, it uses [Polymer](https://www.polymer-project.org/) and a suite of custom [web components](http://webcomponents.org/) to handle layout and application structures.

This article discusses the rationale for Athena and how it has been implemented. It represents my ideas and opinions but it is not prescriptive; rather it embraces the Perl moto: **There's more than one way to do it (TMTOWTD)**. The only **required** part of an Athena publication is the service worker... the UI and content display is up to you.

## Browser support considerations

Whatever way we choose to creatae and show the content must:

* The solution must support current versions of IE, Opera, Firefox and Chrome. It should also work with the 2 prior versions of each browser
* Must provide keyboard and touch alternatives for mouse navigation
* If the content scrolls beyond the visible area on screen there mush be an icon, or another indicator, to show the text overset (maybe something like what Adobe InDesign does with overset text frames)

The work dones at W3C, WHATWG and ECMA TC-39 coupled with browser vendor's adoption have made the browser a better development environment. Libraries like jQuery were initially created to speed css interactions and to smooth the differences in CSS rendering and Javascript support among browsers. Because of this standardization and the requirements we set up above we can drop older version of browsers to concentrate in our application, not the workarounds.  

This flies in the face of people telling you that we should go back as far as possible in supporting users. Not all computers can upgrade browsers or even operating systems. In most instances I would agree but if we are trying to push the envelope then we should use the best available technology without consideration for older versions that limit functionality (I'm looking at you Internet Explorer 8)

Athena's technology stack also makes it hard to polyfill for older browsers. ShadowDOM and ServiceWorkers have limited (or non existant) polyfill support and that makes them work only with modern, evergreen browsers. 

The reference implementation uses the following technologies, listed with the browser support information for each

Technology  | Support information
------------- | -------------
Polymer  | [Polymer browser support](https://www.polymer-project.org/resources/compatibility.html)
ServiceWorker  | [Is ServiceWorker Ready?](https://jakearchibald.github.io/isServiceWorkerready/)

Other technologies have a different support requirements that are outside the scope of this article.

## Remember: You get what you paid for

Because the specifications used in this project (web component specifications and ServiceWorkers) are not finalized, developers can (and should) expect changes... that's the price we pay for working with the newest stuff. But it allso allows us to tighten the feedback loop to the spec writers, tell them what works, what doesn't work and what we'd like to see going forward.

The [extensible web manifesto](https://extensiblewebmanifesto.org/) speaks more of this way spec writers and application developers should interact with each other.

## Inspiration

[Bibliotype](http://craigmod.com/bibliotype/) and [and a related article](http://alistapart.com/article/a-simpler-page) with code available [in Github](https://github.com/cmod/bibliotype)

Webstock '13: [Craig Mod - Subcompact Publishing](http://vimeo.com/62462856).

[Hi](https://hi.co) combines elements of twitter and the open web. When you first start you are required to enter a 20 word snippet of text and to allow the site to capture your location (it adds weather data to the location for some random reason.) This is called a moment.

You are then allowed to create longer form content related to the moment you initially created. Other users in the application can ask you to do expand on the moment; whether you do so or not is your decision.

[Flipboard](https://flipboard.com/) is a windows and mobile application that collects, curates and delivers long(er) form content.

In [A next-generation digital book](http://www.ted.com/talks/mike_matas) Mike Matas presents ideas and concepts for a digital book or book-like application. These are fully interactive books that take advantage of multimedia and advanced mobile device features to make reading a more engaging experience. None of the things shown in the video is impossible using web technologies, why haven't we done so already?

[Sarah Groff-Palermo](http://sarahgp.com/) cares a lot about putting data art on the web. Books should be as much as art as technological endeavors. Her ForwardJS [presentation](https://www.youtube.com/watch?v=ICIbBniojj4) mixes art and code in one interesting product. 

[Craig Mod's](http://craigmod.com/) essays:

* [Books in the age of the iPad](http://craigmod.com/journal/ipad_and_books/)
* [Embracing the digital book](http://craigmod.com/journal/ebooks/)
* [The collaborative book](http://craigmod.com/sputnik/collaborative_book/)
* [A Simpler Page](http://craigmod.com/sputnik/a_simpler_page/)
* [Post-Artifact Books and Publishing](http://craigmod.com/journal/post_artifact/)
* [The shape of our future book](http://craigmod.com/sputnik/our_future_book/)
* [Platforming books](http://craigmod.com/journal/platforming_books/)
* [Subcompact Publishing](http://craigmod.com/journal/subcompact_publishing/)
* [Hi: Narrative Mapping the World](http://craigmod.com/sputnik/hi/)

John Allsopp's [A Dao of Web Design](http://alistapart.com/article/dao)

# Hosting, technology and components

What are the parts of Athena? What are they used for?

## Hosted on Github

Athena publications are initially hosted on [Github Pages](https://pages.github.com/) for the following reasons:

* Whenever you create a gh-pages website you automatically get SSL. 
  * Serviceworkers will only install and work on SSL enabled websites
* Because the website is just another branch of the repository we can set it up so that edits are pushed directly to the production publication
* You can still assign your own domain name to the website or choose to keep the github.io domain name
* The basic Github functionality is free for public repositories. If you want private repositories then there's a [cost](https://github.com/pricing) for the private repo hosting.

## ServiceWorker

<iframe width="560" height="315" src="//www.youtube.com/embed/Rr2vXDIVerI" frameborder="0" allowfullscreen></iframe>

***Click the image to play the video***

The core of an Athena publication is a scoped service worker that will initially handle the caching of the publication's content. We take advantage of the multiple cache capabilitity available with service workers to create caches for individual unitts of content (like magazine issues) and to expire them within a certain time period (by removing and deleting the cache).

For publications needing to pull data from specific URLs we can special case the requests based on different pieces of the URL allowing to create different caches based on edition (assuming each edition is stored in its own directory), resource type or even the URL we are requesting.

Serviceworkers have another benefit not directly related with offline connections. They will give all access to our content a speed boost by eliminating the network roundtrip after the content is installed. If the content is in the cache, the resource's time to load is only limited by the Hard Drive's speed.

This is what the ServiceWorker code looks like in the demo application:

```javascript
//
// ATHENA DEMO SERVICE WORKER
//
// @author Carlos Araya
// @email carlos.araya@gmail.com
//
// Based on Paul Lewis' Chrome Dev Summit serviceworker. 

importScripts('js/serviceworker-cache-polyfill.js');

// This is one best practice that can be followed in general 
// to keep track of multiple caches used by a given service 
// worker, and keep them all versioned.  maps a shorthand 
// identifier for a cache to a specific, versioned cache name.

// Note that since global state is discarded in between 
// service worker restarts, these variables will be reinitialized 
// each time the service worker handles an event, and you should 
// not attempt to change their values inside an event 
// handler. (Treat them as constants.)

// If at any point you want to force pages that use this service 
// worker to start using a fresh cache, then increment the 
// CACHE_VERSION value. It will kick off the service worker 
// update flow and the old cache(s) will be purged as part of 
// the activate event handler when the updated service worker 
// is activated.

// In this demo, we also cache two links from O'Reilly. Normally 
// I wouldn't do this but it's mean to illustrate a point later 
// in the rationale document
var CACHE_NAME = 'athena-demo';
var CACHE_VERSION = 8;

self.oninstall = function(event) {

  event.waitUntil(
    caches.open(CACHE_NAME + '-v' + CACHE_VERSION).then(function(cache) {

      return cache.addAll([
        '/athena-framework/',
        '/athena-framework/bower_components/',
        '/athena-framework/css/',
        '/athena-framework/js/',
        '/athena-framework/layouts/',

        '/athena-framework/content/',
        '/athena-framework/index.html',
        '/athena-framework/notes.html',

        'http://chimera.labs.oreilly.com/books/1230000000345/ch12.html',
        'http//chimera.labs.oreilly.com/books/1230000000345/apa.html'
      ]);
    })
  );
};

self.onactivate = function(event) {

  var currentCacheName = CACHE_NAME + '-v' + CACHE_VERSION;
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheName.indexOf(CACHE_NAME) == -1) {
          return;
        }

        if (cacheName != currentCacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  });

};

self.onfetch = function(event) {
  var request = event.request;
  var requestURL = new URL(event.request.url);

  event.respondWith(

    // Check the cache for a hit.
    caches.match(request).then(function(response) {

      // If we have a response return it.
      if (response)
        return response;

      // Otherwise fetch it, store and respond.
      return fetch(request).then(function(response) {

        var responseToCache = response.clone();

        caches.open(CACHE_NAME + '-v' + CACHE_VERSION).then(
          function(cache) {
            cache.put(request, responseToCache).catch(function(err) {
              // Likely we got an opaque response which the polyfill
              // can't deal with, so log out a warning.
              console.warn(requestURL + ': ' + err.message);
            });
          });

        return response;
      });

    })
  );
};
```
### Limitations

As powerful as service workers are they also have some drawbacks. They can only be served through HTTPS (you cannot install a service worker in a non secure server) to prevent [man-in-the-middle attacks](http://www.wikiwand.com/en/Man-in-the-middle_attack).

There is limited support for the API (only Chrome Canary and  Firefox Nightly builds behind a flag will work.) This will change as the API matures and becomes finalized in the WHATWG and/or a recommendation with the W3C. 

Even in browsers that support the API the support is not complete. Chrome uses a polyfill for elements of the cache API that it does not support natively. This should be fixed in upcoming versions of Chrome and Chromium (the open source project Chrome is based on.)

We need to be careful with how much data we choose to store in the caches. From what I understand the ammount of storage given to offline applications is divided between all offline storage types: IndexedDB, Session Storage, Web Workers and ServiceWorkers and this amount is not consistent across all browsers. 

Furthermore I am not aware of any way to increase this total amount or to specifically increase the storage assigned to ServiceWorkers; Jake Archibald mentions this in the offline cookbook section on [cache persistence](http://jakearchibald.com/2014/offline-cookbook/#cache-persistence)

### The future

In his [offline cookbook](http://jakearchibald.com/2014/offline-cookbook/) Jake Archibald presents multiple ways in which we can use ServiceWorkers. Now that we have a working prototype we can explore further uses of ServiceWorkers to enhance the offline experience. We may special case the requests to the `conent` directory to use a special caching strategy (maybe do cache with network fallback as described in the cookbook) to make sure that our content is as fresh as we can make it without being online all the time. 

As part of the ServiceWorker family of specifications we will be able to match native applications with [push notification](https://w3c.github.io/push-api/index.html) and [background content synchronization](https://github.com/slightlyoff/BackgroundSync/blob/master/explainer.md) using open web APIs.

Jeff Possnick created an offline reader and posted the [code](https://github.com/jeffposnick/offline-ereader) and [working example](https://jeffy.info/offline-ereader/index.html) that provides a much better example of using Polymer and databinding. Using it as a mode we can get an experience that is much closer to existing readers with the additional capabilities provided by ServiceWorker.


## JSON package file

Taking a cue from the `package.opf` epub package specification I've come up with a basic JSON definition for a publication package. We picked JSON as our package format because it is easier to write, easier to validate (using tools like [jsonlint](http://jsonlint.com/)) and can easily be parsed by all existing browsers ([according to caniuse.com](http://caniuse.com/#search=json)).

The other advantage is that we can easily customize our package file to match the needs of our specific publications. 

The basic publication.json may look something like this

```json
{
  "publicaton": {
    "metadata": {
      "pub-type": "book",
      "Title": "New Adventures of Old Sherlock Holmes",
      "pub-info": [
        {
        "pub-date": "20141130",
        "pub-location": "London",
        "publisher": "That Press, Ltd"
        }
      ],
      "authors": [
        {
          "firstName": "Sherlock",
          "lastName": "Holmes"
        }
      ],
      "editors": [
          {
            "role": "Production Editor",
            "firstName": "John",
            "lastName": "Watson"
        }
      ]
    },
    "structure": {
      "content": [
        {
          "title": "Introduction",
          "type": "Introduction",
          "location": "content/introduction.html"
        },
        {
          "title": "Chapter 1",
          "type": "chapter",
          "location": "content/chapter1.html"
        },
        {
          "name": "Chapter 2",
          "type": "chapter",
          "location": "content/chapter2.html"
        }
      ]
    }
  }
}
```

I've left the format deliberately vague because I believe this needs many iterations to become the strong format that it needs to be.

## UI

The UI is one of the points where I'm struggling. Athena herself doesn't (meaning I don't) really care about what front end platform/Library/flavor of the week you choose for the User Interface. I've chosen three experimental interfaces for introducing Athena: [Polymer](https://www.polymer-project.org/), [Angular](https://angularjs.org/) and a plain HTML interface using [Bootstrap](http://getbootstrap.com/) (or maybe [Foundation](http://foundation.zurb.com/)) 

> One big problem that I need to research is the routing portion of web application, whether I can route external pages through the framework and control where the content is displayed or even if I need routing altogether.
> Another option would be to use some aspects of Polymer and mix them with a plain Bootstrap or Foundation site and eschew the web application side. 
> It's too early in the process to decide.

The [Polymer](http://caraya.github.io/athena-framework/) version provides a glimpse of how a Polymer-based application may look like. It also uses [athena-document](https://github.com/caraya/athena-document/), a custom element that wraps a markdown transformation engine for display on the web. There shouldn't be major problems to do the same thing with LaTeX and other document formats and there's nothing that says we can't use these web components in non Polymer applications.

>NOTE: Right now athena-document is not embedding properly in the sidebar-layout component. Researching whether the issue is with juicy-markdown (the markdown parser element), sidebar-layout (the layout component) or with Polymer itself. 
>Currently all the content is displayed as HTML. I will spare you how I got the Markdown-rendered HTML to the page it's on.

## Content: format and metaphors

In my blog I've written about [Paged Media and Generated Content for paged media](http://wp.me/p3KUjB-1f0c) and about creating a [print @media style sheet](http://wp.me/p3KUjB-1vkb). They both refer to printed content, either by creating PDF directly (using Paged media) or adapting the web content for printing (using @media rules tailored for print).

Athena doesn't want to be a print platform but a starting point to test whether offline web apps can compete with native platforms and existing digital content standards. That said it should be possible to create paged media style sheets to at least create a good PDF for print and a high quality version for archival storage. 

See [Book Metaphors Online](#book-metaphors-online) for a more thorough discussion on this subject.

### Format

I've [discussed](http://publishing-project.rivendellweb.net/html-is-the-final-product-not-the-initial-source/) the role I see HTML playing in the publication process. I will only summarize the article I just linked. 

HTML is a powerful language full of capabilities and, alongside CSS3 and Javascript, provides the foundation of modern sites and applications. 

HTML is not an easy language to author. Depending on the variant of HTML you're writing (XHTML or regular HTML) you have to follow different rules. 

The default HTML5 is too permissive; it allows the worst [tag soup](http://www.wikiwand.com/en/Tag_soup) markup; the same markup that has been allowed by browser vendors in an effort to be competitive. It is nice to authors but makes parsing the content much harder than it needs to be. 

XHTML5 syntax (best explained in this [HTML5 Doctor](http://html5doctor.com/html-5-xml-xhtml-5/) article by Bruce Lawson) provides stricter guidelines for authors that may turn some people off from HTML altogether. Sure, attributes must be quotes, all tags must be lowercase and all attributes must be closed, including &lt;img> and &lt;br> tags. The benefit is that the stricter rules make parsing content and developing new technologies around it easier.

Because of these difficulties I present 4 solutions to create content that easily transforms to XHTML5 content. I don't go into too much detail of each solution, just enough to give you an idea of what it is.

* [Markdown](http://daringfireball.net/projects/markdown/) is a text to (X)HTML conversion tool designed for writers. It refers both to the syntax used in the Markdown text files and the applications used to perform the conversion
* [AsciiDoc](http://www.methods.co.nz/asciidoc/) is a text document format for writing notes, documentation, articles, books, ebooks, slideshows, web pages, man pages and blogs. AsciiDoc files can be translated to many formats including HTML, PDF, EPUB, man page
* [HTMLBook](https://github.com/oreillymedia/HTMLBook) is an open, XHTML5-based standard for the authoring and production of both print and digital books. It is currently under development
* [Docbook](http://docbook.org/), [DITA](http://dita.xml.org/) and [TEI](http://www.tei-c.org/index.xml) are some examples of XML vocabularies that can be converted to HTML.

**Athena doesn't really care what you use to create your content as long as you provide well formed HTML5 created with XHTML5  syntax.**

### Book metaphors online

Does it make sense for Athena to use book metaphors? 

Most of these metaphors use jQuery and jQuery plugins/addons 

For the simplest of book interfaces we can just use one of the scripts below to build a pagination setup that requires to click on either a page number or in an arrow.

If the script doesn't incorporate it already, we can then build a keyboard navigation interface by creating a small script that matches key pressed to arrows and navigates forward or backward based on the arrows pressed.

* [http://flaviusmatis.github.io/simplePagination.js/](http://flaviusmatis.github.io/simplePagination.js/)
* [http://cssdeck.com/labs/quick-and-simple-pagination](http://cssdeck.com/labs/quick-and-simple-pagination)
* [http://designshack.net/articles/css/building-a-custom-css3-pagination-user-interface/](http://designshack.net/articles/css/building-a-custom-css3-pagination-user-interface/)

##### Full examples

Turn.js and Bookblock present complete book-like interfaces. They use jQuery and, in the case of Bookblock, additional libraries that have to be cached and may present issues when working with Polymer and other web component libraries

* [turn.js](http://www.turnjs.com/) uses [jQuery](http://jquery.com/)
  * [turn.js example](http://www.turnjs.com/#samples/steve-jobs/10)
  * [turn.js example 2](http://www.turnjs.com/#samples/magazine1/1)
* Bookblock plugin is another example using [jQuery](http://jquery.com/) and [jQuery++](http://jquerypp.com/) 
  * [bookblock plugin](http://tympanus.net/codrops/2012/09/03/bookblock-a-content-flip-plugin/)
  * [Layout demo](http://tympanus.net/codrops/2012/12/11/fullscreen-pageflip-layout/)


# Use cases for Athena publications

These are the three main uses cases I see for Athena publications. The first two are based on short publication looks. The third use case is based on what media and resources will serve the story best. Enhancing existing content lets us choose which part of the Athena toolkit we'll use with the content we're working on... at the very least convert the project into an offline capable application.

## Early access content

The Early Access Publications idea is based in existing programs like Manning's MEAP and O'Reilly's Early release programs where the book content is published as soon as it's ready (and sometimes as soon as the author is done writing it.)

We can do multimedia books (see below for more information about how I envision interactive books) and the multimedia work can be done in parallel to the writing or it can all be done in a collborative fashion (Github private repo or similar version control system.)

The advantage of this kind of publication is that it tightens the feedback loop between readers, reviewers, editors and authors. It also allows for collaborative editing: whoever has access to the git repository can make changes and accept changes coming from the community (whether this repository is public or private.)

O'Reilly Media uses Ilia Grigorik's book [High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545) as a [case study](http://sites.oreilly.com/oreillyatlas/atlas-case-studies/ch01.html) on the benefits of this tighter loop. 

## Serial Publications (magazines and the like)

Serials are periodical publications. Magazines are the ones that come to mind fitst but they are not the only ones. Shorter content like [Atavist](https://atavist.com/) books and stories or the longer content available from [O'Reilly Atlas](https://atlas.oreilly.com/) with the added advantage of offline access.

This way a book is never really done. We can continue to work on stories and tell new stories as long as we want to and the stories can get that continual polish that makes for a good reading experience. If we need/want to, we can also provide CSS Paged Media Stylesheets that will allow to create a PDF version of the text/images we make available. 

## Interactive books

When I was thinking about interactive books there were two that came to mind: The first one was the [Defiance](http://bit.ly/13Zfb3c) companion iBook and Al Gore's [Our Choice](http://bit.ly/13pgtnd) as presented at [TED](http://www.ted.com/talks/mike_matas) in 2011. 

Before all the new CSS, HTML5 and Javascript technologies became mainstream it was very difficult (if not right out impossible) to create create experiences like the ones above. 

Now the almost impossible is merely diffcult. The technologies in those books is available as open web APIs at different levels of standardization and you can create equivalent experiences from the Applications that you run in your mobile devices. 

## Enhancing existing content

The easiest way to start using Athena is to add the offline ServiceWorker to an existing application. This process if fairly simple:

* Create a ServiceWorker script that cached the required files
* Link the service worker to the main page in your application
* Test the offline experience and overall functionality of your project

# Copyright Considerations and caching stale content

When working with Athena content we have a fairly open hand as to what resources we fetch and the sources we fetch resources from. What copyright restrictions do we face when accessing and then caching content?

There is nothing that would stop me from doing this when defining the cache content:

```javascript
var urlsToPrefetch = [
    './content/introduction.html',
    './content/pre_fetched.html',
    // We can also fetch remote content for our cache(s)
    'http://chimera.labs.oreilly.com/books/1230000000345/ch12.html',
    'http://chimera.labs.oreilly.com/books/1230000000345/apa.html'
];
```

In the links above the content originates from O'Reilly's ([Interactive Data Visualization for the Web](http://chimera.labs.oreilly.com/books/1230000000345).) In this case, the content is already available free of charge (and for which I own both the printed and ebook versions) but it illustrates a point: Unless you're serving your content behind authentication a ServiceWorker can do whatever it wants with it. 

But what happens if the external content changes? The cache will not expire untl you install a newer version of the ServiceWorker and the content will remain in the cache as long as the cache lives

It follows the "with ServiceWorker comes great responsibility" theme regarding ServiceWorkers or, as Jake Archibald puts it, "Serviceworker treats you like an adult". The Serviceworker will allow you to do a lot of things but you're responsible for what you do with it. 
