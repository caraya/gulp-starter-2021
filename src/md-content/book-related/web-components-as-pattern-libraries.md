# Web Components as Pattern Libraries

One of the things that have caught my attention about web components is how easy it is to adapt them as pattern libraries and design libraries. Because we can isolate the style and scripts for each individual component and compose larger UI elements from smaller elements, Web Components are ideal for this type of work. 

Before we can delve into pattern and design libraries we need to design what they are. So here we go:

> A design library completely covers an element or a pattern: what it intended purpose is, how it looks, what behaviors and styles are available for the element and how we use it. 

The idea is that wherever we use an element from the library we know what it'll look like and how it will behave. This allows designer to create consistent interfaces for their applications.

Web Components make it easier to create reusable elements. we can create elements where the content is assigned to different areas of the template and, unlike template engines like Moustache and Handlebars, this is all baked into the platform. Add ShadowDOM for encapsulation and custom styles built with css variables and you have a full suite of tools to create your patterns and libraries. 

For the examples in this essay I will use [Polymer 1.x](https://www.polymer-project.org/1.0/). It may not be an ideal platform for all pattern libraries but I think it illustrates some of the concepts I'm trying to make. We can also take advantage of some advanced CSS features to make sure we don't have to style  

## Atomic web design

<div class="video">
<iframe src="https://player.vimeo.com/video/109130093?byline=0&portrait=0" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

I will use a modified version of Atomic Web Design as the underlying principle and rules to build the pattern library.

[Josh Duck’s Periodic Table of HTML Elements](http://zqsmm.qiniucdn.com/data/20110511083224/index.html) does a good job illustrating that all our web content, regardless of for factor or what framework generated it, uses the same elements.  

<figure>
<img src="images/html-periodic-table.png" 
alt="Periodic Table of HTML elements">
<figcaption>Periodic Table of HTML Elements shows that all HTML elements are organized around a function.</figcaption>
</figure>

Because all the content that we use for the web starts from the same basic components we can use a similar building pattern to what nature uses, going from the simplest to the most complex. 

> Atomic design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner. The five stages of atomic design are:
>  
> 1. Atoms
> 2. Molecules
> 3. Organisms
> 4. Templates
> 5. Pages

The main difference in my web component based approach is that I'll concentrate on Molecules and higher organisms. Atoms (all [HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)) atoms are part of each molecule and can be changed by changing the component. 

We'll look at how to customize a component later in the article but one of the great advantages of web components is that you can create one customizable molecule to handle many layouts and color arrangements without having to create customized versions of the element.

# Building a molecule using Polymer

## Prep work

Before we can build a custom molecule we have to build a Polymer element. This requires [Bower](https://bower.io/) in order to install the dependencies for our element. Install Bower as a global Node application if you haven't done so already. 

```bash
npm install -g bower
```

Once Bower is installed run the initialization command and answer the questions when prompted.
  
```bash
bower init
```

For a normal Polymer Application I'd suggest installing the [Polymer CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli). This will make it easier to work with Polymer and the Paper and Iron element collections.  Because I don't want to tie the pattern library to a style (Material Design) or a given philosophy of how to build molecules we'll go with the manual way instead.        

At the root of the application, run bower to install the Polymer library. 

```bash
bower install --save Polymer/Polymer
```

Then create a directory for your component and change to the directory. 


```bash
mkdir pattern-search
cd pattern-search 
```

## creating a pattern

I will use the `pattern-figure` element throughout 

```html
<link rel="import" href="../../bower_components/polymer/polymer.html">

<dom-module id="pattern-figure">
    <style>
      <!-- We'll insert styles here --> 
    </style>
    <template>
        <figure class="{{figureType}}" align="{{alignment}}" float="{{float}}">
            <img src="{{source}}" alt="">
            <figcaption>{{caption}}</figcaption>
        </figure>
    </template>

    <script>
        Polymer({
            is: 'pattern-figure',
            attributes: {
                source: {
                    type: String,
                    value: ''
                },
                figureType: {
                    type: String,
                    value: 'figure'
                },
                alignment: {
                    type: String,
                    value: 'left'
                },
                caption: {
                    type: String,
                    value: 'Generic caption'
                },
                float: {
                    type: String,
                    value: 'left'
                }
            }
        })
    </script>
</dom-module>
```

The first thing we do in our Polymer element is to import the Polymer library into the element using HTML Imports. 

`dom-module` is the basic structure of our Polymer element. Its only attribute is `id` which we will match inside the Polymer element registration. 

<div class='info'>
<p>The only restriction for Polymer and Web Component names is that they must have a dash (<code>-</code>) in the name to differentiate them from current or future HTML elements.</p>
</div>

we follow the declaration with a style tag that will contain all the styles specific to the element.  We will cover styling in more detail later but for now we'll place a style tag in the template. The remainder of the script is the HTML tags that make up the structure of your element. 

Next we build a template tag containing the structure of our pattern. The templates are built with the same atoms that we use in our everyday web development. We learn a different way to build the atoms and molecules and the higher order elements of Atomic Web Design but not a different templating language like moustance, handlebars or others. 

This is one of the main reasons why I chose web components and Polymer in particular. 
  
The last part of the element is a script where we register the Polymer element. 

In the script we first create a Polymer object. The first attribute, `is` uses the ID of the `dom-module` tag we opened the document with and tells the HTML parser the name of the element. 

There is a lot we can do with this element. `Properties` define properties and methods for our element's prototype. `hostAttributes` define attributes that are included in our element when they are first created; for example they can be attributes we use to style the element. 

## Styling the element

Insert the following CSS in the style declaration for our `pattern-figure` element 

```css
:host {
    display: block;
    clear: both;
}

:host > figure {
    max-width: min-content;
}

:host > figure > img {
    max-width: inherit
}

:host > figure > figcaption {
    color: #999;
    font-size: 80%;
    text-align: left;
}

:host([align="left"]) > figure  {
    clear: both;
    float: left;
    margin: 2em 0;
}

:host([align="center"]) > figure {
    clear: both;
    margin: 2em auto;
}

:host([align="right"]) > figure {
    clear: both;
    float: right;
    margin: 2em 0;
}

:host([align="left"]) > figure > figcaption,
:host([align="center"]) > figure > figcaption,
:host([align="right"]) > figure > figcaption {
    text-align: left
}

:host(.code-list) > figure > figcaption {
    border-top: 1px solid black;
    margin-top: 2em;
    color: #999;
    text-align: left;
}

:host([float = "left"]) {
    margin-right: 2rem;
    text-align: left
}

:host([float = "right"]) {
    margin-left: 2rem;
    text-align: left
}
```

The `:host()` pseudo element represents our element, `pattern-figure` in this case. It allow us to style the element from the element declaration itself and not loose the style encapsulation.  It also allows me to create different versions of the element depending on what attributes we use. 

Also, because I've chosen to use children in the light DOM rather than build the elements in the template (to be changed in a later iteration of the project)  and  because of a limitation in the Polyfill for shadow Dom regarding the styling of distributed Children I'm forced to add a wrapper around the (see: [Styling distributed children (::content)](https://www.polymer-project.org/1.0/docs/devguide/styling#styling-distributed-children-content) in the Polymer 1.x documentation)


So what does this all mean in practice? We can create themes for our molecules and change them either with classes or attributes on our elements. For example each of the `pattern-figure` elements will be styles different, but all the captions will be styled the same way. 

```html
<pattern-figure class="figure" align="left">
    <figure>
        <img src="images/IMG_0212.PNG">
        <figcaption>Magazine spread to model after </figcaption>
    </figure>
</pattern-figure>

<pattern-figure class="figure" align="center">
    <figure>
        <img src="images/IMG_0212.PNG">
        <figcaption>Magazine spread to model after</figcaption>
    </figure>
</pattern-figure>

<pattern-figure class="figure" align="right">
    <figure>
        <img src="images/IMG_0212.PNG">
        <figcaption>Magazine spread to model after</figcaption>
    </figure>
</pattern-figure>
```
When we need to change the styles of our elements we need to change the definitions on the CSS portion of the element.
 
## Custom CSS mixins to create themes

Rther than define individual properties for each theme we want to implement for our pattern library it may be easier, less tedious and error prone to let a library author to define a mixin, a set of CSS properties as a single custom property 

Using an extension to the shim that provides custom properties, we can then apply all properties in the mixin to a specific CSS rule in an element's local DOM. The capability is analogous to var and custom properties, but which allows an entire set of properties to be mixed in. 

Defining a mixin is just like defining a custom property, but the value is an object that defines one or more rules. 

```css
selector {
  --mixin-name: {
    /* rules */
  };
}
```

The extension adheres to the [CSS @applyn rule](https://tabatkins.github.io/specs/css-apply-rule/) proposal. Use @apply to apply a mixin like this:

```css
@apply(--mixin-name);
```

Mixins can be as simple as defining a set of properties common to one or more versions of the same element or as a theme container in a master css-only element that gets imported and included in each element we want to use the common CSS in.   

In the `pattern-message` element demo below we define a set of common attributes for all our message elements as the `--pattern-message-theme` mixin in the `:host` selector and then, for the more specific classes we  add any additional rules that are specific to the subclass of the pattern we want to modify, mostly adding different background colors to the different types of messages available.

```html
<link rel="import" href="../../bower_components/polymer/polymer.html">

<dom-module id="pattern-message">
    <style is="custom-style">
        /* Apply custom theme to messages */
        :host {
            --pattern-message-theme: {
                border-radius: 1em;
                border: 2px solid black;
                display: block;
                padding: 1em;
                width: 80%;
                margin: 2em auto;
            };
        }

        :host(.message) {
            @apply(--pattern-message-theme);
            background-color: lightgrey;
        }

        :host(.message-info) {
            @apply(--pattern-message-theme);
            background-color: lightblue;
        }

        :host(.message-warning) {
            @apply(--pattern-message-theme);
            background-color: lightyellow;
        }

        :host(.message-danger) {
            @apply(--pattern-message-theme);
            background-color: indianred;
        }
    </style>

    <template>
        <div>
            <div class="content-wrapper"><content></content></div>
        </div>
    </template>

    <script>
        Polymer({
            is: 'pattern-message',

            properties: {}
        });
    </script>

</dom-module>
```
 
# Templates and Pages

Another aspect of web components that I find very attractive is how easy it is to compose objects using the element's local DOM and the light DOM for the element as it is written in the host document. 

```html
<pattern-header></pattern-header>
```

This version of the element will display the object as defined in the template associated to the molecule. It works perfectly when we want to demonstrate what each smaller molecule looks like. We can further customize it by assining CSS classes  

Depending on how detailed  you want your template to be and how many patterns you want to support you can compose the patterns in the element with individual elements having their own customizations and styles.  

```html
<pattern-header>
    <pattern-logo small></pattern-logo>
    <pattern-menu size="6"></pattern-menu>
    <pattern-search></pattern-search>
</pattern-header>
```

It'll all depend on your comfort level with the technology. Remember that the templates inside the elements use the HTML atoms we are already comfortable with so further breaking it down is a matter of personal preference.  We'll go with the more detailed model in the example repository

# Sample Repository

The sample repository [https://github.com/caraya/pattern-library](https://github.com/caraya/pattern-library) is a work in progress for a pattern library that plays with some elements discussed here and I'm using it as a laboratory to experiment with different ideas and concepts.

Ideas in issues, comments and PRs area always welcome :-)

# Links and Resources

## General Resources
* [Getting Started With Pattern Libraries](http://alistapart.com/blog/post/getting-started-with-pattern-libraries) -- A List Apart
* [Pattern Sharing](http://clearleft.com/thinks/165) -- Clearleft
* [Pattern Primer](https://adactio.com/journal/5028/) -- Jeremy Keith
* [Front end style guides](https://24ways.org/2011/front-end-style-guides/) -- 24 ways
* [Pattern Libraries: What They Are and Why You Need One](http://trydesignlab.com/blog/pattern-libraries-what-they-are-and-why-you-need-o/)
* [Responsive Deliverables](http://daverupert.com/2013/04/responsive-deliverables/) -- Dave Rupert
* [Modularity](https://www.w3.org/DesignIssues/Modularity.html) -- Tim Berners-Lee 

## Atomic Web Design
* [Atomic Web Design](http://bradfrost.com/blog/post/atomic-web-design/)
* [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/)

## Web Components
* [Web Components: A Tectonic Shift for Web Development](https://www.youtube.com/watch?v=fqULJBBEVQE&ab_channel=GoogleDevelopers)
* [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
* [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom)
* [HTML Imports: #include for the web](https://www.html5rocks.com/en/tutorials/webcomponents/imports/)
* [HTML Templates Specification](https://www.w3.org/TR/html5/scripting-1.html#the-template-element)
* [HTML's New Template Tag: standardizing client-side templating]()
* [Styling local DOM in Polymer](https://www.polymer-project.org/1.0/docs/devguide/styling)
* [Using CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)


## Pattern Libraries
* [A List Apart](http://patterns.alistapart.com/)
* [Mailchimp](http://ux.mailchimp.com/patterns)
* [Code for America](http://codeforamerica.clearleft.com/)
* [USPTO](http://uspto.github.io/designpatterns/docs/)
* [Yahoo](https://developer.yahoo.com/ypatterns/everything.html)
* [IBM Design Language](https://www.ibm.com/design/language/resources/animation-library/)
[Microsoft](https://developer.microsoft.com/en-us/windows/apps/design)
