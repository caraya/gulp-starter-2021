# Developing with WordPress

## Overview

Developing content with WordPress has become complicated over the years. While the community is moving to a React-based workflow with blocks and the full site editor, there is still a need to work with PHP in order to do thigns that are not possible to do with Gutenberg/React alone.

This course will cover several different way to build content with WordPress along with some auxiliary content that is necessary to prepare material to upload to your WordPress course.

## Personas

Rebecca is a new developer interested in WordPress. She's created content with Laravel and Angular.

Peter has developed with WordPress before using PHP and HTML. He's had limited experience with React

Daniel has created block themes. He wants to learn new tricks to work with as he creates new WordPress sites.

## General Objectives

By the end of this course, participatns will be able to:

* Build a tooling system using Gulp and Javascript
* Explain the differences between classic and block themes
* Describe situations when you would use classi and block themes
* Identify cases when PHP is necessary to enhance sites

## Proposed modules

I'm not 100% sure that these are modules or should each be a separate course. I'm keeping them together for now to make my life easier when writing them.

### Module 1: Tooling

Even though WordPress takes care of a lot of the tooling necessary to get auxiliary content like Javascript, CSS and image compression working.

We will look at each of these three "buckets" and build a tooling workflow for them based on Gulp.js, the same technology WordPress uses.

#### Module 1 Objectives

* Create a Gulp-based build and tooling system for auxiliary content for your theme
* Explain why we're keeping the tooling build system from the theme build system

### Module 2: Setting up a local development server

### Module 3: Classic Themes

#### Module 3 Objectives

* Explain under what circumstances you would build a classic theme

### Module 4: Creating blocks

Before we jump into creating block themes, let's take a look at what it takes to create blocks, the basic unit of block themes and full site editing.

#### Module 4 Objectives

* Distinguish the different types of blocks you can create
* Build static and dynamic blocks manually and using the @wordpress/scripts package
* Evaluate different ways to pack theme-related content for distribution
* Use different packaging stratgies to distribute your code
* Submit your block plugin to the WordPress plugin directory

<iframe src="https://player.twitch.tv/?video=1175560252&parent=github.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>

### Module 5: Block Themes
