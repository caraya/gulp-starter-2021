# Adding async/defer to WordPress site

WordPress doesn't add `async` or `defer` attributes to scripts by default and there is no easy way to do it without customization. This post will discuss how to add the attributes and why it's important.

This gets complicated by the fact that not all scripts need to have [defer](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-defer) or [async](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async) either because they were moved to the footer, because it already have the necessary one, or because of special requirements. So there is no one size fits all solution.

WordPress [script_loader_tag](https://developer.wordpress.org/reference/hooks/script_loader_tag/) hook allows us to tweak individual script tags to add attributes or other items before they are printed to the page.

In this example we add the defer attribute using the `script_loader_tag`.

Inside `rivendellweb_js_defer_attr` we do the following:

1. Stores the script we want to add the attribute to in a variable `$scripts to include`
2. For each script in `$scripts to include`
3. Test if the script to include matches the script we're currently processing
   * If it does, then replace it with a versioon containing the defer attribute
4. If it doesn't the if statement will end and we'll return the script without changes.

```php
function rivendellweb_js_defer_attr($tag){

    // List scripts to work with
    $scripts_to_include = array(
      'hoverintent-js.min.js',
      'lazy-images.min.js'); // 1

    foreach($scripts_to_include as $include_script) { // 2
        if(true == strpos($tag, $include_script )) // 3
        // Add defer attribute
        return str_replace( ' src', ' defer src', $tag );
    }

    # Return original tag for all scripts not included
    return $tag; // 4

}
add_filter( 'script_loader_tag', 'rivendellweb_js_defer_attr', 10 );
```

The [add_filter](https://developer.wordpress.org/reference/functions/add_filter/) function takes two parameters: The filter hook that we want to operate on and a function detaling what we want to do, in this case `rivendellweb_js_defer_attr`.
