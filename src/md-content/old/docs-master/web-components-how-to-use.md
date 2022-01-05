When I first started working with Web Components I looked at the biggest way to use them. When I create my components I own everything: the scripts, the encapsulated CSS, the responsibility of making sure that they work and work well with other components and other elements in the page. If we're careful and follow 

In learning how to use Web Components we'll look at both the big and the small picture: Creating complete custom components and creating type extension custom elements.

### Custom Components

The ability to create fully customized and reusable elements is what attracted me to Polymer and the concept of web components. The elements we create can be as simple or as complex as we need them to be.... We can also add other components to enhance the functionality of our components.

The example below (taken from the Polymer Project's home page) shows what a custom element built with Polymer 1.0 looks like.

```html
<dom-module id="contact-card">
  <link rel="import" type="css" href="contact-card.css">
  <template>
    <content></content>
    <iron-icon icon="star" hidden$="{{!starred}}"></iron-icon>
  </template>
  <script>
    Polymer({
      is: 'contact-card',
      properties: {
        starred: Boolean
      }
    });
  </script>
</dom-module>
```

And how we use the component on our document. 

```html
<contact-card starred>
  <img src="profile.jpg" alt="Eric's photo">
  <span>Eric Bidelman</span>
</contact-card>
```

It is the `<content>` tag that allows our component to take input as HTML tags. We can put additional HTML content or other custom elements, it all depends on what we need.

But we're not done... we can take a `<firebase-collection>` element to talk to a <a href='https://www.firebase.com/'>Firebase</a> instance to create a list of projects:

```html
<dom-module id="project-list">
  <link rel="import" type="css" href="project-list.css">
  <template>
    <firebase-collection data="{{data}}"
                      location="https://projects.firebaseio.com/projects">
    </firebase-collection>
    <template is="dom-repeat" projects="{{data}}">
      <project-card>
        <h2>{{project.name}}</h2>
        <div class='description'>{{project.description}}</div>
      </project-card>
    </template>
  </template>
  <script>
    Polymer({
      is: 'project-list'
    });
  </script>
</dom-module>
```

#### Writing more complex application



### Extending existing elements (Type Extension Custom Elements)

There are times when a custom element is too much. We might need a smaller chunk of functionality or we  may need to enhance an already-existing element instead of creating a whole new element. You can create a custom element that extends a native HTML element and its features. This is called a Type Extension Custom Element. To use the element, use the original tag and specify the custom tag name using the is attribute.

```html
<input is="x-component"></div>
```

To define a type extension:

* Create the base prototype object using the prototype of the extended element, instead of HTMLElement.
* Add an extends key in the second argument to document.registerElement(), specifying the tag name of the extended element.

Following is an example code when extending the input element:

```javascript
var XComponent = document.registerElement('x-component', {
  extends: 'input',
  prototype: Object.create(HTMLInputElement.prototype)
});
```

Notice that it extends: `input` and its prototype is based on HTMLInputElement instead of HTMLElement. Now you can use `<input is="x-component">` inside your document. By doing so, you can have extended APIs on top of basic input element's features and you get basic accessibility features for free as part of the native HTML element.

The `x-component` input type created in Polymer looks like this:

```javascript
<dom-module id='x-component'>
  <style>
    :host {
      border = '1px solid red';
    }
  </style>
  <template>
    <content></content>
  </template>
  <script type="text/javascript">
  Polymer({
    is: 'my-input',
    extends: 'input',
  });

  </script>
</dom-module>
```


#### Github's example

[caption id="attachment_786599" align="aligncenter" width="272"]<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/06/gh-relative-time.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/06/gh-relative-time.png" alt="Github Relative Time on display" width="272" height="124" class="size-full wp-image-786599" /></a> Github Relative Time on display[/caption]

GitHub has a many components that displays date and time as shown above. Notice they are not absolute dates/times but relative to the browser's current time. GitHub uses a Type Extension Custom Element accomplish this. The HTML code looks like this:

[caption id="attachment_786598" align="aligncenter" width="747"]<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/06/gh-time-tag.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/06/gh-time-tag.png" alt="HTML source for time type extension custom element" width="747" height="85" class="size-full wp-image-786598" /></a> HTML source for time type extension custom element[/caption]

There some things to notice:

* time tag is used as a base element
* datetime attribute indicates an absolute date/time
* `is='time-ago'` specifies a type extension
* The tag's content indicates a relative date/time
* This is done on the fly as a type extension.

Even if web components are not supported or Javascript is disabled we will still be able to see when the file was last changed. If you disable Javascript from your browser's dev tools, you will just see the date without changes. 

For more details about time-elements, check webcomponents.org's [How GitHub is using Web Components in production](http://webcomponents.org/articles/interview-with-joshua-peek/) article.

## Links and resources

* [Single Responsibility Principle](https://www.wikiwand.com/en/Single_responsibility_principle) - Wikipedia
* [Single Responsibility Principle](https://blog.8thlight.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)
* [Single Responsibility Principle: Why Does it Matter?](https://blog.8thlight.com/elizabeth-engelman/2015/01/22/single-responsibility-principle-why-does-it-matter.html)
