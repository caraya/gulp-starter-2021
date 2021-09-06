# Gulp 4.x execution system


What used to be

```js
// Per default, start scripts and styles
gulp.task('default',
  ['scripts', 'styles'], function() {...}
);

// Both scripts and styles call clean
gulp.task('styles',
  ['clean'], function() {...}
);
gulp.task('scripts',
  ['clean'], function() {...}
);

// Clean wipes out the build directory
gulp.task('clean', function() {...});
```

What it is now

```js
// The tasks don't have any dependencies anymore
gulp.task('styles', function() {...});
gulp.task('scripts', function() {...});

gulp.task('clean', function() {...});

// Per default, start scripts and styles
gulp.task('default',
  gulp.series('clean',
    gulp.parallel('scripts', 'styles'),
    function() {...}));
```
