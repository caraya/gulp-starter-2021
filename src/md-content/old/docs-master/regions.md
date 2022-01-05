---
title: CSS regions, part 2
date: 2014-09-25
category: Technology
status: draft
---

The landscape for [CSS regions](http://dev.w3.org/csswg/css-regions/) has changed drastically since the last time I visited the technology. Since the [last post](http://publishing-project.rivendellweb.net/css-regions-exclusions-shapes-and-new-publishing-paradigms/) about the technology (published in October, 2013) the following events took place:

* Google, citing concerns about performance, withdrew region support from the Blink rendering engine ([Cnet posted an article about this](http://www.cnet.com/news/reversing-course-google-rejects-adobe-web-publishing-tech/))
* Mozilla split some aspects of the CSS regions specification into [another specification](http://dev.w3.org/csswg/css-overflow/) which they believe <em>satisfies the use cases put forward by CSS Regions in a way that our team can support in a much more secure, reliable, and performant manner.</em>
* L. Dave Baron opposed regions as proposed in the specification in the context of performance and its use as a language primitive for the Extensible Web Movement as expressed in their [manifesto](http://extensiblewebmanifesto.org)
* Håkon Wum Lie, Opera's CTO, is also opposed to Regions as proposed (documented in this [a list apart article](http://alistapart.com/blog/post/css-regions-considered-harmful) and in this [followup](http://www.wiumlie.no/2014/regions/still-harmful))
* Microsoft has shapes under consideration

For those interested the thread that first got my attention starts [with this message](http://lists.w3.org/Archives/Public/www-style/2014Jan/0301.html) and it moves through this and other threads

My concern is that rather than working on improving the current spec both companies decided to go their own way, not supporting the spec as written and proposing their own versions to the W3C. Sadly, until everything is sorted out, this argument in the working group makes developers who are not as opposed to the idea pay the price by having to polyfill the feature in half the modern browsers, whether [evergreen](https://twitter.com/wycats/status/429783051984326657) or not.

Now into specifics. 

## Regions

Regions are a way to fragment the content of a web page into distinct containers to create magazine-like layouts without having to worry about content flow or where the content will be positioned. This feature is comparable to Fixed Layout ebooks and print magazine layouts generated with Adobe InDesign. 

The biggest advantage of the specification is that we no longer have to worry about where the content will flow when it fills the current region. We will discuss how to accomplish this later in the article. 

Creating regions consist of four steps. 

1. Create the container where the content will flow into
2. Specify the content section that the content will flow from
3. Set up the CSS for the containers created in step 1 and 2
4. Style the resulting region if you so choose

An example from a project under development:

The HTML content below covers both creating the div that will hold the content and the div that has the content we'll place. 

```html
<div class='content-overview-region' id='overview01'></div>

<div class='burningman-overview'>

<p><strong>Burning Man</strong> is a week-long annual event that began in San Francisco's Baker Beach and migrated to the Black Rock Desert in northern Nevada, in the United States. The event begins on the last Monday in August, and ends on the first Monday in September, which coincides with the American Labor Day holiday. It takes its name from the ritual burning of a large wooden effigy, which is set alight on Saturday evening. The event is described as an experiment in community, art, radical self-expression, and radical self-reliance.</p>
</div><!-- Closes burningman-overview-->
```

The CSS portion of the project has the source of the contnent (using the <code>burningman-overview</code> class) and the region we'll create to place the content (using the <code>content-overview-region</code> class). We also use <code>content-overview-region</code> to style the content inside the region.

I also like to assign borders with different colors to each of the regions I'm working with to create a visual layout of the content in the page as I develop the layout.

```css
/**
* OVERVIEW FLOW
*
* Defines the source of the content that will flow into the 
* overview region of the document
*/
.burningman-overview  {
  flow-into: content-overview-region;
  -webkit-flow-into: content-overview-region;
  -ms-flow-into: content-overview-region;
}

.content-overview-region {
  flow-from: content-overview-region;
  -webkit-flow-from: content-overview-region;
  -ms-flow-into: content-overview-region;
}

/**
 * STYLE FOR THE OVERVIEW REGION
 */
.content-overview-region {
  position: relative;
  width: 90%;
  height:auto;
  margin: 0 auto;
  padding: 2em;
  border: 1px solid purple;
}
```

As your content grows larger you have two options: create additional regions to flow the content into (which you can use to create columns or other shapes), make the single regions you created automatically grow to fit the content using <code>height: auto</code> (as in the example above) or use the CSS Object Model (CSSOM) to programatically add containers for your content to fill into. It will all depend on your design and layout goals for your current project.

A CSS Region experiment is available in this [codepen](http://codepen.io/caraya/pen/GmqkJ). Currently it only works in Safari and Internet Explorer as it does not use the regions polyfill. 

An example of programatically adding regions to existing content can be found in the CSS Regions Polyfill [Github repository](https://github.com/FremyCompany/css-regions-polyfill/blob/master/examples/cssom/index.html) and in this [codepen](http://codepen.io/caraya/pen/LdjzG)


## Alternatives: using @support

Another alternative is to use the @support css at-rule to provide one set of styles, including regions, for those browsers that support them and another set of styles for those browsers that don't.

Lea Verou wrote a [tutorial](http://www.creativebloq.com/css3/how-use-supports-rule-your-css-11410545) on how to use the @support feature in your CSS code. Mozilla Developers Network has useful [information and examples](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports), particularly the compatibility table. 

If we look at the MDN compatibility table we see the biggest weakness of the @support at-rule. It is not supported accross the board... in the case of regions, though, it is supported for the browsers (Chrome and Firefox) that we need to target as not supporting regions. I would construct the rules somehting like this:

<pre><code>@support not (flow-into: content-overview-region;) {
  /* 
    Write rules here to acommodate browsers not supporting
    regions, maybe using media queries to address positioning
    and size
  */
</code></pre>

## Alternative: using Modernizr or other conditional loaders

Modernizr feature detection is another tool we an use to conditionally load content based on support (or lack thereof) for a given feature. 

Modernizr test for css regions under the non-core detects (you have to manually add the test as it is not added to the default build.)

To make sure that the polyfill does't conflict with native implementations of the specification I use [Modernizr.load](http://modernizr.com/docs/#load) to test for browser support in regions and then only load the javascript polyfill for browsers that do not support the feature. I placed the following Javascript code on the head of my page. 

  <div data-height="257" data-theme-id="2039" data-slug-hash="mHlxL" data-default-tab="html" data-user="caraya" class='codepen'><pre><code>&lt;html class=&#x27;no-js&#x27;&gt;
  &lt;head&gt;
  &lt;!-- portions of the document head section omitted --&gt;
  &lt;script src=&quot;scripts/modernizr-region.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;
    Modernizr.load({
      test: Modernizr.region,
      nope: &#x27;scripts/cssregions.js&#x27;
    });
   &lt;/script&gt;
   &lt;/head&gt;
   </code></pre>

<p>See the Pen <a href='http://codepen.io/caraya/pen/mHlxL/'>mHlxL</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//codepen.io/assets/embed/ei.js"></script>

To reduce the bandwidth requirements for the demo, I created a custom Modernizr build with only regions and load support. I then used <code>Modernizr.load</code> to test for support of regions (the test portion) and only load the polyfill when the test fails (the nope section). If you're already using Modernize you can just add the CSS regions feature test (located in the non core section) and download a new build for your project. 

## Alternative: CSS Regions Polyfill

All is not lost if you want to move this into more serious testing or even some light production work. There is a [CSS Region Polyfill](https://github.com/FremyCompany/css-regions-polyfill) available that makes regions work in all browsers.

The polyfill doesn't change the CSS code described above. We coded defensively and added the three possible options we can use for CSS regions:

* Unprefixed version used by the polyfill code
* -webkit used by Safari
* -ms used by IE

Everything is not rosy. The polyfill lacks support for some features and has some serious limitations. From the polyfill [Readme file](https://github.com/FremyCompany/css-regions-polyfill/blob/master/README.md):

Some features are not supported:

> CSS:

> Basic @region support (styling fragments based on current region)

> JS:

> NamedFlow.getRegionFlowRanges()

### Known issues with regions polyfill

From the polyfill [Readme file](https://github.com/FremyCompany/css-regions-polyfill/blob/master/README.md):

Some caveats apply:

* Because the code is asynchronous, the only way to be sure you can act on a NamedFlow is to listen to its regionfragmentchange event. Unlike the browser which computes the layout of the page synchronously, the JavaScript implementation is asynchronous by nature and cannot perform synchronous operations
* Another consequence of the code executing asynchronously is that screen flashing is possible in some cases, especially during the page load if correct display:none styling is not applied to hide the source content wrapper before the content itself is flown into a region. It's also advised to put overflow: hidden on regions when possible even if it shouldn't be strictly required
* The regionoversetchange event is not guaranteed to fire only when the overset actually changes. Guaranteeing this would requires storing a lot of information and compare them at runtime, and I decided it would not be worth the time
* Dynamic elements cannot be put into a flow without harming their functionnality (this incudes forms, and a lot of interactive objects). This implementation is only suitable for static or mostly static content
* In the same vein, hover and active style do not apply to content inside a region. This limitation could possibly be lifted in some cases but I await feedback this is actually useful before proceeding
* Because elements are actually cloned in the regions, you may receive those clones as a result of getElementsByTagName or querySelectorAll queries, as well as methods such a elementsFromPoint. The actual ID and class names of the objects are not preserved in the fragments to reduce the risk, but this is by no mean a complete guarantee. A solution is to check the data-css-regions-fragment-of attribute and recover the original source by using the data-css-regions-fragment-source attribute
* Because computing nested css-counters manually would be very expensive in cpu horse power, I decided to leave this case as is. Most non-nested css-counters should work fine, however

The biggest unknown for the polyfill is performance in mobile devices. Neither Adobe or the polyfill author has made statements about the performance of the polyfill in mobil devices. This may not be an issue for simple layouts but will definitely become a problem for more complex layouts and designs.

The answer is the same as with many other development projects. ***Test, iterate, get feedback and iterate some more.***