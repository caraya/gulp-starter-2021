I've been playing with web components for a few years. Until not too long ago the biggest drawback was that only one browser supported the original (v0) family of Web Component specifications. Things are looking better now.

V1 of most web component specifications, Templates, shadow DOM and Custom Elements, are supported in most major browsers with HTML Imports being the only part of Web Components where vendors have not agreed on implementation and are waiting for ES6 modules to become more widely adopted before deciding where the future of this specification lies.

## What are Web Components

For those of you who are not familiar with them. Web Components is a set of four specifications being worked on at W3C and WHATWG. The specs are:

- Custom Elements
- shadow DOM
- Templates
- HTML Imports

On their own each of these technologies enhance web development.

**Custom Elements** allow developers to create new HTML elements and integrate them into existing web content.

**shadow DOM** allows for encapsulation. The content you create is hidden from end user's scripts and stylesheets. The styles in your element cannot style elements outside and viceversa.

**Templates** give us the possibility of creating inert HTML that will only become live when the custom element the template is attached to the live DOM on the browser.

**HTML Imports** are a declarative way to include external resources in our pages. There is very little interest from browser vendors other than Google to implement HTML Imports. Because of this we need to wait until an alternative proposal like [HTML Modules](HTML Imports and ES Modules), a reformulation of HTML Imports based on ES2015 modules. Until then remember, polyfills are your friends.

We'll explore how to combine these 4 technologies (as currently implemented and polyfilled) to create composable and reusable content that makes it easier to create book-like reources.

## Assumptions

Before diving into what we're building I want to touch on some of the assumptions I'm making.

Because web components must have a `-` character as part of the name and must start with a lowercase character (see the [spec](https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name), I've chosen to use `wcp-` for all the web components I'm building as part of this project.

All styles, content and scripts will be hidden inside the component's shadow DOM. It's not 100% foolproof but it will hide the element's styles and scripts from most casual scans and, I hope, that will be enough to discourage overrides as the overrides will become more complicated if they have to pierce the shadow boundary, it's possible but I wonder if it'll be worth the effort.

Web components should be fully interoperable so we can look at the catalog at [webcomponents.org](https://www.webcomponents.org/) to look for additional components to test the hypothesis with.

I'm particularly interested in the [Google elements](https://www.webcomponents.org/author/GoogleWebComponents) that provide declarative access to Google APIs and resources.

Because we're working with modern web technologies we must polyfill depending on the browser we use, not all browsers support all the Web Components specifications. See below
for the polyfills' complete browser support matrix:

<table>
  <thead>
    <tr>
      <th>Polyfill</th>
      <th>IE11+</th>
      <th>Chrome*</th>
      <th>Firefox*</th>
      <th>Safari 9+*</th>
      <th>Chrome Android*</th>
      <th>Mobile Safari*</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Custom Elements</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>HTML Imports</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
    <tr>
      <td>Shady CSS/DOM</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
    </tr>
  </tbody>
</table>

*Indicates the current version of the browser

## Making the case for web components in publishing

Let's think of web components as patterns: reusable pieces of code that we can use in different pages and contexts.

We can also come to an agreement on how we build those components and how much we choose to override them as content creators, publishers and tool creators.

An example of this is Google's [Accelerated Mobile Pages (AMP) project](https://www.ampproject.org/). They've subset HTML, provided their own set of custom elements (AMP HTML) and Javascript to handle ads and other potential performance bottlenecks. While AMP is gerared towards mobile performance, the proposed set of components seeks to provide a starting point for common development and a unified user interface where vendors don't feel the need to override all properties.

Because we encapsulate the components inside a shadow DOM we protect the content from outside misuse. This is similar but not identical to what browser vendors themselves use to compose elements like `<video>` and `<select>`. We can provide minimal styles encaspulated to the element, the styles will not bleed out and that styles of the host document will not bleed in. We can then use CSS custom properties to create themes for our elements and use attributes in the element to theme the element.

We can work on best of breed components. Because these components are reusable they live beyond the developer or team that created them and beyond the framework the team uses for the server portion of the application. If we're creating static content such as books then we can use interoperable components from our own libraries, libraries from other publishers and libraries from vendors like [Polymer](https://www.polymer-project.org/), [X-Tags](https://x-tag.github.io/), [Bosonic](http://bosonic.github.io/), [Skate](https://skatejs.gitbooks.io/skatejs/content/), [Aurelia](http://aurelia.io/), [Vaadin](https://vaadin.com/elements) and others that may become available in the future.

Faster development cycle and high reuse potential means that developers will spend time in each book and be able to deliver faster turnaround at lower costs for each project.

## The components

The first question to ask is what components should we build. I'll take some components that I had originally developed as Polymer 0.5 and 1.0 components and some new ideas for layout and composition. I will create the components as bare metal V1 components. These components include:

- Local video player (DASH video)
- Local video player (locally hosted content)
- Youtube video player
- Markdown parsed content
- Table of contents
- Content layout
- Masthead

If you have more ideas of what components we should build let me know via twitter or email.

The second question is whether we want to build our publications as [Progressive Web Applications](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/).

The best example I found is [Resilient Web Design](https://resilientwebdesign.com/introduction/) by Jeremy Keith. It gives us a lot of the functionality that we get from epub readers but it's all web based and it gives access to sveral features that will enrich our content.

## Building a barebones component

For this section I'll build a basic `hello-world` type element that I'll name `wcp-hello-world`. I created a directory to hold all the experiments, `wcp-demo`:

```language-bash
mkdir wcp-demo
cd wcp-demo
```

Inside `wcp-demo` I initialize an NPM `package.json` and will accept all defaults automatically. The second command will create a `bower.json` file and ask you to answer a set of questions... Either of these files can be manually edited later.

```language-bash
npm init --yes
bower init
```

Now I'm ready to start coding. All V1 custom elements, the basis for our web components, must be written as ES6 classes. I've covered ES6 classes in my blog ([Babel and You: Exploring the new Javascript](https://publishing-project.rivendellweb.net/es6-babel-and-you-exploring-the-new-javascript/ES6)) so I'll only gloss over them and just discuss their application to custom elements and web components.

Example 1 shows a minimal custom element.

The `HelloWorld` class extends HTMLElement, the parent class for all elements in a web page.We create the constructor and, inside the constructor, we call `super()` which will call the parent's (HTMLElement) constructor. Custom elements must call super as the first item in their own constructors.

Outside the class we define the custom element using `customElements.define` with two attributes: the name of the element as we'll use it and the name of the class that actually defines the elment.

```language-markup
<!DOCTYPE html>
<html>
  <head>
    <title>custom element demo</title>
    <style></styles>
  </head>
  <body>
  <script>
    // Example 1: Basic Empty Custom Element
    class HelloWorld extends HTMLElement {
      constructor() {
      super();
    }
  }
  customElements.define('wcp-hello-world', HelloWorld);
  </script>
  </body>
</html>
```

Example 1 will not give you an error but will not produce results either. Before we jump into adding content to the element we have to decide when we want to do so. Enter the lifecycle callbacks. Each reaction happens in response to a given event as discussed in the table below.

<table>
  <thead>
    <tr>
      <th>Reaction</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>constructor</td>
      <td>Called when the element is upgraded (that is, when an element is created, or when a previously-created element becomes defined)</td>
    </tr>
    <tr>
      <td>connectedCallback</td>
      <td>Called when the element is added to a document.</td>
    </tr>
    <tr>
      <td>disconnectedCallback</td>
      <td>Called when the element is removed from a document</td>
    </tr>
    <tr>
      <td>attributeChangedCallback</td>
      <td>Called when any of the element's attributes are changed, appended, removed, or replaced</td>
    </tr>
  </tbody>
</table>

For this particular case I don't want to add the content until the element is added to the DOM so I'll use the `connectedCallback` reaction to add my content. In Example 2 I will add the content directly on the `connectedCallback` event.

```language-markup
<!DOCTYPE html>
<html>
  <head>
    <title>custom element demo</title>
    <style></styles>
  </head>
  <body>
  // Example 2: adding content on connectedCallback
  class HelloWorld extends HTMLElement {

    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `<h1>Hello World</h1>`;
    }
  }
  customElements.define('wcp-hello-world', HelloWorld);
  </script>
  </body>
</html>
```

So now, whenever we add an instance of `wcp-hello-world` to a page (and we'll cover how to do that later on) we'll see the string `<h1>Hello World<\h1>` string. But we'll see the same string every single time. To fix this we'll take a three step approach:

- We'll create a template for `wcp-hello-world`
- We'll modify the template by adding slots to it
- We'll attach the template to the custom element's shadow DOM

## Creating the template

The template element is part of the HTML specification so, in theory, it could be used anywhere in our web pages. When used in web components what we're doing is creating the basic structure for our element by providing default styles and content.

I've given the template an ID to make it easier to use from Javascript later when we attach it to the shadow DOM.

```language-markup
<template id="wcp-template">
  <style>
    h1 {
      color: rebeccapurple;
    }
  </style>
  <h1>Hey</h1>
</template>
```

## Adding slots

This works in giving the custom element structure but it will return the same content every time we add the element to the page. We need a way to customize the content of the element.

The `<slot>` element takes care of this. We can create generic slots or, like I've done in this example, provide names that will be associated with the content we add in the host element. It also provides a default value when the host page provides no content.

```language-markup
<template id="wcp-template">
  <style>
    h1 {
      color: rebeccapurple;
    }
  </style>
  <h1><slot name="greeting">Hey</slot></h1>
</template>
```

## Creating the shadow DOM and attaching the template

So far all our custom elements can be modified at will.  In Javascript we could do something like this to modify the content of our custom element:

```language-javascript
let myEl = document.getElementById('wcp-hello.world');
myEl.innerHTML = "New content";
```
This may not be what we want; we may want to hide the details of our custom element from the outside world and that's where the shadow DOM comes in. shadow DOM provides encapsulation for our CSS, and HTML content... this is what make it possible to keep our CSS from bleeding out and external content from bleeding into our element.

To use shadow DOM we need to do the following:

1. Create a variable to hold our imported document path using `document.currentScript.ownerDocument`
1. Capture our template into a variable
1. Create a shadow root (the entry point to an element's shadow DOM) using `attachShadow`
1. Append the template to the shadow root.

```language-javascript
<script>
  var importedDoc = document.currentScript.ownerDocument; // 1
  class HelloWorld extends HTMLElement {
    constructor() {
      super();

      const template = importedDoc.querySelector('#wcp-template').content; // 2

      const shadowRoot = this.attachShadow({mode: 'open'}); // 3
      shadowRoot.appendChild(template.cloneNode(true)); // 4
    }
  }

  customElements.define('wcp-hello-world', HelloWorld);
</script>
```

Some things to consider:

An element (custom or otherwise) can only have **one shadow root**. The browser will report an error if you try to create more than one.

You can add elements to the template progammatically.

## The complete element

So we've seen how to create custom elements, how to create templates and attach them to a shadow root. The full element using all the techniques we've covered so far looks like this

```language-markup
<!-- wcp-hello-world.html -->
<template id="wcp-template">
  <style>
    h1 {
      color: rebeccapurple;
    }
  </style>
  <h1><slot name="greeting">Hey</slot></h1>
</template>

<script>
class HelloWorld extends HTMLElement {
  constructor() {
    super();

    var template = document
      .getElementById('wcp-template')
      .content;

    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(template.cloneNode(true));
    }

  connectedCallback() {}
}

customElements.define('wcp-hello-world', HelloWorld);
</script>
```

## Testing the element

<div class="message info">
<p>Researching an error in Firefox that causes the document to not render even though all scripts are loaded sucessfully. I'll continue to update when I find out why this broke in Firefox</p>
</div>

To add components to a page we need to make sure that it'll work in as many browsers as possible. To do that we'll use the web components polyfills from webcomponents.org. We gave to go with the Github distribution since the page at webcomponents.org references old polyfills that will not work with this project.

We'll use Bower to install the polyfills:

```language-bash
bower install --save webcomponents/webcomponentsjs
```

When we create the page that will host our component we need to make sure that we can use them. We'll use conditional loading to only load the polyfills where the APIs are not supported. if we support custom elements, HTML Imports and Templates then we just log to console that we're good to go, we don't need to load the polyfills.

If the APIs are not supported then we create a script element, attach the polyfill script as the source of the script and then append it to the head of the page.

```language-javascript
// Feature detection for web components
(function() {
  if ('customElements' in window)
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
    // platform is good!
    console.log('we\'re good to go');
  } else {
    // polyfill the platform!
    console.log('we need to polyfill');
    var e = document.createElement('script');
    e.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.body.appendChild(e);
  }
})();
```

Now that we've covered the polyfill we can create a page to test the `wcp-hello-world` element we've been playing with.

```language-markup
<!DOCTYPE html>
<html>
  <head>
    <title>slot example</title>
    <meta charset="UTF-8">
    <style></style>
    <link rel="import" href="wcp-hello-world.html">
    <script>
      (function() {
        if (('customElements' in window)
            && ('import' in document.createElement('link'))
            && ('content' in document.createElement('template'))) {
          // platform is good!
          console.log('Polyfills not needed');
        } else {
          // polyfill the platform!
          console.log('we need to polyfill');
          const scriptEl = document.createElement('script');
          scriptEl.src = './bower_components/webcomponentsjs/webcomponents-lite.js';
          document.head.appendChild(scriptEl);
          console.log('script appended');
        }
      })();
    </script>
  </head>
  <body>
    <wcp-hello-world></wcp-hello-world>
    <!-- produced the default Hello World -->
    <wcp-hello-world>
      <span slot="greeting">What's up?</span>
    </wcp-hello-world>
    <!-- produces What's up -->
  </body>
</html>
```

We'll then have a full example using three of the four specifications from the Web Components family: custom elements, templates and shadow DOM. From here we can import multiple components into our HTML host page, nested element imports, continue experimenting with both structural styles and event based propagation but the basics are there. If we choose to create components to build layouts the techniques are not much different than what we've covered so far.

We'll discuss more of this later when we talk about different composition strategies and again when we discuss creating a build process for our components.

## Observed Attributes and Changing Those Values

Attributes are a good way to provide initial state and values for our elements. For example, we can add a name attribute to a `<greeting-element>` to tell the browser who the greeting is for:

```language-markup
<greeting-element name="Arwen"></greeting-element>
```

The script uses the static `get observedAttributes()` method to tell the browser what elements will be observed for changes. This means that if there are other attributes in our greeting-element component they will not trigger the `attributeChangedCallback` reaction for our component.

Because we can monitor multiple attributes, `attributeChangedCallback` uses an if statement to test which element changed. We could use a switch statement rather than if, it's your preference.

```language-javascript
class GreetingElement extends HTMLElement {
  // Monitor the 'name' attribute for changes.
  static get observedAttributes() {return ['name']; }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name') {
      this.textContent = `Hello, ${newValue}`;
    }
  }
}

// Define the new element
customElements.define('greeting-element', GreetingElement);
```

We can also use the `attributeChangedCallback` reaction to add or modify accessibility attributes like `aria-*`, visibility attributes or anything that we do to keep our content accessible, even if it's not visible from the host document.

## Styles and Overrides

One of the things that attracted me to web components and Polymer is the ability to hide the details of our elements' implementations and APIs behind a shadow DOM, the same way that browser vendors have built elements like `video` and `select`.

What advantages do we get when we use shadow DOM?

- **Isolated DOM**: A component's DOM is self-contained (e.g. `document.querySelector()` won't return nodes in the component's shadow DOM)
- **Scoped CSS**: CSS defined inside shadow DOM is scoped to it. Style rules don't leak out and page styles don't bleed in
- **Composition**: Design a declarative, markup-based API for your component
- **Simplifies CSS** - Scoped DOM means you can use simple CSS selectors, more generic id/class names, and not worry about naming conflicts

So we get the best of both worlds. We get smaller components that are reusable and have styles that will not bleed out to the host page, however, **a rule in the host page will always win against a CSS rule in the scoped styles of the shadow DOM so I would only add styles to setup the structure of a component and let the host page style for typography or any other non-structural elements. This may also help with fallback options**

This is where collaboration and agreement is important. We can choose to encapsulate all our styles so that each component renders the same regardless of what browser we use to view it or we can just provide layout CSS and let the host page dictate the styles for typography and other requirements and let the CSS cascade do its work.

## Composition strategies

As a developer it's always easier to give my customers a read-made solution that will involve a minimum amount of work (and the posibility of them breaking things) on their end. Web components introduce different concepts for composition:

1. Slotted type composition where we mix light (host page) and shadow (web component) DOM. This is what we did in the `wcp-hello-world` example. We created a slot and we populated in the host document
2. We can nest components. In one component declaration we can import and nest other components in as granular fashion as we want. We can choose how small we want to go with components or how big we want to be
3. We can mix and match the first two approaches to best suit our needs. Some components can use slots to let authors generate their content and can also be nested inside larger portions of our applications

One of the first decisions

## How well does it fail? Aiming or accessible components

One thing that I've been debating is whether polyfilling is absolutely necessary or whether we should provide a complete alternative for our components. This stems from my fear for when Javascript doesn't load or is slow enough that it'll make people leave the application. This is no different than my criticism of other frameworks that wrap all the content on Javascript and provide no fallback or accessibility options.

If a component is not upgraded and it uses slots as composition tools we can still style the content in the host page and, in theory, we should still get the content. Given that no browser will support HTML Imports, and the ones that do are beginning the removal process for the feature, we should start looking at alternatives.

From a strict accessibility point, we have a few options:

We can extend [subclasses of HTMLElement](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces) and gain all the accessibility benefits of the built-in element and not have to reinvent the wheel.

In this example we create a customized button called `plastic-button` using ES6 classes.

The first difference is that instead of extending `HTMLElement` we extend one of HTMLElement's children elements, `HTMLButtonElement`.

The second change is how we define the custom element. When we define the element (in `customElements.define`) we add the `extends` keyword indicating the element that we are extending.

```language-javascript
class PlasticButton extends HTMLButtonElement {
  constructor() {
    super();

    this.addEventListener("click", () => {
      // Add custom behavior for the click event
      // Maybe an animation?
    });
  }
}

customElements.define("plastic-button", PlasticButton, { extends: "button" });
```

The final change is how we use the element. We use the `is` attribute to indicate what kind of button it is. The value of is must match the name of t he element we defined.

```language-markup
<button is="plastic-button">Click Me!</button>
```

Unfortunately, Apple has all but killed this option as they have repeatedly said that WebKit will not implement this type of custom elements.

The other, definiteley less appealing, option is to code accessibility into our elements. The example below, taken from the Custom Elements specification ([Section 2.1.3: Drawbacks of autonomous custom elements](https://www.w3.org/TR/custom-elements/#custom-elements-autonomous-drawbacks)) shows how much work we have to do to make the content accessible, something we get for free when use native elements.

```language-javascript
class TacoButton extends HTMLElement {
  static get observedAttributes() {
    return ["disabled"];
  }

  constructor() {
    super();

    this.addEventListener("keydown", e => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        this.dispatchEvent(new MouseEvent("click", {
          bubbles: true,
          cancelable: true
        }));
      }
    });

    this.addEventListener("click", e => {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    this._observer = new MutationObserver(() => {
      this.setAttribute("aria-label", this.textContent);
    });
  }

  connectedCallback() {
    this.setAttribute("role", "button");
    this.setAttribute("tabindex", "0");

    this._observer.observe(this, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set disabled(v) {
    if (v) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  attributeChangedCallback() {
    // only is called for the disabled attribute due to observedAttributes
    if (this.disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.setAttribute("tabindex", "0");
      this.setAttribute("aria-disabled", "false");
    }
  }
}
```

I will continue working with the first option as it will reduce the workload and it's easier to rationalize through the workflow. I believe the `is` keyword is essential for accessibility and it shouldn't be removed from the spec at all, despite what Apple and Webkit want.

Only time will tell.

## Build System for Web Components

One of the most complicated things (from my perspective) is how to create a good tooling set for web components. The way we build vanilla components (components built using plain CSS and Javascript) is tedious and error prone so we need to figure out what the best toolchain is.

[Polymer CLI](https://www.npmjs.com/package/polymer-cli) provides a Node-based to to scaffold your web components. It also provides build and serving tools for your components.

Even though the tools are created by the Polymer team and have a definite Polymer bent they also provide scaffolding for vanilla custom elements with only Javascript.

We'll cover these aspecs of the Polymer CLI tool:

- Generating new pure Javascript custom elements
- Building and running tests for the elements
- Bundling our elements and getting them ready for production
- Serving our content during development
- Generating a service worker for the code we create

### Before we begin: install polymer-cli

Polymer-cli is a node module. Install it globally on your system running:

```language-bash
npm install -g polymer-cli
```

This will make the `polymer` command available on your terminal.  This is what we'll use to interact with the CLI tools. To get an idea of what we can do with the tool, type `polymer --help` on your terminal; you should get output similar to this:

```language-bash
Usage: `polymer <command> [options ...]`

Available Commands

  analyze   Writes analysis metadata in JSON format to standard out
  build     Builds an application-style project
  help      Shows this help message, or help for a specific command
  init      Initializes a Polymer project
  install   installs Bower dependencies, optionally installing "variants"
  lint      Identifies potential errors in your code.
  serve     Runs the polyserve development server
  test      Runs web-component-tester

Global Options

  --env type                      The environment to use to specialize certain commands, like build
  --entrypoint                    The main HTML file that will be requested for all routes.
  --shell string                  The app shell HTML import
  --fragment string[]             HTML imports that are loaded on-demand.
  --root string                   The root directory of your project. Defaults to the current working
                                  directory.
  --sources string[]              Glob(s) that match your project source files. Defaults to `src/**/*`.
  --extra-dependencies string[]   Glob(s) that match any additional dependencies not caught by the
                                  analyzer to include with your build.
  -v, --verbose                   turn on debugging output
  -h, --help                      print out helpful usage information
  -q, --quiet                     silence output

Run `polymer help <command>` for help with a specific command.
```

### Generating new custom elements

We can create many types of custom elements using Polymer-cli's `init` command. Run the following commands to generate a new vanilla element.

```language-bash
mkdir wcp-masthead #1
cd wcp-masthead #2
polymer init #3
```

These commands will perform the following actions:

1. Create a directory for the `wcp-masthead` element
2. Change to the directory we created in step 1
3. Initialize an element using Polymer-cli

Polymer-cli will present you a menu of options; you can navigate the menu using up and down arrow keys. The options are shown below.

```language-bash
? Which starter template would you like to use? (Use arrow keys)
❯ polymer-1-element - A simple Polymer 1.0 element template
  polymer-2-element - A simple Polymer 2.0 element template
  polymer-1-application - A simple Polymer 1.0 application template
  polymer-2-application - A simple Polymer 2.0 application
  polymer-1-starter-kit - A Polymer 1.x starter application template, with navigation and "PRPL pattern" loading
  polymer-2-starter-kit - A Polymer 2.x starter application template, with navigation and "PRPL pattern" loading
  shop - The "Shop" Progressive Web App demo
  polymer-starter-kit-custom-build - A starting point for Polymer 1.0 custom build apps
  vanilla-web-component - A starting point for building a vanilla web component element
```

For this example we'll use the last option: `vanilla-web-component`.

Running the init command will ask you a few questions, create the component and then run Bower to install the element's dependencies. The result will be a tree like the one below.

```language-bash
├── README.md
├── bower.json
├── bower_components
│   ├── accessibility-developer-tools
│   ├── async
│   ├── chai
│   ├── font-roboto
│   ├── iron-demo-helpers
│   ├── iron-flex-layout
│   ├── iron-location
│   ├── lodash
│   ├── marked
│   ├── marked-element
│   ├── mocha
│   ├── polymer
│   ├── prism
│   ├── prism-element
│   ├── shadycss
│   ├── sinon-chai
│   ├── sinonjs
│   ├── stacky
│   ├── test-fixture
│   ├── web-component-tester
│   └── webcomponentsjs
├── demo
│   └── index.html
├── index.html
├── package.json
├── test
│   ├── index.html
│   └── wcp-masthead.html
└── wcp-masthead.html
```

This may look like a lot but it's about as much as we need to work on creating a successful element. We'll cover other areas of interest as we move through the different CLI options.

### Building and running tests for the elements

The Polymer team create Web Component Tester as a wrapper for testing libraries to work with web components. We create the element's tests in Javascript in a script attached to an HTML document (created by the cli's init task) where `suite` indicates a collection of tests and `test` indicates individual tests to run against the element.

```language-markup
<script>
  suite('wcp-masthead', function() {

    test('instantiating the element with default properties works', function() {
      var element = fixture('BasicTestFixture');
      assert.equal(element.prop1, 'wcp-masthead');
      var elementShadowRoot = element.shadowRoot;
      var elementHeader = elementShadowRoot.querySelector('h2');
      assert.equal(elementHeader.textContent, 'Hello wcp-masthead!');
    });

    test('setting a property on the element works', function() {
      var element = fixture('ChangedPropertyTestFixture');
      assert.equal(element.prop1, 'new-prop1');
      var elementShadowRoot = element.shadowRoot;
      var elementHeader = elementShadowRoot.querySelector('h2');
      assert.equal(elementHeader.textContent, 'Hello new-prop1!');
    });

  });
</script>
```
A good tutorial is [Test your elements with Web-Component-Tester (Polymer)!](https://www.utest.com/articles/test-your-elements-with-web-component-tester-polymer) and, because it wraps around existing libraries such as Mocha and Chai you can google for tutorials on those libraries.

### Bundling Applications and preparing for dployment

Once you have your elements ready for production we can use Polymer-CLI (and [Polymer Build](https://github.com/Polymer/polymer-build) under the hood) to bundle your content and prepare for delivery both as a bundled application for HTTP 1.x servers and an unbundled version for HTTP/2, both versions are ready to upload when you're done.

The build process gives you a service worker as part of the build process. You no longer have to worry about the elements that will go into the shell and what can be lazy loaded.

Polymer Build also allows you tu customize the build process and to use the tool outside the CLI and directly in Gulp. For more details see Polymer Build's [README](https://github.com/Polymer/polymer-build/blob/master/README.md) on Github.

### Serving our content during development

The last important task is to serve our components and applications. Polymer provides a development server to test elements and applications.

To use the server run the following command:

```language-bash
polymer serve
```

To view the demo, point your browser to one of the following URLs.

**Element project demo:**

```language-bash
http://localhost:8080/components/my-el/demo/
```

**Element project API reference:**

```language-bash
localhost:8080/components/my-el/
```

**App project demo:**

```language-bash
http://localhost:8080
```

## Alternatives

So far I've concentrated on Vanilla components because I don't want to tie the ideas in this article to any one framework. It is worth considering other alternatives for creating components and applications.

My favorite library for creating web components is [Polymer 2.0](https://www.polymer-project.org/2.0/). The library extends vanilla elements and provides a layer of sugaring to make it easier to work with components.

Other libraries like [X-Tags](https://x-tag.github.io/), [Bosonic](http://bosonic.github.io/), [Skate](https://skatejs.gitbooks.io/skatejs/content/), [Aurelia](http://aurelia.io/) provide abstractions and different levels of sugaring... Since most of these libraries use the same polyfills they should theoretically be interoperable and components from all these libraries (as well as vanilla components) should be able to coexist in the same page.

This is where future research should happen :-)

## Links

- [Web Components v1 - the next generation](https://developers.google.com/web/updates/2017/01/webcomponents-org)
- [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
- [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom)
- [The case for custom elements, part 1](https://medium.com/dev-channel/the-case-for-custom-elements-part-1-65d807b4b439#.k7sm324jh)
- [The case for custom elements, part 2](https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133)
- [Custom Elements That Work Anywhere](https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48)
- [Bringing componentization to the web: An overview of Web Components](https://blogs.windows.com/msedgedev/2015/07/14/bringing-componentization-to-the-web-an-overview-of-web-components/)
- [Microsoft Edge and Web Components](https://blogs.windows.com/msedgedev/2015/07/15/microsoft-edge-and-web-components/)
- [Extensible web components](https://adactio.com/journal/11052)
- [Web Components and progressive enhancement](http://adamonishi.com/2016/08/web-components-and-progressive-enhancement/)
- [Polymer CLI package](https://www.npmjs.com/package/polymer-cli)
- [Polymer CLI Docs](https://www.polymer-project.org/2.0/docs/tools/polymer-cli)
- [Polymer Build](https://www.npmjs.com/package/polymer-build)
