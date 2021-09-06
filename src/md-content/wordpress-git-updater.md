# WordPress Git Updater

As far as I know, unless you put your themes and plugins in the directories, you can't update themes and plugins through the admin interface, you'll have to delete it and upload it again.

[git-updater](https://github.com/caraya/rivendellweb-wptheme) provides a mechanism to update plugins and themes from a Git repository (Gihub, GitLab or BitBucket) without having to publish them.

Download the plugin and upload it to you WordPress installation or install it directly from your WordPress admin plugin interface.

Before we can install our code using the plugin we need to add a header in the `style.css` header or in the plugin's header denoting the location on GitHub

For a plugin choose of the two options below:

```php
GitHub Plugin URI: caraya/rivendellweb-wptheme
GitHub Plugin URI: https://github.com/caraya/rivendellweb-wptheme
```

For a theme the two options to choose from are:

```php
GitHub Theme URI: afragen/test-child
GitHub Theme URI: https://github.com/afragen/test-child
```

Only one of these options is necessary.

To install a new item (plugin or theme) from its Git repository fill out the forms and press the installation button.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1618981263/publishing-project.rivendellweb.net/github-updater-theme-update/github-updater-theme-update.png' alt='Github Updater Install Theme Dialogue'>
  <figcaption>Github Updated Install Theme Dialogue</figcaption>
</figure>

Both installations require the URI for the project, the branch of code you want to install from and the remote repository host and, optionally, a Github access token.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1618981262/publishing-project.rivendellweb.net/github-updater-plugin-update/github-updater-plugin-update.png' alt='Github Updater Install Plugins Dialogue'>
  <figcaption>Github Updater Install Plugins Dialogue</figcaption>
</figure>

This tool will make installations and updates easier; we can keep themes and plugins in their respective directories throughout their life.
