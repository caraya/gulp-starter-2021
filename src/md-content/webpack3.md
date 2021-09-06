# More Webpack stuff

I still keep looking for new items in the Webpack space that will make my code work better or will give me more information about it.  I found two that are of particular interest to me.

## Size plugin

Webpack's [size plugin](https://npm.im/size-plugin) Prints the gzipped sizes of your Webpack assets and the changes since the last build. This may not sound like much but it's an important reminder during development. If your bundles grow every time you build your project it may end up hurting your performance budget and download speeds.

### Using the plugin

First install it using NPM

```bash
npm i -D size-plugin
```

Next, require the plugin at the top of your configuration file.

```javascript
const SizePlugin = require('size-plugin');
```

Finally, add it to the plugins section of your configuration.

```javascript
module.exports = {
  plugins: [
    new SizePlugin()
  ]
}
```

There is no additional configuration for this plugin.

## Critters and CSS inlining

[Critters](https://github.com/GoogleChromeLabs/critters) from the Chrome team inlines your CSS into the HTML document, reducing the numbber of trips between client and server and improving your page speed and time to interactive.  The plugin works differently from other options, because it doesn't use a headless browser to render content. Critters inlines all CSS rules used by your document, rather than only those needed for above-the-fold content.

```bash
npm i -D critters-webpack-plugin
```

Then, import Critters into your Webpack configuration and add it to your list of plugins:

```javascript
// webpack.config.js
const Critters = require('critters-webpack-plugin');

module.exports = {
  plugins: [
    new Critters({
      // Outputs:
      // <link rel="preload" onload="this.rel='stylesheet'">
      preload: 'swap',

      // Don't inline critical font-face rules,
      // but preload the font URLs:
      preloadFonts: true
    })
  ]
}
```

See the plugin's [README](https://github.com/GoogleChromeLabs/critters/blob/master/README.md) for more details and configuration parameters.

If you want to inline only above the fold content you may want to look at these alternatives to Critters.

* [Critical](https://github.com/addyosmani/critical)
* [Penthouse](https://github.com/pocketjoso/penthouse)
* [webpack-critical](https://github.com/lukeed/webpack-critical)
* [webpack-plugin-critical](https://github.com/nrwl/webpack-plugin-critical)
* [html-critical-webpack-plugin](https://github.com/anthonygore/html-critical-webpack-plugin)
* [react-snap](https://github.com/stereobooster/react-snap)
