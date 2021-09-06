# Implementing Quotebacks in WordPress

Quotebacks are an interesting way to cite content from other websites. They work in two stages.

## Installing the extension and getting the quotations

The first one is HTML formatted with special data attributes, a footer and a link to the script. There are browser extensions to create this code, one for Chrome and one for Firefox (currently under development).

Once the extension is installed, go to a page, select text and press command + shift + S on Mac and control + shift + S on Windows

<figure>
  <img loading="lazy" src="https://res.cloudinary.com/dfh6ihzvj/image/upload/v1592371680/publishing-project.rivendellweb.net/citation-00.png" alt="">
  <figcaption>The result of highlighting text and pressing command/control + shift + S to generate the quote back. There are options to copy embed, copy markdown or close the quote at the bottom of the caption.</figcaption>
</figure>

The final step in this section is to paste the code into the page that you want to use

## Installing the script

The second part, the `quoteback.js` scripts converts the blockquote into a custom element with its own built-in styles. The installation is simple, either create a script and point the source to the CDN

```html
<script
  src="https://cdn.jsdelivr.net/gh/Blogger-Peer-Review/quotebacks@1/quoteback.js">
</script>
```

Or download the script and link to it locally

```html
<script src="js/vendor/quoteback.js></script>
```

Completing both steps will produce results similar to the following image.

<figure>
  <img loading="lazy" src="https://res.cloudinary.com/dfh6ihzvj/image/upload/v1592371040/publishing-project.rivendellweb.net/citation-01.png" alt="">
  <figcaption>Example of a formatted quoteback</figcatption>
</figure>

## Why Use them?

Using these types of citations keep me honest and it makes me think about the type of resources I use and how I use them. It also allows readers to get the full text and context of your citations and form their own opinions about the subject.

## WordPress specifics

There are a few WordPress-specific issues that we need to address as we implement them in a WordPress site.

### Linking to CDN or hosting locally?

This is a tricky question.

If we run the plugin from CDN, we get the latest code but we add one or more request to those already being made and, potentially making the site slower since the custom elements will only be upgraded when the script finishes loading.

Keeping a local copy makes the code moore efficient, it reduces the number of requests, but it puts the weight of updating the code on the plugin creator.

For this project I chose to host the script as part of the plugin.

### Plugin or theme?

Whether to host it in a plugin or a theme will depend on what you want to do with it.

If you want the functionality to be part of a theme and don't mind if the code breaks when you move to another theme, then a theme would be ok.

But if you want to keep the functionality regardless of the theme you're using, then you must use a plugin.

For this project I've chosen to build it as a plugin.

### Process

To create a WordPress plugin we need to add a preamble comment that contains the plugin metadata that WordPress will use to show the plugin in the admin plugin menu.

I also incorporate a basic tool to prevent direct access to the plugin. If the constant ABSPATH is not defined then the user tried to access the script directly and we don't allow that to happen so we exit.

```php
<?
/*
  Plugin Name: WP-Quotebacks
  Plugin URI: https://publishing-project.rivendellweb.net/
  description: Backend work for Quotebacks See <a href="https://quotebacks.net/">quotebacks.net</a>
  Version: 1.0
  Author: Carlos Araya
  Author URI: https://publishing-project.rivendellweb.net/
  License: MIT
*/

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}
```

The main part of the script is the function and action to add the script to the pages.

We don't add the script like we'd add it in a regular page, we need to use WordPress-specific functions, [enqueue_script](https://developer.wordpress.org/reference/functions/wp_enqueue_script/), to add them to all pages on the WordPress installation.

By itself `enqueue_script` will not add the script, for that we need to add an action that uses the [enqueue_scripts](https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/) hoook (note the plural) and a function callback.

```php
<?
function quotebacks_enqueue_script() {
  wp_enqueue_script('quotebacks',
  plugins_url(
    'vendor/quoteback.js', __FILE__ ),
    array(),
    '20200615',
    true
  );
}

add_action( 'wp_enqueue_scripts', 'quotebacks_enqueue_script' );
```

With this plugin installed we can just paste the code from the extension with one difference, we should delete the script located at the end of every embed for quotebacks.
