# Add Attributes To WordPress Enqueued Scripts

[wp_script_add_data](https://developer.wordpress.org/reference/functions/wp_script_add_data/)

```php
<?php
function add_scripts_for_IE() {
    wp_enqueue_script(
      'html5shiv.min.js',
      '//oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js' );
    wp_script_add_data( 'html5shiv.min.js', 'conditional', 'lt IE 9' );
 
    wp_enqueue_script( 'respond.min.js',  '//oss.maxcdn.com/respond/1.4.2/respond.min.js' );
    wp_script_add_data( 'respond.min.js', 'conditional', 'lt IE 9' );
}
add_action( 'wp_enqueue_scripts', 'add_scripts_for_IE' );
```
