# Creating a WordPress Theme (Mostly) From Scratch

## What you need to know

## With or Without Gutenberg?

## Getting Started: Decisions and Coonsiderations

## CSS

### Grid

### Variable Fonts

### Fallbacks

## Javascript

### Don't do what I did

### To jQuery or not to jQuery

## WordPress PHP

### Issues with theme tester

### Images

#### add custom sizes

See <https://developer.wordpress.org/reference/functions/add_image_size/>

```php
add_image_size( 'rivendellweb-full-bleed', 2000, 1500, true );
add_image_size( 'rivendellweb-index-img', 1000, 550, true );
```

#### Menu Registration

```php
<?
register_nav_menus( array(
  'header' => esc_html__( 'Header', 'rivendellweb' ),
  'social' => esc_html__( 'Social', 'rivendellweb')
) );
```
#### Disable native lazy loading

#### Add custom background color

```php
<?
// Set up the WordPress core custom background feature.
add_theme_support( 'custom-background', apply_filters( 'rivendellweb_custom_background_args', array(
  'default-color' => 'ffffff',
  'default-image' => '',
) ) );
```

```php
<?
add_theme_support( 'custom-logo', array(
  'height'      => 250,
  'width'       => 250,
  'flex-width'  => true,
  'flex-height' => true,
) );
```

```php
<?
// GUTENBERG-RELATED THEME SUPPORT COMMANDS
/**
 * Add support for editor styles and enqueue the styles
 */
add_theme_support('editor-styles');
add_editor_style( '/editor-styles.css' );
```

```php
<?
/**
 * Disable custom colors in Gutenberg
 * Uncomment the block to enable
 */
add_theme_support( 'disable-custom-colors' );
```


```php
<?
/**
 * Disable the Gutenberg color palette
 * Uncomment the block to enable
 */
add_theme_support( 'editor-color-palette' );
```

```php
/**
 * Add support for default block styles
 */
add_theme_support( 'wp-block-styles' );
```
```php
<?
/**
 * Add custom font sizes for Gutenberg
 *
 */
add_theme_support(
  'editor-font-sizes',
  array(
    array(
        'name' => __( 'Small', 'rivendellweb-blocks' ),
        'size' => 12,
        'slug' => 'small'
    ),
    array(
        'name' => __( 'Regular', 'rivendellweb-blocks' ),
        'size' => 16,
        'slug' => 'regular'
    ),
);
```


```php
<?
add_theme_support(
  'editor-color-palette',
  array(
    array(
        'name' => __( 'White', 'rivendellweb' ),
        'slug' => 'white',
        'color' => '#ffffff'
    ),
    array(
        'name' => __( 'Black', 'rivendellweb' ),
        'slut' => 'black',
        'color' => '#000000'
    ),
    array(
        'name' => __( 'Magenta', 'rivendellweb' ),
        'slug' => 'magenta',
        'color' => '#a156b4',
    ),
);
```

#### Modify the body class array

```php
<?
/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function rivendellweb_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
		$classes[] = 'archive-view';
	}

	// Adds a class of no-sidebar if sidebar-1 or sidebar-2
	// are not active.
	//
	// This is where you can get creative with the test and
	// add different classes based on which sidebar is active
	// and style accordingly.
	if ( ( ! is_active_sidebar( 'sidebar-1' ) ) ||
		 	 ( ! is_active_sidebar( 'sidebar-2' ) ) ) {
		$classes[] = 'no-sidebar';
	} else {
		// Otherwise add the has-sidebar class
		$classes[] = 'has-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'rivendellweb_body_classes' );
```
