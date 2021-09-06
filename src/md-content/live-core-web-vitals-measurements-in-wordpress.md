# Live Core Web Witals Measurements In WordPress

Building the Core Web Vitals measurement into WordPress is a bit more involved as it depends on whether you've analytics into your site and how you've done it.

This function depends on Google's [Sitekit plugin](https://sitekit.withgoogle.com/) and relies on values set there. We can run a function that checks if the `gtag` script has already been enqueued on your site:

* If it's hasn't been enqueued, then you add it and configure it
* If it's already been enqueued, then do nothing, as it's ready to use

If you use a different tool to setup your Google Analytics or use a different analytics solution, you'll need to set it up and configure it yourself.

```php
<?php
$handle = 'google_gtagjs';
$list = 'enqueued';
// Property ID
$tag_id = 'UA-XXXXXXXX-X';
$url = 'https://www.googletagmanager.com/gtag/js?id=' . rawurlencode( $tag_id );


if (! wp_script_is( $handle, $list )) {
    wp_enqueue_script( $handle, $url, array(), null, false, 100 );
    wp_script_add_data( $handle, 'script_execution', 'async' );
    wp_add_inline_script( $handle, 'window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}' );
} else {
    return;
}
```

Once the analytics script is enqueued we can add the web vitals script and configure it to run when the page is ready.

Because I'm sure that no one has added the `web-vitals.js` script to the theme, I can go straight to `wp_enqueue_script` without adding the defensive code to check if it's already been enqueued

Originally I thought that I could use [wp_inline_script()](https://developer.wordpress.org/reference/functions/wp_add_inline_script/) to handle the inline script that I need to add to the page. However, `wp_inline_script()` doesn't allow for module scripts (you can't add `type="module"` to the script tag).

So, instead, I'm using [wp_footer](https://developer.wordpress.org/reference/functions/wp_footer/) and writing the script manually.

```php
<?php
// Enqueue the web vitals script
wp_enqueue_script(
    'web-vitals', 
    'https://unpkg.com/web-vitals?module',
    array(),
    null,
    true );

function web_vitals_init() {
  echo '<script type="module">
  import {getCLS, getFID, getLCP} from "https://unpkg.com/web-vitals?module";

  function sendToGoogleAnalytics({name, delta, id}) {
    gtag("event", name, {
      event_category: "Web Vitals",
      event_label: id,
      value: Math.round(name === "CLS" ? delta * 1000 : delta),
      non_interaction: true,
    });
  }

  getCLS(sendToGoogleAnalytics);
  getFID(sendToGoogleAnalytics);
  getLCP(sendToGoogleAnalytics);
</script>';
}

add_action( 'wp_footer', 'web_vitals_init' );
```

Collecting this data gives you better feedback on how your site is doing and how your users are experiencing the content.

Right now I'm adding this to my theme's `functions.php`. I should make a plugin out of it but I want to make sure it works and sends the data I want before I make it into one.
