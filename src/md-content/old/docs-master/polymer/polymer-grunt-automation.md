## Automating your Polymer workflow with Grunt and friends

If you've done work with [Grunt](http://gruntjs.com/) and its plugin ecosystem this Gruntfile will look familiar. I will only point out the differences and what may not be common knowledge (it wasn't for me when I started working on this stylesheet)

```javascript
(function () {
  'use strict';
  module.exports = function (grunt) {
    // require it at the top and pass in the grunt instance
    // it will measure how long things take for performance
    //testing
    require('time-grunt')(grunt);

    // load-grunt will read the package file and automatically
    // load all our packages configured there. 
    // Yay for laziness
    require('load-grunt-tasks')(grunt);
```

I discovered two nice time savers when researching creating my own Grunt tasks for building the project. 

The first one is [time-grunt](https://github.com/sindresorhus/time-grunt) that will tell you how long did your tasks take. 

The second one is [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) that will require all the pacakges that you've set up in your `package.json` and avoiding issues with forgetting to load a package.

```javascript
  grunt.initConfig({

    // Hint the grunt file and all files under js/ 
    // and one directory below
    jshint: {
      files: ['Gruntfile.js', 'js/{,*/}*.js'],
      options: {
        // options here to override JSHint defaults
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      main: {
        files: [{
          expand: true,
          cwd: 'css',
          src: '*.css',
          dest: 'css',
          ext: '.prefixed.css',
          extDot: 'last'
        }]
      }
    },

    watch: {
      options: {
        nospawn: true,
      },
      // Watch all javascript files and hint them
      js: {
        files: ['js/{,*/}*.js'],
        tasks: ['jshint']
      },
      // watch all css files and auto prefix if needed
      styles: {
        files: [ 'css/{,*/}*.css' ],
        tasks: ['autoprefixer:main']
      },
      // watch the html files, vulcanize and publish
      html: {
        files: ['*.html'],
        tasks: ['vulcanize:elements']
      }
    },
```

the basic tasks: jshint, autoprefixer and watch are standard to most projects. 

Jshint will lint your Javascript files (including the Grunt buildfile itself) on any changes to a Javascript file

Autoprefixer will build a prefixed copy of any CSS file under the css directory. This **does not** include CSS under templates in custom elements. 

Watch will automate actions based on changes to the indicated files. 

* If any Javascript file under the js directory change, they will all be linted again.
* If any CSS file under the css directory change, Autoprefix will run to prefix any needed rule. 
* If HTML files change the elements.html file will be vulcanized (more of what vulcanize do later).

```javascript
  // Vulcanize elements.html to reduce the number of 
  // network requests
  vulcanize: {
    elements: {
      options: {
        strip: true
      },
      files: {
        'element-vulcanized.html': 'elements.html'
      }
    }
  },

Vulcanize is Polymer concatenation and minimization tool for web components. I've chosen to vulcanize all the required elements in `elements.html` to reduce the number of requests we make of the server and the size of all the requested elements.

  'gh-pages': {
    options: {
      add: true,
      message: 'Content committed from Grunt gh-pages'
    },
    'all': {
      // These files will get pushed to the `
      // gh-pages` branch (the default).
      src: ['**/*']
    }
  }
  }); // closes initConfig
  }; // closes module.exports
}()); // closes the use strict function
```

the gh-pages task will push the specified files to the gh-pages branch of the repository. It assumes that your code is already in a Git repository. It will ask for your github username and password.