# Developing with WordPress

## Overview

Developing content with WordPress has become complicated over the years. While the community is moving to a React-based workflow with blocks and the full site editor, there is still a need to work with PHP in order to do thigns that are not possible to do with Gutenberg/React alone.

This course will cover several different way to build content with WordPress along with some auxiliary content that is necessary to prepare material to upload to your WordPress course.

## Personas

The course is geared to three different audiences, represented by the following personas:

Rebecca is a new developer interested in WordPress. She's created content with Laravel and Angular before.

Peter has developed with WordPress before using PHP and HTML. He's had limited experience with React

Daniel has created block themes. He wants to learn new tricks to work with as he creates new WordPress sites.

## General Objectives

By the end of this course, participatns will be able to:

* Build a tooling system using Gulp and Javascript
* Explain the differences between classic and block themes
* Describe situations when you would use classic and block themes
* Identify cases when PHP is necessary to enhance sites

## Proposed modules

I'm not 100% sure that these are modules or should each be a separate course. I'm keeping them together for now to make my life easier when writing them.

### Module 1: Tooling

Even though WordPress takes care of a lot of the tooling necessary to get auxiliary content like Javascript, CSS and image compression ready to use in a theme.

We will look at each of these three "buckets" and build a tooling workflow for them based on Gulp.js, the same technology WordPress uses.

#### Module 1 Objectives

* Create a Gulp-based build and tooling system for auxiliary content for your theme
* Explain why we're creating a new build system rather than reusing the one from WordPress

#### Module 1 Outline

* Module assumptions and requirements
* Initializing the package
* Image compression
  * Why use this instead of WordPress image library or a third-party solution like Cloudinary?
  * Note about WebP support in WordPress
  * Using Libsquoosh
* Javascript
  * Why use Babel instead of letting browsers handle scripts natively?
  * Babel and preset-env (es2017)
* CSS
  * Why use PostCSS instead of using SCSS or native CSS
  * PostCSS plus basic plugin ecosystem
* Extending the system
  * Possible extension points
  * Locating the plugins
  * Installing and configuring plugins

### Module 2: Setting up a local development server

The best way to work with WordPress is to install a local development server.

While the module will cover [Local by Flywheel](https://localwp.com/), there are other options that you're more than welcome to use if you're more comfortable or have already implemented them.

* [XAMPP](https://www.apachefriends.org/)
* [MAMP](https://www.mamp.info/)
* [WampServer](https://www.wampserver.com/en/)
* [DevKinsta](https://kinsta.com/devkinsta/)

I chose Local because it comes with Batteries ready. Every new site you create comes with the latest non-beta version of WordPress and the Twenty-Twentytwo theme ready to go.

#### Module 2 Objectives

By the end of this module, participants will be able to:

#### Module 2 Outline

* Introduction and module Overview
  * Available options
    * Web servers that require configuration
      * [XAMPP](https://www.apachefriends.org/)
      * [MAMP](https://www.mamp.info/)
      * [WampServer](https://www.wampserver.com/en/)
    * One step solutions
      * [Local](https://localwp.com)
      * [DevKinsta](https://kinsta.com/devkinsta/)
  * Why I chose Local?
* Getting Started
  * Downloading Local
  * Installing Local
  * Creating sites with local
* Going under the hood
  * Site shell and WordPress CLI

### Module 3: Classic Themes

Even though the entire WordPress world is working on Gutenberg, full site editing, and block themes, there are situations where PHP and classic themes are still necessary.

#### Module 3 Objectives

#### Module 3 Outline

### Module 4: Creating blocks

Before we jump into creating block themes and full site editing, let's take a look at what it takes to create blocks, the basic unit of block themes and full site editing.

#### Module 4 Objectives

* Distinguish the different types of blocks you can create
* Build static and dynamic blocks manually and using the [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) package
* Evaluate different ways to pack theme-related content for distribution
* Use different packaging strategies to distribute your code
* Submit your block plugin to the WordPress plugin directory

<https://www.twitch.tv/videos/1175560252>

### Module 5: Block Themes

Block themes leverage Gutenberg to allow developers to create blocks with little or no code.

#### Module 5 Objectives

#### Module 5 Outline

### Module 6: Full site editing

#### Module 6 Objectives

#### Module 6 Outline

### Module 7: Headless WordPress

#### Module 7 Objectives

#### Module 7 Outline
