# Adding patterns in `theme.json`

With WordPress 6.0 themes can also use local patterns stored in the `patterns` top-level directory of the theme. These will be picked up automatically by WordPress and used in your theme.

```text
.
├── patterns
│   └── demo-404.php
```

## Building the patterns

The patterns in the theme's `patterns` directory use the PHP plugin syntax. You need a PHP plugin-style comment to define the pattern before actually writing the pattern:

```php
<?php
 /**
  * Title: Hello
  * Slug: my-theme/hello
  * Categories: valinor patterns, text
  */
?>
<h1>Hello World</h1>
<p>This is from a pattern</p>
```

The following fields are available in the pattern comment:

Title (`required`)
: **implicitly translatable**
: The human-reaadable title of the pattern

Slug (`required`)
: The machine-readable slug of the pattern
: No spaces allowed, replace them with hypens (`-`) or underscores (`_`)

Description
: **implicitly translatable**
: Description of the pattern

Viewport Width
: The viewport width that this pattern should be displayed at

Categories
: One or more comma-separated values
: The block will appear under these categories in the pattern inserter

Keywords
: A list of one or more comma-separated values
: The block will appear under these keywords in the pattern inserter

Block Types
: One or more comma-separated values

Inserter
: Boolean indicating whether the block is available on the inserter or not

You also need the code for the pattern. This can be simple HTML or it can be HTML mixed with Gutenberg specific comments.

You can get the code by viewing the source of a block or group in the theme editor.

## Using the pattern

To use patterns, go to the inserter and either pick it from the category you chose for it or search for it using the search box at the top of the inserter.

## Why do it this way?

Using patterns in the theme, we reduce the dependency on the site's `functions.php` to load and use patterns.

This makes using patterns easier since we don't have to register them before using them. Just by being in the `patterns` directory they are available for us to use.

## Things to keep in mind

Loading patterns in the theme makes you dependent on the theme. So only do this if the patterns are exclusive to your theme.

It may still be a good idea to create a plugin for your patterns if you want them available independent of the theme you use.
