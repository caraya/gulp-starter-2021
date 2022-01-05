# Research on digital book metaphors

In prior posts I've written about [Paged Media and Generated Content for paged media](#)(http://wp.me/p3KUjB-1f0c) and about creating a [print @media style sheet](#)(http://wp.me/p3KUjB-1vkb). They both refer to printed content, either by creating PDF directly (using Paged media) or adapting the web content for printing (using @media rules tailored for print). 

There is another area I've been researching: how to create a book like experience using only web standards, current or proposed.

## Inspiration

[Bibliotype](http://craigmod.com/bibliotype/) and [and a related article](http://alistapart.com/article/a-simpler-page) with code available [in Github](https://github.com/cmod/bibliotype)

[Subcompact Publishing essay](http://craigmod.com/journal/subcompact_publishing/)

\<div class="video"\>
\<iframe src="https://player.vimeo.com/video/62462856" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen\>\</iframe\> \<p\>\<a href="https://vimeo.com/62462856"\>Webstock &#039;13: Craig Mod - Subcompact Publishing\</a\> from \<a href="https://vimeo.com/webstock"\>Webstock\</a\> on \<a href="https://vimeo.com"\>Vimeo\</a\>.\</p\>
\</div\>

[Hi](https://hi.co) combines elements of twitter and the open web. When you first start you are required to enter a 20 word snippet of text and to allow the site to capture your location (it adds weather data to the location for some random reason.) This is called a moment.

You are then allowed to create longer form content related to the moment you initially created. Other users in the application can ask you to do expand on the moment; whether you do so or not is your decision.

[Flipboard](https://flipboard.com/) is a windows and mobile application that collects, curates and delivers long(er) form content.

ted id=1134

In [A next-generation digital book](http://www.ted.com/talks/mike_matas) Mike Matas presents ideas and concepts for a digital book or book-like application. These are fully interactive books that take advantage of multimedia and advanced mobile device features to make reading a more engaging experience. None of the things shown in the video is impossible using web technologies, why haven't we done so already?

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ICIbBniojj4?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

[Sarah Groff-Palermo](#)(http://sarahgp.com/) cares a lot about putting data art on the web. .Books should be as much as art as technological endeavors.


## The idea (defining scope)

Create a web interface that combines the best elements of native book interfaces with the clean interface of a web application. When in doubt err on the side of ease of use and usability. 

The following restrictions must be considered:

* The solution must support current versions of IE, Opera, Firefox and Chrome. It should also work with the 2 prior versions of each browser
* Must provide keyboard and touch alternatives for mouse navigation
* If the content scrolls beyond the visible area on screen there mush be an icon, or another indicator, to show the text overset (maybe something like what Adobe InDesign does with overset text frames)

### Objectives

Researching web book interfaces seeks to address these questions

* Are are book-like web interfaces needed? Why?
* What scripting and styling models are best for book content?

### Are are book-like web interfaces needed? Why?

How much do people like pages that scrolly semingly forever? I don't either and I've also gotten used to the non-skeumorphic book interfaces in the Kindle and iBook readers.

HTML5 web is more than capable of competing with native applications. Chrome and Windows apps have shown as much capability as native apps, if we let them. What needs to happen now is the developer shift to thinking about the web in terms of application logic rather than the rules we want the web to play by.

### What scripting and styling models are best for book content?

Most of the code for pagination and CSS animations uses jQuery. Whether this is a good idea is debatable. I like jQuery and the way it smoothes out the idiosyncracies but browser have come a long way since the smoothing was essential to a good web experience, particularly if we keep support older browsers to a minimum.

This flies in the face of people telling you that we should go back as far as possible in supporting users. Not all computers can upgrade browsers or even operating systems. In most instances I would agree but if we are trying to push technology then we should use the best available technology without consideration for older versions that limit functionality (I'm looking at you Internet Explorer 8)

## Candidate Technologies and Working Examples



### Pagination scripts 

There are pagination scripts available in multiple languages, I've selected JavaScript for this project as I've decided to keep this project as a client side application.

* [http://flaviusmatis.github.io/simplePagination.js/](http://flaviusmatis.github.io/simplePagination.js/)
* [http://cssdeck.com/labs/quick-and-simple-pagination](http://cssdeck.com/labs/quick-and-simple-pagination)
* [http://designshack.net/articles/css/building-a-custom-css3-pagination-user-interface/](http://designshack.net/articles/css/building-a-custom-css3-pagination-user-interface/)

For the simplest of book interfaces we can just use one of the scripts below to   build a pagination setup that requires to click on either a page number or in an arrow.

If the script doesn't incorporate it already, we can then build a keyboard navigation interface by creating a small script that matches key pressed to arrows and navigates forward or backward based on the arrows pressed.

### Page flip effect

* [CSS3 page flip effect](http://cssdeck.com/labs/pure-css3-page-flip-effect)

CSS has moved beyond that styling. We can do animations and that will help us creating our flip effects. 

Adobe introduced CSS shaders, now called [custom CSS filters](https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/Overview.html), technology that uses a restricted version of the shader language from WebGL. Custom filters is now part of the Filter Effects Module Level 1 specification. There is hope that we'll see it come out as a specification in our lifetime.

See these articles for more information

* [CSS Custom Filters](http://adobe.github.io/web-platform/samples/css-customfilters/)
* [Introducing CSS shaders: Cinematic effects for the web](http://www.adobe.com/devnet/html5/articles/css-shaders.html)

### CSS Regions and exclusions

I've written more extensively about regionsand exclusions elsehwere in this blog. Eventhough they are caught in philosophical arguments in the CSS working group they present a strong solution to the problem of floating content from one part of a document into amother one.

### Full examples 

[turn.js](#)(http://www.turnjs.com/) uses [jQuery](http://jquery.com/)

* [turn.js example](http://www.turnjs.com/#samples/steve-jobs/10)

Bookblock plugin is another example using [jQuery](http://jquery.com/) and [jQuery++](http://jquerypp.com/) 

* [bookblock plugin](http://tympanus.net/codrops/2012/09/03/bookblock-a-content-flip-plugin/)
* [Layout demo](http://tympanus.net/codrops/2012/12/11/fullscreen-pageflip-layout/)


## Delivery method

Paginated content may be a good way to demonstrate [angular directives](http://angularjs.com) and/or [polymer-based web components](http://polymer-project.org). In encapsulating the content for each unit (either a page or a chapter) gives us more flexibility with our content.

[Service workers](#)(https://slightlyoff.github.io/ServiceWorker/spec/service_worker/) may also presente an alternative delivery method by giving us multi threaded background applications just like native readers and applications.

## Packaging for delivery

Vendor specific applications plus mobile. Chrome, Mac and Windows have their own Operating System and ways to package content into applications. Mobile developers can create packages for multiple vendors using tools like PhoneGap / Apache Cordoba. 

Using web technologies allow us to create once and use everywhere. We can then tailor the experience to specific devices (if that's what we want.)

## Questions waiting for answers

Regions are a good alternative for floating content within a page. ***Is there a similar solution to float content to a different page?*** is anchored links still the solution?

*** why hasn't this caught on?***

Poor marketing that creates lack of interest that makes people not want to market the technology that then creates lack of interest.... You see where this is going. People are married to their ideas of what the web should be and find it very hard to change.
