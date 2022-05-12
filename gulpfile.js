/* eslint-disable max-len */
/* eslint-disable quotes */


'use strict';
// Require Gulp first
const gulp = require('gulp');
//  packageJson = require('./package.json'),
// Load plugins
const $ = require('gulp-load-plugins')({
  lazy: true,
});
// Static Web Server stuff
const browsersync = require('browser-sync').create();
// const reload = browsersync.reload;
const historyApiFallback = require('connect-history-api-fallback');

// postcss
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// SASS
const sassProc = require('gulp-sass')(require('sass'));

// Critical CSS
const criticalPlugin = require('critical').stream;

// Image Processing
// We need path for the task to work when detecting extesions
const path = require('path');
// This replaces imagemin and plugins in previous versions
// of this build file
const squoosh = require('gulp-libsquoosh');

// Utilities
const del = require('del');
// Act only on newer files
const newer = require('gulp-newer');

// MARKDOWN AND PLUGINS
// Testing Markdown configuration and whether this will be enough
const markdownPlugin = require('gulp-markdown-it');

// load the plugins
const abbr = require("markdown-it-abbr");
const alerts = require("markdown-it-alerts");
const anc = require("markdown-it-anchor");
const attrs = require("markdown-it-attrs");
const embed = require("markdown-it-block-embed");
const fn = require("markdown-it-footnote");
const figs = require("markdown-it-implicit-figures");
const kbd = require("markdown-it-kbd");
const mermaid = require("markdown-it-mermaid");
const prism = require("markdown-it-prism");
const toc = require("markdown-it-table-of-contents");
const list = require("markdown-it-task-lists");

// explicitly require eslint
const eslintPlugin = require('gulp-eslint');

// ------------
// HTML & Markdown
// ------------

/**
 * @name markdown
 * @description converts markdown to HTML using gulp-markdown-it and a set of plugins.
 * @return {void}
 *
 * The idea is to eventually generate two Markdown files:
 * * One that works in WordPress
 * * One standalone Markdown that will work with a set of extension and will be easy to convert to HTML
 *
 */
function markdown() {
  const config = {
    options: {
      preset: 'commonmark',
      html: true,
      xhtmlOut: true,
      linkify: true,
      typographer: true,
    },
  };

  return gulp
      .src('src/md-content/*.md')
      .pipe(markdownPlugin(config)
          .use(abbr) // Doesn't require special configuration
          .use(anc, {
            permalink: true,
          })
          .use(alerts)
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
          .use(mermaid) // Doesn't require special configuration
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
}

/**
 * @name buildTemplate
 * @description Builds the full HTML templates from the markdown generated fragments
 * @param {string} done
 * @return {void}
 */
function buildTemplate(done) {
  gulp.src('./src/html-content/*.html')
      .pipe($.wrap({
        src: './src/templates/template.html',
      }))
      .pipe(gulp.dest('./dist'));
  done();
};

// ------------
// Paged Media and PDF
// ------------

/**
 * @name buildPMTemplate
 * @description Builds HTML files to use with PrinceXMML later
 * @param {String} done
 * @return {void}
 */
function buildPMTemplate(done) {
  gulp.src('./src/html-content/*.html')
      .pipe($.wrap({
        src: './src/templates/template-pm.html',
      }))
      .pipe(gulp.dest('./src/pm-content'));
  done();
};

/**
 * @name buildPDF
 * @description Builds the PDF from the HTML using PrinceXML
 * @return {void}
 */
function buildPDF() {
  const options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
  };
  const reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true, // default = true, false means don't write stdout
  };
  return gulp.src('./src/pm-content/*.html')
      .pipe(newer('src/pdf/'))
      .pipe($.exec((file) => `prince --verbose --input=html --javascript --style src/css/article-styles.css ${file.path}`, options))
      .pipe($.exec.reporter(reportOptions));
};

/**
 * @name copyPDF
 * @description Copies the PDF to the build folder
 * @param {string} done
 * @return {void}
 *
 */
function copyPDF(done) {
  gulp.src('src/pm-content/*.pdf', {
    dot: true,
    base: 'src/pm-content',
  })
      .pipe(gulp.dest('dist/pdf'))
      .pipe($.size({
        pretty: true,
        title: 'copy',
      }));
  done();
};

// ------------
// SASS & CSS
// ------------

/**
 * @name sass
 * @description SASS conversion task to produce development css with expanded syntax.
 *
 * We run this task agains Dart SASS, not lib SASS.
 *
 * @return {void}
 * @see {@link http://sass-lang.com|SASS}
 * @see {@link http://sass-compatibility.github.io/|SASS Feature Compatibility}
 */
function sass() {
  return gulp.src('src/sass/**/*.{scss,sass}')
      .pipe($.sourcemaps.init())
      .pipe(sassProc.sync({outputStyle: 'expanded'}))
      .pipe($.sourcemaps.write('./maps'))
      .pipe(gulp.dest('src/css'));
};

/**
 * @name processCSS
 *
 * @description Run autoprefixer and cleanCSS on the CSS files under src/css
 *
 * Moved from gulp-autoprefixer to postcss. It may open other options in the future like cssnano to compress the files
 * @return {void}
 *
 * @see {@link https://github.com/postcss/autoprefixer|autoprefixer}
 */
function processCSS() {
  // What processors/plugins to use with PostCSS
  const PROCESSORS = [
    autoprefixer(),
  ];
  return gulp
      .src('src/css/**/*.css')
      .pipe($.sourcemaps.init())
      .pipe(postcss(PROCESSORS))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css'));
};

/**
 * @name uncss
 * @description Taking a css and an html file, UNCSS will strip all CSS selectors not used in the page
 * @return {void}
 * @see {@link https://github.com/giakki/uncss|uncss}
 */
function uncss() {
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
};

/**
 * @name critical
 * @description calculates and extracts the critical path CSS from the given file
 * @return {void}
 */
function critical() {
  return gulp.src('src/*.html')
      .pipe(criticalPlugin({
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
};

// ------------
// Javascript Tasks
// ------------

/**
 * @name babel
 * @description Transpiles ES6 to ES5 using Babel. As Node and browsers support more of the spec natively this will move to supporting ES2016 and later transpilation
 * @return {void}
 * It requires the `@babel/preset-modules` plugin
 *
 * @see {@link http://babeljs.io/|Babel}
 * @see {@link http://babeljs.io/docs/learn-es2015/|Learn ES2015}
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/|ECMAScript 2015 specification}
 */
function babel() {
  return gulp.src('src/js/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.babel({
        presets: [
          "@babel/preset-modules",
        ],
      }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/scripts'))
      .pipe($.size({
        pretty: true,
        title: 'Babel',
      }));
};

/**
 * @name eslint
 * @description Runs eslint on all javascript files
 * @return {void}
 */
function eslint() {
  return gulp.src([
    'scr/scripts/**/*.js',
  ])
      .pipe(eslintPlugin())
      .pipe(eslintPlugin.format('checkstyle'))
      .pipe(eslintPlugin.failAfterError());
};

/**
 * @name jsdoc
 * @description runs jsdoc on the gulpfile and README.md to genereate documentation using the Docdash theme
 * @return {void}
 * @see {@link https://example.com/|gulp-jsdoc3}
 * @see {@link http://clenemt.github.io/docdash/|DocDash}
 * @see {@link https://github.com/clenemt/docdash|DocDash GitHub}
 * @see {@link https://github.com/jsdoc3/jsdoc|JSDOC}
 */
function jsdoc() {
  const config = require('./jsdocConfig.json');
  return gulp.src(['README.md', 'gulpfile.js'])
      .pipe($.jsdoc3(config));
};

// ------------
// Image Manipulation Tasks
// ------------

/**
 * @name imageResize
 * @description Resize images to the specified dimensions
 * @return {void}
 *
 * @see {@link https://www.npmjs.com/package/gulp-libsquoosh|gulp-libsquoosh}
 * @see {@link https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh|libsquoosh}
*/
function imageResize() {
  return gulp.src('src/original-images/**/*.{jpg, jpeg, png, webp, avif}')
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
};

/**
 * @name imageCompress
 * @description Squoosh all images in the src/originals folder using gulp-libsquoosh
 * @return {void}
 *
 * @see {@link https://www.npmjs.com/package/gulp-libsquoosh|gulp-libsquoosh}
 * @see {@link https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh|libsquoosh}
*/
function imageCompress() {
  return gulp.src(['src/original-images/**/*.{png,jpg,webp}'])
      .pipe(
          squoosh((src) => {
            // console.log(src);
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
};

// ------------
// Utilities
// ------------

/**
 * @name copyFonts
 * @description Copies fonts into the distribution directory.
 * @return {void}
 *
 */
function copyFonts() {
  return gulp.src([
    './src/fonts/*',
  ]).pipe(gulp.dest('dist/fonts'));
};

/**
 * @name copyCSS
 * @description Copies third-party CSS into the distribution directory.
 * @return {void}
 */
function copyCSS() {
  return gulp.src([
    "./src/css/normalize.css",
    "./src/css/prism.css",
    "./src/css/image-load.css",
    "./src/css/video-load.css",
  ]).pipe(gulp.dest('dist/css'));
}

/**
 * @name copyLocalJS
 * @description copies third-party JS into distribution directory
 * @return {void}
 */
function copyLocalJS() {
  return gulp.src([
    "./src/scripts/lazy-load.js",
    "./src/scripts/load-fonts.js",
    "./src/scripts/lazy-load-video.js",
  ]).pipe(gulp.dest('dist/scripts'));
}

/**
 * @name copyVendorJS
 * @description copies third-party JS into distribution directory
 * @return {void}
 */
function copyVendorJS() {
  return gulp.src([
    "./src/scripts/vendor/clipboard.min.js",
    "./src/scripts/vendor/fontfaceobserver.js",
    "./src/scripts/vendor/prism.js",
  ])
      .pipe(gulp.dest('dist/scripts/vendor'));
}

/**
 * @name clean
 * @description deletes specified files
 * @return {void}
 */
function clean() {
  return del([
    'dist/',
    '.tmp',
    'src/html-content/*.html',
    'src/*.html',
    'src/pm-content/*',
    'src/pdf/*.pdf',
  ]);
};

// ------------
// Development Server
// ------------

/**
 * @name serve
 * @description Serves the files from the dist directory
 * @return {void}
 */
function serve() {
  browsersync.init({
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
    server: {
      baseDir: ['./dist'],
      middleware: [historyApiFallback()],
    },
  });
};

// ------------
// Compound Tasks
// ------------

const pdfBuild = gulp.series(
    markdown,
    buildPMTemplate,
    buildPDF,
    copyPDF,
);

const htmlBuild = gulp.series(
    markdown,
    buildTemplate,
);

const fullCSS = gulp.series(
    sass,
    processCSS,
    copyCSS,
);

const processJS = gulp.series(
    babel,
    copyLocalJS,
    copyVendorJS,
);

const processImages = gulp.series(
    imageResize,
    imageCompress,
);

const copyAll = gulp.parallel(
    copyFonts,
    copyCSS,
    copyLocalJS,
    copyVendorJS,
);

// ------------
// Default Task Definition
// ------------
const defaultTask = gulp.series(
    clean,
    htmlBuild,
    fullCSS,
    imageCompress,
    babel,
    copyAll,
);

// ------------
// Exports
// ------------
// HTML TASKS
exports.markdown = markdown;
exports.buildHTML = buildTemplate;
// PDF TASKS
exports.buildPM = buildPMTemplate;
exports.buildPDF = buildPDF;
exports.copyPDF = copyPDF;
// CSS TASKS
exports.sass = sass;
exports.processCSS = processCSS;
exports.copyCSS = copyCSS;
exports.uncss = uncss;
exports.critical = critical;
// JAVASCRIPT TASKS
exports.babel = babel;
exports.eslint = eslint;
exports.jsdoc = jsdoc;
exports.copyLocalJS = copyLocalJS;
exports.copyVendorJS = copyVendorJS;
exports.copyJS = gulp.series(copyLocalJS, copyVendorJS);
// IMAGE TASKS
exports.imageResize = imageResize;
exports.imageCompress = imageCompress;
// UTILITY TASKS
exports.clean = clean;
exports.serve = serve;
exports.copyFonts = copyFonts;
// Copy Everything that is not put in dist by a task
exports.copyAll = copyAll;
// Compound Tasks
exports.pdf = pdfBuild;
exports.html = htmlBuild;
exports.js = processJS;
exports.images = processImages;
exports.css = fullCSS;
// Default
exports.default = defaultTask;

