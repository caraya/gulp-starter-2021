### Some technologies and working examples

#### Pagination scripts 

There are pagination scripts available in multiple languages, I've selected JavaScript for this project as I've decided to keep this project as a client side application.

* [http://flaviusmatis.github.io/simplePagination.js/](http://flaviusmatis.github.io/simplePagination.js/)
* [http://cssdeck.com/labs/quick-and-simple-pagination](http://cssdeck.com/labs/quick-and-simple-pagination)
* [http://designshack.net/articles/css/building-a-custom-css3-pagination-user-interface/](http://designshack.net/articles/css/building-a-custom-css3-pagination-user-interface/)

For the simplest of book interfaces we can just use one of the scripts below to build a pagination setup that requires to click on either a page number or in an arrow.

If the script doesn't incorporate it already, we can then build a keyboard navigation interface by creating a small script that matches key pressed to arrows and navigates forward or backward based on the arrows pressed.

##### Full examples

Turn.js and Bookblock present complete book-like interfaces. They use jQuery and, in the case of Bookblock, additional libraries that have to be cached and may present issues when working with Polymer and other web component libraries

* [turn.js](http://www.turnjs.com/) uses [jQuery](http://jquery.com/)
  * [turn.js example](http://www.turnjs.com/#samples/steve-jobs/10)
  * [turn.js example 2](http://www.turnjs.com/#samples/steve-jobs/10)
* Bookblock plugin is another example using [jQuery](http://jquery.com/) and [jQuery++](http://jquerypp.com/) 
  * [bookblock plugin](http://tympanus.net/codrops/2012/09/03/bookblock-a-content-flip-plugin/)
  * [Layout demo](http://tympanus.net/codrops/2012/12/11/fullscreen-pageflip-layout/)

#### CSS Custom Filters

Adobe introduced CSS shaders, now called [custom CSS filters](https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/Overview.html), technology that uses a restricted version of the shader language from WebGL. Custom filters is now part of the Filter Effects Module Level 1 specification. There is hope that we'll see it come out as a specification in our lifetime.

See these articles for more information

* [CSS Custom Filters](http://adobe.github.io/web-platform/samples/css-customfilters/)
* [Introducing CSS shaders: Cinematic effects for the web](http://www.adobe.com/devnet/html5/articles/css-shaders.html)

#### CSS Regions and exclusions

I've written more extensively about [regions](http://wp.me/p3KUjB-1sCN) and [exclusions](http://wp.me/p3KUjB-1tXq) in my blog. Eventhough they are caught in philosophical arguments in the CSS working group they present a strong solution to the problem of floating content from one part of a document into amother one.
