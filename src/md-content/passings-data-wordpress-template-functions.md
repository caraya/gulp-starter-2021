# passing data to WordPress template files

The template loading functions (get_header(), get_template_part(), etc.) have a new $args argument. So now you can pass an array’s of data to the templates.

The idea is that we can now pass an object with additional, arbitrary, information for the template to use.

In this example we load a hypothetical `foo` template part and pass an array of items as the third parameter on the function call.

```php
<?php
get_template_part(
  'foo',
  null,
  array(
    'class' => 'user',
    'arbitrary_data' => array(
      'foo' => 'baz',
      'bar' => true,
    ),
  )
);
```

We can then use this arbitrary data on the template. The example uses the `class` attribute from the `$args` array and from `arbitrary_data` we take the `foo` child element using a nested array syntax.

```html
<div class="widget
  <?php echo esc_html_class( $args['class'] ); ?>">
  <?php echo esc_html(
    $args['arbitrary_data']['foo']
  ); ?>
</div>
```

We can further enchance the customization using conditional tags so that only some templates use the custom variables we loaded the template with.

The functions that take the third argument are:

The affected functions are:

1. [get_header()](https://developer.wordpress.org/reference/functions/get_header/)
2. [get_footer()](https://developer.wordpress.org/reference/functions/get_footer/)
3. [get_sidebar()](https://developer.wordpress.org/reference/functions/get_sidebar/)
4. [get_template_part()](https://developer.wordpress.org/reference/functions/get_template_part/)
5. [locate_template()](https://developer.wordpress.org/reference/functions/locate_template/)
6. [load_template()](https://developer.wordpress.org/reference/functions/load_template/)

For more information see [Passing arguments to template files in WordPress 5.5](https://make.wordpress.org/core/2020/07/17/passing-arguments-to-template-files-in-wordpress-5-5/) in the Make WordPress Core blog.
