The shell of the application looks like this:

```html
<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 
      Conditional loder taken from 
      https://twitter.com/polymer/status/535217914857947137 
  -->
  <script>
  if ('registerElement' in document
    && 'createShadowRoot' in HTMLElement.prototype
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
      // Browser supports all web component specs natively, 
      // log it out to console just to be sure
      console.log('Browser supports webcomponents specs natively');
    } else {
      // If it returns false, one or more of the specs that
      // make up web components are not supported. 
      // Use document.write to write the script tag for 
      // webcomponents.js
      console.log('one or more of the webcomponents specs not supported')
      document.write('<script src="bower_components/webcomponentsjs/webcomponents.js"><\/script>');
    }
  </script>
  <link rel="import" href="bower_components/polymer/polymer.html">
  <!-- 
    Import core and paper elements. 
    Still need to install them with Bower 
  -->
  <link rel="import" href="elements.html">
  <!-- Import project app -->
  <link rel="import" href="project-app-fb.html">
</head>

<body unresolved fullbleed layout vertical>
  <project-app-fb></project-app-fb>
</body>
</html>
```

The page looks, mostly, like any other web page. The differences are:

* Importing the Polymer polifills using a conditional loader
* Links to import the Polymer library: <code>&lt;link rel="import" href="bower_components/polymer/polymer.html"></code>
* Import a file with additional import statements: <code>&lt;link rel="import" href="elements.html"></code>
* Import our top level element: <code>&lt;link rel="import" href="project-app-fb.html"></code>
* Polymer specific attributes in regular HTML elements: <code>unresolved fullbleed layout vertical</code>
* The base custom element <code>&lt;project-app-fb>&lt;/project-app-fb></code>

We discuss the Polymer specific details for this page below.

### Importing webcomponents.js using a conditional loader

### Importing web components

<code>&lt;link rel="import" href="bower_components/polymer/polymer.html"></code>, <code>&lt;link rel="import" href="elements.html"></code> and <code>&lt;link rel="import" href="project-app-fb.html"></code>

### Polymer specific attributes in regular HTML elements

### The base custom element

## The top level custom element

As we saw in the main page, it's all bare and it holds just a single custom element for the application. This is where the magic begins to happen.

To make it easier to understand what's going on I've broken the page down in sections and will discuss each in turn. 


### HTML Imports

Before we can play with our elements and elements other paties have made available

```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href="elements.html">
<!-- Firebase Import -->
<link rel="import" href="bower_components/firebase-element/firebase-element.html">
<!-- PROJECT RELATED IMPORTS-->
<!-- Import project menu -->
<link rel="import" href="project-menu.html">
<!-- Import the form element to interact with project data-->
<link rel="import" href="project-form.html">
<!-- Import project list with core-ajax wiring for data load -->
<link rel="import" href="project-list-fb.html">
```



```html
<polymer-element name="project-app-fb">
  <template>
    <firebase-element 
      id="base" 
      location="https://project-list.firebaseio.com/" 
      data="{{data}}">
    </firebase-element>
```

```html
  <style>
      :host {
        font-family: "RobotoDraft" sans-serif;
      }
      .card {
        margin: 15px;
      }
      core-toolbar {
        background-color: #03A9F4;
        color: white;
      }
      [main],
      [drawer] {
        background-color: #ffffff;
      }
      core-drawer-panel:not([narrow]) #navicon {
        display: none;
      }
      core-overlay {
        border: 1px solid black;
        background-color: white;
        padding: 10px;
      }
      paper-button.blue-ripple::shadow #ripple {
        color: #4285f4;
      }
      .form {
        width: 400px;
      }
    </style>
```

```html
  <core-drawer-panel id="drawerPanel">
      <core-header-panel drawer class="tall">
        <core-toolbar>
          <h3>Menu</h3>
        </core-toolbar>
        <!-- 
        Custom element holding menu and items
        Source: project-menu.html
      -->
        <project-menu on-menuItem="{{menuItem}}" id="pMenu"></project-menu>
      </core-header-panel>

      <core-header-panel main class="tall">
        <core-toolbar>
          <core-icon id="navicon" 
                     icon="menu" 
                     alt="Menu for narrow displays" 
                     on-tap="{{navIconClick}}">
          </core-icon>
          
          <h3 flex three>Portfolio Project List </h3>
          
          <core-icon id="topAddP" 
               icon="add-circle" 
               alt="Add new project" 
               on-tap="{{topAddPClick}}">
          </core-icon>
<!--
          <core-icon id="topEdit" 
               icon="editor:mode-edit" 
               alt="Edit Project" 
               on-tap="{{topEditClick}}">
          </core-icon>
-->
          <core-icon id="topSearch" 
                     icon="search" 
                     alt="Search">
          </core-icon>


        </core-toolbar>
        <!--
        Custom element holding project list, styles and scripts
        Source: project-list-fb.html
      -->
        <project-list-fb data="{{data}}" on-edit-project="{{editProject}}"></project-list-fb>
      </core-header-panel>
    </core-drawer-panel>
```

```html
    <core-overlay id="addOverlay" backdrop="true" closeSelector="core-icon">
      <core-toolbar class="form">
        <h3 flex three>Add Project</h3>
        <core-icon id="addFormClose" 
             icon="close" 
             alt="Close Form">
        </core-icon>
      </core-toolbar>
      <project-form></project-form>
      <paper-button class="blue-ripple">
        Add Project
      </paper-button>
    </core-overlay>

    <core-overlay id="editOverlay" backdrop="true" closeSelector="core-icon">
      <core-toolbar class="form">
        <h3 flex three>Edit Project</h3>
        <core-icon id="editFormClose" 
                   icon="close" 
                   alt="Close Form">
          </core-icon>
      <core-toolbar class="form">
      <project-form></project-form>
      <paper-button class="blue-ripple">
        Edit Project
      </paper-button>
    </core-overlay>
  </template>
```

```html
  <script>
    Polymer({
      ready: function () {
        // copy global values into instance properties
        this.$.pMenu.addEventListener("menuItem", function (evt) {
          if (evt.detail === "addNew") {
            console.log(evt);
            this.$.addOverlay.open();
          }
          
          if (evt.detail === "search") {
            console.log(evt);
          }
        }.bind(this));
      },
      
      navIconClick: function (evt, detail) {
        this.$.drawerPanel.togglePanel();
      },
      
      topAddPClick: function (evt, detail) {
        this.$.addOverlay.open();
      },
      
      addProject: function(evt, detail) {
        this.$.addOverlay.open();
      },
      
      editProject: function(evt, detail) {
        //this.$.editOverlay.open();
        console.log(detail);
        this.$.editOverlay.open(this.data[detail.projectId]);
      }
    });
  </script>
</polymer-element>
```
