# Inline scripts in WordPress

There are times when we need to add scripts to the page that will run only when there is a script already enqueued and loaded before it happens.

I got bit by this when trying to use FontFaceObserver. For some reason it worked fine in development but it would give a `FontFaceObserver is not defined` error  when I moved the theme to production.

The solution was hidden in some older documentation. As of version 4.5 there is an additional script loading function for loading inline scripts: `wp_add_inline_script`. This function allows adding inline scripts that depend on scripts

The only important thing to remember is that this will only work when using a script that was enqueued using `wp_enqueue_script`.

The final solution  looks like this:

```php
<?
function rivendellweb_enqueue_fontfaceobserver() {
	wp_enqueue_script( 'ffo_script',
		get_stylesheet_directory_uri() . '/js/fontfaceobserver.js',
		array(),
		'20151215',
		false );
	wp_add_inline_script( 'ffo_script', 'const recursive = new FontFaceObserver("Recursive VF");let html = document.documentElement;
			Promise.all([recursive.load()]).then(() => {sessionStorage.fontsLoaded = true;console.log("Recursive has loaded.");
			}).catch((err) => {sessionStorage.fontsLoaded = false;console.log("Recursive failed to load", err);
			});

			// Add a class based on whether the font loaded successfully
			if (sessionStorage.fontsLoaded) {html.classList.add("fonts-loaded");
			} else {html.classList.add("fonts-failed");
			}'
		);
}

add_action( 'wp_enqueue_scripts', 'rivendellweb_enqueue_fontfaceobserver' );
```

## Links and References

* [Enhanced Script Loader in WordPress 4.5](https://make.wordpress.org/core/2016/03/08/enhanced-script-loader-in-wordpress-4-5/)
* [Better Way to Add Inline Scripts](https://digwp.com/2019/07/better-inline-script/)
* [wp_add_inline_script developer documentation](https://developer.wordpress.org/reference/functions/wp_add_inline_script/)
