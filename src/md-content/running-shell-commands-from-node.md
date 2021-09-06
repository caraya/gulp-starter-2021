# Running shell commands from Node.js

I run a lot of commands from Node.js and Gulp scripts, the most common is to spawn a new shell to run a command or an application.

Take the following code as an example, it will take all the HTML files in a directory and run them through PrinceXML with a given CSS stylesheet to generate a PDF of the HTML file.

```js
gulp.task('build-pdf', gulp.series('build-pm-template'), () => {
  return gulp.src('./src/pm-content/*.html')
      .pipe(newer('src/pdf/'))
      .pipe($.exec('prince --verbose --input=html --javascript --style ./src/css/article-styles.css <%= file.path %> '))
      .pipe($.exec.reporter());
});
```

It works but it has several weak points:

* It will only work on macOS and Linux (and Windows 10 if you have WSL installed)
* It depends on PrinceXML being installed on your system (whether you've bought the full license or not)
* It depends on PrinceXML being on your path

There are several times when I've wondered if there was an alternative that would work cross platform without having to install WSL on Windows (I don't have a problem with it, but other people may not be comfortable doing it).

Tools like [shelljs](https://github.com/shelljs/shelljs) would make it easier to use shell commands in a portable way, but I have yet to see how it would work with older Gulp projects that don't use the newer function syntax.

The idea is to convert this function into something that would work with Gulp

```js
shell.exec('prince --verbose --input=html --javascript --style ./src/css/article-styles.css *.html')
```
