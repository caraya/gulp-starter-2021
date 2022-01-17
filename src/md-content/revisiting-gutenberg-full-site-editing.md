# Revisiting Gutenberg full site editing

Now that WordPress 5.9 is close to release, we can revisit the Gutenberg full site editing experience since more of it will be baked into core rather than the Gutenberg plugin.

I'm not a fan of full site editing just like I'm not completely sold on Gutenberg as an editor even after years. But, since the market is moving in this direction, I believe that developers should be aware of Gutenberg and the FSE to provide guidance on the optimal approach to the client's project.

I've been reading and researching the latest improvements to the FSE experience and I'm not certain if the current use cases have been thought through in Gutenberg.

# Understanding the Full Site Editing experience

I've set up a brand new WordPress site to work with Gutenberg. I've documented previous work with Gutenberg in the blog posts below:

* [Gutenberg full-site editing and Block-Based Themes](https://publishing-project.rivendellweb.net/gutenberg-full-site-editing-and-block-based-themes/)
* [A New Way to Create Block Plugins](https://publishing-project.rivendellweb.net/a-new-way-to-create-block-plugins/)
* [Gutenberg: A step forward or two steps back?](https://publishing-project.rivendellweb.net/gutenberg-a-step-forward-or-two-steps-back/)
* [Gutenberg: How do we work with older content?](https://publishing-project.rivendellweb.net/gutenberg-how-do-we-work-with-older-content/)
* [Gutenberg: Additional Thoughts and Conclusions](https://publishing-project.rivendellweb.net/gutenberg-random-thoughts-and-conclusions/)
* Building Gutenberg blocks
  * [Part 1](https://publishing-project.rivendellweb.net/building-gutenberg-blocks-part-1/)
  * [Part 2](https://publishing-project.rivendellweb.net/building-gutenberg-blocks-part-2/)
  * [Part 3](https://publishing-project.rivendellweb.net/building-gutenberg-blocks-part-3/)
  * [Part 4](https://publishing-project.rivendellweb.net/building-gutenberg-blocks-part-4/)
* Gutenberg as a design system
  * [Part 1](https://publishing-project.rivendellweb.net/gutenberg-as-a-design-system-part-1/)
  * [Part 2](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-2/)
  * [Part 3](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-3/)

Linking to the above post means I don't have to repeat myself in writing the content again. It also establishes a baseline for the content in this post.

We assume that you can complete the following tasks:

* Build React-based Gutenberg blocks
* Pack Gutenberg blocks into a plugin
* Create style variations for a block
* Style blocks with CSS
* Create a theme.json global configuration file

There are still some questions to ask. Having the answers would make moving to a Gutenberg-based theme easier:

* How can you load prism scripts and styles into a theme.json file?
* How do you include third party fonts and scripts into a gutenberg theme? is equeueing the font enoguh?

# Creating blocks versus the current system: React versus PHP

React blocks are the core of Gutenberg, both the ones that are bundled with WordPress Core, those that are built by third party groups like StudioPress, and those that you build yourself as bespoke blocks that address your specific needs.

That said,Gutenberg doesn't fully eliminate the need for PHP. There are still places where PHP is necessary.

**Block Filters**
: WordPress provides a series of [filters](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/) that can be used to modify the block before it is rendered.
: Some fo the filters are written in PHP and the ones that appear not to be seem to be written in Javascript

**Plugins**
: [plugins](https://developer.wordpress.org/plugins/) are still the prefered way to package content for use in WordPress, whether it's in Gutenberg or outside.
: Writing plugins is not complicated but it's not trivial either. It get more complicated if you plan to share the plugin in the WordPress.org repository as there are more rules to follow.

That brings up what, to me, is the biggest problem with Gutenberg:

> **Not all WordPress developers are React developers, and they shouldn't be**.

I understand that there are a tons of blocks available by default and that several theme framework makers like Elementor and Genesis have released block plugins. But just like with jQuery and any other framework, there is a time when your needs may grow beyond what's available, or beyond the price you're willing to pay, so you will have to build your own.

A good starting point is the Node-based [create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) package. This tool will automate the creation of a basic block for you but that's all it does, it's still on you as the developer to create the block itsellf.

There are some new things that replace techniques that we've taken for granted as WordPress developers but they mean that we have to move away from the PHP that we've used since the beginning and move to React

# Query blocks

One interesting thing that we can do with WordPress is to create custom loops to modify the results we get from the database.

```php
<?php
$args = array( 
  'posts_per_page' => 3, 
  'post_type' => 'post', 
  'post_status' => 'publish' 
);

$my_custom_query = new WP_Query( $args );

// Custom Loop
if( $my_custom_query->have_posts() ){
  while( $my_custom_query->have_posts() ){
    $my_custom_query->the_post();
    // HTML structure of our post
  }
} else {
    // Nothing matched the query
}

// Return to regular query loops
wp_reset_postdata();
```

We can run multiple queries in the same page to get multiple streams in the same page.

The [query loop block](https://wordpress.org/support/article/query-loop-block/) provides equivalent functionality when working with Gutenberg

[Understanding the Query Block and Its Importance in Site Editing](https://wptavern.com/understanding-the-query-block-and-its-importance-in-site-editing)

# Revisiting Block Patterns and Variations (or Gutenberg as a design system)

* Gutenberg as a design system
  * [Part 1](https://publishing-project.rivendellweb.net/gutenberg-as-a-design-system-part-1/)
  * [Part 2](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-2/)
  * [Part 3](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-3/)
* [Using Block Patterns as content templates](https://mkaz.blog/wordpress/using-block-patterns-as-content-templates/)

# block.json as a block configuration point

If you will add your blocks to the WordPress block directory

# theme.json as a central configuration point

[Global Settings & Styles (theme.json)](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)

# Delivering Gutenberg themes to the client

There probably are ways to lock down blocks and templates. It's just one more thing to learn beyond React and the basics of Gutenberg.

# Conditionally loading block assets

* [Conditionally Load Block Assets, Part 3](https://mkaz.blog/wordpress/conditionally-load-block-assets-part-3/)
* [Block-styles loading enhancements in WordPress 5.8](https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/)

# Building a Prism block

# Tools and utilities

## @wordpress/scripts

[@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
