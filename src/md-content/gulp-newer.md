# Finally learning how to uses gulp-newer

One of the nice things about Gulp workflows if that you cam minimize the amount of work that you have to do if you use the tools correctly.

I just discovered to day that I wasn't using [gulp-newer](https://www.npmjs.com/package/gulp-newer) properly. It's almost an RTFM moment so I'm documenting it to prevent it from happening to me again :(

The idea behind gulp-newer is to reduce the number of files that we work on in a Gulp task by only passing around the files that are newer than the same file on the destination directory. For this to work you have to tell Newer what are you comparing with and yes, you guessed it, I never did.

The working example below taken from [gulp-newer](https://github.com/tschaub/gulp-newer#readme.md)'s Readme shows how the plugin works.

```js
const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

const imgSrc = 'src/img/**';
const imgDest = 'build/img';

// Minify any new images
gulp.task('images', function() {

  // Add the newer pipe to pass through newer images only
  return gulp.src(imgSrc)
      .pipe(newer(imgDest))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDest));

});
```

The plugin will take all images in the src directory and compare them with the same images in the destination directory.  If any of the sources images are newer, they will be processed with Imagemin but if they are not, they will be skiped.

The key is the parameter to newer that tells it where to look for the files to compare with. Without it it can't do it work.
