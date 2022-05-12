# Exporting block themes from the editor

When the block editor first came out, one of the things I found lacking was the ability to save theme templates and template blocks to files on my computer.

WordPress 6.0 gives developers the ability to export a full theme as a zipped archive.

This feature was first available in version 5.9 but it only allowed you to save the template files. In 6.0 the export feature produces a fully working theme archive that can be imported into another WordPress site or unziped into a directory we can push into a Git repository or to do work in preparation to submit to the [WordPress.org Theme Repository](https://wordpress.org/themes/).

## How to create a zipped theme archive

When using a block theme, we can generate the theme following these steps:

Go to the editor under appearance. From there click the options menu (three vertical dots).

Once you click on the menu you will see several options. Under the `Tools` group, the first option is `Export`.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1652111824/publishing-project.rivendellweb.net/fse-theme-export/fse-theme-export.png?_i=AA' alt='Theme editor options open. The export option is the first one under tools' width='800'>
  <figcaption>Theme editor options open. The export option is the first one under tools</figcaption>
</figure>

Click on export and choosing the location to save the file to will do the following:

1. It will create a zip file to place the content in
2. Copies all files from the current theme into the zip file
3. Extracts the template changes that are stored in the database to files and adds them to the zip file
   1. If these templates have the same names as those in the theme, they will be overwritten, so that the database version takes precedence
4. Adds the theme.json file to the zip file

There are three directories that are excluded from the export: `.git`, `node_modules` and `vendor`.

If you want to push the changes to a Git repository you will have to open the zip file and push the content to the repository.

## Expect the unexpected

The export process may make a few unexpected changes to your templates and theme.json files.

Some possible gotchas that need manual editing:

1. The output of template files from the database will be sanitized for security reasons
   * You will likely notice this with any CSS variables in your template files: e.g. `--wp--custom--spacing--outer` would become `\u002d\u002dwp\u002d\u002dcustom\u002d\u002dspacing\u002d\u002douter`
2. The properties in theme.json are now sorted alphabetically, so you might notice some of the objects in your theme.json moved position in the exported file
   * This now gives us a standard order for these properties so in future it will be easy to know where everything should go
3. The schema may be automatically updated to match the version of WordPress you are using
   * Make sure that this update will not break your theme

## Submitting the theme to the WordPress theme repository

Exporting the file doesn't mean that it's ready to submit to the WordPress.org repository. There are still some steps to complete before it's ready to submit.

1. If this is the first time you're submitting the theme, make sure there's a `readme.txt` file at the root of the theme
   * This file is required if you will be submitting the theme to the WordPress.org repository
   * For an idea of what it should look like, see the [Sample Theme Readme](https://github.com/WPTT/sample-theme-readme)
2. Update the screenshot if you've made any visual changes to the homepage. They should both match
3. Add a changelog entry to the `readme.md` file
4. IF this is not your initial release, you must update the version number of the theme in `style.css`
5. If your theme is based on an existing theme, you will also need to change the name
6. If the theme doesn’t have a license file already you will need to add one
7. Rezip the theme with these changes
8. The theme is now ready to submit to the WordPress.org repository for review
