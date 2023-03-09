# Using WordPress as a headless CMS

This course will cover basic techniques for using WordPress as a headless CMS with your favorite front end framework / library or without a library at all, just using vanilla Javascript or Typescript. We will also discuss the advantages and disadvantages of this approach.

## Rationale: Defining Headless CMS

WordPress is sometimes referred to as a ‘monolithic’ CMS. It deals both with the backend and the front end. WordPress plugins can work both in the backend performing  administrative work and the front end doing things like SEO or code optimizations. Themes will change the appearance of your site and one theme is required for WordPress to work at all.

You can take advantage of WordPress as a content management system and separate the front end from the backend, leaving you with a headless CMS. By using WordPress’ REST API, you can use the content you’ve crafted in WordPress beyond your theme.

This is where this workshop will start... we will take an example site's REST API and build a front end using Vue.js. Where appropriate we will also look at using Vanilla Javascript or Typescript and HTML template literals to create equivalent functionality.

## Proposed outline

* Introduction
* Rationale
* Requirements
  * Installed Software
    * Local WordPress installation
      * Local
      * Others
    * Postman REST client
    * WebBrowser
      * Vue DevTools or equivalent functionality
    * Text/Code Editor
      * VS Code
      * Webstorm
      * Atom
      * Brackets
  * Pre-requisite knowledge and skills
    * Understanding REST Verbs
* Getting Started
  * Preparing Node
  * Installing Vite
  * Installing related packages
    * Installing Router
    * Installing Vuex Store
* Creating the first component
