# Think like a coder

I’ve been away from epub and #eprdctn for a while, mostly working on build tools and API’s (see previous posts in this blog for more details.) but I’ve been reading the #ebookcraft and #eprdctn twitter streams and that brought back an idea I started writing about a while back and never got around to finish. 

It’s about bringing some of the stuff we do for web projects into digital publishing and eprdctn.  Since I’ve been out of the loop this may or may not be already happening but I want to make sure that I document my ideas moving forward. 

I’m not advocating everyone has to be an expert in CSS, HTML5 and associated Javascript APIs but to at least be familiar enough to have a good enough knowledge of where to look when something breaks. 

## What are we targeting?
Do we know exactly what features are supported in each of the reading devices we target?   In working with web browsers we can  use tools like [caniuse.com](http://caniuse.com/) to do an initial appraisal about web features and look at bug databases ([chromium based browsers](https://bugs.chromium.org/), [Firefox](https://bugzilla.mozilla.org/page.cgi?id=productdashboard.html&tab=&product=Firefox&bug_status=open), [Webkit](https://bugs.webkit.org/) and [Microsoft Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/))  to track if issues with a feature we want to use or even file bugs if the feature doesn’t work as intended. 

Unfortunately ebooks don’t provide the same level of transparency and feature availability.  Some people have made effots to provide references and clearinghouses like Derrick Schultz’s [99 Issues](https://github.com/dvschultz/99problems/issues) and Friends of Epub’s [Will that be Overriden](https://github.com/FriendsOfEpub/WillThatBeOverriden) provide a starting point but coming from a ‘caniuse’ mentality is hard to get used to the lack of information. 

One of the things that I would love to see is a set of sensible defaults for epub stylesheets, either as part of the specification that all vendors must adopt as a minimal stylesheet or as a curated collection of styles that we can use as a startning point for our work. 

## Starting from a common base

[Normalize.css](https://github.com/necolas/normalize.css/) is a combination of CSS reset and feature normalization library. The idea is that it’ll take the features that are most problematic across web browsers and smooth over the differences in rendering to provide a more consistent development environments for authors to work with and work from. 

Older solutions like Eric Meyer’s [Reset CSS](http://meyerweb.com/eric/tools/css/reset/) which resets all the styles for all elements regardless of whether we need them or not, thus making developers start from scratch for every element we add to our pages. This may be the solution we want but it’s seldom nice or easy to do every time. 

In there latest epub 3.1 repository there are two issues that brough this back to the forefront for me: [671](https://github.com/IDPF/epub-revision/issues/671) and [672](https://github.com/IDPF/epub-revision/issues/672). The later one is the one I’ll concentrate on; although I consider both of them equally important. 

Creating an epub normalization stylesheet thtat takes into account accessibility, the multiple form factors ebooks have to work with and the different stylesheets vendors and content creation software provide as documented in [WIllThatBeOverriden](https://github.com/FriendsOfEpub/WillThatBeOverriden) and [Mnmst](https://github.com/JayPanoz/mnmlst). 

The idea is not to have to fight the reader’s defaults and work with them instead.  It may take some use (and maybe abuse) of what CSS does and doesn’t do. For example, knowing  that the user stylesheet takes precedence over the user agent stylesheet we may be tempted to do something like this in our author stylesheets:

	html {
	  font-family: sans-serif !important;
	  -webkit-text-size-adjust: 100% !important;
	}
	body {
	  margin: 5% !important;
	}

It’s not an ideal as it breaks the cascade for anyone building upon our stylesheets. All rules that change the font family or the default margins in the body need to be made `!important` as well or the effect will be lost (even in the same author or user styelsheet)

It would be much btter if we have a standard across readers that we can plug our code to without having to do the battle of the `!important` declarations (more on this when we look at specificity and the cascade.)  

## Why we use and why we should use !important?
*or the case for working together*

The process that leads us to use `!important` is something like this

1. We create awesome CSS
2. It doesn’t work
	* We bang our heads against the desk trying to figure out why
	* We look in Stack Overflow where we some times find the answer
3. When we can’t figure out the cause we add `!important`
4. It works
5. We move on

We never investigated why is our awesome CSS not displaying as designed and we never stop to worry what the implications of that `important` rule is for the project, for whatever additional stylesheet we have to lay on top of our awesome CSS  and even how will the next developer or designer figure out why we made the rule `!important` to begin with. 

For Reading System vendors this is even more important. I know that you probably don’t want people messing with the styles you so carefully put together for your books; but you also need to understand that it’s a compromise.  Book designers a much better grasp of what works and doesn’t work for their audiences and the creation process should be a collaborative one.  

Publishers can start by removing all `!important` declarations. We know there are things you consider essential but they may not always be.  If you feel the declarations must be there, please document them so we understand what we need to override when we don’t agree with your decisions. 

As ebook creators  we need flexibility to craft reading experiences that are of high quality or by making sue we can distinguish our work from. 

So, in a roundabout way we come back to a normalized default stylesheet.  What might it look like? Here’s a basic idea of what it may look like as a SCSS source for SASS compilation (adapted from [soma.css](https://github.com/JayPanoz/Soma/blob/master/src/Soma.css) by removing the more opinionated portions and converting it to SCSS.)

	$hr-border-top: #eaeaea;
	$hr-background-color: #171717;
	
	// Minimalistic Reset
	aside, figure, figcaption, nav, section {
	  display: block;
	  font-size: 100%;
	  line-height: inherit;
	  margin: 0;
	  padding: 0;
	}
	
	h1, h2, h3, h4, h5, h6, figure, figcaption {
	  adobe-hyphenate: none;
	  -epub-hyphens: none;
	  hyphens: none;
	  page-break-after: avoid;
	  page-break-inside: avoid;
	  text-indent: 0;
	}
	
	h1 {
	  font-size: 1.4375em;
	  line-height: 1.04347826;
	  margin-bottom: 3.13043478em;
	  margin-top: 0;
	}
	
	h2 {
	  font-size: 1.3125em;
	  line-height: 1.14285714;
	  margin-bottom: 1.14285714em;
	  margin-top: 2.28571429em;
	}
	
	h3 {
	  font-size: 1.125em;
	  font-style: bold;
	  line-height: 1.33333333;
	  margin-bottom: 0;
	  margin-top: 1.33333333em;
	}
	
	p {
	  font-size: 1em;
	  line-height: inherit;
	  margin: 0;
	  padding: 0;
	}
	
	p:not:first-child {
	  text-indent: 1.5em;
	}
	
	
	blockquote {
	  font-size: 1em;
	  font-style: italic;
	  line-height: inherit;
	  margin: 1.5em 5%;
	
	  em, cite {
	    font-style: normal;
	  }
	}
	
	ul, ol {
	  margin: 1.5em 0;
	  padding-left: 5%;
	}
	
	ul ol, ul ul, ol ol, ol ul {
	  margin: 0;
	}
	
	li {
	  font-size: 1em;
	  line-height: inherit;
	}
	
	pre {
	  margin: 1.5em 0 1.5em 5%;
	  tab-size: 2;
	  white-space: pre-wrap;
	  word-wrap: break-word;
	}
	
	em {
	  font-style: italic;
	
	  em {
	    font-style: normal;
	  }
	}
	
	strong {
	  font-weight: bold;
	}
	
	figure {
	  margin: 1.5em auto;
	  text-align: center;
	
	  img {
	    height: auto;
	    max-width: 100%;
	  }
	
	  figcaption {
	    font-size: .9375em;
	    font-style: italic;
	    line-height: 1.6;
	    text-align: center;
	  }
	}


## Understanding CSS Specificity and the Cascade
When I started working with CSS what frustrated me the most was the cascade: How does the browser handle different values for the same elector? How does the browser process rules (beyond ‘last one wins’)? 

Estelle Weyl’s [CSS Specificity article](http://www.standardista.com/css3/css-specificity/) and the “speciFISHity” chart may help understand what specificity is, why `!important` is a dangerous tool to use when creating CSS and how we can best leverage specificity in our own code

![CSS Specificity table using fish](http://publishing-project.rivendellweb.net/wp-content/uploads/2016/04/specificity-weyl.png "CSS SpeciFISHity")

Part of the problem is understanding the [CSS cascade](https://www.w3.org/TR/CSS21/cascade.html#cascade) (from where the cascading part of CSS derives from.) In short the precedence order is:

1. Find all declarations that apply to the element and property in question, for the target media type. Declarations apply if the associated selector matches the element in question and the target medium matches the media list on all @media rules containing the declaration and on all links on the path through which the style sheet was reached.
2. Sort according to importance (normal or important) and origin (author, user, or user agent). In ascending order of precedence:
	3. user agent declarations
	4. user normal declarations
	5. author normal declarations
	6. author important declarations
	7. user important declarations
	8. Sort rules with the same importance and origin by specificity of selector: more specific selectors will override more general ones. Pseudo-elements and pseudo-classes are counted as normal elements and classes, respectively.
9. Finally, sort by order specified: if two declarations have the same weight, origin and specificity, the latter specified wins. Declarations in imported style sheets are considered to be before any declarations in the style sheet itself.

These lists and cheat sheets haven’t always solved all my problems but, at least they’ve provided me with a better understanding of where to look for solutions.

So why bring this up in discussing styling for epub ebooks? The cascade in particular has helped me understand some of the issues and nuances of structuring stylesheets for epub use.  We only have two origins for epub stylesheets: user stylesheets are not used and, to the best of my undestanding 

# How do we style books

Here are some solutions for how do we style content and how I envision them applied to ebooks. 

These are ideas, I haven’t had the full time to test them in all devices and for all situations. They are dependent on device (as many of our work in ebooks is) but even if they don’t work today it may be a good starting point for discussions about what technology to adopt moving forward.

## Media Queries

[Media queries for Kindle devices](http://epubsecrets.com/media-queries-for-kindle-devices.php) by Derrick Schultz provides another way to look at structuring content for ebooks. If we know what the device we’re targeting is we can provide media queries to deal with that device and nothing else or, as we normally do for web content, we can target devices and resolutions (see [we don’t need device specific breakpoints](https://responsivedesign.is/articles/why-you-dont-need-device-specific-breakpoints) for more information as to why we don’t target specific devices.) Rather than worry about specific devices we could worry about 3 aspects:

* Device size
* Device orientation
* Device screen resolution

And then add vendor specific overrides to each media query based on the order of the cascade and the specificity of the selectors we use. 

Below is an example of a variety of media queries. They can be further refined by adding an orientation attribute to target portrait and landscape use cases, but for example purposes the default query will do. Also note that while we assing a media query to a specific device the queries, except those geared towards Kindle devices, will work across devices as long as those devices match all the conditios in the query. 

Finally, if there are things we want to work across all devices put the rules outside all media queries, as we normaly do. Some examples of these rules include resets (reset.css or normalize.css), style normalizations, etc.

	/* ----------- Device Independent kf8 ----------- */
	@media amzn-kf8 {
	  /* CSS for KF8 devices */
	}
	
	/* ----------- Device Independent mobi7 ----------- */
	@media amzn-mobi7 {
	  /* CSS for Mobi7 devices */
	}
	
	/* ----------- iPad 3 and 4 ----------- */
	@media only screen
	  and (min-device-width: 768px)
	  and (max-device-width: 1024px)
	  and (-webkit-min-device-pixel-ratio: 2) {
	}
	
	/* ----------- Kindle Fire HD 8.9" ----------- */
	@media only screen
	  and (min-device-width: 1200px)
	  and (max-device-width: 1600px)
	  and (-webkit-min-device-pixel-ratio: 1.5) {
	}
	
	/* ----------- iPhone 6 ----------- */
	@media only screen 
	  and (min-device-width : 375px)
	  and (max-device-width : 667px)
	  and (device-pixel-ratio : 2)
	  and (-webkit-min-device-pixel-ratio : 2){
	}
	
	/* ----------- iPhone 6+ ----------- */
	@media only screen 
	  and (min-device-width : 414px) 
	  and (max-device-width : 736px) 
	  and (-webkit-min-device-pixel-ratio : 3){
	}


## CSS Preprocessors variables and programming constructs
The oldest way to create customized CSS is to use a preprocessor like SASS or Less.  I’m a SASS expert (SCSS syntax, please) so I’ll concentrated on it for this section. 

Variables as static values that we can reuse throughout a stylesheet.  Because we are not using the variables directly in our pages we can’t do live update without recompiling and reloading the content.  

In its simplest form it allows you to build settings that can be reused. In the example below we create 3 sets of variables, a base set with, I hope, common settings for both Kindle and epub, a set for epub books and a third set for Kindle KF7 devices. 

	$base-font-family: 'Raleway', Verdana, sans-serif
	$base-font-size: 1 // note we leave the em/rem unit out on purpose
	$base-line-height: 1.4
	
	// epub specific settings assuming iBooks
	$epub-font-family: 'Raleway', Arial, sans-serif
	$epub-line-height: 1.6 
	 
	// kf7 settings
	$kf7-font-family: Verdana, sans-serif
	$kf7-line-height: 1.5

We can store these variables in our stylesheet or in a partial file we can then import using sass `@import` command. 

It also opens a lot of interesting possibilities like the stylying based on the value of a variable or conditional imports:

	// Change one of the variables below to true
	// style sheet will only load generic styles if you don't
	$is_epub2: false
	$is_epub3: false
	$is_kindle: false
	 
	// Import generic styles, such as font declarations and basic rythm
	@import 'generic_styles'
	// Use the variables we defined above to conditionally load styles
	@if $is_epub3
	  @debug 'loading epub3 styles'
	  @import 'epub3'
	@else
	  @if $is_epub2
		@debug 'loading epub2 styles'
		@import 'epub2'
	  @else 
		@if $is_kindle
		  @debug 'loading kindle styles'
		  @import 'kindle'
 
The biggest thing is that SASS provides a very flexible and powerful alternative to plain CSS. Yes, CSS is getting closer to the preprocessors but we’re not there quite yet.  

## CSS Custom Properties for Cascading Variables

CSS Custom Properties for Cascading Variables (also known as CSS variables)  are the native equivalent to preprocessor (SASS and LESS) variables. They provide a way to create groups of variables we can reuse throughout a stylesheet, we can further customize the variables by adding a version or ebook type string to the variables, like below:

	:root {
	  --epub3-main-color: #06c;
	  --epub3-accent-color: #006;
	  --kindle-main-color: #06a;
	  --kindle-accent-color: #ddd;
	}
	/* The rest of the CSS file */
	.epub3 h1 {
	  color: var(--epub3-main-color);
	}

See [CSS custom properties (native variables) In-Depth](https://blog.gospodarets.com/css_properties_in_depth) for more information and what other things we can do with the custom properties… enough to make the geek in me salivate. 

## CSS Namespaces

[CSS Namespaces](https://www.w3.org/TR/css3-namespace/) is a rather obscure part of the CSS family of specifications that allows for XML-like namespaces in your CSS code.  Let’s take the example below where we have namespaces for XHTML5 and SVG and an theoretical namespace for KF7 Kindle format. 

	@namespace url(http://www.w3.org/1999/xhtml);
	@namespace svg url(http://www.w3.org/2000/svg);
	@namespace kf7 url(http://example.com/kf7);
	
	/* 
	  This matches all XHTML <a> elements
	  as XHTML is the default unprefixed namespace 
	*/
	a {}
	
	/* This matches all SVG <a> elements */
	svg|a {}
	 
	/* This matches  KF7 <a> elements
	kf7|a {}
	
	/* This matches <a> elements in all namespaces */
	*|a {}

## ShadowDOM and style encapsulation

In an ideal world styles wouldn’t bleed out into the elements and conflicting elements wouldn’t mater because the styles are completely isolated from one another. Shadow Dom provides such encapsulation. 

In my ideal world we’d be able to create web components that encapsulate CSS to that component without bleeding into each other while we stil can style components from the parent element

I don’t advocate doing this for all elements. It requires a lot of work to create the shadow roots and you have to be extra careful when creating styles inside and outside the shadow roots.  In the example below `shadowElem2` mixes the css 

	<body>
	<style>
	  button {
	    font-size: 2em;
	    font-family: cursive;
	  }
	</style>
	
	<button>I'm a regular button</button>
	<div id='shadowElem'>
	  &nbsp;
	</div>
	<div id='shadowElem2'>
	  <div id='buttons'>
	    <button>I'm a shadow button</button>
	    <button>I'm another shadow button</button>
	  </div>
	</div>
	<button>I'm a regular button</button>
	
	<script>
	  var host = document.querySelector('#shadowElem');
	  var root = host.createShadowRoot();
	  root.innerHTML = '<style>button { font-size: 4em; color: rebeccapurple; }'
	    + '</style>'
	    + '<button>I\'m a shadow button</button>'
	    + '<button>I am another shadow button</button>';
	
	  var host2 = document.querySelector('#shadowElem2');
	  var root2 = host2.createShadowRoot();
	  root2.innerHTML = '<style>::content button { font-size: 2em; color: #f00; }'
	    + '</style>'
	    + '<content></content>'
	
	</script>
	</body>


## User Research and User Testing

![](https://pbs.twimg.com/media/Ce41Ru8UAAAaX-R.jpg)



# User research at the core of the ebook experience 

 
## Cross Reader ideosyncracies

Anyone remember doing browser detection instead of feature detection?

	for (i in navigator) {
		document.write('<br />navigator.' + i + ' = ' + navigator[i]);
	}

or the corresponding result:

<pre><script type="text/javascript">
for (i in navigator) {
	document.write('<br />navigator.' + i + ' = ' + navigator[i]);
}
</script></pre>



This will vary with the browser you use to access the post. The results in Firefox  (Developer Edition 47.0a2) incluse functionsthat are exclusive to Firefox, including some prefixed versions of current standards. 

