# Part 1: the beginning 

The very first part of our beginner's material gives you some important background on how everything works, runs through basic concepts, and sets you up to get started 

* Course Introduction
  * Who is this course for?
  * What will it and won't it teach?
* What is the web?
  * Links to external resources along with our brief explanation
* What are web standards?
  * Standard Organizations
    * WHATWG / W3C
    * IETF for websockets
    * ECMA/ISO for JavaScript/EcmaScript
* What is accessibility and why it's important?
* The Web Components: JavaScript, HTML and CSS
  * HTML is the language used to write the content and structure of web content
  * CSS is used to style the content and separate the presentation from the content itself
  * JavaScript provides one way to add scripted content and interactivity
* Tools and their uses:
  * Web Browser
  * Code editor
  * FTP program
  * Web hosting
* How does the web work, in simple terms, and how do your tools slot into that?


Part 2: A crash course in web site code 

This part provides a very quick "hands dirty" session on HTML, CSS and JavaScript. We're not giving all the information - we are just trying to get the reader comfortable and give him/her a sense of achievement to begin with, before they get bored by all the details ;-) 

* Explain what HTML, CSS, and JavaScript in more detail
  * Provide examples that people can modify and that link the three together
* Show what a simple site structure might look like
  * Provide examples that can be copied as starting points
* Go through simple HTML anatomy
  * Provide a skeleton that shows what an HTML page looks like, explain its purpose.
  * Use colors to indicate what a complete page structure looks like
* Dissect the page created above to show other details
  * headings and paragraphs
  * bullet points
  * an image maybe
  * Accessibility attributes for images are important to include from the get-go
* Basic HTML gotchas
  * mistakes in using reserved characters
    * get into the habit of using &amp; instead of plain &
  * quote problems
    * start with " and end with '
  * incorrect paths
  * bad nesting
    * this is bad <p><b>bold paragraph</p></b>
  * missing attributes
* Simple CSS anatomy
  * selectors
    * simple
    * complex
  * How they are applied to HTML (and other markup?)
* How to apply CSS to HTML - 3 ways
* CSS gotchas
  * bad pathing
  * missing semi colons
  * missing attributes
  * incorrect adding of classes to elements 
    * I've seen people try to use `<class="heading">content</class>`
  * Using CSS instead of HTML to build structure
* Simple javascript anatomy and explain how it works
  * Provide simple JS examples to use
* JS gotchas
  * It's more complex than HTML or CSS but it has more power.
* Take the user through the steps towards getting web space
* Provide a list of free services for the user to choose from or upload to their own server.
* Use a free service, such as http://www.biz.nf/
  * Upload their simple site
* Show them how they can now view their files on another computer.


Part 3: Planning an example project 

Next we will introduce an example project for you to work on, to get used to web development with open web standards. Let's build a recipe site! 

* High level overview of What do we want the project to do
* Project scope - What low level items does the site need?
* Information architecture / Organization
  * how should we group these items
    * Were should they go?
      * Creating folders for specific content (CSS, JS, Images, )
* Site Look and feel
* Common look for the site's content
* Design
  * Design in Photoshop
  * Design in the browser
  * When would you use one or the other, what skills are required
* Setting up the basic structure of the index.html.
  * Head area
    * Tell people why we avoid tag soup
    * Elements in head
      * Doctype
      * Charset (utf-8)
      * Description (meta)
      * Title (emphasizing it is required)
      * script tag
      * Linking our stylesheet
  * Body
    * heading
    * footer
    * navigation
    * main content
* Section Specific Content
  * header
    * title
    * logo
  * Search form
  * footer
    * license notice
    * accessibility statement
      * Why is this important
    * contact details
  * navigation
    * horizontal nav and vertical navigation examples
  * main content
    * User Content
    * Typography (along with CSS)
    * sidebar
    * image gallery from the recipe


Part 5: Styling our content with CSS 

Now we have a solid base of content to build upon, let's learn about Cascading Style Sheets (CSS), and use it to apply some style and layout to our HTML. 

* review basic CSS anatomy
  * Selectors
    * type
  * look at box model in detail
  * setting global styles -
    * fonts
    * resets (normalize.css)
    * sizing headers and other components
  * basic layout (for each section here explain why this is necessary/important )
    * float the main and sidebar
    * show how floating works
    * add in clearfix
  * Add padding and margins, show how they work
  * Style the navigation menu
  * Typography
  * CSS3 features and fallbacks
    * gradients
    * rounded corners
    * Web Fonts


Part 6: JavaScript 

At this point our site is functional, but what about things that go whoosh? Now we'll give you a brief introduction to JavaScript, and use it to apply some dynamic behavior. 

* Introduction to programming Languages
  * What do programming languages actually do?
  * Programming Concepts
    * Variables
    * Operators
    * Conditional logic
    * Loops
    * Functions
    * Events
    * Objects
  * What is JavaScript and what can we do with it?
    * What it is
    * What we can use it for
      * Event based interactivity
        * Creating a dynamic image gallery
        * click on a thumbnail and have the larger image appear
    * Loading different recipe details from a JSON file as new images are clicked on
    * AJAX


Part 7: Advanced topics (the bells and whistles) 

Now you've worked your way through the basics, let's give you some more advanced exercises to do to test your new found skills. 

* Create a sample application
  * Entering notes and preferences into a form of some kind (TODO)
    * Using File API to store the data
    * loading it back into the page via Ajax for an instant update?
    * localstorage for backend?
* Some CSS animation
* RWD/media queries