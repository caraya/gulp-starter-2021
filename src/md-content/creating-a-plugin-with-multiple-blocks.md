# Creating a plugin with multiple blocks

Most of the WordPress block plugins you see online and most of the examples showing you how to create a block pluging for WordPress show a single block per plugin.

This may not always be what we want to do.

When creating blocks for a client I would rather provide a single plugin with all necessary blocks rather than provide one plugin per block.

I will follow Ryan Welcher's method to add multiple blocks per plugins as shown in the video below:

<div class="video">
  <iframe src="https://player.twitch.tv/?video=1175560252&parent=publishing-project.rivendellweb.net" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
</div>

The idea is that running the `@wordpress/scripts` tool with a template Ryan created, we can prepare the plugin to handle multiple blocks

```treeview
./
├── assets/
│   ├── index.js
│   └── templates/
│       ├── block.json.mustache
│       ├── edit.js.mustache
│       ├── editor.scss.mustache
│       ├── index.js.mustache
│       ├── save.js.mustache
│       └── style.scss.mustache
├── block.json
├── build/
│   ├── example-plugin.asset.php
│   ├── example-plugin.css
│   ├── example-plugin.js
│   └── style-example-plugin.css
├── example-plugin.php
├── includes/
│   └── block-editor/
│       └── blocks/
│           └── example-plugin/
│               ├── block.json
│               ├── edit.js
│               ├── editor.scss
│               ├── index.js
│               ├── save.js
│               └── style.scss
├── package-lock.json
├── package.json
└── webpack.config.js
```

```bash
npm @wordpress/create-block --template @ryanwelcher/multiple-block-template
```

```js
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
  ...defaultConfig,
  entry: {
    'block-one': './includes/block-editor/blocks/block-one',
  },
};
```
