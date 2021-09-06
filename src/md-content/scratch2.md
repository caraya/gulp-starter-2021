rm -rf node_modules && npm i && npm run build && git checkout -- package-lock.json && npm run package-plugin

If you're using Gulp and [Dust.js](http://www.dustjs.com/) the code may look like this:

```javascript
const gulp = require('gulp');
const dust = require('gulp-dust');

gulp.task('default', () =>
  gulp
    .src('templates/list.html')
    .pipe(dust())
    .pipe(gulp.dest('dist'))
);
```

And if you're using [Nunjucks ](https://mozilla.github.io/nunjucks/) the Gulp task looks like this:

```javascript
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');

gulp.task('default', () =>
  gulp
    .src('templates/greeting.html')
    .pipe(nunjucks.compile({ name: 'Sindre' }))
    .pipe(gulp.dest('dist'))
);
```
