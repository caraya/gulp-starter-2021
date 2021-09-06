# Revisiting Web Components Again: History, Platform, libraries, Stylying and interoperability


## History

I'm listening to

* [https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/](https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/)
* [https://robdodson.me/regarding-the-broken-promise-of-web-components/](https://robdodson.me/regarding-the-broken-promise-of-web-components/)



<div class="video">
  <iframe src="https://player.vimeo.com/video/33430613?portrait=0" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

[https://fronteers.nl/congres/2011/sessions/web-components-and-model-driven-views-alex-russell](https://fronteers.nl/congres/2011/sessions/web-components-and-model-driven-views-alex-russell)
[https://hacks.mozilla.org/2015/06/the-state-of-web-components/](https://hacks.mozilla.org/2015/06/the-state-of-web-components/)

### The Web Components Specifications: How the Platform does it

* The Custom Elements specification
* The shadow DOM specification
* The HTML Template specification
* The HTML imports specification

### Polymer: History and Future

Polymer is a web component library built by Google, with a simple element creation API. Polymer offers one- and two-way data binding into element templates, and provides shims for better cross-browser performance.

#### Polymer 0.x

#### Polymer 1.x

#### Polymer 2.x

#### Polymer 3.x and beyond

### X-Tag

 Microsoft supported, open source, JavaScript library that wraps the W3C standard Web Components family of APIs to provide a compact, feature-rich interface for rapid component development. While X-Tag offers feature hooks for all Web Component APIs (Custom Elements, Shadow DOM, Templates, and HTML Imports), it only requires Custom Element support to operate. In the absence of native Custom Element support, X-Tag uses a set of polyfills shared with Google's Polymer framework.

### Skate.js

library built on top of the W3C web component specs that enables you to write functional and performant web components with a very small footprint. Skate is Inherently cross-framework compatible. For example, it works seamlessly with - and complements - React and other frameworks.

### Slim.js

Slim.js is a lightweight web component library that provides extended capabilities for components, such as data binding, using es6 native class inheritance. This library is focused for providing the developer the ability to write robust and native web components without the hassle of dependencies and an overhead of a framework.

## Stylling

@apply

custom-properties

::part and ::theme

## Interoperability

Track the work Rob Dodson has been doing and, if possible do samples of what these interoperable implementations look like
