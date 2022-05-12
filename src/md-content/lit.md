# lit: another look at web components

[lit](https://lit.dev) is the spirtual successor to the [Polymer](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview) Project and its ecosystem.

Like Polymer, Lit provides abstractions over the web component APIs and provides functionality that have no WebComponent API equivalent (like the import/export capabilities we lost when HTML Imports went away).

This post will cover the basics of Lit and how to use it to build a web component.

We will also look at [Custom Elements Everywhere](https://custom-elements-everywhere.com/), a website that provides compatibility information for several different frameworks and component libraries.

## Using Lit

```js
import {html, css, LitElement} from 'lit';

export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  static properties = {
    name: {type: String},
  };

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
customElements.define('simple-greeting', SimpleGreeting);
```

```html
<!DOCTYPE html>
<head>
  <script type="module" src="./simple-greeting.js"></script>
</head>
<body>
  <simple-greeting name="World"></simple-greeting>
</body>
```

### Rendering

```js
import {LitElement, html} from 'lit';

class MyElement extends LitElement {
  render() {
    return html`<p>Hello from my template.</p>`;
  }
}
customElements.define('my-element', MyElement);
```

[Rendering](https://lit.dev/docs/components/rendering/)

### Scoped Styles

```js
import {LitElement, html, css} from 'lit';

export class MyElement extends LitElement {
  static styles = css`
    p {
      color: green;
    }
  `;
  render() {
    return html`<p>I am green!</p>`;
  }
}
customElements.define('my-element', MyElement);
```

[Styles](https://lit.dev/docs/components/styles/) and [Scoped Styles](https://lit.dev/docs/components/scoped-styles/) provide ways to style the custom element's content without fear that they will spill out of the components and where the parent styles will not override the component's

### Lifecycle Events

[Lifecycle events](https://lit.dev/docs/components/lifecycle/)

### Decorators

[Decorators](https://lit.dev/docs/components/decorators/) documentation

[Enabling decorators](https://lit.dev/docs/components/decorators/#enabling-decorators)

### Reactivity

[Reactive properties](https://lit.dev/docs/components/properties/)

### Templates

[Templates](https://lit.dev/docs/templates/overview/)

### Directives

[Built-in](https://lit.dev/docs/templates/directives/) and [custom](https://lit.dev/docs/templates/custom-directives/) directives

### Composition Strategies

[Composition strategies](https://lit.dev/docs/composition/overview/)

## What can we use Lit for?

The project suggest three main use cases for Lit:

* Shareable components
* Design Systems
* Apps and sites

I will concetrate on the Design System because that's the one most intriguing to me.

[Custom Elements Everywhere](https://custom-elements-everywhere.com/)
