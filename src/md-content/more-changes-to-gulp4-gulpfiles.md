# Additional updates for my Gulp build scripts

I finally decided to update my build to work with Gulp 4.x instead of 3. I'm familiar with series and parallel changes that are necessary for the build file to work in the new format.

What I wasn't aware of was that tasks are no longer the prefered way to create build commands. Instead you're expected to create each task as its own function and then export it to make it available to the CLI.

The Gulp team claims that the task way of defining work units still works but I spent several hours trying to get it working on an existing project so I gave up and switched to functions.

The idea is that we move from using `gulp.task` to define the task we write a function to describe the steps of the task we want to create; the body of the function is the same than the task.

We then have to export the function to make it available to the CLI.

A function to create CSS from SASS sources, and create the associated sourcemaps,  the command could look like this:

```js
function createSass() {
 return gulp.src('./sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(sourcemaps.write('./css'))
  .pipe(plumber.stop())
  .pipe(gulp.dest('./css'));
};
```

We then export it using any name we want using [exports](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

```js
// exports
exports.sass = createSass;
```

This will be the name that you get when you run `gulp --tasks` or `gulp -T`.

I've created an example of the new code in this Gist:

<script src="https://gist.github.com/caraya/947efecce775ec0dacad5b22155e48d0.js"></script>
