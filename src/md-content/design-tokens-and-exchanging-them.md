# Design tokens and exchanging them

I keep hearing about design tokens and their use in design systems but I didn't really become interested in design tokens until I started seeing them in Gutenberg.

The idea for this post is to take the styles that make up a site and perform the following tasks

1. Take CSS file and convert it to Javascript objects
2. Convert them to JSON following the [Design Tokens Format](https://design-tokens.github.io/community-group/format/) draft document
3. Use the JSON file as the basis of our CSS custom properties either the [original version](https://www.w3.org/TR/css-variables-1/) or the [Houdini version](https://drafts.css-houdini.org/css-properties-values-api/).

* Design Tokens
  * [Design Tokens Format Module](https://design-tokens.github.io/community-group/format/)
* Design System Tools
  * [Theo](https://github.com/salesforce-ux/theo)
  * [Style Dictionary](https://amzn.github.io/style-dictionary/)
