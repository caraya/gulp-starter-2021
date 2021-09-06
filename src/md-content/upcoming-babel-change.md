# upcoming change to Babel

There is a suggested change to Babel that may change the way you write your configurations, builder tasks and other aspects of your Babel configuration. 

In the blog post [Upgrade to Babel 7 (WIP)](https://babeljs.io/blog/2017/03/01/upgrade-to-babel-7) the Bable maintainers give information on how upcoming changes will affect Babel installations. 

The one I'm concerned about is how to use yearly plugins. The posts states that:

>Instead of any yearly preset, we suggest that you use the newly created babel-preset-env which uses the correct plugins based on your environment.

When configuring Babel you'd normally use the following:

```json
{
  "presets": ["es2015", "es2016", "es2017"]
}
```

My configuration file looks like this

```javascript
gulp.task('babel', () => {
  return gulp.src('src/es6/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015', 'es2016', 'es2017']
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/js/'))
    .pipe($.size({
      pretty: true,
      title: 'Babel'
    }));
});
```

The idea is that both of the examples above use the presets directly and, regardless of the level for ES6, 7, or 8 in your browser, it'll load all the presets needed for each yearly plugin. 

Instead the new recommended way to go is use the [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/) plugin that will only load the transformations that you need for your target browsers. 

Used in combination with [stage-1](http://babeljs.io/docs/plugins/preset-stage-1/), [stage-2](http://babeljs.io/docs/plugins/preset-stage-2/) and [stage-3](http://babeljs.io/docs/plugins/preset-stage-3/) presets we can get fuller coverage of what we want on Javascript. 

Leaving the targets attribute blank makes `preset-env` equivalent to `preset-latest` in terms of functionality. 

If we want to use `preset-env` and all the stages plugins we can do something like this in the `babelrc.json` configuration. 

```json
{
  "presets": ["env","stage-1","stage-2","stage-3"]
}
```

If we want to specify what versions of browsers we want to support then we can specify the `targets` parameter and provide a list in the same way we do for Autoprefixer.  The folloiwng example uses the last two versions of browsers and Safrai 7+

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "last 2 versions", 
          "safari >= 7"
        ]
      }
    }, 
    "stage-1",
    "stage-2",
    "stage-3"
    ]
  ]
}
```
an equivalent Gulp task would look like this

```javascript
gulp.task('babel', () => {
  return gulp.src('src/es6/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
       presets: [
         ["env", {
           "targets": {
             "browsers": [
               "last 2 versions", 
               "safari >= 7"
              ]
            }
        }, 
        "stage-1",
        "stage-2",
        "stage-3"
        ]
      ]
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/js/'))
    .pipe($.size({
      pretty: true,
      title: 'Babel'
    }));
});
```

