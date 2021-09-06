# Building an application with Polymer 1.x

## Introduction

It'll be a long time before Polymer 1.x goes down the way of the Dodo and, while I prefer working with web components V1 it's still a good idea to do a tour of what a Polymer 1.x element looks like, how does it work and what we can do with it

### Purpose

1. Refresh my Polymer 1.x knowledge and skills when working with Polymer and third party APIs
2. Build a front end for a Wordpress blog

### Differences with Polymer 2

Polymer 2 is in preview release (alpha/beta quality code) so the first question is why not jump to Polymer 2. Here are some of the reasons. 


* Polymer 1.x is built on top of V0 web component specifications. They are considerably different than the V1 specifications currently being shipped in browsers. Some of the differences are:
    * Stronger need for polyfills. Chrome and Opera are the only browsers that shipped support for V0 components. All other browsers must use polyfills for Polymer to work
    * Different syntax. As you wil see throughout this project the syntax for Polymer 1 is very different than the class-based syntax for Polymer 2
* Polymer 2 is not ready for production yet. There are several groups both inside and outside of Google that are using Polymer 1 in production applications

## The project: Wordpress Blog Client

### Getting started: `wp-blog-list` the initial version

```html
<!-- Imports for application -->
<link rel="import" href="./bower_components/polymer/polymer.html">
<link rel="import" href="./bower_components/iron-ajax/iron-ajax.html">
<!-- wraps around HTML content to resolve entities and weird stuff -->
```

```html
<!-- Imports -->
<link rel="import" href="../elements.html">

<dom-module id="wp-blog-list">

    <template>
        <style>
            /* CSS rules for your element */
        </style>

        <!-- iron-ajax action, I think -->
        <iron-ajax
          auto
          url="http://rivendellweb.net/wp-json/wp/v2/posts"
          params='{"page": 1}'
          handle-as="json"
          last-response="{{posts}}"
          debounce-duration="300"></iron-ajax>

        <!-- local DOM for your element -->

        <template is="dom-repeat" items="{{posts}}" as="post">

          <div class="post post-type post-[[post.id]]">

            <h1>
              <a href="[[post.link]]">
                <marked-element markdown="[[post.title.rendered]]">
                  <div class="markdown-html" tabindex="0"></div>
                </marked-element>
              </a>
            </h1>

            <div class="post-meta">
              <p>created: <span>[[post.date]]</span></p>
              <p>modified: <span>[[post.modified]]</span></p>
            </div>

            <div class="post-body">
              <marked-element markdown="[[post.content.rendered]]">
                <div class="markdown-html" tab-index='0'></div>
              </marked-element>
            </div>

          </div>

        </template>
    </template>

    <script>
        // element registration
        Polymer({
            is: "wp-blog-list",

            // add properties and methods on the element's prototype

            properties: {}
        });
    </script>

</dom-module>
```

### First pass at cleanup

```html
<!-- Imports for application -->
<link rel="import" href="./bower_components/polymer/polymer.html">
<link rel="import" href="./bower_components/iron-ajax/iron-ajax.html">
<!-- wraps around HTML content to resolve entities and weird stuff -->
<link rel="import" href="./bower_components/marked-element/marked-element.html">
```

```html
```html
<!-- Imports -->
<link rel="import" href="../elements.html">

<dom-module id="wp-blog-list">

    <template>
        <style>
            /* CSS rules for your element */
        </style>

        <!-- iron-ajax action, I think -->
        <iron-ajax
          auto
          url="http://rivendellweb.net/wp-json/wp/v2/posts"
          params='{"page": 1}'
          handle-as="json"
          last-response="{{posts}}"
          debounce-duration="300"></iron-ajax>

        <!-- local DOM for your element -->

        <template is="dom-repeat" items="{{posts}}" as="post">

          <div class="post post-type post-[[post.id]]">

            <h1>
              <a href="[[post.link]]">
                <marked-element markdown="[[post.title.rendered]]">
                  <div class="markdown-html" tabindex="0"></div>
                </marked-element>
              </a>
            </h1>

            <div class="post-meta">
              <p>created: <span>[[post.date]]</span></p>
              <p>modified: <span>[[post.modified]]</span></p>
            </div>

            <div class="post-body">
              <marked-element markdown="[[post.content.rendered]]">
                <div class="markdown-html" tab-index='0'></div>
              </marked-element>
            </div>

          </div>

        </template>
    </template>

    <script>
        // element registration
        Polymer({
            is: "wp-blog-list",

            // add properties and methods on the element's prototype

            properties: {}
        });
    </script>

</dom-module>
```

### Some layout

```html
<!-- Imports for application -->
<link rel="import" href="./bower_components/polymer/polymer.html">
<link rel="import" href="./bower_components/iron-ajax/iron-ajax.html">
<!-- wraps around HTML content to resolve entities and weird stuff -->
<link rel="import" href="./bower_components/marked-element/marked-element.html">
<!-- paper card and layout -->
<link rel="import" href="./bower_components/paper-card/paper-card.html">
<link rel="import" href="./bower_components/paper-material/paper-material-shared-styles.html">
<link rel="import" href="./bower_components/iron-flex-layout/iron-flex-layout-classes.html">
<link rel="import" href="./bower_components/font-roboto/roboto.html">
```

```html
<!-- Imports -->
<link rel="import" href="../elements.html">

<dom-module id="wp-blog-list">

    <template>
      <style is="custom-style">


        body {
          font-family: Lato, Verdana, Helvetica, sans-serif;
          font-size: 16px;
          /* 1rem = 16px */
          font-weight: 300;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          clear: both;
          font-family: 'Handlee', cursive !important;
          margin-bottom: .25em;
          text-rendering: optimizeLegibility;
        }

        h1 {
          font-size: 3em;
        }

        .video {
          margin: 2em 0;
          max-width: 100%;
        }

        blockquote {
          border: 0 dashed #909;
          border-left-width: 3px;
          color: #686868;
          font-size: 1.125em;
          font-style: italic;
          line-height: 1.5;
          padding-left: 1em;
        }
        :host {
          --paper-card-header: {
            background-color: #3f51b5;
            color: white;
            font-family: Lato, Verdana, Helvetica, sans-serif;
            /*font-family: 'Roboto', 'Noto', Verdana, sans-serif;*/
            text-align: center;
          };
        }

        .cards-container {
          /* Mixins equivalent to flex: row wrap */
          @apply(--layout-horizontal);
          @apply(--layout-wrap);
          /* Space between items */
          @apply(--layout-justified);

        }

        .card-content {
          color: #333;
          background-color: white;
          font-family: Lato, Verdana, Helvetica, sans-serif;
          /*font-family: 'Roboto', 'Noto', Verdana, sans-serif;*/
          text-align: left;
        }


        paper-card {
          margin: 0 3em;
          height: 25%;
          width: 90%;

          @apply(--paper-card-header);
          @apply(--paper-card-header-text);
          @apply(--paper-card-header-color);

        }

        a {
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }


        @media screen and (max-width: 900px){
          .cards-container {
            @apply(--layout-vertical);
          }

          paper-card {
            width: 100%;
          }
        }

        /* from jetpack's tiled gallery */
        .tiled-gallery {
          clear: both;
          margin: 0 0 20px;
          overflow: hidden
        }

        .tiled-gallery img {
          margin: 2px!important
        }

        .tiled-gallery .gallery-group {
          float: left;
          position: relative
        }

        .tiled-gallery .tiled-gallery-item {
          float: left;
          margin: 0;
          position: relative;
          width: inherit
        }

        .tiled-gallery .gallery-row {
          overflow: hidden
        }

        .tiled-gallery .tiled-gallery-item a {
          background: 0 0;
          border: none;
          color: inherit;
          margin: 0;
          padding: 0;
          text-decoration: none;
          width: auto
        }

        .tiled-gallery .tiled-gallery-item img,
        .tiled-gallery .tiled-gallery-item img:hover {
          background: 0 0;
          border: none;
          box-shadow: none;
          max-width: 100%;
          padding: 0;
          vertical-align: middle
        }

        .tiled-gallery-caption {
          background: #eee;
          background: rgba(255, 255, 255, .8);
          color: #333;
          font-size: 13px;
          font-weight: 400;
          overflow: hidden;
          padding: 10px 0;
          position: absolute;
          bottom: 0;
          text-indent: 10px;
          text-overflow: ellipsis;
          width: 100%;
          white-space: nowrap
        }

        .tiled-gallery .tiled-gallery-item-small .tiled-gallery-caption {
          font-size: 11px
        }

        .widget-gallery .tiled-gallery-unresized {
          visibility: hidden;
          height: 0;
          overflow: hidden
        }

        .tiled-gallery .tiled-gallery-item img.grayscale {
          position: absolute;
          left: 0;
          top: 0
        }

        .tiled-gallery .tiled-gallery-item img.grayscale:hover {
          opacity: 0
        }

        .tiled-gallery.type-circle .tiled-gallery-item img {
          border-radius: 50%!important
        }

        .tiled-gallery.type-circle .tiled-gallery-caption {
          display: none;
          opacity: 0
        }

      </style>

        <!-- iron-ajax action, I think -->
        <iron-ajax
          auto
          url="http://rivendellweb.net/wp-json/wp/v2/posts"
          params='{"page": 1, "_embed": 1}'
          handle-as="json"
          last-response="{{posts}}"
          debounce-duration="300"></iron-ajax>

        <!-- local DOM for your element -->

        <template is="dom-repeat" items="{{posts}}" as="post">


          <paper-card heading tab-index='0'>
            <h1>
              <marked-element markdown="[[post.title.rendered]]">
                <div class="markdown-html" tabindex="0"></div>
              </marked-element>
            </h1>
            <div class="post-meta">
              <p>created: [[post.date]]</p>
              <p>last update: [[post.modified]]</p>

            </div>
            <div class="card-content">
              <a href="[[post._links.wp:featuredmedia.href]]"><img src="[[post._links.wp:featuredmedia.href]]"></a>
              <marked-element markdown="[[post.content.rendered]]">
                <div class="markdown-html" tab-index='0'></div>
              </marked-element>

            </div>
          </paper-card>
        </template>
    </template>

    <script>
        // element registration
        Polymer({
            is: "wp-blog-list",

            // add properties and methods on the element's prototype

            properties: {}
        });
    </script>

</dom-module>
```


##  On to day 2: Outstanding questions

1. Figure out why `_embedded` and `_links` don't work with Polymer data binding. If/when they do I'll be able to link to author and metadata information for the posts directly. 

2. Figure out paginataion. WP does give you paginated JSON but will that be good enough or would it be better to get all pages of posts (63 pages in the case of my personal blog) and do the pagination manually on the client side? [hot ajax paging](https://beta.webcomponents.org/element/mercmobily/hot-ajax-paging) sounds like a promising idea, maybe use it as is or take the ideas and figure out how to implement them. 

3. There are still some styling issues we need to work around. Why do the cards stick together? How do I separate them?


# Day 2: Progress

> Note: I will only include `elements.html` and Polymer elements when I make substantial changes to them, otherwise I will only include the elements I've changed. 

I've continued working on `wp-blog-list` and have added some little tweaks along the way. Now if the post has a featured image it will display before the content like it would on a regular Wordpress blog. 
  
I've also added a byline including both the author and the category.

These two changes are possible because I finally figured out how to use the `-embeeded` content on the JSON for each post. I initially thought that the JSON was easy to work with but it ended up being nothing but.  

### Using featured images

The featured image is created with the following snippet

```html
<a href="[[post._embedded.wp:featuredmedia.0.link]]">
<img src="[[post._embedded.wp:featuredmedia.0.media_details.sizes.large.source_url]]"></a>
```

Then we cheat a little and, if the `src` attribute is undefined we use CSS to remove it from the DOM. 

```css
img[src="undefined"] {
  display: none;
}
```

### Creating a byline

To produce the byline:

```html
<p>by: carlos in London 2016</p>
```

We need to bind the data like so:

```html
<p>by: [[post._embedded.author.0.name]] 
   in [[post._embedded.wp:term.0.0.name]]</p>
```

In the last snippet `post._embedded.author.0.name` is the name of the first child in the authors' array of the `_embedded` array of the post object. This will never change as there is only one author per post in Wordpress. 

Categories (or `wp:terms`) are harder to handle. `post._embedded.wp:term.0.0.name` indicates the first category but there are unlimited categories available for a post. How do you loop through them in Polymer? In vanilla JS I would grab a for or a forEach loop to iterate through the items of the array and display their names until one was empty, meaning that there are no more categories. 
    
Same thing applies to tags. Even though the blog I'm working from doesn't use them, I want this to be generic enough to handle them. 


## Lesson learned: Learn your API

If you're working with a third party API you did not create do yourself a favor and learn the API. 

I loaded a dump of the Wordpress REST API on [http://jsonformatter.org/](http://jsonformatter.org/) and switched the view to tree mode. That's how I discovered the syntax for the category view in the byline and how to format the embedded image. It may also provide new insights on the data and give you ideas of how to bind the data in your application. 

The image below shows the tree view of the result obtained from the WP Rest API. 

<img src="images/jsonformatter-org.png" alt="jsonformatter.org tree view">


If you created the API you're working with, please do yourself a favor and document the API. Six months from now you will be very gratedful 

## On to Day 3: Outstanding questions
 
1. How to display all the categories and tags a post belongs to? How do you loop through them in Polymer? In vanilla JS I would grab a for or a forEach loop to iterate through the items of the array until one was empty 


# Day 3: Building the application shell

TO build the application we'll cheat, a little bit, with the [Polymer CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli) tool.
 
 
We've added the following elements to `elements.html`

```html
<!-- icons -->
<link rel="import" href="./bower_components/iron-icons/iron-icons.html">
<link rel="import" href="./bower_components/paper-icon-button/paper-icon-button.html">
<!-- app layout -->
<link rel="import" href="./bower_components/app-layout/app-drawer-layout/app-drawer-layout.html">
<link rel="import" href="./bower_components/app-layout/app-drawer/app-drawer.html">
<link rel="import" href="./bower_components/app-layout/app-scroll-effects/app-scroll-effects.html">
<link rel="import" href="./bower_components/app-layout/app-header/app-header.html">
<link rel="import" href="./bower_components/app-layout/app-header-layout/app-header-layout.html">
<link rel="import" href="./bower_components/app-layout/app-toolbar/app-toolbar.html">
```

We've also created a new element, `wp-blog-app` to hold the shell of our application. I'm using the `app-layout` element to create the shell. 

```html
<link rel="import" href="../../elements.html">
<dom-module id="wp-blog-app">

  <template>

    <style>
      app-header {
        background-color: #00897B;
        color: #fff;
      }
      app-header paper-icon-button {
        --paper-icon-button-ink-color: white;
      }
    </style>
    
    <app-drawer-layout>
      <app-drawer>
        <app-toolbar>Menu</app-toolbar>
      </app-drawer>
      <app-header-layout>
        <app-header reveals effects="waterfall">
          <app-toolbar>
            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
            <div main-title>Carlos Thought Pockets</div>
          </app-toolbar>
        </app-header>
        <wp-blog-list></wp-blog-list>
      </app-header-layout>
    </app-drawer-layout>
  </template>
  
  <script>
    Polymer({
      is: 'wp-blog-app',
      properties: {}
    });
  </script>
</dom-module>
```

# Day 4: Building the menu

## Linking to recent posts: actually repeating yourself

## linking to categories: how many ajax requests per page?

## Onto day 5: Outstanding questions

* How do I link to portions of this site, rather than the original? Do I need to change the links to point to local?
* Reusing layout: How do we reuse the same layout?
## Day 5:
# Final day: Getting ready for deployment


```json
{
  "entrypoint": "index.html",
  "shell": "src/wp-blog-app/wp-blog-app.html",
  "fragments": [
    "src/wp-blog-list/wp-blog-list.html",
    "src/wp-blog-menu/wp-blog-menu.html"
  ],
  "sources": [
    "src/**/*",
    "images/**/*",
    "bower.json"
  ],
  "includeDependencies": [
    "bower_components/webcomponentsjs/webcomponents-lite.min.js"
  ]
}
```
