---
title: Grunt-based Content Generator
date: 2014-10-11
category: Technology
status: draft
---

<h2 id="top">Introduction</h2>

One of the things I see a lot when I read the [#eprdctn](https://twitter.com/hashtag/eprdctn?f=realtime) twitter hashtag (a great resource for anyone interested in working in digital publishing) is how hard it is to build a coherent set of tools to  make the work of creating a valid set of HTML, CSS and Javascript resources without having to push everything to InDesign.  This article proposes a solution to this issue and a set of tools Javascript to attempt to resolve the issue.

The project also addresses best practices in front end development performance and usability. Most people who work in front end development will tell you that it is best to concatenate and minimize your Javascript and CSS because it reduces the weight (how many bytes) your resources carry in terms of bandwidth and in terms of how many connections you have to make over the wire to fetch resources.

For ebooks and other closed publishing systems the bandwidth is not as important but concatenating and minimizing are still good practices to get into as these publishing platforms have a size constraint. All local resources must be under 2GB in size and, by making your Javascript and CSS as small as possible you save the space for other resources. It may not be much but the more CSS and Javascript you use in your book the more space these techniques will save you.

I chose to implement thr project in Node.js because it already has access to the tools and features I need and its package management and delivery tools are easy to use. If you have Node installed (see below for how to check if Node is intalled or not) you most likely already know how to install the required packages.

One final warning. This is a command line tool and, as such, it requires you to be familiar with the command line tools for your operating system (Terminal/XTerm for OS X and Linux and PowerShell or Command in Windows). This project was created in a Mac and tested on Both Macintosh and Linux. If you have questions shoot me a line and I'll try to help but can't guarantee anything.

## Installing and using the generator

+ [Make sure that Node and NPM are installed](#node)
+ [Install Yeoman globally](#yeoman)
+ [Add Grunt and Bower if needed](#grunt)
+ [Installing the generator and the node packages](#generator)
+ [Using the generator](#using)
+ [Explanation of the tasks and tools](#tools)
    * [CSS toolchain](css)
    * [Javascript](#js)
    * [Template based cotnent generation](#templates)
+ [Optional tools and tool chains](#options)
    * [Using SASS instead of CSS](#sass)
    * [Using Coffeescript to generate Javascript](#coffee)
    * [Automatic dependency management with Bower](#bower)
    * [Automatically watching files for changes](#watch)
+ [Future ideas and directions](#future)
    * [Assemble middleware](#middleware)
    * [JSDoc](#jsdoc)
    * [Creation of XML files](#xml)
    * [Modernizr](#modernizr)

---

<h3 id="node">Make sure that Node and NPM are installed</h3>

If you've used any front end development tool recently it is likely you already have Node.js installed on your system. To test type <code>node</code> on your shell, the result should loook somewhat like the following:

```bash
$ node
>
```

If you get something like:

```bash
$ node
-bash: node: command not found
```

You need to install node as a package from [http://nodejs.org/](http://nodejs.org/).

<h3 id="yeoman">Install Yeoman Globally</h3>

The first step is to install the [Yeoman](http://yeoman.io/) tool. It provides scaffolding for different kinds of web projects. With it you can get scaffolds for Angular, Backbone, Ember and a few hundred other projects, both created by the [Yeoman team](http://yeoman.io/generators/official.html) and the [Yeoman community](http://yeoman.io/generators/community.html).

What made Yeoman attractive for this project is the fact that you package the generator once and then download it as many times as you want. Think of generators as a non Ruby version of a Ruby on Rails project.

As with most Node packages you'll get the best bennefit if you install the package globally using the following command:

```bash
$ npm install -g yeoman
```

This will also install Yeoman dependencies (Grunt and Bower) if theyhave not beein installed before. See below if you are using an older version of NPM and Node

<p><a href="#top">Top</a></p>

<h3 id="grunt">Add Grunt and Bower if needed</h3>

If you've installed a newer version of Node and NPM the Yeoman installation will have taken care of these additional tools for you. However, if you're running and older version of Node you may have to install the two packages individually.

To install Bower and grunt use the following commands.

```bash
$ npm install -g grunt
$ npm install -g grunt-cli
$ npm install -g bower
```

<p><a href="#top">Top</a></p>

<h3 id="generator">Installing the generator and creating a working copy</h3>

There are two ways to get the generator installed. One is using NPM (Node Package Manager) and the other one is to install directly from Github. Both install the same code, it's just a matter of convenience.

To install the generator using NPM type:

```bash
$ npm install -g  generator-webpublish
```

What this command does is install the specified package (our generator in this case) in a central location where all users in the system can access it.

The second way is to install it directly from the Github Repository. This may have some advantages when working with code in development but it is not recomended.  The command to install from Github is:


```bash
$ npm install -g  https://github.com/caraya/generator-webpublish/tarball/master/
```

<p><a href="#top">Top</a></p>

<h3 id="using">Using the generator</h3>

The generator is a command line tool that uses Grunt and grunt-cli, thus it needs to work from a shell (Terminal in Mac and Linux, Command shell in Windows). Currently available tasks are:

<pre><code>        uglify  Minify files with UglifyJS. *
        jshint  Validate files with JSHint. *
         watch  Run predefined tasks whenever watched files change.
        concat  Concatenate files. *
        coffee  Compile CoffeeScript files into JavaScript *
          sass  Compile Sass to CSS *
       csslint  Lint CSS files with csslint *
          copy  Copy files. *
         bower  Install Bower packages. *
         clean  Clean files and folders. *
  autoprefixer  Prefix CSS files. *
      assemble  Compile template files with specified engines *
      cleanAll  Alias for "clean:html", "clean:js", "clean:css" tasks.
        jslint  Alias for "jshint" task.

Tasks run in the order specified. Arguments may be passed to tasks that accept
them by using colons, like "lint:files". Tasks marked with * are "multi tasks"
and will iterate over all sub-targets if no argument is specified.

The list of available tasks may change based on tasks directories or grunt
plugins specified in the Gruntfile or via command-line options.

For more information, see http://gruntjs.com/
</code></pre>

<p><a href="#top">Top</a></p>

<h3 id="tools">Explanation of the tasks and tools</h3>

The structure of our generator is outlined below:

<pre><code>app
├── css
└── js
bower.json
node_modules
package.json
source
├── coffee
├── css
├── js
├── markdown
└── sass
</code></pre>

Currently the generator works on three primary outputs:

- concatenated and minimized Javascript
- concatenated, automatically frefixed and minimized CSS
- HTML created from Markdown content and HTML templates

For Javascript the generator will accept both plain Javascript and Cofffeescript as input and will convert Coffeescript to Javascript in the process.

For CSS the generator will take plain CSS or the SCSS version of SASS and convert it to CSS as part of the process

The goals of the project are to:

+ Reduce the number of requests made for each page loaded, even in a local environment they can slow down page load
+ Minimize the size of the files we use on our content. ePub is limited in size to to GB; if we use video, audio or many images this size can become an issue
+ Automate the CSS and Javascript tooling process
+ Allow the use SASS and Coffeescript as alternatives to CSS and Javascript

Future ideas for the project include:

+ Generate the files needed to package an ePub book as part of the build process

See future directions for additional areas where the project may be directed.

<p><a href="#top">Top</a></p>

<h4 id="css">CSS toolchain</h4>

The CSS toolchain performs the following steps:

+ Concatenate all the source CSS files and the associated library CSS files if any
+ Automatically adds prefixes where needed using the [Grunt autoprefixer plugin](https://github.com/nDmitry/grunt-autoprefixer)
+ Minimizes the resulting CSS file and copies them to our production directory
+ When needed, checks the HTML files on our production sites and eliminates classes that are not present in our HTML content
+ Rewrites the CSS tags to point to out streamlined css stylesheet

It is meant to enforce good practices. Concatenation and minimization help reduce the number of requets  you make over the network and it makes the resulting files easier to manage; your final result is a single file that contains all your CSS. When working with animation tools like Adobe Edge Animate, CSS animations and transformations or larger libraries like Pure, Foundation or Bootstrap the number of files and rules can increase very quickly, even for small projects.

One of the banes of developing CSS stylesheets are prefixes. In order to implement and test features before they are ratified by the W3C in a recomendation browser vendors implemented them behind prefixes (-ms, -moz, -webkit or -o) so they wouldn't work with normal CSS but they would still be available to those developers interested in using them.

CSS prefixer uses [caniuse.com](http://caniuse.com/) API to decide what elements need prefix for which browser. It automates creating content like the following example where -webkit (Opera, Safari and Chrome) and -ms (Microsoft) all use a different name for the same attribute.

```css
.box_scale {
  -webkit-transform: scale(0.8);  /* Chrome, Opera 15+, Safari 3.1+ */
      -ms-transform: scale(0.8);  /* IE 9 */
          transform: scale(0.8);  /* Firefox 16+, IE 10+, Opera */
}
```

Concatenation using [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)) and minimization using [Uglify](https://github.com/gruntjs/grunt-contrib-uglify) also allow for modularity. Now you can work on individual sections of  your CSS in individual files and build one complete CSS implementation only from those parts that are really necessary for your project. For a more detailed example of how this works, look at the way works with partials, used extensively in my [SASS Project](https://github.com/caraya/sass-repo).

For longer projects, [UNCSS](https://github.com/addyosmani/grunt-uncss) removes classes that exists in your CSS but are not used in the HTML you are deploying. Custom hand crafted projects shouldn't need this; the issue starts being a problem when you use large libraries like Pure, Foundation or Bootstrap; the sheer size of the libraries causes bloat as it is impossible for you to use all the classes or to know which classes to remove.

To make sure that we point our browser to the correct version of our CSS we use [Processhtml](https://github.com/dciccale/grunt-processhtml), a rewrite library to rewrite the CSS (and optionally your Javascript) links to point to your production ready code.

To make a note of how much space we saved in our concatenate/minimize/uglify process we Finally use Grunt\'s [compar size plugin](https://www.npmjs.org/package/grunt-compare-size) to give us an idea of how much space we have saved in the process of contactenating and minimizing our CSS. We\'ve also enabled the [time-grunt plugin](https://github.com/sindresorhus/time-grunt) to time how long different tasks take to complete.

<p><a href="#top">Top</a></p>


<h4 id="js">Javascript</h4>

Javscript can grow really big before we notice. The tasks for Javascript seek to reduce all our Javascript files to one compressed file that we can link from our content.

JSHint is a linting and code quality tool that will flag common mistakes and enforce a consistent style for all your Javascript files.  I got tired of runtime errors that are easily fixable if you pay attention (semi colons get me more often than I'd like to admit) and sooner rather than later (particularly if  you reuse code from one project on another project's files) the code tends to get messy with different indentation

As with CSS we concatenate all the files together using the same library that we use to put all the CSS files together and for the same reason. It's a best practice to do so and it reduces the number of files we have to carry on our project, gives more space to heavier files (audio, video and images) and we avoid potential performance bottlenecks.

Uglify goes further than just concatenation. It removes whitespaces and it makes the file smaller and more compact. It also helps provide a minimal copy protection by making harder (but not impossible) to copy and paste your code on other pges and make it work right off the bat.

To make sure that we point our browser to the correct version of our CSS we use [Processhtml](https://github.com/dciccale/grunt-processhtml), a rewrite library to rewrite the CSS (and optionally your Javascript) links to point to your production ready code.

Finally we use Grunt's [compare size plugin](https://www.npmjs.org/package/grunt-compare-size) to give us an idea of how much space we have saved in the process of contactenating and minimizing our CSS.

<p><a href="#top">Top</a></p>


<h4 id="templates">Template based content generation</h4>

Since I started writing my text in Markdown I've been looking for way to generate my HTML directly from  my Markdown.  Once I started working with Grunt and Yeoman based workflows, the idea became easier to work around. Use a templating engine that takes Markdown as an input and uses it to populate templates created in HTML using Handlebars and HTML as the templating language.

This method has a few advantages over writing HTML by hand:

+ Content is  already created using Markdown, no need to reinvent the wheel
+ In the future it will allow you to repurpose content from blogs and other sources
+ Permits separation between content and layout, allowing us to programatically add functionality without having to modify the content
+ Different people can work on CSS, HTML layouts and Markdown content
+ If you can't do something in Markdown, you can use HTML and it will be passed straight to the template. Best of both worlds.

As I was reviewing the options for a Markdown-based template system, [Assemble](assemble.io/) came up multiple times. I dismissed it becausse of my incorrect assumption that it would force me to use handlebars for my content. It was only when I read  Ben Parker's blog entry on [creating a static site with Grunt and Assembly](http://blog.parkji.co.uk/2013/07/06/building-a-static-site-using-grunt-and-assemble.html) that I realized this was not the case.

At its most basic the default template looks something like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Static Site</title>
  </head>
  <body>
    <header>Static Site</header>
    <!--
      We use the {{#markdown}} tag to indicate that
      the content of the body is written using Markdown
    -->
    {{#markdown }}
      {{> body  }}
    {{/markdown }}
    <footer>Footer text here</footer>
  </body>
</html>
```

And the corresponding template could be as simple as

```markdown
---
title: This is my awesome page
---
<section>
<!--
   The tag below indicates a level 2 heading using the title attribute in the front matter
-->
## {{ title }}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut turpis sit amet magna gravida commodo. Nam lobortis libero ante, dignissim malesuada nulla gravida a. Phasellus in diam fringilla, tristique neque ac, pretium lorem. Donec non elementum dui. Morbi posuere, urna non hendrerit pharetra, nisl magna sollicitudin enim, eu feugiat turpis tellus quis sem. In sollicitudin fermentum odio, eu mollis tortor malesuada vitae.
</section>
```

Just like what we did with the title, we can add variables to our front matter and use them in the page they are inserted in. To include author and location where the content was written in the page we can do something like the code below.

```markdown
---
title: This is my awesome page
author: Carlos Araya
location: California
---
<section>
<!--
   The tag below indicates a level 2 heading using the title attribute in the front matter
-->
## {{ title }}
### {{ author }}

Written in: {{ location }}

{{ < body}}
</section>
```

We can have as many variables declared in the front matter. One final interesting thing to look at is how to change the layout we apply to a page. We defined the default layout in our Gruntfile's assemble task, this will be the default for all pages. However we can also override the default for specific pages; If we have a cover page layout we can call it like this:

```markdown
---
layout:coverpage
title: This is my awesome page
author: Carlos Araya
location: California
---
<section>
<!--
   The tag below indicates a level 2 heading using the title attribute in the front matter
-->
## {{ title }}
### {{ author }}

Written in: {{ location }}

<!-- Rest of the text goes here -->
</section>
```

We can also create partials, small sections of code that can be reused multiple times in multiple files, for our HTML code. This comes in particularly handy when working with sections such as headers and footers that are repeated on every page of our site.

One of the most intriguing pieces of news regarding markdown is 
<p><a href="#top">Top</a></p>


<h3 id="options">Optional tools and tool chains</h3>

The following tools are built in to the project but are not deemed essential. SASS and Coffeescript are offered as convenience for people who are interested in. Watching files for changes and automatically processing the files is the lazy way to work with our content.

<p><a href="#top">Top</a></p>

<h4 id="sass">Using SASS instead of CSS</h4>

You can change the build tasks to use compiled SASS instead of plain CSS, it's a mater of taste as it introduces an additional step of compiling the SASS into CSS with or without additional libraries. That said, we can write a lot more concise and expressive CSS with SASS than we can with CSS alone.

SASS features and functionality make it easier to  CSS by providing a more consistent way to create the content

You can find more information about SASS from my blog ([here](http://publishing-project.rivendellweb.net/sass-scss-css-and-modular-design/) and [here](http://publishing-project.rivendellweb.net/using-sass-smartly/))  and on their [website](http://sass-lang.com/)

<p><a href="#top">Top</a></p>

<h4 id="coffee">Using Coffeescript to generate Javascript</h4>

Coffeescript is a scripting language that compiles to Javascript. Its syntax and features should be familiar to programmers coming from Ruby or Python to Javascript.

Like SASS, Coffeescript adds an aditional compilations step to the build process but if you like the language then you have the option to use it.

<p><a href="#top">Top</a></p>

<h4 id="watch">Automatically watching files for changes</h4>

Sometimes I get bored of having to save the file I'm working on (CSS or Javascript) and then have to move the files to the server, reload the browser, some times multiple times, before the changes are reflected in the affected HTML files. 

Grunt provides two sets of tools to address this problem. 

The first tool is [connect](https://github.com/gruntjs/grunt-contrib-connect), a plugin that will start a basic static web server in the specified port, thus allowing you to inspect the results of your work locally, without having to move your files to your staging server (or having to generate a complete ebook). 

The second tool is [grunt-watch](https://github.com/gruntjs/grunt-contrib-watch) which allows you to perform a task or set of tasks when a file changes in your working directory. The generatoruses watch for CSS/SASS and Javascript/Coffeescript so that they will be compiled (if necessary) concatenated and minimized when they are saved. 

Grunt-watch now has support for [livereload](http://livereload.com/) built in. Livereload allows you to view changes to your project without reloading or making changes to your HTML file. 


<p><a href="#top">Top</a></p>

<h4 id="bower">Automatic dependency management with Bower</h4>

Dependency management is a pain. Using Bootstrap-sass as an example, you not only have to keep track of the version of Bootstrap you're using but also that of all the libraries that it depends on. The more libraries you use in a project the harder it gets and the more complicated the management of all these libraries becomes.

[Bower](http://bower.io) automates library management. Using a json file it downloads specific versions of libraries and stores them in a directoy you specify.

This makes easier to download a basic set of libraries. 

Using the default <code>bower.json</code> configuration file you get the following libraries (and their dependencies) when you run the <code>grunt bower</code> command:

* jquery
* d3
* polymer 0.2.2
* bootstrap sass
* bourbon
* neat 1.4.0
* compass-vanilla

The configuration file can be further modified for your individual project.

<p><a href="#top">Top</a></p>

<h3 id="future">Future Ideas and Directions</h3>

Below are some ideas I'm thinking about for possible inclusion in the generator. I make no promises but it should be interesting to explore these areas.

<p><a href="#top">Top</a></p>

<h4 id="middleware">Assemble middleware for additional functionality</h4>

[Assemble](http://assemble.io) provides a set of middleware or helper tools to make your life easier. There are over 100 handlebars helpers included in Assemble by default; see [handlebars helpers documentation](http://assemble.io/helpers/).

We need to document what they are and provide examples of how they can be used. 

<p><a href="#top">Top</a></p>

<h4 id="jsdoc">JSDoc</h4>

One of the most frustrating things is having to read other people's code and not understanding what they meant to do or what does each function mean and how to use it.

[JSDoc](http://usejsdoc.org/index.html) is a way to document your Javascript code in such a way that you are able to create a website documenting the code. This will alllow you and others to understand your the function and structure of your code. It also enforces the discipline of documenting your code as you write it.

An example of JSDoc commented code is shown below:

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

JSDoc has a [Grunt package](https://www.npmjs.org/package/grunt-jsdoc) available.


<p><a href="#top">Top</a></p>


<h4 id='xml'>Creation of XML files</h4>

ePub uses multiple XML files to tell readers where the content is. Currently the <code>content.opf</code> is (poorly) generated via a [Python script](https://github.com/caraya/ebook-experiments/blob/master/python-xml-gen/xml-gen.py). Either continue to improve the script as is or research alternatives using plain Javascript or Node. Some things worth looking at:

+ [https://github.com/travis-hilterbrand/grunt-file-creator/tree/master/test](https://github.com/travis-hilterbrand/grunt-file-creator/tree/master/test)
+ [http://gruntjs.com/api/grunt.file](http://gruntjs.com/api/grunt.file)

<p><a href="#top">Top</a></p>

<h4 id='examples'>Examples and Templates</h4>

Part of the idea behind this generator is to use it as testbed for new technologies and new ways to generate content. The Markdown templates can use different layouts as described in the YAML front matter for each respective page.

How far can we push this technology. How much of the advantage of publishing static files can we use when publishing the same content to multiple channels?

<p><a href="#top">Top</a></p>

<h4 id='modernizr'>Modernizr</h4>

[Grunt Modernizr Plugin](https://github.com/Modernizr/grunt-modernizr) would allow us to subset a Modernizr build (a development build included in the project and containing all the tests available for Modernizr) based on the Modernizr tests we actually use in our project.

<p><a href="#top">Top</a></p>