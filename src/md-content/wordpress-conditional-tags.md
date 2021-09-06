# WordPress conditional tags

One of the things I like the most about working in WordPress code, although it can be really frustrating at times, it's the large amount of conditional tags that are available. This post will explore what they are, and some examples of how we use them.

## What they are

Conditional tags are pre-packaged PHP functions that allow you to customize your WordPress theme based on whether the current item matches a condition or not Conditional Tags usually work with PHP if /else Conditional Statements.

The if/else code checks if a statement is true or false. The example uses the `is_single()` conditional tag.

If the statement is found to be true, the first set of code is executed and we echo `This is a single post!`.

If it’s false, we skip the first block of code, and execute the `else` block and echo `This is not a single post!` instead.

```php
<?php
if ( is_single() ):
    echo 'This is a single post!';
else:
    echo 'This is not a single post!';
endif;
?>
```

## How do they work?

Expanding on the example on the previous section we can use one or more conditional tags and oone or more logical operators in either a template or in a function that hooks to a trigger or action for later execution.

We'll walk through some examples as a means to explain what they do.

## Are we in the home page?

WordPress makes a difference between the front page (the main page of the site) and the main page (the index page for the blog). They may be the same or they may not; in this particular case we only want to output something if the

```php
<?php if ( ( is_front_page() && is_home() ) ) :
  echo "This is front and home page";
  echo "do something cool";
endif
?>
```

Likewise, WordPress make conditional tags for different types of content like single posts or pages. The next example will branch out and check if the user is visiting a single post or a page and echo different output depending on what we visited.

```php
<?php if ( is_single() ) :
  echo "Visiting Single Post";
elseif ( is_page() ) :
  echo "Visiting Page";
endif;
?>
```

The final example is to check whether a user is logged in and display different content to them than to anonymous visitors.

```php
<?php if ( is_user_logged_in() ):
  echo "Show secret for logged in users";
else :
  echo "Shhh, user is not logged in!";
endif;
?>
```

We've used echo statements in the example; in real production code we'd use more complex code, including WordPress specific functions.

The last example will work through actual WordPress code to, hopefully, fully illustrate how conditional tags work.

The code uses conditional tags in two places:

1. The first one is to check if we're in the site's front page **and** the blog home page (they are one and the same)
   * IF the condition matches we use `h1` for the title
   * If not then we use `p` elements for the title since we want to style it differently
2. Check if we have a description of the blog (another name for the tag line) **or** we're looking at the customizer view of the page
   * If neither condition are met we don't show the description

```php
<div class="site-branding">
  <?php the_custom_logo(); ?>
  <?php if ( is_front_page() && is_home() ) : ?> <!-- 1 -->
    <div class="site-branding__text">
      <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
      <?php
    else :
      ?>
      <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
      <?php
    endif;
    $rivendellweb_description = get_bloginfo( 'description', 'display' );
    if ( $rivendellweb_description || is_customize_preview() ) :
      ?> <!-- 2 -->
      <p class="site-description"><?php echo $rivendellweb_description; /* WPCS: xss ok. */ ?></p>
    <?php endif; ?>
  </div> <!-- .site-branding__text -->
</div><!-- .site-branding -->
```

There is a huge number of conditional tags available. If you want to see the full list, check the [List of Conditional Tags](https://developer.wordpress.org/themes/references/list-of-conditional-tags/) at wordpress.org.

## Links and Resources

* [Conditional Tags](https://developer.wordpress.org/themes/basics/conditional-tags/)
* [List of Conditional Tags](https://developer.wordpress.org/themes/references/list-of-conditional-tags/)
* [How to Use WordPress Conditional Tags](https://wpshout.com/wordpress-conditional-tags/)
* [The Ultimate Guide to WordPress Conditional Tags](https://www.isitwp.com/ultimate-guide-wordpress-conditional-tags/)
