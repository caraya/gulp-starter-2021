# Why shouldn’t the web looks like print?

This topic may sound familiar to people who have been reading my blog for a while. I’ve posted about most, if not all the component technologies I’ll be speaking about below.  I hope I can change the context of the discussion enough not to bore you to death. 

Unless it’s necessary I will not write code, this is meant as an idea generator.  Either I’ve already written about the technology or I will do so in a separate post.

I keep coming back to [Jen Simmons](http://jensimmons.com/) SFHTML5 talk on web layouts. Partly because it takes me back to my beginnings as a web designer and because it challenges me to rethink the way I approach design and development. 

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZNpn7FBp_9U?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

This is a two pronged memory for me. 

I still remember when the web was beginning and we had no fancy CSS to do things. We were lucky to have `<font>` and `<center>` tags to, somewhat, style the content.  All content was purpose built or, if the publisher needed to, there were a few templates here and there  but, even then there was a newness and freshness to the designs… 

In the description of the slides for the presentation, Jen writes that:

> In the early years of the web, there was a lot of variation and experimentation with where to put content on a web page. Then, it seems, we all settled into a handful of patterns and stayed there for over a decade. It wasn’t until the arrival of responsive design that new ideas for page layout started appearing. Now with new CSS properties for layout landing in browsers, we may be about to see a bigger renaissance in layout design patterns. How can we better use the space inside the glass rectangle? What layout innovations could help users better find and focus on what they want?

And then I've seen how the web has become stuck in a rigid layout systems. What is known as “the holy grail” became the predominant design layout and it has gotten too rigid, designers are playing it safe and we’re loosing the creative spark that should drive all good design. 

Andy Clarke has presented this ideas in [his blog](https://stuffandnonsense.co.uk/blog/about/what-man-laid-on-his-back-counting-stars-ever-thought-about-a-number), at the [Beyond Tellerand Conference](https://vimeo.com/112865159) (see video below) and, most recently in Smashing Books’ [Real Life RWD](https://shop.smashingmagazine.com/products/smashing-book-5-real-life-responsive-web-design).

<iframe src="https://player.vimeo.com/video/112865159?color=9c191e&portrait=0" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Technology is good and doing data driven research is not a bad thing but over time we’ve come to rely on data to drive decisions that, in my opinion should be creative decisions.  Also note that I’m refering to web content… I believe apps require a different set of re

That’s why I keep asking myself if the web can do what print can.  Print seems a lot less constrained in what they can and cannot do than the web is. Fortunately that seems to be changing.  

For the longest time designers have been told that the web is not print and shouldn’t be treated as such. My question has always been why not?  What makes the web such a different medium? 

There are new specifications and APIs being finalized by the W3C and WHATWG that make art directed web content more interesting and more like print and other art directed content.

In 2013 Chris Coyier wrote [Art Directed Articles. Still a Good Idea?](https://css-tricks.com/art-directed-articles-still-good-idea/) in CSS tricks. There, Chris describes the idea as:

> The idea of an "art directed article" is that it is designed specifically for the content of the article. It might share some characteristics from the parent site (it probably should), but lots of design elements change to suit the specific article. Layout, colors, type, backgrounds, images, interactions... all custom just for the article.

I’m not advocating that all web content be art directed but we should have the freedom to use these new features and create layouts that really help users interact and understand with the content. 

## Do we have the tools to do print on the web?
More and more I'm starting to think we can do a fairly nice job of doing print-like layouts for our web content. Not all the technologies are ready yet but we're getting close.

## Some of the tools
In the following sections we'll look at some of these technologies and how they produce effects that are similar to those we see in print. There will also be a section of technologies that are coming down the standards pipeline that will suplement those technologies already available.

### Flexbox and (native) Grids

[Flexbox](http://publishing-project.rivendellweb.net/new-in-the-css-horizon-css-flexbox/) and [Grids](http://publishing-project.rivendellweb.net/new-in-the-css-horizon-native-css-grids/) provide different layout alternatives that take the design away from floats and careful measurements that would need to be very carefully measured for each media query breakpoint.  

#### Flexbox 

**Image Gallery**

When I was researching how to create Flexbox content I created this image gallery.  It’s a fairly simple application where we can see the power of the flexbox syntax. 
Flexbox takes the content that would be in one continuous line which will wrap if the display is not wide enough.  

In the HTML below, the `boxes` is our flexbox container. Each box has two classes, `box` will tell the CSS that we should style the content as a flexbox child and `box(n)` can be used to style individual children. 

In the css we do three things:

* Set up the element with class boxes (`.boxes`) to be a flex container (`display: flex`) and we set it to be horizontal and to wrap its content (`flex-flow: row wrap`)
* We set up the items (class `.box`) with the `flex` shorthand which equivalent to set the following attributes
	* flex-grow: 1
	* flex-shrink:  0
	* flex-basis: auto
* We set the images inside the box (`.box img`) to be 100% wide and with an automated height. This makes the images responsive without using the flexbox 

<p data-height="480" data-theme-id="2039" data-slug-hash="NGoWKM" data-default-tab="result" data-user="caraya" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/NGoWKM/'>Flexbox Image Gallery Experiment</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

In [Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/) Philip Walton provides additional projects that can be solved using flexbox. By changing the way lay out the content we can create better and more faithful layout from our original source.  

**Grids:**

![](https://philipwalton.github.io/solved-by-flexbox/images/grids.jpg)

**Media Objects**: **

![](https://philipwalton.github.io/solved-by-flexbox/images/media-object.jpg)

**Holy Grail Layout:**

![](https://philipwalton.github.io/solved-by-flexbox/images/holy-grail.jpg)

#### CSS Grids

Grids allow to place the content anywhere in the defined grid. If you’re familiar with Grids like those Bootstrap, Foundation, 960.gs or Suzy the idea is the same but the syntax is now fully native.

Unlike the alternatives mentioned above native CSS grids use the browser’s CSS parser and don’t rely on floats and percentages. We save the additional weight of the framework 

With a grid (whatever kind) we can get a close approximation to what a 12 or 16 column layouts that we see in print and we can lay out the content in as many different ways as you can  think

The example below, taken from [Grid by example](http://gridbyexample.com/), shows how to build a “holy grail layout” using CSS Grids and Media Queries to change the layout as needed for different displays and resolutions.

![](http://gridbyexample.com/examples/images/layout2.png)
![](http://gridbyexample.com/examples/images/layout2-2.png)
![](http://gridbyexample.com/examples/images/layout2-3.png)

You can also use Flexbox and Grids together. You can create a masthead using Flexbox and place it inside a grid like you normally would :-)

### Columns

[CSS Multi-column Layout Module](https://www.w3.org/TR/css3-multicol/) provides multicolumn layouts for the web without hacking the content to display how we want it to. 
![](http://lh6.ggpht.com/-cayteA5dLsI/U-oidf964WI/AAAAAAAAL78/TsLGxObMXjU/CSS-columns-Chrome-arbitrary-breaks.png?imgmax=1000)

The columns module  still cannot do threaded frames (think of InDesign) but that may yet become part of the web as part of a different specification. 

Support for widow and orphans is mostly complete with [Firefox being the last remaining houldout](https://bugzilla.mozilla.org/show_bug.cgi?id=137367) in supporting the feature (and the bug laying dormant since 2010 doesn’t inspire much confidence in them being implemented either.) 

![](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2014/11/orphans-example-columns.jpg)


### Rotation, skews and translations 

For most people rotation and translation are done in the context of CSS 2D Transformations but we can also use them as static elements that will appear in its final form when displayed on. 

![](https://developer.apple.com/library/safari/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Art/2drotation.png)

We can also chain transformations to achieve more sophisticated effects. 

![](https://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/compound_transform.png)


### Shape outside

I’ve always loved how text wraps around an image shape, be it a circle or some sort of polygon where the text wraps close to the shape of the image regardless of its shape. When the [CSS Shapes Module Level 1](https://www.w3.org/TR/css-shapes-1/) specification was released and even more so when it went to Candidate recommendation I was ecstatic.

Now we can do layouts like these witout hacks. 

<p data-height="388" data-theme-id="2039" data-slug-hash="LskqC" data-default-tab="result" data-user="SitePoint" class='codepen'>See the Pen <a href='http://codepen.io/SitePoint/pen/LskqC/'>CSS Shapes Demo #2</a> by SitePoint (<a href='http://codepen.io/SitePoint'>@SitePoint</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


<p data-height="456" data-theme-id="2039" data-slug-hash="KyjiB" data-default-tab="result" data-user="SitePoint" class='codepen'>See the Pen <a href='http://codepen.io/SitePoint/pen/KyjiB/'>CSS Shapes Demo #8</a> by SitePoint (<a href='http://codepen.io/SitePoint'>@SitePoint</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

![](https://sarasoueidan.com/demos/css-shapes-layouts/demo-1/images/demo-screenshot.jpg)

![](https://sarasoueidan.com/demos/css-shapes-layouts/demo-4/images/demo-screenshot.jpg)

![](https://sarasoueidan.com/images/multicolumn-shapes.png)

Until the [level 2](https://drafts.csswg.org/css-shapes-2/) specification is implemented in browsers we’ll just have to be happy with `shape-outside` and its limitations. What I’m really excited is for `shape-inside` to be fully implemented. 

![](http://blogs.adobe.com/webplatform/files/2014/05/ersatz-demo-screenshot.png)

Shape inside allows to put text inside a shape without having to resort to javascript or hacks using 2 shape outside objects to get a similar effect. 

The level 2 specification also gives us padding and margins for our shapes :-)

![](http://www.vanseodesign.com/blog/wp-content/uploads/2013/08/polygon.png)

## Things (maybe) coming that may help 

Out of the many things in the CSS working group universe I’ve picked 3 to highlight because I think they have the most potential. 

### Exclusions
[CSS Exclusions Module Level 1](https://www.w3.org/TR/css3-exclusions/) provides a way to create exclusions in our CSS-based layouts; making the image below possible in CSS.

![](http://csswg.inkedblade.net/drafts/css-exclusions/images/alternate-example.png)

We can use exclusions to provide effects like those in magazines. From using it to highlight pullquotes with extra white space around or use shape inside to lay text in shapes other than boxes. 

![](http://galjot.si/_blog/img/2012/exclusions-in-print_v6.jpg)

### CSS page floats and overflow

[CSS Overflow Module Level 3](https://drafts.csswg.org/css-overflow-3/) is another attempt to do content fragmentation on the web, similar to what [CSS Regions](https://www.w3.org/TR/css-regions-1/) did except that unlike regions it is not implemented on any current browser.  It can create different layouts by changing the way content flows within a page. 

![](http://corlan.org/wp-content/uploads/2013/02/cssregions2.png)


[CSS Page Floats](#) takes care of floats that move to the top or bottom of content passages. This draft is the web equivalent to what  print publications use to move which figures and photos to the top or bottom of columns or pages, along with their captions.

![](https://drafts.csswg.org/css-page-floats/images/7.png)

## Ways to enrich our web layouts
I guess I could reverse the question and ask what the web do that print can’t but I’ll be nice and ask how can we enrich our web content.  

The primary way is to add motion and interactivity. Best way to do this is with the Web Animation API.

[The web animation API](http://danielcwilson.com/blog/2015/07/animations-intro/) (WAAPI) is an attempt to unify all animation libraries available for the open web (SVG, CSS animations and CSS Transitions) using the same syntax. 

WAAPI makes complex animations easier to handle and provides additional functionality that not part of the component specifications. It also allows developers to do animations without requiring heavy libraries like GSAP (although there is still a place for GSAP in the animation ecosystem.)

## Keeping things in perspective
We can make our web content take some of the metaphors and conventions of printed media ***where it makes sense to do so.*** 

While I’ve always advocated for us to take advantage of the types of things we can do in print for our web content I’ll be the first one to to insist that we do not go overboard with the fancy. 

I’m not advocating for the web to turn into a digital version of our favorite magazines but to stop thinking that the holy grail layout is the only way we should be designing our contents and limiting the work of designers to just variations on a theme. 

## Examples

* [http://codepen.io/chriscoyier/full/YyxKea/](http://codepen.io/chriscoyier/full/YyxKea/)
* [http://helenvholmes.com/the-future-of-wearables/](http://helenvholmes.com/the-future-of-wearables/)
* [http://codepen.io/sturobson/full/gaGzKw/](http://codepen.io/sturobson/full/gaGzKw/)
* [http://thegreatdiscontent.com/](http://thegreatdiscontent.com/)
* [http://codepen.io/bartveneman/full/JGNmde/](http://codepen.io/bartveneman/full/JGNmde/)
* [http://read.artspacetokyo.com/](http://read.artspacetokyo.com/)
* [http://read.shapeofdesignbook.com/](http://read.shapeofdesignbook.com/)

