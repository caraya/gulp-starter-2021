# The web stack/platform

Over the last 25 years, the web has evolved in ways that you couldn't have imagined.

I'm using the term "web stack" or "web platform" to refer to the set of technologies that we use to build web content.

There are a lot of different technologies that we can use to build web content but, no matter what they are, they all boil down to the same three things:

* HTML
* CSS
* Javascript

In recent years, most people have come to associate the three elements with HTML 5. A set of technologies first introduced as a coherent group in January of 2012.

In these posts, I will work with the assumption that, while these technologies are interrelated they can also be pushed individually in ways perhaps we didn't think it was possible.

I'm also going to assume that, unless I specifically say otherwise, we're working with the most recent versions of browsers and the version of a specification where a feature is first introduced.

# HTML

The table below shows the evolution of the HTML standard and related technologies.

| Name / Version | Date Released | Releasing Organization |
| ------------- | -------------- | --------------- |
| [HTML Tags](http://info.cern.ch/hypertext/WWW/MarkUp/Tags.html) | 1991 | Tim Berners-Lee |
| HTML+ | 1993 | IETF |
| HTML 2.0 <br/><br/> Released as a series of RFC documents | 1995 | IETF |
| [HTML 3.2](https://www.w3.org/TR/2018/SPSD-html32-20180315/) | 1997 | W3C |
| [HTML 4.0](https://www.w3.org/TR/1998/REC-html40-19980424/) | 1997 | W3C |
| [HTML 4.01](https://www.w3.org/TR/html401/) | 1999 | W3C |
| [XHTML 1.0](https://www.w3.org/TR/xhtml1/) | 2000 | W3C |
| [XHTML 1.1](https://www.w3.org/TR/xhtml11/) | 2001 | W3C |
| [HTML](https://html.spec.whatwg.org/). **This is a living standard where new features are added regularly and browser makers work against this `draft`** version. | First released in 2008, updated regularly since | WHATWG |
| XHTML 2.0.| Work started in 2002. <br/><br/>Abandoned in 2009 | W3C |
| [HTML 5](https://dev.w3.org/html5/spec-LC/) | 2014 | W3C |
| [HTML 5.1](https://www.w3.org/TR/2017/PR-html51-20170803/) | 2016 | W3C |
| [HTML 5.2](https://www.w3.org/TR/2017/REC-html52-20171214/) | 2017 | W3C |
| [HTML 5.3](https://www.w3.org/TR/2021/NOTE-html53-20210128/) superseeded by the HTML Living Standard| 2021 | W3C &rarr; WHATWG |

To Understand the evolution of HTML as the language of the Web we also have to understand the history and the politics of the web and its users (both developers and end-users).

It's also interesting to see how little the tags changed over the years and how long it took for new features to be released and for browsers to adopt them.

## The different versions of HTML

### HTML 1.0

The initial HTML specification was strongly influenced by SGML (Standard Generalized Markup Language), a language used by publishers to describe the structure of their documents.

Looking at the list of tags in [HTML Tags](http://info.cern.ch/hypertext/WWW/MarkUp/Tags.html) we can see the limited types of documents that we could create with the original HTML specification.

The initial version of HTML was designed for document exchange. There were no forms or styles elements... this will be addressed in later versions of HTML in different ways.

This specification (although qualifying it as a specification may be too generous) was released by Tim Berners-Lee as part of the original web development effort.

### HTML 2.0

HTML version 2.0 was developed in 1995 with basic intention of improving HTML version 1.0. The IETF developed the HTML 2.0 spefication and released it as a series of RFC documents:

* [RFC 1866](https://datatracker.ietf.org/doc/html/rfc1866) (initial capability)
* [RFC 1867](https://datatracker.ietf.org/doc/html/rfc1867) (form-based file upload)
* [RFC 1942](https://datatracker.ietf.org/doc/html/rfc1942) (tables)
* [RFC 1980](https://datatracker.ietf.org/doc/html/rfc1980) (client-side image maps)
* [RFC 2070](https://datatracker.ietf.org/doc/html/rfc2070) (internationalization)

It is at this time where we have more than one (graphical) browser. Mosaic had been released in 1993 and Netscape was released by some of the same egineers in 1994.

Mosaic is the grandfather of Internet Explorer. NSCA licensed the code from Spyglass and used it to build the original version of Internet Explorer.

Because the different browsers had the goal of attracting people they introduced tags as they felt they were needed, regardless of whether there waas a standard or not. Most of these talks were introduced as messages in the `www-talk` mailing list.

Take, for example, this [message to www-talk](http://1997.webhistory.org/www.lists/www-talk.1993q1/0182.html) from Mark Andressen proposing the `img` tag and the different alternatives that were presented on that discussion thread.

**There was no W3C or WHATWG at this time**. The specification was released as an set of IETF RFC Draft documents.

### HTML 3.2

It is arround this time that we geet the two browsers that were part of the original browser wars: Netscape and Internet Explorer. This will shape this era of language development.

HTML 3.2 included styles as attributes of HTML elements. It was common to see things like this in HTML 3.2 documents:

```html
<body
  bgcolor=white
  text=black
  link=red
  vlink=maroon
  alink=fuchsia>

<!-- body content -->

</body>
```

The body element would have attributes defining the different colors used on the page.

All the attributes were optional, have default values defined in the browser's built-in stylesheet and have equivalents in CSS that will be fully introduced in future versions.

Another area that is important to note is that both IE and Netscape introduced propriertary tags and features that would only work on those browsers.

Here are some examples of proprietary netscape tags added to the browser. None of these were part of any HTML specification.

| Netscape proprietary | Description |
| ------------------- | ----------- |
| &lt;blink> | Causes text to blink on and off |
| &lt;ilayer> | Inline layer; allows you to offset content from its natural position on the page |
| &lt;keygen> | Facilitates generation of key material and submission of the public key as part of an HTML form (for privacy and encryption) |
| &lt;layer> | Creates layers so that elements can be placed on top of each other (useful with DHTML)
| &lt;multicol> | Produces a multicolumn format |
| &lt;nolayer> | Alternative text for browsers that do not support &lt;layer> and &lt;ilayer> |
| &lt;server> | Specifies a server-side JavaScript application |
| &lt;spacer> | Holds a specified amount of empty space (used for alignment of elements on the page and to hold table cells open to specific widths)|

Microsoft didn't stay behind and developed their own proprietary tags for Internet Explorer. These tags wouldn't work in other browsers and wouldn't be added to the HTML specification.

| Internet Explorer proprietary | Description |
|----------------------- | ----------- |
| &lt;marquee> | Places scrolling marquee text on the page |
| &lt;basefont color=color face=font face> | Sets the color and/or font of the entire document when placed in the &lt;head> or for subsequent text when placed in the flow of the body text |
| &lt;bgsound> | Inserts an audio file that plays in the background |
|&lt;body bgproperties=value> | Determines whether background image scrolls with the background |
| &lt;body leftmargin=n rightmargin=n> |Sets the margin between the browser window and the contents of the page
| &lt;caption valign=position> |Sets vertical alignment of table caption |
| &lt;comment> | Inserts a comment in the HTML source that does not display in the browser (same as &lt;! -- and -- >) |
| &lt;form target=name> | Specifies a target window or frame for the output of a form |
| &lt;frameset framespacing=n | Sets the amount of space between frames
| &lt;img dynsrc=url controls loop=n start=action> | Uses the image tag to place video or audio clips
| &lt;table bordercolor=color bordercolordark=color bordercolorlight=color> | Sets colors for 3-D table borders in the &lt;table>, &lt;td>, &lt;th>, and &lt;tr> tags |
| &lt;table frame=value> | Controls the display of the outer borders of a table in the &lt;table> tag

So most of the work of the W3C, created in 1994, was to shepard the new version of HTML forwaard while navigating the conflicting defacto tags introduced by Netscape and Microsoft.

### HTML 4.0 and 4.01

HTML 4.0 is where the original HTML reached its peek in terms of expresiveness and power. Some of these changes are

* Introduction of new elements
* Separation of structure and presentation
* Accessibility
* Internationalization
* Stylesheets
* Client-side Scripting

HTML 4 introduced many elements that are still in use today like `iframe`, `fieldset`, `span`, `thead`, `tbody`, and `tfoot` among others.

It also began to separate presentation from style and layout by deprecating the style attributes for HTML elements and introducing better hooks to CSS.

Hooks for stylesheets, like the `class`, and `id` attributes provide hooks to apply CSS styles to elements.

* The ID will apply styles to the single element that matches the ID.

  ```css
  #my-id {
    color: red;
  }
  ```

* Classes are used to apply styles to multiple elements, usually elements that share the same function in a document.

  ```css
  .narrow-paragraph {
    width: 50%;
  }
  ```

The `style` tag was introduced to provide a way to incorporate CSS stylesheets in the HTML document.

```html
<style>
p {
  color: red;
}

h1, h2, h3, h4, h5, h6 {
  color: blue;
}
</style>
```

There is also a way to load stylesheets from remote sources but, somewhat surprisingly, this is not done with a style tag and the source attribute like we do with the `<script>` tag. It uses the `<link>` tag instead:

```html
<link   rel="stylesheet"
        href="path/to/my/styles.css">
```

Scripting also got a boost in this version of HTML. You can specify the type and language of the script you're using and can load script from remote servers using the `src` attribute.

### XHTML 1.0, 1.1 and 2.0

We'll take a detour into XML-based languages with the XHTML family of specifications since they directly led to the creation of the WHATWG and HTML as it is today.

XHTML is basically HTML 4.0 converted to an XML-based language. That's where some of what you see in older web pages comes from:

Ideas like all tags being closed, even if they don't have a closing tag (like the `<img>` tag in the example below).

```html
<p>This is an example paragraph.</p>

<img src="path/to/image.webp"/>
```

We also get concepts like all HTML documents being also [well-formed XML documents](https://en.wikipedia.org/wiki/Well-formed_document), following these minimal rules:

* Content be defined
* Content be delimited with a beginning and end tag
* Content be properly nested (parents within roots, children within parents)

This is the exact opposite of [tag soup markup](https://en.wikipedia.org/wiki/Tag_soup) where authors have taken advantage of browsers' unwillingness to break the web by refusing to parse markup that is not well-formed.

There were two major numbered versions of XHTML and several profiles adopting the core specification for specific purposes.

eXtensible HyperText Markup Language 1.0(XHTML 1.0) is part of the family of XML markup languages. It mirrors or extends versions (strict, transitional and frameset) of HTML 4.0.

XHTML 1.1 extends XHTML 1.0 by providing a modular framework. Rather than have one standard for the entire family, XHTML is now split into modules for specific sections of HTML as listed below along with the elements that belong to each module.

**Structure Module**
: body, head, html, title

**Text Module**
: abbr, acronym, address, blockquote, br, cite, code, dfn, div, em, h1, h2, h3, h4, h5, h6, kbd, p, pre, q, samp, span, strong, var

**Hypertext Module**
: a

**List Module**
: dl, dt, dd, ol, ul, li

**Object Module**
: object, param

**Presentation Module**
: b, big, hr, i, small, sub, sup, tt

**Edit Module**
: del, ins

**Bidirectional Text Module**
: bdo

**Forms Module**
: button, fieldset, form, input, label, legend, select, optgroup, option, textarea

**Table Module**
: caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr

**Image Module**
: img

**Client-side Image Map Module**
: area, map

**Server-side Image Map Module**
: Attribute ismap on img

**Intrinsic Events Module**
: Events attributes

**Metainformation Module**
: meta

**Scripting Module**
: noscript, script

**Stylesheet Module**
: style element

**Style Attribute Module (_Deprecated_)**
: style attribute

**Link Module**
: link

**Base Module**
: base

**Ruby Annotation Module**
: ruby, rbc, rtc, rb, rt, rp

XHTML 2.0 is an abandoned version of XHTML that led to the end of this family of specifications. It had a lot of issues with the way it worked:

No browser implemented the technology and most browsers moved to HTML 5.

There was no backwards compatibility with HTML 4.0 and XHTML 1.0 and 1.1. This would lead to all sorts of compatibility issues.

Work on XHTML 2 was dropped and the charter for the W3C working group in charge of its development was not renewed.

The biggest winner from all these events was HTML 5.

### HTML5

HTML 5 is the latest version of HTML but more than that, it is also a collection of Javascript APIs and related technologies used to create web applications.

HTML 5 was not developed by the W3C but by the Web Hypertext Application Technology Working Group (WHATWG). A group initially formed by Apple, Mozilla and Opera that sought to create a better standard for applications on the web than what the W3C offered with XHTML 2.

In 2004, The W3C organized a [W3C Workshop on Web Applications and Compound Documents](https://www.w3.org/2004/04/webapps-cdf-ws/) where Mozilla and Opera presented a [paper](https://www.w3.org/2004/04/webapps-cdf-ws/papers/opera.html) that ultimately was rejected. This is the direct antecedent to the creation of HTML 5 and the WHATWG. For a more detailed explanation of the WHATWG and the HTML living standard, see [History](https://html.spec.whatwg.org/multipage/introduction.html#history-2) in the HTML living standard.

For the rest of this section we'll refer to the HTML portion of the HTML 5 family of specifications.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1638292740/publishing-project.rivendellweb.net/HTML5_APIs_and_related_technologies_taxonomy_and_status/HTML5_APIs_and_related_technologies_taxonomy_and_status.svg?_i=AA' alt='HTML5 APIs and related technologies taxonomy and status' width='512' height='height'>
  <figcaption>HTML5 APIs and related technologies taxonomy and status (October 2014). Credit: Mercury999 via Wikimedia Commons</figcaption>
</figure>

The HTML part of the HTML 5 specification, later renamed to the [HTML Living Standard](https://html.spec.whatwg.org/multipage/) is different than previous families of  HTML specifications in that it's evergreen, it's continually updated and browsers adopt this specification for ongoing development.

It's interesting that, while most tags introduced in HTML 5 work when creating web sites, their primary usage was for applications since this was the purpose of the WHATWG.

It introduced serveral new elements to the HTML vocabulary. Some of them are structural like the first table below:

| Tags (Elements) | Description |
| --- | --- |
| &lt;article> | Represents an independent piece of content  like a blog entry or newspaper article |
| &lt;section> | Represents a generic document or application section |
| &lt;aside> | Represents a piece of content that is only slightly related to the rest of the page |
| &lt;header> | Represents a group of introductory or navigational aids |
| &lt;hgroup> | Represents the header of a section |
| &lt;footer> | Represents a footer for a section |
| &lt;nav> | Represents a section of the document intended for navigation |

Other tags provide mulitmedia features without requiring plugins:

| Tags (Elements) | Description |
| --- | --- |
| &lt;audio> | Defines an audio file|
| &lt;video> | Defines a video file |
| &lt;canvas> | This is used for rendering dynamic bitmap graphics on the fly, such as graphs or games |
| &lt;figure> | Represents a piece of self-contained flow content, typically referenced as a single unit from the main flow of the document |

Other elements are presentational and deal with semantics for visual elements

| Tags (Elements) | Description |
| --- | --- |
| &lt;command> | Represents a command the user can invoke |
| &lt;datalist> | Together with the a new list attribute for input can be used to make comboboxes |
| &lt;details> | Represents additional information or controls which the user can obtain on demand |
| &lt;keygen> | Represents control for key pair generation |
| &lt;mark> | Represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context |
| &lt;meter> | Represents a measurement, such as disk usage |
| &lt;output> | Represents some type of output, such as from a calculation done through scripting |
| &lt;progress> | Represents a completion of a task, such as downloading or when performing a series of expensive operations |
| **&lt;ruby>** | Together with Colorful typography on the web: get ready for multicolor fonts and **&lt;rp>** allow for marking up ruby annotations used in Japanese and other East Asian languages |
| **&lt;time>** | Represents a date and/or time |
| **&lt;wbr>** | Represents a line break opportunity |

The `<input>` tag got a lot of love with HTML 5. It gained the following new values:

| attribute | Description |
| --------- | ----------- |
| **color** | Color selector, which could be represented by a wheel or swatch picker |
| **date** | Selector for calendar date |
| **datetime-local** | Date and time display, with no setting or indication for time zones |
| **datetime** | Full date and time display, including a time zone |
| **email** | Input type should be an email |
| **month** | Selector for a month within a given year |
| **number** | A field containing a numeric value only |
| **range** | Numeric selector within a range of values, typically visualized as a slider |
| **search** | Term to supply to a search engine. For example, the search bar atop a browser |
| **tel** | Input type should be telephone number |
| **time** | Time indicator and selector, with no time zone information |
| **url** | Input type should be URL type |
| **week** | Selector for a week within a given year |

While these tags and attributes were added to the HTML specification at the time of HTML 5 release, they may not have been implemented in any or all browsers.

The initial publication of HTML 5 (later the HTML living standard) wasn't the end. It has been continually updated and adopted by browsers.

Some of these newer additions include:

* The [&lt;picture>](https://html.spec.whatwg.org/multipage/embedded-content.html#the-picture-element) element and the [srcset](https://html.spec.whatwg.org/multipage/images.html#srcset-attributes) attribute for responsive images.
* Expanding the [&lt;source>](https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element) to use in the &lt;picture> element
* The [&lt;template>](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) and [&lt;slot>](https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element) elements to handle templates for custom elements

The HTML specification also includes a section on [Microdata](https://html.spec.whatwg.org/multipage/microdata.html#microdata) as a way to annotate HTML with structured data using attributes to the HTML we are annotating. If there was any Microdata implementation in browsers, it has been removed.

So now that we have covered the history of HTML in some detail, I want to dive deeper into some aspects of HTML that make it powerful enought that, even 30 years since the first tags were implemented/introduced, it hasn't been replaced.

## Back to the beginning (again)

One thing that I find amusing when I hear all the talks about how Framework X is going to elimintate the need for HTML and CSS is that these frameworks produce an opinionated version of HTML and CSS along with the Javascript they use to create it.

Using HTML has evolved from the all-uppercase HTML tags developers used to create the first web pages to the convoluted build systems that we use today.

I know I'm old school but writing HTML shouldn't be harder than opening a text editor and typing out the HTML for the pages we need and link the necessary CSS stylesheets and scripts.

Creating an `h1` elements in a page is as simple as typing the following inside the body of a document:

```html
<h1>Hello World of HTML</h1>
```

But consider the following snippets of code that accomplish the same task:

React require the `render` method of the React.DOM module to be called to render content. The `render` method takes two paramenters":

* The first parameter is the string of html that we want to render
* The second parameter is the DOM element that we want to render the html into

```js
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

A similar Vue application will only render the data inside the element specified in the `el` attribute. The result will depend on how we structured the template containing the element

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

Both libraries require you to build the page template separately, leaving components living in limbo. If I were to look at these components in isolation, I would have some idea of what the react component is used for but the Vue components gives no clue as to its intended use.

You get the idea. Now we're using Javascript to create the HTML we need to render our pages.

This would be good if people also learned how to build what is now called static content in some fashion. But we don't.

I learned to do web development in a way that is fully static and hand coded. What are now the fundamentals were the only things we needed to learn back in the day but they are no less important.

I'm not saying that everyone shoud take in-depth courses on CSS, HTML and Javascript but we should al have the same basic level of understanding regarding these foundational technologies before we jump into specialized "lets Javascript all things" courses and frameworks. This is particularly important because new developers are coming directly to frameworks without any previous idea of how things work.

## Web Components: Breaking the cycle

Perhaps the biggest drawback of HTML is how long it takes to get new tags and attributes adopted into the HTML specification and then implemented in browsers.

Web Components are a way to solve this problem. They are a family of specifications designed to allow the creaation of HTML elements and their use on a page independent of any library.

The technologies that make up web components are:

* **Custom elements**: A set of JavaScript APIs that allow you to define custom elements and their behavior
* **Shadow DOM**: A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element
* **HTML templates**: The `template` and `slot` elements enable you to write inert markup templates that can be reused as the basis of a custom element's structure.

These technologies may sound daunting but in practice it's a fairly simple process:

1. Create a class in which you specify your web component functionality, using the ECMAScript 2015 class syntax
2. Register your new custom element using the `CustomElements.define()` method, passing it the element name to be defined, and the class or function that defines the custom element
3. If required, attach a shadow DOM to the custom element using Element.attachShadow() method. Add child elements, event listeners, etc., to the shadow DOM using regular DOM methods.
4. If required, define an HTML template using `template` and `slot` elements
5. Use your custom element wherever you like on your page, just like you would any regular HTML element

The following Javascript class handles steps 1, 2 and 3 of our web component:

```js
class MyParagraph extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-paragraph');
    const templateContent = template.content;

    this.attachShadow({mode: 'open'}).appendChild(
      templateContent.cloneNode(true)
    );
  }
}

customElements.define(
  'my-paragraph',
  MyParagraph
);
```

While the following teemplate is used to define the HTML structure of the custom element which we instantiate in the HTML class.

```html
<template id="my-paragraph">
  <p name="my-content">Hello World</p>
</template>
```

With these two elements we can create as many web components as we need for our page. We can also have as many different web components as we want.

SO why is this important? It makes it easier for developers to create web components that are made for purpose and can integrate with other web components in a similar fashion to the atomic design philosophy: atom &rarr; molecule &rarr; organism.

When combined with the existing collection of HTML elements, we get the best of both worlds? We can leverage the power of existing elements in terms of accessibility and interactivity while creating new elements that are suited for our specific needs and purposes.

And perhaps this is the biggest drawbacks of web components: **they don't provide the same accessibility and interactivity as existing HTML elements**. If you want to add accessibility to your component, you need to impmlement it yourself and it's is not a trivial exercise.

Still, it's a good compromise between the two worlds. You get the benefits of HTML elements while you create the best elements to suit your needs.

### The evolution of web components

Web components have an interesting story.

Alex Russell first introduced Web Components at the Fronteers Conference in 2011.

<div class="video">
  <iframe src="https://player.vimeo.com/video/33430613?h=9eb534aa5d&portrait=0" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

[Polymer](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview), a library based on Web Components was released by Google in 2013. Polymer also provides a set of ready-made components that you can drop into your project.

The [x-tags](https://x-tag.github.io/) library from Mozilla was one of the first libraries available for developers and was the basis of [Brick](https://mozbrick.github.io/)

There are other web component libraries out there with varying levels of adoption. Browsers also have varying level of support for web components.

Over the years things have changed and other important libraries have come into the mix.

x-tags is now a Microsoft project since the lead developer left Mozilla and moved to Microsoft. The Bricks library is in maintenance mode and, as far as I can tell, it is no longer under development (the last tweet on the [@mozbrick](https://twitter.com/mozbrick/) was in 2014).

Polymer had multiple versions that acommodated the different iterations of the web component specs (0.5, 0.8, 1, 2, and 3) before being replaced by the [Lit](https://lit.dev/) element as a replacement.

Salesforce introduced [Lightning Web Components](https://lwc.dev/), the latest commercially supported web components library.

[Generic Components](https://genericcomponents.netlify.app/index.html) are built against the WAI-ARIA specifications and make for a good starting point for your own web components since someone already to the heavy lifting regarding accessibility.

[webcomponents.org](https://www.webcomponents.org/) has become both a documentation repository for web components and a search engine for existing component implementations.

For a more nuanced vision of where we're at with Web Components today, see Dave Rupert's [HTML with Superpowers](https://daverupert.com/2021/10/html-with-superpowers/)

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/fEhBkSZ15qM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>

Web Components break the slow cycle of HTML development. If there is something you need and you're willing to put in the effort to create it, you can have it.

### Do web components work with (insert favorite framework)?

One of the biggest selling points of web components is interoperability. They can be used with any framework and in any browser that supports the specifications.

How can we tell?

Frameworks that have submitted data to [Custom Elements Everywhere](https://custom-elements-everywhere.com/) give you a measure of well they support web components. We can combine web components from different libraries and our own custom web components to create exactly what we need.

This sort of fulfill the promise of write once and use everywhere. It may also be possible to use multiple Polymer/Lit components alongside x-tags and Lightning Web Components. It will also require a lot of javascript to do so... whether you choose to or not is up to you.

# CSS

Unlike HTML, CSS has changed drastically since its inception. It was not part of the original World Wide Web set of specifications, the first version of the CSS specification was released in 1996.

Before the first formal specification of CSS there were many languages that could have taken the place of CSS. [The Languages Which Almost Became CSS](https://eager.io/blog/the-languages-which-almost-were-css/) describes the alternative proposals for styling languages for the web.

There are three monolithic CSS specifications and a number of modules specified since the release of CSS 2.0 and 2.1.

| CSS Version | Release Date |
|-------------|--------------|
| CSS 1 | 1996 |
| CSS 2 | 1998 |
| CSS 2.1 | 2011 |

Rather than one monolithic specification, work on what would have been the CSS 3 specification has been broken down into modules.

The full list of drafts currently under development at the CSS Working group is at [drafts.csswg.org](https://drafts.csswg.org/).

## CSS (1.0)

The [CSS 1 specification](https://www.w3.org/TR/2008/REC-CSS1-20080411/) provides basic styling for HTML documents that, until this point had either no style or the Mosaic-influenced attribute styles.

Selectors were limited to class, id, tag names and contextual selectors. The following selectors were valid at the time CSS 1 was released:

```css
H1 { color: red; }

.all-green { color: #00ff00; }

H1 EM { color: purple; }
```

Pseudo elements are also part of the initial specification. Links, first-line and first letter (surprisingly to me) are part of the specification:

```css
A { color: #FF0000; }
A:link { color: #FF0000; }
A:visited { color: #0000FF; }

P:first-letter {
  font-size: 200%;
  font-colot: #FF00FF;
}

P:first-line {
  font-size: 150%;
  font-colot: #00FF00;
}
```

The rest of the specification is in the [Cascading Style Sheets, level 1](https://www.w3.org/TR/2008/REC-CSS1-20080411/) specification.

## CSS 2.0 and 2.1

Cascading Style Sheets Level 2 and the later [Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification](https://www.w3.org/TR/CSS21/) update expand on the original CSS 1 specification.

CSS 2:

* Introduced the concept of media types and aural style sheets
* Added i10n (internationalization) features
* Extended font selection
* Added the context of automatic numbering and generated content
* Added cursors
* Added capabilities to control content overflow, and clipping
* Added the ability to position content in the page (absolute, fixed and relative)
* Extended the (minimal) selector mechanism from CSS 1

Because CSS 2 expanded the capabilities of CSS, the specification is significantly larger.

## CSS 3 and beyond?

As good as CSS 1 and 2 were at the time they presented a difficult dilemma for browser makers: Features mature at different rates but because they are all part of one standard document they can't be considered complete until the full specification is deemed complete.

Rather than one monolithic specification, the CSS working group decided that work on what would have been the CSS 3 specification would be broken down into modules.

The following modules have completed the specification process and are no recommendations from the W3C

| Specification | Status |
| --------------|--------|
| [CSS Color Level 3](https://www.w3.org/TR/css-color-3/) | REC |
| [CSS Namespaces](https://www.w3.org/TR/css-namespaces/) | REC |
| [Selectors Level 3](https://www.w3.org/TR/selectors-3/) | REC |
| [Media Queries](https://www.w3.org/TR/css3-mediaqueries) | REC |
| [CSS Style Attributes](https://www.w3.org/TR/css-style-attr/) | REC |
| [CSS Cascading and Inheritance Level 3](https://www.w3.org/TR/css-cascade-3/) | Rec |
| [CSS Fonts Level 3](https://www.w3.org/TR/css-fonts-3/) | REC |
| [CSS Writing Modes Level 3](https://www.w3.org/TR/css-writing-modes-3) | REC |
| [CSS Basic User Interface Level 3](https://www.w3.org/TR/css-ui-3) | REC |
| [CSS Containment Level 1](https://www.w3.org/TR/css-contain-1/) | REC |

The following modules are not finalized but they are far enough into the standard track that they have multiple interoperable implementations

| Specification | Status |
| --------------|--------|
| [CSS Backgrounds and Borders Level 3](https://www.w3.org/TR/css-backgrounds-3/) |Candidate Recommendation |
| [CSS Conditional Rules Level 3](https://www.w3.org/TR/css-conditional-3/) | Candidate Recommendation |
| [CSS Multi-column Layout Level 1](https://www.w3.org/TR/css-multicol-1/) | Working Draft |
| [CSS Values and Units Level 3](https://www.w3.org/TR/css-values-3/) | Candidate Recommendation |
| [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/) | Candidate Recommendation |
| [CSS Counter Styles Level 3](https://www.w3.org/TR/css-counter-styles-3/) | Candidate Recommendation |

To see the full list of drafts currently at some stage of work by the CSS Working group, check [drafts.csswg.org](https://drafts.csswg.org/).

The advantage of this modular development process is that different features can mature independently of each other at their own pace. This makes it easier for browser makers to implement features and for developers to use them.

To see a list of the specifications the CSS Working considers complete, see the [CSS Snapshot 2020](https://www.w3.org/TR/css-2020/). As the snapshot states: ***The primary audience for the CSS snapshot is CSS browser makers, not CSS authors, as this definition includes modules by specification stability, not Web browser adoption rate***.

The snapshots are updated annually.

## Speed of adoption and adoption rate

In order to become a recommendation, a CSS specification must have two inteopeable implementations.

This requirement presents use with the issue of CSS speed of adoption.

This issue can be taken from either a browser maker's perspective (how long does it take to implement a feature once it reaches candidate recommendation stage? Will all browsers implement the feature?) or from a developer's perspective (how long will it take for me to implement a feature that is available to browsers?).

The other question is what proportion of browsers support a given feature?

This is always a tricky balancing game where developers have to decide between adopting a feature that will make some users happy versus having to write large amounts of CSS and, maybe, Javascript to make it work for everyone.

CSS provides the `@supports` at-rule to make it easier to test if a feature is supported by a browser. We can then work around those browsers that don't support the feature.

## CSS versus SASS versus PostCSS versus (put your pre-processor's name here)

I've used [SASS](https://sass-lang.com/) for a long time and have seen it as a great way to write CSS with enhanced features that were not originally part of the any CSS specifications. But I've also seen CSS grow on its own as a parallel.

Take the following example of a mixin that changes the colors on the element it's attached to based on whether they are even or odds. I would normally use this code, or something similar to it, on tables.

```scss
@mixin stripes($length: 10) {
  @for $i from 1 through $length {
    @if $i % 2 == 0 {
    } @else {
      background-color: #ff0000;
      color: #ffffff;
    }
  }
}
```

Initially CSS did not have the capability to do this so SASS was pretty much the only way to do it. It wasn't until the `nth-child` selector was added to CSS that it became possible to do it in a similar fashion.

This code will alternative colors between rown in the table body.

```css
tbody tr:nth-child(odd) {
  background-color: #00ff00;
  color: #000000;
}

tbody tr:nth-child(even) {
  background-color: #ff0000;
  color: #ffffff;
}
```

Another aspect of SASS that I find very useful is nesting. The idea is to make the code more readable and easier to maintain

```scss
.container{
  & h1{ font-size: 25px; color:#E45456; }
  & p{ font-size: 25px; color:#3C7949; }

  & .box{
    & h1 { font-size: 25px; color:#E45456;}    
    & p{ font-size: 25px; color:#3C7949; }
  }
}
```

This will produce the following CSS

```css
.container h1 { font-size: 25px; color: #E45456; }
.container p { font-size: 25px; color: #3C7949; }
.container .box h1 { font-size: 25px; color: #E45456; }
.container .box p { font-size: 25px; color: #3C7949; }
```

CSS will let you write nested rules in three different ways:

Write the nested selectors by hand.

```css
.foo { color: red; }
.foo > .bar { color: blue; }
```

Write the nested selectors using the `&` selector defined in the [CSS Nesting Module](https://drafts.csswg.org/css-nesting-1/)

```css
.foo {
  color: blue;
  & > .bar { color: red; }
}
```

Or use the `@nest` at-rule, also defined in the [CSS Nesting Module](https://drafts.csswg.org/css-nesting-1/)

```css
.foo {
  color: red;
  @nest & > .bar {
    color: blue;
  }
}
```

All three methods produce the same CSS.

The final tool that I want to cover when talking about differences between SASS and CSS are variables. Variables in SASS are static and every change that we make means we have to recompile the stylesheets

```scss
$color-red: #ff0000;
$color-green: #00ff00;
$color-blue: #0000ff;

$color-white: #ffffff;
$color-black: #000000;
```

CSS variables, also known as CSS custom properties, are live, dynamic values that update the display of the page as soon as the values change.

```css
:root {
  --color-red: #ff0000;
  --color-green: #00ff00;
  --color-blue: #0000ff;

  --color-white: #ffffff;
  --color-black: #000000;
}
```

There are ways to combine features from both languages to make a more powerful language.

This example combines CSS custom properties, SASS variables and SASS intrerpolation to create a color scheme.

```scss
$primary: #81899b;
$accent: #302e24;
$warn: #dfa612;

:root {
  --primary: #{$primary};
  --accent: #{$accent};
  --warn: #{$warn};

  // This is valid CSS so it's not evaluated.
  --consumed-by-css: $primary;
}
```

These are some examples of where SASS and CSS have diverged over the years. It still holds true that SASS is a superset of CSS but there are SASS features that will never make it to CSS

[PostCSS](https://postcss.org/) provides a way to test new CSS features even if they haven't been implemented in browsers yet, just like Babel does for Javascript. It also uses [Browserslist](https://www.npmjs.com/package/browserslist) to identify the browsers that support a given feature where this is necessary, not all plugins use version dependent code.

PostCSS requires an additional step when preparing your CSS. You need a basic configuration file that tells the PostCSS executable what plugins you want to use and how those plugins are configured or you can choose to incorporate the configuration into your build process.

The syntax for your CSS will change somewhat based on the plugins you have available. The idea is that the syntax will become part of the CSS standard and, because you've implemented the syntax ahead of time, your code won't have to change.

## specificity and the cascade

A lot of times I hear about how hard it is to get CSS to work properly and for styles not to oveerride and bleed into each other. That's where two concepts come to mind, the cascade and specificity.

The cascade is the algorithm at the core of CSS that defines how to combine property values that affect thge same element but originate from different sources.

Specificity is the means by which browsers decide which CSS property values are the most relevant to an element and, will be applied to it.

### Origin of CSS declarations

The CSS cascade algorithm's job is to select CSS declarations in order to determine the correct values for CSS properties. CSS declarations originate from different origins:

* The User-agent (browser) built-in stylesheet
* The Author stylesheets
* The User stylesheets.

Though style sheets come from these different origins, they overlap in scope; to make this work, the cascade algorithm defines how they interact.

**User-agent (browser) stylesheet**
: The browser has a basic style sheet that gives a default style to any document. Some browsers use actual style sheets for this purpose, while others simulate them in code, but the end result is the same.
: There are significant differences between browser's default stylesheets. This is why web developers often use a CSS reset style sheet, forcing common properties values to a known state before beginning to make alterations to suit their specific needs.

**Author stylesheets**
: Author stylesheets are the most common type of style sheet. These stylesheets are where the author of the page defines the styles for the document.

**User stylesheets**
: The user (or reader) of the web site can choose to override styles in many browsers using a custom user stylesheet designed to tailor the experience to the user's wishes.

SO how do browsers decide which CSS declarations are the most relevant to an element?

1. It first filters all the rules from the different so that only the rules that apply to a given element
2. Then it sorts these rules according to their importance, that is, whether or not they are followed by !important, and by their origin

The cascade is in ascending order, which means that !important values from a user-defined style sheet have precedence over normal values originated from a user-agent style sheet

| &nbsp; | Origin | Importance|
|------|-------|----------|
| 1 | user agent | normal |
| 2 | user | normal |
| 3 | author | normal |
| 4 | animations | |
| 5 | author | !important |
| 6 | user | !important |
| 7 | user agent | !important |
| 8 | transitions | |

### Specificity

The cascade deals with setting precendence and what elemenets are applied when multiple rules match a given selector.

Specificity deals with the other side of the coin. What rule will be applied when more than one rule matches a given element.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1639159003/publishing-project.rivendellweb.net/css-specificity-wars/css-specificity-wars-png?_i=AA' alt='CSS specificity wars' width='630px' loading="lazy">
  <figcaption>CSS specificity wars</figcaption>
</figure>

If we follow the figure above we can see the difference of how the different element, classes, IDs and combinations thereof.

Once you add all the different components of the selector then the highest value "wins".

```css
p {
  color: #ff0000;
}

.container p {
  color: #00ff00;
}

#container2 {
  color: #663399;
}

a {
  color: #ff00ff !important;
}
```

So, why is this important?

A lot of of times we can use the cascade and the rules for specificity to improve our CSS code.

```css
.foo { color: red; }
.foo > .bar { color: blue; }
```

New specifications like [CSS Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) will help make working with CSS easier.

## Houdini: the circuit breaker

As far as CSS has moved, there are still many things developers would want CSS to do that will not be incorporate to existing or future standards or lackk interest from browser makers to implement.

The Houdini task force consists of engineers from Mozilla, Apple, Opera, Microsoft, HP, Intel and Google working together to expose certain parts of the CSS engine to web developers.

Houdini has a list of APIs that are currently under development at [drafts.css-houdini.org/](https://drafts.css-houdini.org).

| Specification | Last Updated |
| ------------- | -------------|
| [Box Tree API 1](https://drafts.css-houdini.org/box-tree-api/) | 2020-04-07 |
| [CSS Animation Worklet 1](https://drafts.css-houdini.org/css-animation-worklet-1/) | 2020-08-18|
| [CSS Layout API 1](https://drafts.css-houdini.org/css-layout-api/) | 2021-05-10 |
| [CSS Painting API 1](https://drafts.css-houdini.org/css-paint-api/) | 2020-12-15 |
| [CSS Parser API 1](https://drafts.css-houdini.org/css-parser-api/) | 2017-11-09 |
| [CSS Properties and Values API 1](https://drafts.css-houdini.org/css-properties-values-api/) |2021-02-26 |
| [CSS Typed OM 1(Current Work)](https://drafts.css-houdini.org/css-typed-om/) | 2021-10-13 |
| [CSS Typed OM 2](https://drafts.css-houdini.org/css-typed-om-2/) | 2021-02-08 |
| [Font Metrics API 1](https://drafts.css-houdini.org/font-metrics-api/) | 2021-05-12 |

While not strictly part of Houdini (it is part of the HTML specification), [Worklets](https://html.spec.whatwg.org/multipage/worklets.html) are important for Houdini to work.

I will concentrate on the following Houdini APIs:

* [CSS Properties and Values API 1](https://drafts.css-houdini.org/css-properties-values-api/)
* [CSS Typed OM 1](https://drafts.css-houdini.org/css-typed-om/)
* [CSS Painting API 1](https://drafts.css-houdini.org/css-paint-api/)
* [CSS Layout API 1](https://drafts.css-houdini.org/css-layout-api/)

Properties and Values provides an enhanced API for working with CSS custom properties.

One of the problems with the current Custom Properties API is that everything is a string and it forces you to use calc to convert the strings to numbers when needed; because they are all treated as strings, you cannot use custom properties in animations or transitions, they also inherit by default, whether you want to or not.

Houdini Properties and values provides these additional tools. Using the `@property` at-rule, you can define a stronger custom property.

```css
@property --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #c0ffee;
}
```

You can also define custom properties from Javascript. This is the same property defined in Javascript.

```js
window.CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: 'c0ffee'
});
```

Both versions have the same requirements:

**name (required)**
: The name of the property.

**syntax (required)**
: The allowable [syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@property/syntax) for the property We are no longer limited to strings.
: The values are a subset of the values defined in the [CSS Values and Units spefication](https://drafts.csswg.org/css-values-3/). For the list of supported syntax values see [Supported Names](https://drafts.css-houdini.org/css-properties-values-api/#supported-names) in the CSS Properties and Values API specification
: You can also use `+` to allow for a space-separarted list of one or more values, `#` for a comma seprated list of values, and separate syntaxes with `|` to allow one syntax or another

**inherits (required)**
: Boolean that controls whether the custom property inherits by default.

**initial-value (optional)**
Sets the initial value for the property.

By having these fields, we can:

* Use the property without defining a value (if the property has an initial value)
* Animate the property
* Use the property in a transition
* Provide a clear explanation of the property and how we want to use it to people reading the code

While it's true that using the houdini versions of custom properties limits us to Chromium browsers, we can still code defensively in CSS by passing the regular custom property first and the passing the Houdini version, because of cascading order the houdini version will be used in browsers that support it and be ignored otherwise.

```css
--my-color: #c0ffee;
 
@property --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: #c0ffee;
}
```

# Javascript

## Coffeescript, Typescript, Dart, Elm, Reason, Flow, oh my

## One language to rule them all?

## WebAssembly all the things?

# Moving the web forward

## Getting new toys to play with

## Playing with what we have

## Why neither of these approaches work and what is holding the web back?

## What do we do when a browser drags us back?

[Progress delayed is progress denied](https://infrequently.org/2021/04/progress-delayed/)

# Web Design as Craft or Web Design as Assembly Line

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ZNpn7FBp_9U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video">
  <iframe src="https://player.vimeo.com/video/56705945?h=2d77dee063&portrait=0" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

[All Websites Look The Same](http://www.novolume.co.uk/blog/all-websites-look-the-same/)

[In Defense of a Fussy Website](https://css-tricks.com/in-defense-of-a-fussy-website/)

<iframe height="300" style="width: 100%;" scrolling="no" title="Compound grid generator" src="https://codepen.io/michellebarker/embed/zYOMYWv?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/michellebarker/pen/zYOMYWv">
  Compound grid generator</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[Inspired Design Decisions: Pressing Matters](https://www.smashingmagazine.com/2019/07/inspired-design-decisions-pressing-matters/)

<https://www.smashingmagazine.com/author/andy-clarke/>

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/eUeoLUjOUHw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/OxrsO4aIjyc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Why can't the web be like print?

Ever since we've had a commercial web the talk has been "the web is not print" or a variation thereof

# Performance

# To DRM or not to DRM

# Accessibility is a real concern

[a11myths](https://a11ymyths.com/)

