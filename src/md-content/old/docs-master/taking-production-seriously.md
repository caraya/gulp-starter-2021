#Taking production seriously

While looking at two different channels to produce CSS (manual code for e-books and automated production and tooling for front end development) I've come to the conclusion that there is no reason for developers not to create and use the same workflow, tooling and best practices for our ebook production. 

## What

I've taken a Gruntfile from my [XML workflow project](https://github.com/caraya/xml-workflow), stripped the sections that are specific to the xml worflow and kept the reminder as the basis for this article. 

The idea is that, if you have Node.js and Ruby installed you can automate all the tasks needed to create a single CSS file containing all selectors and rules actually in use, and a single Javascript file that contains all the scripts needed for the book (if any). 

There may be additional elements of a proper front-end-design that we don't cover in this article. We will skip image or HTML compression and minimization because, while they are important, we don't really need to worry as much about them  when working on ePub books. With so many different de vices and resolutions, any attempt at stadardizing 

## How


### Package.json

```javascript
{
  "name": "workflow",
  "version": "0.0.1",
  "description": "Sample XML publishing workflow",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/caraya/xml-workflow.git"
  },
  "author": "Carlos Araya",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/caraya/xml-workflow/issues"
  },
  "homepage": "https://github.com/caraya/xml-workflow",
  "devDependencies": {
    "bower": "^1.3.1",
    "grunt": "^0.4.5",
    "grunt-autoprefixer": "^2.2.0",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-coffee": "^0.12.0",
    "grunt-contrib-copy": "^0.7.0",
    "grunt-contrib-jshint": "^0.10.0",
    "grunt-contrib-sass": "^0.8.1",
    "grunt-contrib-uglify": "^0.7.0",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-gh-pages": "^0.9.1",
    "grunt-mkdir": "^0.1.2",
    "grunt-scss-lint": "^0.3.4",
    "grunt-shell": "^1.1.1",
    "grunt-ssh": "^0.12.0",
    "grunt-uncss": "^0.4.0",
    "jshint-stylish": "^1.0.0",
    "load-grunt-tasks": "^1.0.0",
    "time-grunt": "^1.0.0"
  },
  "scripts": {
    "postinstall": "bower install",
    "prestart": "npm install",
    "start": "http-server -a localhost -p 8000 -c-1"
  }
}
```


### The Gruntfile

```javascript
/*global module */
/*global require */
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

    grunt.initConfig({

      // JAVASCRIPT TASKS
      // Hint the grunt file and all files under js/
      // and one directory below
      jshint: {
        files:[ 'Gruntfile.js', 'js/{,*/}*.js'],
        options: {
          reporter: require('jshint-stylish')
          // options here to override JSHint defaults
        }
      },

      // Takes all the files under js/ and selected files under lib
      // and concatenates them together. I've chosen not to mangle
      // the compressed file
      uglify: {
        dist: {
          options: {
            mangle: false,
            sourceMap: true,
            sourceMapName: 'css/script.min.map'
          },
          files: {
            'js/script.min.js':[ 'js/**/*.js', 'lib/highlight.pack.js']
          }
        }
      },

      // SASS RELATED TASKS
      // Converts all the files under scss/ ending with .scss
      // into the equivalent css file on the css/ directory
      sass: {
        dev: {
          options: {
            style: 'expanded'
          },
          files:[ {
            expand: true,
            cwd: 'scss',
            src:[ '*.scss'],
            dest: 'css',
            ext: '.css'
          }]
        },
        production: {
          options: {
            style: 'compact'
          },
          files:[ {
            expand: true,
            cwd: 'scss',
            src:[ '*.scss'],
            dest: 'css',
            ext: '.css'
          }]
        }
      },

      // This task requires the scss-lint ruby gem to be installed on your system
      // If you choose not to install it, comment out this task and the prep-css
      // and work-lint tasks below
      //
      // I've chosen not to fail on errors or warnings.
      scsslint: {
        allFiles:[
        'scss/*.scss',
        'scss/modules/_mixins.scss',
        'scss/modules/_variables.scss',
        'scss/partials/*.scss'],
        options: {
          config: '.scss-lint.yml',
          force: true,
          colorizeOutput: true
        }
      },

      autoprefixer: {
        options: {
          browsers:[ 'last 2']
        },

        files: {
          expand: true,
          flatten: true,
          src: 'scss/*.scss',
          dest: 'css/'
        }
      },

      // CSS TASKS TO RUN AFTER CONVERSION
      // Cleans the CSS based on what's used in the specified files
      // See https://github.com/addyosmani/grunt-uncss for more
      // information
      uncss: {
        dist: {
          files: {
            'css/tidy.css':[ '*.html', '!docs.html']
          }
        }
      },
      
    Modernizr: {
      dist: {
        // [REQUIRED] Path to the build you're using for development.
        "devFile" : "lib/modernizr-dev.js",
        // Path to save out the built file.
        "outputFile" : "build/modernizr-custom.js",

        // Based on default settings on http://modernizr.com/download/
        "extra" : {
            "shiv" : true,
            "printshiv" : false,
            "load" : true,
            "mq" : false,
            "cssclasses" : true
        },
        // Based on default settings on http://modernizr.com/download/
        "extensibility" : {
            "addtest" : false,
            "prefixed" : false,
            "teststyles" : false,
            "testprops" : false,
            "testallprops" : false,
            "hasevents" : false,
            "prefixes" : false,
            "domprefixes" : false,
            "cssclassprefix": ""
        },
        // By default, source is uglified before saving
        "uglify" : true,
        // Define any tests you want to implicitly include.
        "tests" : [],
        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        "parseFiles" : true,
        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
        // except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        // "files" : {
            // "src": []
        // },
        // This handler will be passed an array of all the test names passed to the Modernizr API, 
        // and will run after the API call has returned
        // "handler": function (tests) {},
        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        "matchCommunityTests" : false,
        // Have custom Modernizr tests? Add paths to their location here.
        "customTests" : []
      }
    }
      // COFFEESCRIPT
      // If you want to use coffeescript (http://coffeescript.org/)
      // instead of vanilla JS, uncoment the block below and change
      // the cwd value to the locations of your coffee files
      coffee: {
        target1: {
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['*.coffee'],
          dest: 'build/',
          ext: '.js'
        }
      },
      
      // FILE MANAGEMENT
      // Can't seem to make the copy task create the directory
      // if it doesn't exist so we go to another task to create
      // the fn directory
      mkdir: {
        build: {
          options: {
            create:[ 'app']
          }
        }
      },

      // Copy the files from our repository into the app directory
      // have to figure out a way to have grunt copy stuff only
      // if specific directories exist and are not empty
      copy: {
        html: {
          files:[ {
            expand: true,
            src:[
            'css/**/*',
            'lib/**/*',
            'js/**/*',
            'images/**/*',
            '**/*.html'],
            dest: 'app/'
          }]
        },
        epub: {
          files:[ {
            expand: true,
            src:[
            'css/**/*',
            'lib/**/*',
            'js/**/*',
            'images/**/*',
            '**/*.html'],
            dest: 'content/OEBPS'
          }]
        }
      },

      // Clean the build directory
      clean: {
        all:[ 'app/']
      },

      // WATCH TASK
      // Watch for changes on the js and scss files and perform
      // the specified task
      watch: {
        options: {
          nospawn: true
        },
        // Watch all javascript files and hint them
        js: {
          files:[ 'Gruntfile.js', 'js/{,*/}*.js'],
          tasks:[ 'jshint']
        },
        sass: {
          files:[ 'scss/*.scss'],
          tasks:[ 'sass']
        }
      },

      // COMPILE AND EXECUTE TASKS
      // rather than using Ant, I've settled on Grunt's shell
      // task to run the compilation steps to create content files.
      // This reduces the number of dependecies for our project
      shell: {
        options: {
          failOnError: true,
          stderr: false
        },

        html: {
          command: 'java -cp "jlib/*" net.sf.saxon.Transform -xsl:xslt/book.xsl docs.xml -o:index.html'
        }
    });
    // closes initConfig
```
```javasacript
    // CUSTOM TASKS
    // Usually a combination of one or more tasks defined above
    grunt.task.registerTask(
    'lint',[
    'jshint']);

    grunt.task.registerTask(
    'lint-all',[
    'scsslint',
    'jshint']);

    // Prep CSS starting with SASS, autoprefix et. al
    grunt.task.registerTask(
    'prep-css',[
    'scsslint',
    'sass:dev',
    'autoprefixer']);

    grunt.task.registerTask(
    'prep-js',[
    'jshint',
    'uglify']);
  };
  // closes module.exports
}
());
// closes the use strict function
```
## Why

