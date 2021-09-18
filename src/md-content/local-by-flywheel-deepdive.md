# Taking A Deeper Look at Local by Flywheel

It is easy to think of [Local by Flywheel](https://localwp.com/) as just a way to run a WordPress site locally. It is that and it is also much more than that.

## Review: What is Local by Flywheel?

Local by Flywheel (Local) is a WordPress specific local development environment. It provides several features that make development easier and faster.

Some of these features include:

* Multiple hosting options
  * Ngnix and Apache servers
  * Multiple versions of PHP (5.6, 7.3, 7.4, and 8.0) and MySQL (5.7 and 8.0)
  * The ability to swap between versions of PHP and MySQL
  * The ability to switch between Nginx and Apache
* Import and Export sites
  * Export and Import all relevant files from a WordPress site, including the database
* Create blueprints, templates for new sites
* Share your site during development
  * [Ngrok](https://ngrok.com/) tunneling
  * [Live Links](https://localwp.com/live-links/) provide an ehanced tool to share your development site with other
* Headless WordPress
  * Create headless-optimized WordPress sites (Available in a plugin)
  * Automatically create and configure a Node.js frontend connected to a WordPress backend
* Extensibility via Local plugins

This post will concentrate on the command line features available in Local.

## Additional Features: SSH, CLI and associated tools

There was something I didn't notice or understand about Local: how to use SSH and the command line tools in a Local environment.

### SSH Access

To acccess the features we'll discuss below, follow these steps:

1. Start the site you want to work with
2. Right Click the name of the site
3. Select ***Open Site Shell***

<figure>
  <img src="https://res.cloudinary.com/dfh6ihzvj/images/v1631488684/publishing-project.rivendellweb.net/local-ssh-01/local-ssh-01.png?_i=AA" alt="selection of site shell for a local application">
  <figcaption>selection of site shell for a local application</figcaption>
</figure>

You will see a new terminal shell that looks like this:

<figure>
  <img src="https://res.cloudinary.com/dfh6ihzvj/images/v1631488684/publishing-project.rivendellweb.net/local-ssh-02/local-ssh-02.png?_i=AA" alt="Shell opening for Local site" height="auto">
  <figcaption>Shell opening for Local site</figcaption>
</figure>

The shell comes preconfigured with the WordPress CLI and PHP Composer

### WordPress CLI

The [WordPress CLI](https://wp-cli.org/) gives you command line access to a WordPress site (either local or remote). For the purposes of this discussion we'll look at the installation provided by Local.

One of the most interestings things, to me, is that the CLI allows you to do a lot of things that would take a lot of time to do manually.

I will look at two examples of things that can be done with the CLI.

The i18n in the CLI handles workbloads for Javascript/React blocks, as documented in [New! JavaScript i18n support in WordPress 5.0](https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/), and for PHP workloads.

* [wp i18n make-json](https://developer.wordpress.org/cli/commands/i18n/make-json/) &mdash; Extract JavaScript strings from PO files and add them to individual JSON files
* [wp i18n make-mo](https://developer.wordpress.org/cli/commands/i18n/make-mo/) &mdash; Create MO files from PO files

* [wp i18n make-pot](https://developer.wordpress.org/cli/commands/i18n/make-pot/) &mdash; Create a POT file for a WordPress project

These commands work together with tools like [POEdit](https://poedit.net/) to create language packs for your site.

Another thing that I like a lot is the set of [scaffold](https://developer.wordpress.org/cli/commands/scaffold/) commands. This set of commands, one of many, will create default elements using current WordPress standards and best practices.

The following commands are available:

* [wp scaffold block](https://developer.wordpress.org/cli/commands/scaffold/block/) &mdash; Generates PHP, JS and CSS code for registering a Gutenberg block for a plugin or theme
* [wp scaffold child-theme](https://developer.wordpress.org/cli/commands/scaffold/child-theme/) &mdash; Generates child theme based on an existing theme
* [wp scaffold plugin](https://developer.wordpress.org/cli/commands/scaffold/plugin/) &mdash; Generates starter code for a plugin
* [wp scaffold plugin-tests](https://developer.wordpress.org/cli/commands/scaffold/plugin-tests/) &mdash; Generates files needed for running PHPUnit tests in a plugin
* [wp scaffold post-type](https://developer.wordpress.org/cli/commands/scaffold/post-type/) &mdash; Generates PHP code for registering a custom post type
* [wp scaffold taxonomy](https://developer.wordpress.org/cli/commands/scaffold/taxonomy/) &mdash; Generates PHP code for registering a custom taxonomy
* [wp scaffold theme-tests](https://developer.wordpress.org/cli/commands/scaffold/theme-tests/) &mdash; Generates files needed for running PHPUnit tests in a theme
* [wp scaffold underscores](https://developer.wordpress.org/cli/commands/scaffold/underscores/) &mdash; Generates starter code for a theme based on the [Underscores](https://underscores.me/) (_s) starter theme
* [wp scaffold _s](https://developer.wordpress.org/cli/commands/scaffold/_s/) &mdash; Generates starter code for a theme based on the [Underscores](https://underscores.me/) (_s) starter theme

### PHP Composer

The other command tool that Local makes available is [PHP Composer](https://getcomposer.org/) (Composer for short), the PHP equivalent of NPM or Yarn in Node or Homebrew in macOS.

You can use Composer to install and manage dependencies for your PHP projects. This is less of an issue on the PHP side than it is using React and Gutenberg since there are far fewer dependencies to manage. Still it is nice to have, since sooner or later we'll want to run unit tests and other things that require external dependencies.

## Conclusion

Composer is one of those nice-to-have tools until you need it and then you wonder how you could work without it.

We only scratched the surface of what the WordPress CLI can do... there is so much more to explore that covering all of it would make this post extremely long. I encourage you to explore the CLI and see what you can do with the commands in it.
