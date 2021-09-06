# The Athena Project
I've built some components for the project and I'm learning more about components and about web technologies as I go along. This is my attempt to document the process and the results I find through the journey. 

## Philosopy
I did a first round of documentation in [my blog](http://publishing-project.rivendellweb.net/athena-revisiting-a-possible-digital-publishing-flow/). This is an extension of that post with added information that I've learned since it was published. 

The idea is to create encapsulated components that can be used to compose larger pieces of content.  We take advantage of Web Component technologies ([HTML Imports](http://w3c.github.io/webcomponents/spec/imports/),  [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/), [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/) and [HTML Templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)) to create elements that encapsulate functionality of sections of a page.  

Where possible use off the shelf components someone else developed.  Creating your own components is fun and challenging but keeping a high quality of the components you create is much, much harder. 

Quality control is much harder than it appears both for your own code and other people's.  This is one of the reasons why Component Kitchen [closed its component catalog](https://component.kitchen/blog/posts/were-shutting-down-our-web-component-catalog), the reason that resonated with me the strongest:

> Even potentially useful components are seldom written at a level of production quality. We tried to start a "component of the week" blog post series in late 2014. We would sift through a dozen components just to find one that even worked outside the narrow confines of its demo. This isn't necessarily the fault of the component authors — it's really hard to write a solid web component today. (That's one reason we believe that establishing a Gold Standard for web component quality is a vital project.) We also believe that the web user interface framework vendors, such as Polymer and X-Tag, need to invest more heavily in making it easy to create components that meet that standard.
>  
> from [[https://component.kitchen/blog/posts/were-shutting-down-our-web-component-catalog](https://component.kitchen/blog/posts/were-shutting-down-our-web-component-catalog)](#)

I'd much rather build a smaller number of components that are of higher quality than average than write every single component from scratch, reinventing the wheel, and lowering the overall quality of the project. 

Another problem authors deal with when working with components is library version conflicts. Unfortunately current versions of Polymer are not backwards compatible.  There are a ton of useful components that work with Polymer 0.5 that authors have not updated to current versions, even with tools like [polyup](http://polymerlabs.github.io/polyup/) that are specifically designed to upgrade older versions to Polymer 1.x.   Figuring out whether it's enough to run Polyup on an existing component to bring it up to current standards (like I did to bring `juicy-markdown` to 1.0) or whether I have to do manual work (like my fork of `vimeo-player` where I had to manually fix issues because Poly up couldn't figure out how to upgrade the component) is not a trivial undertaking. 

We are working towards a fully composable authoring experience.  We want to make sure  that, whatever components we use can be nested inside each other and can be  styled independently. 

It is also possible, in theory, to use components from multiple libraries.  Rob Dodson created an [Interoperability example](https://github.com/robdodson/introp-examples) for both Polymer and X-Tag.  Although the repo uses older versions of Polymer and X-Tag, it's still a good example of what we can strive for. 

In order to do this we also need to create a set of conventions to be used throughout the components.  The most important of these conventions is what media queries to use and whether to code them in each component's CSS or create one master style sheet to be used with all the Athena components.  See below for a first pass at media query breakpoints

## Component Library
This is not an exhaustive list. We can build additional components using Google's and other parties' components to address specific needs. 

* Layout Components
	* athena-layout-standard (centered, 1 column)
	* athena-multicol (multicolumn, using CSS where supported)
	* [iron-flex-layout](https://elements.polymer-project.org/elements/iron-flex-layout)- based content layouts
	* Space to experiment with grids?
* Video
	* [vimeo-player](https://github.com/caraya/vimeo-player) (fork of [kappuccino/vimeo-player](https://github.com/kappuccino/vimeo-player) updated to work with Polymer 1.0)
	* [athena-video](https://github.com/caraya/athena-video) (for locally hosted video)
* audio
	* [athena-audio](https://github.com/caraya/athena-audio)
	* athena-soundcloud (***do I really need this one?***)
* Text
	* [athena-document](https://github.com/caraya/athena-document) (Markdown)
	* athena-html (pass through for HTML)
* Images
	* [athena-figure](https://github.com/caraya/athena-image/) (Figure + Figcaption)
	* [iron-image](https://elements.polymer-project.org/elements/iron-image)
*  Google Tools and APIs
	* [google-youtube](https://elements.polymer-project.org/elements/google-youtube)
	* [google-castable-video](https://elements.polymer-project.org/elements/google-castable-video)
	* [google-analytics](https://elements.polymer-project.org/elements/google-analytics)
	* [google-map](https://elements.polymer-project.org/elements/google-map)
* D3 Data Visualization
	* athena-d3-chart
	* athena-d3-bar
	* athena-d3-container
* Polymer Components
	* [neon-animated-pages](https://elements.polymer-project.org/elements/neon-animation)
	* [platinum-sw](https://elements.polymer-project.org/elements/platinum-sw)
	* [platinum-push-messaging](https://elements.polymer-project.org/elements/platinum-push-messaging)
	* [platinum-https-redirect](https://elements.polymer-project.org/elements/platinum-https-redirect)
* Polymer [Paper](https://elements.polymer-project.org/browse?package=paper-elements) and [Iron](https://elements.polymer-project.org/browse?package=iron-elements) elements as needed

Note that Polymer's Iron element set contains tools that go beyond visual components. Flex layouts, accessibility helpers, ajax and other invisible helper elements are all part of the Iron element family.

# Lessons Learned


## design for mobile first
I'm reading Ethan Marcotte's _[Responsive Design: Patterns and Principles](http://abookapart.com/products/responsive-design-patterns-principles)_ and one of my biggest takeaways is the importance of designing for mobile first, not just because mobile is not just form factor for accessing web content but also because it forces you to rethink your content and your site architecture.

## Browser support
Browser support is improving but it's still far from where it needs to be for components to be a really useful toolset.  Yes, they work in Chrome without polyfills but most other browsers  need one or more polyfills to work.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

## Media Query Breakpoints
One of the first things I had to decide was where to set up media query breakpoints and whether we are going to set the same queries for all elements.  When working with mobile and tablets we also have to consider orientation and pixel density (whether we're working  with a Retina device or monitor.) The basic set of queries are a combination of the following:

A Basic Set of Media Queries
* 320px (phone portrait)
* 480px (phone landscape)
* 768px (ipad Portrait)
* 1024 (iPads Landscape)
* 800px
* 1200px
* 1600px and larger

Orientation: 
* Portrait
* Landscape
* Both

Pixel Density (Retina Displays)
* 1 (Non Retina)
* 2 (Retina iPad and iPhone)
* 3 (very high resolution)

Do all elements need all break points? No. Because I'm using individual elements rather than build this as an application I can get away with using different break points for different elements or not using media queries at all. If we use a responsive image or a responsive vimeo-player then we don't need media queries... The content will resize itself to match the parent container.

## Customizing styles is hard
I'm working on elements that rely on CSS for layout.  Unfortunately there is no easy way to use data binding with style sheets.  

One option is to hardcode the styles in the component using classes and then interpolate classes in the template.  This may be cumbersome but works around any limitation on using data binding to style our components. 

Another, less desirable, option is to create inline styles and databind those elements with data from our host element. 

One final solution is to use [iron-flex-layout](https://elements.polymer-project.org/elements/iron-flex-layout) to create flexbox layouts out of the box.  [There is a guide](https://elements.polymer-project.org/guides/flex-layout) for using the element and creating flex layouts with it.   Flexbox may not be the solution for everything but it may be good enough for most basic work.

**Whichever option you use you need to maintain consistency**

> ***TODO: Research what are the performance penalties for using inline styles in components***

## Be careful with specificity
One of the things I've had to learn when working with Polymer is when am I being too specific.  For example: If I'm creating image-related components then I need to decide what's easier: create a component that wraps a figure and its caption separately from an image component that does not have caption?

I always tend to err on the side of being too specific when creating components so I can reduce the ammount of calculations that we need Polymer to do when stamping our individual elements.  Whether this is a good idea or not is debatable, but this is what I'm doing right now.

In addition, by not being clever in implementing elements I gain the benefits of HTML5 accessibility.  There are additional tools from Polymer that deal with accessibility they are still at the beginning of the journey. 

## Choosing functionality over reusability and performance?
As I learn about Polymer and the way it implements the web components specifications, I'm stuck between functionality and reusability. 

Two specific cases that come to mind are styling different instances of the same element differently and performance impact of using multiple components on a page. 

If we follow the idea of stylying elements using an inline `style` tag then we have the issue of what happens when we want to make changes to an instance of a Polymer element after it has been stamped? Does this matter for Athena elements at all? They are meant to display content so the only reason why they should change is in reaction to media queries or display change. 

Rob Dodson suggested the following code to work with binding to CSS. Instead of biding to CSS selector values like I thought I could, You create classes and then bind the value of the classes you need using a computed binding if there are multiple classes to add or a simple one or two-way binding if it's just one.  

The computed binding would look something like this (thanks to Rob for the example): 

```html
<dom-module id="x-foo">
 <template>
   <style>
     .large {
       font-size: 4em;
     }
     .fancy {
       font-family: cursive;
     }
     .pretty {
       color: rebeccapurple;
     }
   </style>
   <h1 class$="{{_getClasses()}}">Hello from x-foo</h1>
  </template>
  <script>
   Polymer({
     is: 'x-foo',
     _getClasses: function() {
       return 'large fancy pretty';
     }
   });
  </script>
</dom-module>
```

This is an example of how we can create classes inside our element and then use a computed binding to select which classes we want to add to an element. 


### Light versus Shadow DOM
One of the biggest advantages of web components can be its biggest drawbacks.  Because Shadow DOM is fully encapsulated it is very hard to style form the outside.  

Another possibility to style components might be to set the content up using a `content` tag in our template and then style it as a regular element.  The `content` tag has a `select` attribute that works like the select statement in SQL by choosing which child element to insert into the content tag. We can have more than one content tag to select multiple children.

I'm not 100% certain this will work but it's an interesting alternative.  See below for more details of using light versus shadow DOM.

I got the idea from @notwaldorf's update to `marked-element`. The template  looks like this:

```html
<dom-module id="marked-element">
  <template>
	  <style>
	    .hidden {
	      display: none !important;
	    }
	  </style>
	  <content select=".markdown-html"></content>
	  <div id="content" class="hidden"></div>
	</template> 
</dom-module>
```

And you call it with the following element declaration:

```html
<marked-element markdown="Markdown is _awesome_!">
  <div class="markdown-html"></div>
</marked-element>
```

This means that you have to write more code but  it implifies the styling of child element inside our custom elements.   This doesn't answer the question about using data binding for our styles but it makes it easier to create a common style sheet to unify styles throughout the final document.

However, if we plan to reuse our components outside an Athena-based document then we need to be careful how we organize our stylesheets.  We may have to create a document-specific stylesheet that overrides the default we've set up for our elements. 

## Embedding iframes is a pain in the ass
Most embed code today uses iframes and that's not necessarily a good thing.  When working on implementing  `athena-video`  (and before I decided to use `vimeo-player` instead) I kept hitting a weird issue where browsers would not let me embed the video iframe because of the way  permissions were set... something about X-Frame settings not allowing it.  This may be an issue with the way Polymer displays the demo inside the document viewer but I can't be sure that's the case and unless I have 100% certainty I can't really release the component to the wild.

As much as I hate the idea, permissions for X-Frame can be circumvented by using the corresponding API (what `vimeo-player` does) or figuring out an alternative.  Both video players (google and vimeo) do not exhibit this issue but it's important to be aware of it as it may happen in other settings as well.

## Conditionally loading Polymer
There is a way to test if we should load the Web Component polyfills based on whether the browser supports the technologies needed to run web components.  If the browser supports all the technologies for web components we do nothing... the browser will take care of the technologies on its own. 

If the browser doesn't support all the technologies needed for components we create a `script` element and make its source the path to our `webcomponents.js ` polyfill and, finally, we attach the script tag we just created to the head of our page. 

For a more complete review of performance and a more complete Polymer lazy loader see Paul Lewis' [Polymer for the Performance-obsessed](https://aerotwist.com/blog/polymer-for-the-performance-obsessed/).

```javascript
/**
* Conditionally loads webcomponents.js
* Based on work by Paul Lewis (@aerotwist)
*/
var webComponentsSupported = ('registerElement' in document
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template'));

if (!webComponentsSupported) {
  var wcPoly = document.createElement('script');
  wcPoly.src = '/third_party/webcomponents.min.js';
  document.head.appendChild(wcPoly);
} 
```

## Creating an App Shell for our contennt

At the [Chrome Dev Summit](https://developer.chrome.com/devsummit) this year there was a lot of talk about Progressive Web Applications: what they are, how they are built and why they are important. 

Alex Russell first articulated what these progressive applications should look like in his post [Progressive Web Apps: Escaping Tabs Without Losing Our Soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/).  It speaks about regular web applications, not ones created with web components but it shouldn't be too hard to translate the requirements of a progressive application into web component terminology. 

Rob Dodson did this translation at the Chrome Dev. Summit when he spoke about [building  progressive appllications using Polymer](https://www.youtube.com/watch?v=g7f1Az5fxgU).  What I liked about the talk was how he presented components as abstractions and how can developers best leverage the components created to reduce the ammount of manual work we have to do to implements these features (service workers and push notifications are two that come to mind.)

This brought to mind the idea that `app-layout` and paper element layouts are not the only way we can layout out and style our component-based content.  Using app-layout as a template it should not be hard to create our own base layout components 

## Inlining CSS for Critical Path
To me one of the most intriguing concepts to come out of the web performance community is the critical path. Without going into too many details it means inlining the CSS necessary to get your above the fold content (the portion of your site which can be shown when first entering the site without scrolling down at all) to display without having to make a network request for the necessary CSS. 

There are tasks in most build tools that will automate the generation and inlining of critical path CSS so that we'll get our initial content to display fast, even when the rest of the page CSS and associated content. 

When working with components this begs the question: *how do we inline CSS that is hidden inside an element?* 

It may be that we have to ue a dummy skeleton while the content loads as Rob suggest in his talk. Or maybe we have to pull some of the CSS out of our layout component to make sure we get a fast first paint.  Will have to research options and their performance implications.

## Bowing to intevitability: Including a build process in the project
I hate build tools and I hate being dictated what tool to use on my projects. I've adopted Grunt for most of my projects but Polymer adopted Gulp for their projects including all Polymer based projects where there is a build process involved. 

I first saw this in their [Polymer Starter Kit](https://developers.google.com/web/tools/polymer-starter-kit/?hl=en) where the Gulp-based build process takes care of a lot of the trivial and tedious things I would have to do manually otherwise. In addition to all the standard tasks such as scritp concatenation and image minimization the best example of Polymer specifc tooling is building the list of files to cache using the `platinum-sw-cache` element. The code looks  like this:

```javascript
// Generate config data for the <sw-precache-cache> element.
gulp.task('cache-config', function(callback) {
  var dir = dist();
  var config = {
    cacheId: packageJson.name || path.basename(__dirname),
    disabled: false
  };
  glob([
    'index.html',
    './',
    'bower_components/webcomponentsjs/webcomponents.min.js',
    '{elements,scripts,styles}/**/*.*'],
    {cwd: dir}, function(error, files) {
    if (error) {
      callback(error);
    } else {
      config.precache = files;
      var md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(config.precache));
      config.precacheFingerprint = md5.digest('hex');
      var configPath = path.join(dir, 'cache-config.json');
      fs.writeFile(configPath, JSON.stringify(config), callback);
    }
  });
});
```
We may also want to add additional functionality to the default build script. I keep thinking that we may want to use SASS to stule the root element so we can make it easier to work with and easier to change if we need to. 

There are more performance optimizations we can do through a build system.  How many of those optimizations are necessary for a Polymer application is subject for further research.

To see what a build script using Gulp looks like for a Polymer project, look at the [gulpfile build script](https://github.com/PolymerElements/polymer-starter-kit/blob/master/gulpfile.js) from the [Polymer Starter Kit](https://developers.google.com/web/tools/polymer-starter-kit/?hl=en)

## Accessibility is a bigger challenge than I first thought
When working with regular HTML user agents take care of a lot of the accessibility considerations, all the HTML elements have accessibility baked into them and if we're going to build our own components we need to take care of accessibility and ARIA is not the easiest spec to understand and follow... at least not yet. 

One of my goals is to write blog posts as I learn more about accessibility inside and outside the Polymer sphere. 

# Web component evaluation criteria
Until we have a fully standardized Web Component ecosystem supported in all major browsers it's kinda hard to create a standard evaluation sheet. [The Gold Standard](https://github.com/webcomponents/gold-standard/wiki) is a good beginning but it's far from complete and lacks explanations for people who may not be familiar with the scripting side of components. 

I've taken some of the requirements from the Gold Standard to build my own checklist. I'm not trying to reinvent the wheel but as a way to better understand the issues involved in web component creation and use.  This list also helps me evaluate third party components form inclusion in athena-based projects

* Loading
	  * [Expressed Dependencies](https://github.com/webcomponents/gold-standard/wiki/Expressed-Dependencies) — Does the component import or otherwise load all of its own dependencies?
	  * [Load Order Independence](https://github.com/webcomponents/gold-standard/wiki/Load-Order-Independence) — A component should avoid requiring that you load it at some particular point in your HTML source (“first”, “last”, etc.).
	  * [Relative Paths](https://github.com/webcomponents/gold-standard/wiki/Relative-Paths) — Are all paths relative to required resources (images, etc.) relative to the component source?
* DOM Presence
	  * [Host Independence](https://github.com/webcomponents/gold-standard/wiki/Host-Independence) — Can you use the component inside a wide range of host element types?
	  * [Declared Semantics](https://github.com/webcomponents/gold-standard/wiki/Declared-Semantics) — Does the component expose its semantics by wrapping/extending a native element, or using ARIA roles, states, and properties? Accessibility
	  * [Meaningful Structure](https://github.com/webcomponents/gold-standard/wiki/Meaningful-Structure) — Does the component's DOM structure reflect the meaningful relationship between elements, such that those relationships are clear to a user relying on an assistive device? Accessibility
	  * [Local Effects](https://github.com/webcomponents/gold-standard/wiki/Local-Effects) — Does the component limit its effects to itself (or a designated target element)?
* Content
	  * [Children Visible](https://github.com/webcomponents/gold-standard/wiki/Children-Visible) — If the component is visible and given an initial set of children, are those children visible without any attributes, methods, event handlers, or styles required?
	  * [Auxiliary Content](https://github.com/webcomponents/gold-standard/wiki/Auxiliary-Content) — Does the component permit the use of child elements that perform auxiliary functions?
	  * [Back-End Independence](https://github.com/webcomponents/gold-standard/wiki/Back-End-Independence) — Can the component retrieve its content from a variety of a back-end services?  
* Interaction
	  * [Focusable](https://github.com/webcomponents/gold-standard/wiki/Focusable) — If the component is interactive, can you navigate to/through it with Tab and Shift+Tab?
	  * [Keyboard Support](https://github.com/webcomponents/gold-standard/wiki/Keyboard-Support) — Can you use the basic aspects of component exclusively with the keyboard? Accessibility
* Styling
	  * [Presentable](https://github.com/webcomponents/gold-standard/wiki/Presentable) — If the component is instantiated with no explicit styling, is it reasonably attractive, such that someone could feel comfortable presenting it as is?
	  * [Default Font](https://github.com/webcomponents/gold-standard/wiki/Default-Font) — By default, does the component use the inherited font face, size, style, and weight?
	  * [Default Colors](https://github.com/webcomponents/gold-standard/wiki/Default-Colors) — By default, does the component make use of the inherited forecolor and backcolor?
	  * [Focus Visible](https://github.com/webcomponents/gold-standard/wiki/Focus-Visible) — Can you easily see when the component has focus?
	  * [Sufficient Contrast](https://github.com/webcomponents/gold-standard/wiki/Sufficient-Contrast) — Are labels, icons, etc. perceivable and usable by low vision users?
	  * [High Contrast](https://github.com/webcomponents/gold-standard/wiki/High-Contrast) — Is the component perceivable and usable when High Contrast Mode is enabled?
	  * [Responsive](https://github.com/webcomponents/gold-standard/wiki/Responsive) — Does the component scale well to standard mobile, tablet, and desktop screen sizes?
* API
	  * [Member Order Independence](https://github.com/webcomponents/gold-standard/wiki/Member-Combinations) — Can you set or invoke the component’s attributes, properties, and methods in any order?
	  * [Member Combinations](https://github.com/webcomponents/gold-standard/wiki/Member-Combinations) — Can you generally use all the component’s attributes, properties, and methods in any combination?
	  * [Required Properties](https://github.com/webcomponents/gold-standard/wiki/Required-Properties) — Does the component avoid requiring properties to be set unless absolutely necessary?
* Performance
	  * [Computational Performance](https://github.com/webcomponents/gold-standard/wiki/Computational-Performance) — Generally speaking, does the component perform its core functions reasonably quickly?
	  * [Vector Graphics](https://github.com/webcomponents/gold-standard/wiki/Vector-Graphics) — Where possible and appropriate, are the component’s graphics in a scalable vector form?
	  * Does the element meet RAIL performance guidelines?
* Development
	* [Purpose Statement](https://github.com/webcomponents/gold-standard/wiki/Purpose-Statement) — Does the component’s header comment begin with a short (ideally, single sentence) statement of the component’s purpose?
	* [Prefixed Name](https://github.com/webcomponents/gold-standard/wiki/Prefixed-Name) — Does the component have a name prefixed with a project name, element collection name, organization, or something with semantic meaning?


# Links, Resources and Bibliography

## Web Components
* HTML Imports
	* [HTML Imports specification](http://w3c.github.io/webcomponents/spec/imports/)
	* [HTML Imports Tutorial -- HTML5 Rocks](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)
* Shadow DOM
	* [Shadow Dom specification](http://w3c.github.io/webcomponents/spec/shadow/)
	* [Shadow DOM 101](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/) -- HTML5 Rocks
	* [Shadow DOM 201:  CSS and Styling ](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/) -- HTML5 Rocks
	* [Shadow DOM 301: Advanced Concepts & DOM APIs](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/) -- HTML5 Rocks

* Custom ELements
	*  [Custom Elements specification](http://w3c.github.io/webcomponents/spec/custom/)
	* [Custom Elements tutorial](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
* HTML Templates
	* [HTML Templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) in the HTML living standard
	* [HTML Template tutorial](http://www.html5rocks.com/en/tutorials/webcomponents/template/)  --  HTML5 Rocks
* Web Components libraries and frameworks
	* [The Polymer Project](https://polymer-project.org/)
	* [X-Tag library](http://x-tag.github.io/)
* The Gold Standard 
	* [Web Component Gold Standard](https://github.com/webcomponents/gold-standard/wiki) from Component Kitchen

## Service Workers
* [Is ServiceWorker Ready?](https://jakearchibald.github.io/isserviceworkerready/)
* [Introduction to ServiceWorker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
* [The Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/)
* [ServiceWorker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - MDN
* [What's the difference between "service workers" and "web workers" in JavaScript?](https://www.quora.com/Whats-the-difference-between-service-workers-and-web-workers-in-JavaScript)
* [Service Workers in Production](https://developers.google.com/web/showcase/case-study/service-workers-iowa) -- Google Developers

## Background Sync
* [Background Synchronization Explained](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)
* [Introducing Background Sync](https://developers.google.com/web/updates/2015/12/background-sync)

## Push Notifications
* [Push Notifications on the open web](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web?hl=en)
* [Reaching and re-engaging users on the mobile web](http://blog.chromium.org/2015/04/reaching-and-re-engaging-users-on.html)

## Promises
* [JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* [JavaScript Promises: There and back again](http://www.html5rocks.com/en/tutorials/es6/promises/) -- HTML5 Rocks
* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) -- MDN

## Accessibility
* [Web Content Accessibility Guidelines (WCAG) 2.0 ](http://www.w3.org/TR/WCAG20/) Specification
* [Accessible Rich Internet Applications (WAI-ARIA) 1.0 ](http://www.w3.org/TR/wai-aria/) Specification
* [WAI-ARIA 1.0 Primer](http://www.w3.org/TR/wai-aria-primer/)
* [Making Polymer Elements Accessible](http://webcomponents.org/presentations/making-polymer-elements-accessible/) -- Alice Boxhall -- Google I/O Dev Bytes
* [A11y with Polymer](https://www.youtube.com/watch?v=o6yLWihykVA) -- Laura Palmaro & Alice Boxhall -- Polymer Summit 2015
* [On the Accessibility of Web Components Again](http://www.brucelawson.co.uk/2014/on-the-accessibility-of-web-components-again/) -- Bruce Lawson
* [ Polymer and Web Component Accessibility: Best Practices ](http://unobfuscated.blogspot.com/2015/03/polymer-and-web-component-accessibility.html) -- Dylan Barrell
* [Accessibility of Web Components](http://marcysutton.github.io/accessibility-of-web-components/slides.html#/slide1) -- Marcy Sutton
* [Web Components punch list](https://www.paciellogroup.com/blog/2014/09/web-components-punch-list/) -- Steve Faulkner
* [Color Contrast Ratios & Font Sizes](http://thenewcode.com/603/A-Study-In-Contrasts-Font-Sizes-Contrast-Ratio-and-Accessibility) -- The New Code
* [Designing For Color Blindness](http://thenewcode.com/383/Designing-For-Color-Blindness) -- The New Code
* [Making SVG Accessible](http://thenewcode.com/1026/Making-SVG-Accessible) -- The New Code

##  Usability
* [Designing for Usability](http://www.ee.oulu.fi/~vassilis/courses/pui09S/papers/gould-85.pdf) (pdf) – IBM
* [Design Processes, Not Interfaces](http://lanyrd.com/2012/ft2012/srfwy/#link-hrzq) – Tiffany Conroy
* [Designing in Browser](http://nimbu.in/codemelb/#/title) – Divya Manian
* [Interview with Jonathan Ive](http://www.telegraph.co.uk/technology/apple/9283706/Jonathan-Ive-interview-simplicity-isnt-simple.html) in the Telegraph

## Performance
Callender Hogan, Lara (2014):  *[Designing for Performance: Weighing Aesthetics and Speed](http://shop.oreilly.com/product/0636920033578.do)*. New York, O'Reilly & Associates.

Grigorik, Ilya (2013): *[High Performance Browser Networking](http://shop.oreilly.com/product/0636920028048.do)*. New York, O'Reilly & Associates.

Souders, Steve (2007): *[High Performance Web Sites: Essential Knowledge for Front-End Engineers](http://shop.oreilly.com/product/9780596529307.do)*. New York, O'Reilly & Associates.

Souders, Steve (2009): *[Even Faster Websites](http://shop.oreilly.com/product/9780596522315.do)*. New York. O'Reilly & Associates.

Irish, Paul and Paul Lewis (2015): [Introducing RAIL: A User-Centric Model For Performance](http://www.smashingmagazine.com/2015/10/rail-user-centric-model-performance/). Published in [Smashing Magazine](http://www.smashingmagazine.com/).

Irish, Paul (2015): [How Users Perceive the Speed of The Web](https://www.youtube.com/watch?v=2ksXo2_Lfl0) -- keynote at Fluent 2015 conference.

Irish, Paul (2015): [Doing a Perf Audit of your Polymer App](https://www.youtube.com/watch?v=SkN5Q7nf7Vg) -- presented at the  Polymer Summit 2015.


Lewis, Paul (2015): [Polymer for the Performance-obsessed](https://aerotwist.com/blog/polymer-for-the-performance-obsessed/).  Published at [Aerotwist](https://aerotwist.com/)
 
## (Responsive) Web Design
Google (2015): [Material Design Guidelines](https://www.google.com/design/spec/material-design/introduction.html).

Google (2015): [Material Design: Responsive UI](https://www.google.com/design/spec/layout/responsive-ui.html). Part of the Material Design Guidelines

Marcotte, Ethan (2014): *[Responsive Web Design, Second Edition](http://abookapart.com/products/responsive-web-design)*. New York,  A Book Apart

Marcotte, Ethan (2015): *[Responsive Design: Patterns and Principles](http://abookapart.com/products/responsive-design-patterns-principles)*.  New York, A Book Apart. 
