# Modifying Prism.js to use a variable font

When researching how best to use Recursive, I did the following exercise. I took the basic selectors for Prism.js and modified them to use Recursive as the primary font.

I did it for the following reasons:

* We're already using Recursive throughout the document so we don't need to download another font
* Recursive has a monospaced axis that works well for code blocks
* If needed we can do further work using other features of the variable font

The modified code loooks like this:

```css
code[class*="language-"],
pre[class*="language-"] {
  color: #657b83; /* base00 */
  /* add Recursive to the font stack */
  font-family: Recursive, Consolas, Monaco,
    'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;

  /* To handle variable font */
  font-weight: 400;
  /* All other axes to their default values */
  font-variation-settings:  "MONO" 1,
                            "CASL" 0,
                            "slnt" 0,
                            "ital" 0.5;

  line-height: 1.5;

  /* Change tab size to 2*/
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
```

There are two minor modifications I made to use Recursive are as follows:

* Put Recursive as the first font in the font family stack
* Add the variable font attributes: `font-weight` and `font-variation-settings`

Yes, this tweak requires adding another font to the site but, as mentioned before, I'm already using the font for copy and it's the same variable font that works for monospaced content so I'm OK with the tradeoff.
