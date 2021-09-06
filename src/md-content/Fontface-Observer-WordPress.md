# Using Fontface Observer in WordPress

[Fontface observer](https://fontfaceobserver.com) (FFO) is a font loader library that allows you to control the behavior of our downloadble fonts. This post will work through how to use the script in a WordPress installation.

Using FontFace Observer is a two-step process. We first need to load the script and then we need to add an inline script to tell FFO what to do.

## Loading the script

We load the script using `wp-enqueue-scripts`; the same way that we'd load all our scripts and stylesheets.

The following code snippet enqueues the Fontface Observer into a standalone function. However, if you're already enqueing scripts and styles you could incorporate it into an existing enqueue function and action.

```php
function rivendellweb_enqueue_ffo() {
	wp_enqueue_script( 'ffo_script',
			get_stylesheet_directory_uri() . '/js/fontfaceobserver.js');
}
add_action( 'wp_enqueue_scripts', 'rivendellweb_enqueue_ffo' );
```

## Inserting the inline script

The second part is to insert an inline script on the footer of pages.

THe function interleaves Javascript and PHP to build the function.

The javascript itself does the following tasks:
1. Loads the font
2. If the font download succeeds
   1. Add a `fontsLoaded` entry to session storage with `true`
3. If loading the font fails
   1. Add a `fontsLoaded` entry to session storage with `true`


If session storage has a `fontsLoaded` attribute

1. If the value is `true` add the `fonts-loaded` loaded class to the `html` element
2. If the value is `false` add the `fonts-failed` loaded class to the `html` element

```php
<?php
function rivendell_add_ffo(){
?>
  <script>
    const recursive = new FontFaceObserver('Recursive VF');
    let html = document.documentElement;
    Promise.all([
      recursive.load(),
    ]).then(() => {
			sessionStorage.fontsLoaded = true;
      console.log('Recursive has loaded.');
    }).catch((err) => {
			sessionStorage.fontsLoaded = false;
      console.log('Recursive failed to load', err);
    });

		if (sessionStorage.fontsLoaded) {
			html.classList.add('fonts-loaded');
		} else {
			html.classList.add('fonts-failed');
		}
  </script>
<?php
};
add_action('wp_footer', 'rivendell_add_ffo');
?>
```

We could further change the code so that if the fonts fail to load and the session storage value is false, we load an alternative font stack from Google fonts.
