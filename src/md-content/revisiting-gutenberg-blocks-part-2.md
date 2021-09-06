# Revisiting Gutenber blocks part 2: Further thoughts and ideas

The previous post ([Revisiting Gutenberg blocks part 1: Building and Styling the blocks](https://publishing-project.rivendellweb.net/revisiting-guten…yling-the-blocks/)) discussed how to build a block and reviewed both old and new techniques for creating Gutenberg blocks.

This post will revisit related areas of block development in more detail.

## Block variations

Some times it may be easier to create additional styles for an existing core element than create your own. Gutenberg calls this block variations.

Authors can also choose whether they want to incorporate core blocks. It is highly likely that you will need to customize the block styles to match the core blocks with the theme but that will alwaays be easier than creating. Gutenberg calls this [block style variations](https://developer.wordpress.org/block-editor/developers/filters/block-filters/#block-style-variations).

The following core blocks are available:

* Text
  * Paragraph
  * List
  * Heading
  * Subhead
  * Table
  * Button
  * Classic (HTML) Block
  * Text Columns
* Media
  * Image
  * Cover Image
  * Image Gallery
  * Audio
  * Video
  * Embeds
  * Shortcodes
* Quotes
  * Quote
  * Pullquote
  * Verse
* Code
  * Code
  * Preformatted
  * Custom HTML
  * Shortcodes
  * Embeds
* Layout
  * Columns
  * Text Columns
  * Separator
  * Read More

See [Gutenberg Blocks](https://gogutenberg.com/blocks/) for more information about core blocks and how to use them.

The variations plugin doesn't require a build step, it's a combination of PHP and CSS.

The PHP script enqueues the script that defines the variations and the stylesheet that holds the actual CSS for the variations we create.

```php
<?php
function rivendellweb_enqueue_variations() {
    wp_enqueue_script(
        'rivendellweb-script',
        plugins_url( './src/block-variations.js', __FILE__ ),
        array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
        filemtime( plugin_dir_path( __FILE__ ) . './src/block-variations.js' )
    );
}
add_action( 'enqueue_block_editor_assets', 'rivendellweb_enqueue_variations' );

function rivendellweb_variation_styles() {
  wp_enqueue_style(
    'rivendellweb_variations_css',
    plugins_url( './src/block-variations.css', __FILE__ ) );
}
add_action( 'enqueue_block_assets', 'rivendellweb_variation_styles' );
```

The Javascript file contains only block style registrations for our custom styles. It uses `blocks.regiterBlockStyle` to give WordPress the following informaiton:

* What block will use the style
* What's the name of the style
* What's the label for the style

At this time we're not removing existing styles from blocks, only adding new ones.

```js
wp.blocks.registerBlockStyle( 'core/paragraph', {
  name: 'lede-paragraph',
  label: 'First Paragraph',
} );

// Blockquote variations
wp.blocks.registerBlockStyle( 'core/quote', {
  name: 'fancy-quote',
  label: 'Fancy Quote',
} );

wp.blocks.registerBlockStyle( 'core/quote', {
  name: 'top-bottom-quote',
  label: 'Top and Bottom',
})

wp.blocks.registerBlockStyle( 'core/quote', {
  name: 'red-quote',
  label: 'Red Quote',
})
```

Aas mentioned earlier, the CSS defines the actual styles for our block variations using the `.is-style{variation-name}` CSS class syntax.

```css
.is-style-lede-paragraph {
  font-size: 1.5em !important;
}

.is-style-fancy-quote {
  border-left: 4px solid red;
}

.is-style-top-bottom-quote {
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  border-left: 0;
}

p {
  margin: 1em 0;
}

.is-style-red-quote {
  border-left: 0;
  color: red;
  font-size: 5vmax;
}
```

Block style variations provide a way to customize blocks without changing the blocks themselves; variations are also clean, they don't require a build process since they use PHP to enqueue assets.

One thing that tripped me when writing this, is that variations appear once you've inserted the block on the post or page.

## Block patterns

The idea behind block patterns is that we can group blocks that we use together into a single layout that we can reuse where needed.

The steps to create a Block Pattern are as follows:

### 1. Create the pattern and copy the content

We create the pattern by setting up the blocks we want as part of the pattern in Gutenberg. This will create the markup that we need to paste into the pattern definition by copying it from the editor and escaping it, like we'll do in the next step.

### 2. Escape the block content

Until we can create a built-in conversion tool, we'll have to use an online tool like [escape string](https://onlinestringtools.com/escape-string), or the native PHP [json_encode](https://www.php.net/manual/en/function.json-encode.php) function to convert the code into a string suitable to add to the pattern.

One incomplete solution is to create a [heredoc](https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc) to contain the full Gutenberg template.

We then encode the template to a string using [json_encode()](https://www.php.net/manual/en/function.json-encode.php) to create the string.

Lastly, we then use [preg_replace()](https://www.php.net/manual/en/function.preg-replace.php) to make sure we replace all instances of `\/`  with `/`

```php
<?php
$video_text_content = <<<END
 // Content of the template goes here
END;

$converted_json = json_encode($video_text_content);

$template_string = preg_replace('(\\\/)','/',$converted_json);
```

We can run this as an external script in the command line or, if we choose to, we can incorporate it into our block pattern definitions or maybe add it to a WordPress utility library to be created at a later time.

### 3. Register the pattern

The pattern registration is fairly simple. We first check if the [WP_Block_Patterns_Registry](https://developer.wordpress.org/reference/classes/wp_block_patterns_registry/) an only add the pattern if it does (it doesn't make sense to register the pattern if it doesn't).

[register_block_pattern()](https://developer.wordpress.org/reference/functions/register_block_pattern/) tells WordPress that we're creating a new block pattern. It takes two parameters: a pattern name and an array of pattern properties.

The possible pattern properties are:

* **`title` (required)**: A human-readable title for the pattern
* **`content` (required)**: Stringified content string for the pattern
* **`description`**: A visually hidden text used to describe the pattern in the inserter
* **`categories`**: One or more pattern categories for the pattern to appear in
* **`keywords`**: Aliases or keywords that for the pattern
* **`viewportWidth`**: Width of the pattern in the inserter.

The final step is to hook the pattern registration function to the [init](https://developer.wordpress.org/reference/hooks/init/) hook to make sure it actually works.

```php
<?php
function rivendellweb_register_block_patterns() {
  if ( class_exists( 'WP_Block_Patterns_Registry' ) ) {

    register_block_pattern(
      'rivendellweb/video-text',
        'title'       => __( 'Video with text description', 'textdomain' ),
        'description' => __( 'Youtube video with text to the right.', 'Block pattern description', 'textdomain' ),
        'content'     => $template_string,
        'categories'  => array( 'Rivendellweb Patterns' ),
    );
  }
}

add_action( 'init', 'rivendellweb_register_block_patterns' );
```

The function can register multiple patterns at the same time.

### 4. (Optional) Create custom categories for the pattern

Rather than put our custom patterns in the default categories, we can create one or more custom categories for our patterns that will share space with the default ones (although not in alphabetical order).

The callback function, `rivendellwebr_register_pattern_categories()` allows us to register one or more pattern categories using [register_block_pattern_category()](https://developer.wordpress.org/reference/functions/register_block_pattern_category/)

```php
<?php
function rivendellwebr_register_pattern_categories() {
  if ( class_exists( 'WP_Block_Patterns_Registry' ) ) {

    register_block_pattern_category(
      'journal',
      array('label' => __( 'Journal', 'Block pattern category', 'textdomain' ) )
    );

  }
}
add_action( 'init', 'rivendellweb_register_pattern_categories' );
```

So now we have as many custom patterns in as many custom pattern categories as our project needs.

### Additional resources

Rich Tabor's [How to Build Block Patterns for the WordPress Block Editor](https://richtabor.com/build-block-patterns/) provides an indepth look at building patterns.

## Getting Custom Post Types to Talk to Gutenberg

I've created several custom post types that worked in the classic editor. When I brought them to my Gutenberg playground they would not work or they would not work as I expected them to.

It took me a while to realize that you must be really picky on how you configure the Custom Post Type (CPT) to work as Gutenberg is far less forgiving than the classic editor when using [register_post_type()](https://developer.wordpress.org/reference/functions/register_post_type/)

I want my CPT to do three things

1. Work with the REST API
2. Work with the classic editor
3. Work with Gutenberg

To address point one, we need to include `show_in_rest` in the post registration

To address points two and three we need to include the full support declaration for what part of the editor we want to support.

I normally add the following items to the `supports` array:

* `title`
* `editor`
* `excerpt`
* `author`
* `thumbnail`
* `comments`
* `revisions`
* `custom-fields`
* `permalinks`
* `featured_image`

```php
<?php
function rivendellweb_custom_book_type() {
  register_post_type( 'book',
  // WordPress CPT Options Start
  array(
      'labels' => array(
          'name' => __( 'Books' ),
          'singular_name' => __( 'Book' )
      ),
      'has_archive' => true,
      'public' => true,
      'rewrite' => array('slug' => 'book'),
      'show_in_rest' => true,
      'supports' => array('title',
          'editor',
          'excerpt',
          'author',
          'thumbnail',
          'comments',
          'revisions',
          'custom-fields',
          'permalinks',
          'featured_image'
      )
  )
);
}
add_action( 'init', 'rivendellweb_custom_book_type' );
```

## Further tweaks to block styles

There are a few things that I would still want to customize for the blocks and the theme using them.

### Custom color palettes

```php
<?php
add_theme_support(
'editor-font-sizes',
array(
  array(
      'name' => __( 'Small', 'rivendellweb-blocks' ),
      'size' => 10,
      'slug' => 'small'
  ),
  array(
      'name' => __( 'Regular', 'rivendellweb-blocks' ),
      'size' => 16,
      'slug' => 'regular'
  )
  // truncated to save space
);
```

Like we did with the custom fonts sizes we do the same thing with a custom color palette.

```php
/**
 * Theme Setup 
 *
 */
function rivendellweb_setup() {
  // Disable Custom Colors
  add_theme_support( 'disable-custom-colors' );

  // Editor Color Palette
  add_theme_support( 'editor-color-palette', array(
    array(
      'name'  => __( 'Blue', 'rivendellweb' ),
      'slug'  => 'blue',
      'color' => '#59BACC',
    ),
    array(
      'name'  => __( 'Green', 'rivendellweb' ),
      'slug'  => 'green',
      'color' => '#58AD69',
    ),
    array(
      'name'  => __( 'Orange', 'rivendellweb' ),
      'slug'  => 'orange',
      'color' => '#FFBC49',
    ),
    array(
      'name'  => __( 'Red', 'rivendellweb' ),
      'slug'  => 'red',
      'color' => '#E2574C',
    ),
  ) );
}
add_action( 'after_setup_theme', 'rivendellweb_setup' );
```


### Fonts and typography

### Templates

External [block templates](https://developer.wordpress.org/block-editor/developers/block-api/block-templates/)

### External metdata declaration

[The block type metadata](https://developer.wordpress.org/block-editor/developers/block-api/block-metadata/) provides an external means to declare our block API. It is stored in a `block.json` file. An example, taken from the [Block metadata developer docs](https://developer.wordpress.org/block-editor/developers/block-api/block-metadata/) looks like this:

```json
{
  "apiVersion": 2,
  "name": "my-plugin/notice",
  "title": "Notice",
  "category": "text",
  "parent": [ "core/group" ],
  "icon": "star",
  "description": "Shows warning, error or success notices…",
  "keywords": [ "alert", "message" ],
  "textdomain": "my-plugin",
  "attributes": {
    "message": {
      "type": "string",
      "source": "html",
      "selector": ".message"
    }
  },
  "providesContext": {
    "my-plugin/message": "message"
  },
  "usesContext": [ "groupId" ],
  "supports": {
    "align": true
  },
  "styles": [
    { "name": "default", "label": "Default", "isDefault": true },
    { "name": "other", "label": "Other" }
  ],
  "example": {
    "attributes": {
      "message": "This is a notice!"
    }
  },
  "editorScript": "file:./build/index.js",
  "script": "file:./build/script.js",
  "editorStyle": "file:./build/index.css",
  "style": "file:./build/style.css"
}
```

Look at the [Block metadata developer docs](https://developer.wordpress.org/block-editor/developers/block-api/block-metadata/) for more information about the content of the file and how it works.

## Full page designs

## Block design: Journal
