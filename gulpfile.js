/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable indent */

'use strict';
// Require Gulp first
const gulp = require('gulp');
//  packageJson = require('./package.json'),
// Load plugins
const $ = require('gulp-load-plugins')({
  lazy: true,
});
// Static Web Server stuff
const browserSync = require('browser-sync');
// const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');

// postcss
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// SASS
const sass = require('gulp-sass')(require('sass'));

// Critical CSS
const critical = require('critical');

// Image Processing
// We need path for the task to work when detecting extesions
const path = require('path');
// This replaces imagemin and plugins in previous versions
// of this build file
const squoosh = require('gulp-libsquoosh');

// Utilities
const del = require('rimraf');
// Act only on newer files
const newer = require('gulp-newer');

// MARKDOWN AND PLUGINS
// Testing Markdown configuration and whether this will be enough
const markdown = require('gulp-markdown-it')('commonmark');

// load the plugins
const abbr = require("markdown-it-abbr");
const anc = require("markdown-it-anchor");
const attrs = require("markdown-it-attrs");
const embed = require("markdown-it-block-embed");
const fn = require("markdown-it-footnote");
const figs = require("markdown-it-implicit-figures");
const kbd = require("markdown-it-kbd");
const prism = require("markdown-it-prism");
const toc = require("markdown-it-table-of-contents");
const list = require("markdown-it-task-lists");

// explicitly require eslint
const eslint = require('gulp-eslint');

/**
 * @name markdown
 * @description converts markdown to HTML using gulp-markdown-it and a set of plugins.
 *
 * The idea is to eventually generate two Markdown files:
 *
 * * One that works in WordPress
 * * One standalone Markdown that will work with a set of extension and will be easy to convert to HTML
 *
 */
gulp.task('markdown', () => {
  const config = {
    options: {
      html: true,
      xhtmlOut: true,
      linkify: true,
      typographer: true,
    },
  };

  return gulp
    .src('src/md-content/*.md')
    .pipe(markdown(config)
      .use(abbr) // Doesn't require special configuration
      .use(anc, {
        permalink: true,
      })
      .use(attrs) // Doesn't require special configuration
      .use(embed, {
        containerClassName: 'video',
      })
      .use(fn) // Doesn't require special configuration
      .use(figs, {
        dataType: false,
        figcaption: true,
        tabindex: true,
        link: false,
      })
      .use(kbd) // Doesn't require special configuration
      .use(prism)
      // Include h1, h2 and h3 elements in the TOC
      .use(toc, {
        includeLevel: [1, 2, 3],
      })
      .use(list)
      .use(dl)
      .use(admonition),
    )
    .pipe(gulp.dest('src/html-content/'));
});

gulp.task('build-template', gulp.series('markdown'), () => {
  gulp.src('./src/html-content/*.html')
    .pipe($.wrap({
      src: './src/templates/template.html',
    }))
    .pipe(gulp.dest('./src/'));
});

// Tasks  for working with paged media content
gulp.task('build-pm-template', () => {
  gulp.src('./src/html-content/*.html')
    .pipe($.wrap({
      src: './src/templates/template-pm.html',
    }))
    .pipe(gulp.dest('./src/pm-content'));
});

gulp.task('build-pdf', gulp.series('build-pm-template'), () => {
  return gulp.src('./src/pm-content/*.html')
    .pipe(newer('src/pdf/'))
    .pipe($.exec('prince --verbose --input=html --javascript --style ./src/css/article-styles.css <%= file.path %> '))
    .pipe($.exec.reporter());
});

gulp.task('copy-pdf', () => {
  gulp.src('src/pm-content/*.pdf', {
    dot: true,
  })
    .pipe(gulp.dest('src/pdf'))
    .pipe($.size({
      pretty: true,
      title: 'copy',
    }));
});

// SCSS conversion and CSS processing
/**
 * @name sass
 * @description SASS conversion task to produce development css with expanded syntax.
 *
 * We run this task agains Dart SASS, not lib SASS.
 *
 * @see {@link http://sass-lang.com|SASS}
 * @see {@link http://sass-compatibility.github.io/|SASS Feature Compatibility}
 */
gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.{scss,sass}')
  .pipe($.sourcemaps.init())
  .pipe(sass.sync({
    outputStyle: 'expanded',
  })
    .on('error', sass.logError))
  .pipe($.sourcemaps.write('./maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe($.size({
    pretty: true,
    title: 'SASS',
  }));
});

/**
 * @name processCSS
 *
 * @description Run autoprefixer and cleanCSS on the CSS files under src/css
 *
 * Moved from gulp-autoprefixer to postcss. It may open other options in the future like cssnano to compress the files
 *
 * @see {@link https://github.com/postcss/autoprefixer|autoprefixer}
 */
gulp.task('processCSS', () => {
  // What processors/plugins to use with PostCSS
  const PROCESSORS = [
    autoprefixer({
      browsers: ['last 3 versions'],
    }),
  ];
  return gulp
    .src('src/css/**/*.css')
    .pipe($.sourcemaps.init())
    .pipe(postcss(PROCESSORS))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/css'))
    .pipe($.size({
      pretty: true,
      title:
        'processCSS',
    }));
});

/**
 * @name uncss
 * @description Taking a css and an html file, UNCSS will strip all CSS selectors not used in the page
 *
 * @see {@link https://github.com/giakki/uncss|uncss}
 */
gulp.task('uncss', () => {
  return gulp.src('src/css/**/*.css')
    .pipe($.concat('main.css'))
    .pipe($.uncss({
      html: ['index.html'],
    }))
    .pipe(gulp.dest('css/main.css'))
    .pipe($.size({
      pretty: true,
      title: 'Uncss',
    }));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
  return gulp.src('src/*.html')
    .pipe(critical({
      base: 'src/',
      inline: true,
      css: ['src/css/main.css'],
      minify: true,
      extract: false,
      ignore: ['font-face'],
      dimensions: [{
        width: 320,
        height: 480,
      }, {
        width: 768,
        height: 1024,
      }, {
        width: 1280,
        height: 960,
      }],
    }))
    .pipe($.size({
      pretty: true,
      title: 'Critical',
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * @name babel
 * @description Transpiles ES6 to ES5 using Babel. As Node and browsers support more of the spec natively this will move to supporting ES2016 and later transpilation
 *
 * It requires the `babel`, `babel-preset-es2015`, `babel-preset-es2016` and `babel-preset-es2017` plugins
 *
 * @see {@link http://babeljs.io/|Babel}
 * @see {@link http://babeljs.io/docs/learn-es2015/|Learn ES2015}
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/|ECMAScript 2015 specification}
 */
gulp.task('babel', () => {
  return gulp.src('src/es6/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015', 'es2016', 'es2017'],
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('src/js/'))
    .pipe($.size({
      pretty: true,
      title: 'Babel',
    }));
});

/**
 * @name eslint
 * @description Runs eslint on all javascript files
 */
gulp.task('eslint', () => {
  return gulp.src([
    'scr/scripts/**/*.js',
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * @name jsdoc
 * @description runs jsdoc on the gulpfile and README.md to genereate documentation using the Docdash theme
 *
 * @see {@link https://example.com/|gulp-jsdoc3}
 * @see {@link http://clenemt.github.io/docdash/|DocDash}
 * @see {@link https://github.com/clenemt/docdash|DocDash GitHub}
 * @see {@link https://github.com/jsdoc3/jsdoc|JSDOC}
 */
gulp.task('jsdoc', () => {
  const config = require('./jsdocConfig.json');
  return gulp.src(['README.md', 'gulpfile.js'])
    .pipe($.jsdoc3(config));
});

/**
 * @name image:resize
 * @description Resize images to the specified dimensions
 *
 * @see {@link https://www.npmjs.com/package/gulp-libsquoosh|gulp-libsquoosh}
 * @see {@link https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh|libsquoosh}
*/
gulp.task('image:resize', () => {
  return gulp.src('src/original-images/**/*.{jpg, jpeg, png, webp}')
  .pipe(
    squoosh((src) => ({
      preprocessOptions: {
        resize: {
          enabled: true,
          // Using only the width will preserve aspect ratio
          width: Math.round(src.width / 2),
          // height: Math.round(src.height / 2),
        },
      },
    })),
  )
  .pipe(gulp.dest('src/original-images/'));
});

/**
 * @name image:compress
 * @description Squoosh all images in the src/originals folder using gulp-libsquoosh
 *
 * @see {@link https://www.npmjs.com/package/gulp-libsquoosh|gulp-libsquoosh}
 * @see {@link https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh|libsquoosh}
*/
gulp.task('image:compress', gulp.series('image:resize'), () => {
  return gulp.src(['src/original-images/**/*.{png,jpg,webp}'])
      .pipe(
          squoosh((src) => {
            console.log(src);
            const extname = path.extname(src.path);
            let options = {
              encodeOptions: squoosh.DefaultEncodeOptions[extname],
            };

            if (extname === '.jpg') {
              options = {
                encodeOptions: {
                  jxl: {},
                  mozjpeg: {},
                },
              };
            }

            if (extname === '.png') {
              options = {
                encodeOptions: {
                  avif: {},
                },
                preprocessOptions: {
                  quant: {
                    enabled: true,
                    numColors: 16,
                  },
                },
              };
            }

            return options;
          }),
      )
      .pipe(gulp.dest('dist/images'));
});

/**
 * @name CopyAssets
 * @description Copies assets into the distribution directory.
 */
gulp.task('copyAssets', () => {
  return gulp.src([
    'src/**/*',
    '!src/paged-media/',
    '!src/es6',
    '!src/scss',
    '!src/test',
    '!src/bower_components',
    '!src/cache-config.json',
    '!**/.DS_Store', // Mac specific directory we don't want to copy over
  ], {
    dot: true,
  }).pipe(gulp.dest('dist'))
    .pipe($.size({
      pretty: true,
      title: 'copy',
    }));
});

/**
 * @name clean
 * @description deletes specified files
 */
gulp.task('clean', () => {
  return del.sync([
    'dist/',
    '.tmp',
    'src/html-content',
    'src/*.html',
    'src/pm-content',
    'src/pdf',
  ]);
});

gulp.task('serve', () => {
  browserSync({
    port: 2509,
    notify: false,
    logPrefix: 'ATHENA',
    snippetOptions: {
      rule: {
        match: "<span id='browser-sync-binding'></span>",
        fn: function(snippet) {
          return snippet;
        },
      },
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'src'],
      middleware: [historyApiFallback()],
    },
  });
});

// COMBINED TASKS

/**
 * @name imageWorkflow
 * @description Combines tasks for image processing
*/
gulp.task('imageWorkflow', gulp.series('image:compress'));

/**
 * @name prep
 * @description runs all prep tasks
*/
gulp.task('prep', () => {
  gulp.series(gulp.series('copyAssets', 'copyFonts'));
});

/**
 * @name pdf-build
 * @description creates PDF by running markdown inserting fragment into template, running it through Princexml and copying it to the PDF directory
 */
gulp.task('pdf-build', () => {
  gulp.series('markdown', 'build-pm-template', 'build-pdf', 'copy-pdf');
});

/**
 * @name default
 * @description uses clean, processCSS, build-template, imagemin and copyAssets to build the HTML content from Markdown source
 */
gulp.task('default', () => {
  gulp.series('processCSS', 'build-template', 'imagemin', 'copyAssets');
});
