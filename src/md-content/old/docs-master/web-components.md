To illustrate how to create web components we'll use the same element for all three methods. The end result will look like the example below:

```html
  <my-avatar service="twitter" username="caraya"></my-avatar>
```

We'll look at the differences between a script based approach used in x-tags and a declarative take using Polymer. 

### Using vanilla Javascript


```javascript
var MyAvatarPrototype = Object.create(HTMLElement.prototype);
MyAvatarPrototype.createdCallback = function() {
  var username = this.getAttribute('username');
  var service = this.getAttribute('service');
  var url = 'http://avatars.io/' + service + '/' + username;
  var img = document.createElement( 'img' );
  img.setAttribute('src', url);
  this.appendChild(img);
};
document.registerElement('my-avatar', {
  prototype: MyAvatarPrototype
});
```

### X-Tags

X-tags implementation of Web Components lacks the capability to import elements; their justification is that they are waiting to see if Javascript modules will work to avoid standards and technologies that duplicate each other.



```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    
    <link rel="stylesheet" type="text/css" href="css/brick.min.css">
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <title>Simple - Brick Demo</title>
  </head>
  <body>
    <!--- Some Brick components will go here -->
    <script type="text/javascript" src="js/brick.min.js"></script>
    <!-- <script type="text/javascript" src="js/app.js"></script> -->
    <script type='text/javascript'>
    xtag.register('my-avatar', {
    lifecycle: {
    created: function() { 
      // Assign the content of the template to a variable
      var tpl = document.getElementById('test-template').content;
      // 
      this.appendChild(tpl.cloneNode(true));
      // Assing each attribute to a variable
      var username = this.getAttribute('username');
      var service = this.getAttribute('service');
      // Create the URL with ser service and username
      var url = 'http://avatars.io/' + service + '/' + username;
      // Create the image element
      var img = document.createElement( 'img' );
      // add the url as the source attribute
      img.setAttribute('src', url);
      // add the avatar class to the element
      img.setAttribute('class', 'avatar');
      // append the image we just built to the content
      this.appendChild(img);
      // href="'http://avatars.io' + {{service}} + '/' + {{username}}"
      }
    },
    // Use twitter as the default service
    // Use name as the default username
    accessors: {
      service: {
        attribute: { service: 'twitter' }
      },
      username: {
        attribute: { username:'name' }
      }
    }
    // More configuration of our element will follow here
    });
    </script>
    <template id='test-template'>
      <div class='avatar'>
      </div>
    </template>

    <my-avatar service='twitter' username='caraya'></my-avatar>
    <my-avatar service='twitter' username='github'></my-avatar>


  </body>
  </html>
```

### Polymer

Polymer has gotten more complicated since I last played with it in the 0.5 but it's still fairly easy to implement and modify. We'll explore some of the changes from 0.5 to 1.0 and some of the syntactic sugar that makes working with web components fun.

The example below creates a component that wraps the [Marked](https://github.com/chjj/marked) Markdown library and allows you to use it as a web component without having to write Javascript every time you want to put Markdown inside your document. 

```html
```html
  <link rel="import" href="bower_components/polymer/polymer.html">
  
  <script src="bower_components/marked/lib/marked.js"></script>
  <script src="bower_components/highlightjs/highlight.pack.min.js"></script>
  <script src="bower_components/webcomponentsjs/webcomponents.js">
```

Once the components and libraries are imported and loaded, we can begin using them. We use core-ajax to load the document located at `url` as text using the response as `doc`. We then use `marked-element` with `doc` as its value. This will convert the markdown as HTML and render it in our document.

```html
<dom-module id="my-avatar">
  <style>
    .avatar {
      border: 0;
    }
  </style>
  <template>
    <img class='avatar' src='http://avatars.io/{{service}}/{{username}}'>
  </template>
</dom-module>
<script>
  'use strict';
  Polymer({
    is: 'my-avatar',
    properties: {
      service: {
        type: String,
        value: ''
      },
      value: {
        type: String,
        value: ''
      }
    }
  });
</script>
```
