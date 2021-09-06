# Revisiting Webpack

I've done some prior work with Webpack before and, while I still have my reservations,  it's worth taking a look at it again from a different perspective. As I was working on my research on how to automate UI localization I came across a Webpack prooject and thought it'd be interesting to look at Webpack again and how to build an application around it.

This is far from a perfect project. Currently the assets are 1.7MB and I haven't figured out if I need to do further Webpack processing or if it's about how the CLDR Javascript is written. I will update this post as appropriate.

## The Process

I took the project from the [Globalize repository](https://github.com/globalizejs/globalize/tree/master/examples/app-npm-webpack) and updated it from Webpack 1.9 to the current 3.8 to take advantage of additional features like performance budgets.

I've created a [Github Repo](https://github.com/caraya/webpack-demo) with the material needed to either reproduce the content of this article or use it as the starting point for your own projects.

To get started install the plugins specified in `package.json` running the following command

<pre class="command-line language-bash" data-user="elrond25" data-host="rivendell"><code>npm install</code></pre>

Now that we have all the plugins installed, let's move to Webpack's configuration file, where the magic happens.

## Webpack configuration file

The core of a Webpack application is the configuration file, `webpack-config.js` by default. This is where we tell Webpack what we want to do, what plugins we want to use to do it and how do we want to use the plugins.

As with any Node application we tell it what plugins we want to use by asociating them with a variable. The plugins listed below are only the ones we'll use with Webpack.

```javascript
const webpack = require( "webpack" );
const CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const GlobalizePlugin = require( "globalize-webpack-plugin" );
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const nopt = require("nopt");
const ZopfliPlugin = require("zopfli-webpack-plugin");
const path = require('path');
const workboxPlugin = require('workbox-webpack-plugin');
```

We ue the `noopt` package to define our production toggle. If it's present we'll consider it a production build and do things slightly different than we would during development.

```javascript
const options = nopt({
  production: Boolean
});
```

We specify the entry points for Webpack using a ternary operator: If this is a production build we specify two entry points (places where webpack should use to begin building out its internal dependency graph) and if it's a development build we only specify one.

This section also specifies the output, where Webpack will save the bundles it creates and how to name these files.

```javascript
module.exports = {
  entry: options.production ?  {
    main: "./app/index.js",
    // What files to put in the vendor bundle
    vendor: [
      "globalize",
      "globalize/dist/globalize-runtime/number",
      "globalize/dist/globalize-runtime/currency",
      "globalize/dist/globalize-runtime/date",
      "globalize/dist/globalize-runtime/message",
      "globalize/dist/globalize-runtime/plural",
      "globalize/dist/globalize-runtime/relative-time",
      "globalize/dist/globalize-runtime/unit"
    ]
  } : "./app/index.js",
  output: {
    //path: options.production ? "./dist" : "./tmp",
    pathinfo: true,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: options.production ? "" : "http://localhost:8080/"
  },
```

Next we defines extensions to resolve automatically. This means that if the file is an ES6 file (with an `.es6` extension), a Javascript file (extension: `.js`) or a Typescript file (with a `.ts` extension) you can skip the extension when using them with Webpack.

```javascript
  resolve: {
    extensions: [
      ".es6",
      ".js",
      ".ts"
    ]
  },
  ```

Performance budget is an interesting built in functionality of Webpack. These options allows you to control how webpack notifies you of assets and entrypoints that exceed a specific file limit. This feature was inspired by the idea of [webpack Performance Budgets](https://github.com/webpack/webpack/issues/3216).

`MaxAssetSize `is any emitted file from webpack. This option controls when webpack emits a performance hint based on individual asset size
`MaxEntryPointSize` represents all assets that would be utilized during initial load time for a specific entry. This option controls when webpack should emit performance hints based on the maximum entrypoint size.

```javascript
  performance: {
    maxAssetSize: 100000,
    maxEntrypointSize: 300000,
    hints: 'warning'
  },
```

Module loaders allow Webpack to work with files other than Javascript and related files. In the example below we have two different types of loaders, one for CSS that will run the results through the css-loader and, as a fallback, through the style-loader.

The second module will use the `file-loader` on PNG images (files that end with ,`.png`).

I deliberately stay away from loaders unless it's absolutely necessary and would rather do the work with my existing Gulp workflow. If you're interested, there is  a list of available loaders in the [Webpack site](https://webpack.js.org/loaders/) and in [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#loaders)


```javascript
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      }
    ]
  },
```

The main portion of the configuration file deals with plugin configuration. For each plugin we've installed we now need to configure it and tell Webpack what we want to do with it.

The [Manifest plugin](https://www.npmjs.com/package/webpack-manifest-plugin) will generate a `manifest.json` file in the root output directory with a mapping of all source file names to their corresponding output file

The [Cleanup plugin](https://www.npmjs.com/package/webpack-cleanup-plugin) will delete the specified files and directories. We use it to make sure every time we run a build we do so into a clean directory

```javascript
  plugins: [
    new ManifestPlugin(),
    new CleanWebpackPlugin(['dist']),
```

[Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) will give you a visual representation of your bundles that will, hopefully, show you places where you can optimize your bundles; someting similar to what the Webpack team [did on Twitter](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318) and documented in Medium.

```javascript
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'gzip',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }),
```

We defined what we wanted the [Extract Text plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) to extract. Here we tell Webpack what file to put the result in.

```javascript
    new ExtractTextPlugin({
      filename: "style.css"
    }),
```

The [HTMLWebpack plugin](https://webpack.js.org/plugins/html-webpack-plugin/) works in two ways. How we use in this example is to insert the bundle names into the indicated template. This is important because the hash portion of the bundle name will change every time we run the build process.

```javascript
    new HtmlWebpackPlugin({
      production: options.production,
      template: "./index-template.html"
    }),
```

The [Globalize Webpack plugin](https://github.com/rxaviers/globalize-webpack-plugin) provides a way to generate bundles for Globalize content. We can change both the development locale and the supported locales for production.

```javascript
    new GlobalizePlugin({
      production: options.production,
      developmentLocale: "en",
      supportedLocales: [ "ar", "de", "en", "es", "pt", "ru", "zh" ],
      messages: "messages/[locale].json",
      output: "i18n/[locale].[hash].js"
    }),
```

Even though this project doesn't use it I've included the [Common Chunks plugin](https://webpack.js.org/plugins/commons-chunk-plugin/) that will create a separate chunk, with common modules shared between multiple entry points. By separating common modules from bundles, we can load the resulting chunk once initially, and store in cache for later use.

```javascript
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js'
    }),
```

This [plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) uses UglifyJS v3 (uglify-es) to minify your JavaScript. This will shrink the size of the bundles (although not significantly) by eliminating white space and mangling variables and other identifiers.

```javascript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
      warnings: false
      }
    }),
```

I want to squeeze as much content in each bundle without making the files too large. The [Zopfli Plugin](https://webpack.js.org/plugins/zopfli-webpack-plugin/) uses the Zopfli compression algorithm to compress the bundles.

It compresses better than gzip but it's slower so it may slow down build processes, specially for large bundles.

```javascript
		new ZopfliPlugin({
			asset: "[path].gz[query]",
			algorithm: "zopfli",
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
    }),
```

The last step uses `workbox-webpack`plugin to create a precaching service worker for the application. It is important to run this plugin last to make sure that all the changes are caught by our service worker.

As configured, this is a very coarse precaching service worker. It will take all css, HTML and Javascript files from the application. If you want to change the items you cache or add resouces you must edit the glob pattern under `globPatterns`.

This will also use [`clientsClaim`](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim) and [`skipWaiting`](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim) to take immediate control of the clients under scope and not waitn until the next time the page loads as is the common behavior. It's up to the developer t flag the user to reload the page.

```javascript
    new workboxPlugin({
      globDirectory: "./dist",
      globPatterns: ['**/*.{html,css,js}'],
      swDest: "./dist/sw.js",
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
};
```

## Integration with Gulp

Aas powerful as Webpack is I'm a Gulp boy and would like to continue using it for my development since I've built fairly elaborate workflows with it.

[gulp-webpack](https://www.npmjs.com/package/gulp-webpack) provides for such integration. Using the same configuration that we discussed in the last section we can build a Gulp task that will run Webpack using our configuration file.

Because we're using Gulp we can skip using loaders and let Gulp deal with the work of, for example, process SASS into CSS or transpiling Javascript using Babel's env preset. Bbecause we've moved the work to Gulp we can get rid of the loaders section of the Webpack configuration file and remove the `extractTextPlugin` configuration

When we're ready we can bundle the assets we've worked on using Webpack, if you do this the bundling has to be the last task of the build.

The task look like this:

```javascript
const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');

gulp.task('webpack-bundle', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
});
```

