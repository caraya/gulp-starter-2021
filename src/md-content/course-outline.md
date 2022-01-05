# Course Outline: Basics

This is a rough draft of the course outline I'm thinking about developing. It still needs a lot of work but it's a good start.

1. Introduction
   * What is the web?
   * A little history
   * Components of the web
     * HTML
     * CSS
     * Javascript
   * What the course will not cover
     * Frameworks (React, Angular, Vue)
     * Backend (Node, PHP, Python)
   * A Technical Overview
   * Course Project: CMS
     * What
     * Why
     * How
2. HTML
    * What is HTML?
      * Markup Language
      * Differences with CSS and Javascript
    * Elements by groupings
      * Structure
      * Styles
      * Multimedia
      * Linking and Embedding
    * Course Project
      * Build the Markup for specific portions of the CMS
3. CSS (Structure based on [Web.dev's Learn CSS](https://web.dev/learn/css/))
      * Box Model
      * Specificity and the cascade
      * Stacking Context and Z-index
      * Selectors
      * Inheritance
      * Color
      * Measuring units in CSS
        * Absolute units
        * Relative units
        * Viewport units
      * Layouts
        * Flexbox
        * Grid
        * Multi column
      * Spacing
      * Pseudo Elements and Pseudo Classes
      * Focus
      * Advanced Features
        * Borders and Shadows
        * Gradients
        * Animations
        * Filters
        * Blend modes
        * Logical Properties and writing modes
      * Course Project
        * Style the blog
4. Javascript
      * Javascript history
      * Unusual Inheritance model
      * About Javascript versions
        * Anual release
        * Browser supporta
          * [caniuse.com](https://caniuse.com/)
      * Values ([Eloquent Javascript](https://eloquentjavascript.net/01_values.html))
        * Numbers
          * Special numbers
        * Strings
        * Booleans
        * Logical Operators
        * Empty Values
          * Null
          * Undefined
      * Program structure
        * Functions
        * Expressions and statements
        * Variables and Constants
          * Difference between var, let and const
        * Return values
          * There is always a return value, it may not be explicit
        * Control flow and conditional execution
          * If / Then / Else
          * While / Do
          * For
          * Switch
        * Functions ([Eloquent Javascript](https://eloquentjavascript.net/03_functions.html))
        * Defining
          * Function Expressions
          * Function declarations
          * IIFE
          * Arrow functions (ES6)
            * Shortcomings
        * Classes
        * Bindings and Scopes
      * Modules ([Eloquent Javascript](https://eloquentjavascript.net/04_modules.html))
        * Special type of script
        * Import / Export
        * Different types of modules
          * CommonJS
          * ECMAScript Modules (ESM)
      * Javascript on the browser
        * The DOM
        * Looking for elements on the page
          * getElementBy{id, class, tagName}
          * querySelector and querySelectorAll
        * Using scripts on a page
          * Inline
          * Linking
        * Events
          * Event listeners
          * Event handlers
5. Asynchronous Programming (pull the content from `mdn-async-js.md`)
6. Javascript on the server
   * Node.js
     * History: What came before and why now
     * How it works
     * Advantages and Disadvantages
   * Course Project: Installing the CMS
7. Converting the blog into a PWA
   * The PWA concept
   * Elements of a PWA
     * The manifest file
     * The service worker
     * The offline page
   * Course Project: Add a Manifest
     * Where to place it
     * What it must contain
   * Course Project: Add a service worker
     * Add it to the root of the site
     * basic caching and offline functionality
8. Publishing your work
   * Course Project: Publish the site to Netlify
     * Create a Netlify account
9. Accessibility

# Advanced (and somewhat disjointed) topics

1. Build sites with Flexbox and CSS grid together without shooting yourself on the foot
    * How they are different
    * How they work together
2. CSS Variables
    * What they are
    * How to use them
3. Variable fonts and integrate them into your workflow
4. Build your tools: Work with Gulp and its ecosystem
5. Quick Overview of WordPress
    * Why it matters and why you should know about it
    * What technologies does it use
    * Can I develop a full web project with it?
