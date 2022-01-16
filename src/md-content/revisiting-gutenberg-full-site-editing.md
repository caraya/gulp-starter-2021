# Revisiting Gutenberg full site editing

Now that WordPress 5.9 is close to release, we can revisit the Gutenberg full site editing experience since more of it will be baked into core rather than the Gutenberg plugin.

I'm not a fan of full site editing just like I'm not completely sold on Gutenberg as an editor. But, since the market is moving in this direction, I believe that developers should be aware of Gutenberg and the FSE to provide guidance on the optimal approach to the client's project.

I've been reading and researching the latest improvements to the FSE experience and I'm not certain if the current use cases have been thought through in Gutenberg.

# The Guteberg Full Site Editor from a developer's perspective

I won't dispute that Gutenberg is a good editor if you're creating bespoke content or need the flexibility of custom content blocks to create content or a theme that will be used by others.

But you don't always need or want that flexibility. Later articles will show some possibilities for locking content blocks for specificis pages.

# Understanding the Full Site Editing experience

I've set up a brand new WordPress site to work with Gutenberg. I've documented previous work with Gutenberg in the blog posts below:

* [https://publishing-project.rivendellweb.net/gutenberg-full-site-editing-and-block-based-themes/](https://publishing-project.rivendellweb.net/gutenberg-full-site-editing-and-block-based-themes/)
* [Plugin Topics: Meta boxes in the Block Editor](https://publishing-project.rivendellweb.net/plugin-topics-meta-boxes-in-the-block-editor/)
* [A New Way to Create Block Plugins](https://publishing-project.rivendellweb.net/a-new-way-to-create-block-plugins/)
* [Gutenberg: A step forward or two steps back?](https://publishing-project.rivendellweb.net/gutenberg-a-step-forward-or-two-steps-back/)
* [Gutenberg: How do we work with older content?](https://publishing-project.rivendellweb.net/gutenberg-how-do-we-work-with-older-content/)
* [Gutenberg: Additional Thoughts and Conclusions](https://publishing-project.rivendellweb.net/gutenberg-random-thoughts-and-conclusions/)
* [Gutenberg as design systems (part 1)](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-1/)
* [Gutenberg as design systems (part 2)](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-2/)
* [Gutenberg as design systems (part 3)](https://publishing-project.rivendellweb.net/gutenberg-as-design-systems-part-3/)

## Creating blocks versus the current system: React versus PHP

Gutenberg doesn't fully eliminate the need for PHP

* [block filters](https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/)
* [Editor filters](https://developer.wordpress.org/block-editor/reference-guides/filters/editor-filters/)
* [plugins](https://developer.wordpress.org/block-editor/designers-developers/developers/packages/packages-plugins/)
* [edit post](https://developer.wordpress.org/block-editor/designers-developers/developers/packages/packages-edit-post/)

That brings up what, to me, is the biggest problem with Gutenberg: **Not all WordPress developers are React developers**.

## Query blocks

[Understanding the Query Block and Its Importance in Site Editing](https://wptavern.com/understanding-the-query-block-and-its-importance-in-site-editing)

## Accessibility

* [W3C Drops WordPress from Consideration for Redesign, Narrows CMS Shortlist to Statamic and Craft](https://wptavern.com/w3c-drops-wordpress-from-consideration-for-redesign-narrows-cms-shortlist-to-statamic-and-craft)
* [On not choosing WordPress for the W3C redesign project](https://w3c.studio24.net/updates/on-not-choosing-wordpress/)

# Block Patterns and Variations

Load styles only for blocks that are used

* <https://mkaz.blog/wordpress/conditionally-load-block-assets-part-3/>
* <https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/>

# theme.json as a central configuration point

[Global Settings & Styles (theme.json)](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)

# Delivering Gutenberg themes to the client

There probably are ways to lock down blocks and templates. It's just one more thing to learn beyond React and the basics of Gutenberg.

# References

* Full site editing
  * [Full Site Editing](https://fullsiteediting.com/)
  * [Full Site Editing Focus](https://make.wordpress.org/design/handbook/focuses/full-site-editing/) &mdash; WordPress Design Handbook
  * [Full-Site-Editing – the Ultimate Resource List](https://gutenbergtimes.com/full-site-editing/) &mdash; Gutenberg Times
  * [Theme.json for WordPress Theme Authors – demo and Live Q &amp; A w/ Daisy Olson, Tammie Lister and Jeff Ong](https://gutenbergtimes.com/theme-json-for-wordpress-theme-authors-demo-and-live-q-a-w-daisy-olson-tammie-lister-and-jeff-ong/) &mdash; Gutenberg Times
  * [So, You want to talk about Full-site Editing?](https://gutenbergtimes.com/so-you-want-to-talk-about-full-site-editing/) &mdash; Gutenberg Times
  * [What is Full Site Editing and how is it shaping a new WordPress?](https://gutenberghub.com/wordpress-full-site-editing/)
  &mdash; Gutenberg Hub
* Global Styles
  [Global Settings & Styles (theme.json)](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
* Selective Loading Styles
  * [Conditionally Load Block Assets, Part 3](https://mkaz.blog/wordpress/conditionally-load-block-assets-part-3/)
  * [Block-styles loading enhancements in WordPress 5.8](https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/)
  * [Using Block Patterns as content templates](https://mkaz.blog/wordpress/using-block-patterns-as-content-templates/)
