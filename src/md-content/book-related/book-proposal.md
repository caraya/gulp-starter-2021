# Book Overview

This is the book I wish I had when I started working with components. There are few resources about web components available. Most of them are blog posts that haven’t been updated in a long time

We start by looking at the why should we use web components and what they are and how each of the specifications that make up web components and how they interact with each other to make a powerful new paradigm for web development. This section also attempts to differentiate the W3C web components specifications from the many componets and component frameworks available in the market. React and Angular have components that work on the web but they are not web components.

The book will then look at available libraries and component collections: X-Tags, Polymer, Bricks,  and Bosonic as interoperable building blocks for building web applications. We will look at ways to search for web components in places like [customelements.io](https://customelements.io/) and [webcomponents.org](https://beta.webcomponents.org/) and other element repositories.


In the final part of the book we’ll build components by hand and using the libraries we discussed earlier. Some examples will use a single library and some will use components from multiple library to demonstrate interoperability between Web Component Implementations.


## Competing books.

* [Developing Web Components](http://shop.oreilly.com/product/0636920032922.do) (O’Reilly)
* [Web Components in Action MEAP](https://www.manning.com/books/web-components-in-action-cx) no longer in development (Manning)
* [Building modern web apps with web components](Building modern web apps with web components) (Leanpub) last updated 2 years ago
* [Learning Web Component Development](https://www.packtpub.com/web-development/learning-web-component-development) (Packt)
* [Getting Started with Polymer](https://www.packtpub.com/web-development/getting-started-polymer) (Packt)

Because the specifications for web components have been in flux until recently there hasn’t been much chance to create books or training that covers the specs without being out of date as soon as it is printed or put in an early release program.

The specifications have reached a consensus level where most vendors have agreed to the structure the specifications will take and we are starting to see Mozilla, Safari and Edge implement Custom Elements and Shadow DOM v1. Chrome was the only browser that implemented the original v0 specifications.

Of the five web components books I’m aware of only the O’Reilly book offers solutions to technical problems but, at the time it was written, the specification were in flux and it was hard to write a book without being obsolete by the time it was published. Writing about specific Libraries is also hard, authors have to decide how much of the library they want to cover and how deep they want to dive into each library. I’ve chosen to cover the basics of Polymer 2.0 and 3.0 and X-Tag to provide a basic level

This book is more about practical tutorials, tips, code snippets and working examples to allow readers to pull them into their own projects. The book will also have a companion repository where code (snippets and full working demos) will live and be updated periodically.

## Market information.

 We are at an interesting point in the history of web components. Now that we’ve reached a consensus as to what the specifications will finally look like. Even with a large numbers of starts on Github I believe there are many more people interested in web components than what the statistics reflect.

 Polymer is the biggest kind in the web components block as reflected in the Github stats below covering the core libraries for Polymer, X-Tag, Bosonic and Bricks.

* **Polymer (core Polymer library):**
  * Stars on Github: 16397
  * Forks on Github: 1628
*  **X-Tag Core:**
  * Stars on Github: 1064
  * Forks on Github: 133
* **Skate.js**
  * Stars on Github: 1740
  * Forks on Github: 70
* **Bosonic Core:**
  * Stars on Github: 186
  * Forks on Github: 20

# Proposed book outline


1. **Background: What are web components?**
Let's become familiar with web components, what they are and how they work together
    * History of web components
    * Individual Specs and what they do
        * HTML Templates
        * HTML Imports
        * Custom Elements
        * Shadow DOM
    * What to do with older browsers
        * Polyfills
        * How to use them
2. **Working with vanilla components** Before we can delve into specific libraries and frameworks we should first learn how to create web components without libraries. This will give us one more tool in the arsenal
    * Do we need to create a new element or can we use existing elements to accomplish the same goal?
    * Creating custom elements
      * Uses ES2015 classes
    * Adding templates
       * interactions between content and the custom element using slots
    * Shadow DOM anyone?
       * full content and style encapsulation
    * Importing your elements
      * Spec compliance versus actual usage
    * A matter of style
3.  **Working with Polymer 2.0**
    * Differences with vanilla components
    * Using Polymer Elements
    * Building a custom Polymer Element
    * Composing applications with Polymer
3. **Polymer 3.0** (current preview release)
    * Building Polymer Components
    * Using pre-built components
    * Building a sample application
4. **Skate.js** another approach to components
    * Building components with Skate.js
5. **X-Tag**
    * Building components with X-Tag
5.  **Component Libraries**
    * Mozilla Bricks
      * Difference between older and current versions
      * Examples
    * Polymer Elements
      * Examples
    * Bosonic
    * Vaadin Elements
6. Searching for web components
    * [customelements.io](https://customelements.io)
    * [webcomponents.org](https://beta.webcomponents.org)
3. **Composing applications**
    * Defining composability
    * How does it work
      * **Using components from multiple sources**
      * **Using components from multiple sources**
9. **Using Web Components with other frameworks**. See this article from Rob Dodson: [Interoperable custom elements](http://robdodson.me/interoperable-custom-elements/)
    * Integrating web components into a React application
    * Other frameworks
8. **Web components as pattern libraries**
    * What are pattern libraries
    * How do they work?
    * Why web components?
9. Ready for production?
  * Are we there yet
