# Starter 2021

Every so ofter I like to look at my build process and see where I can make improvements or changes that are necessary because the code has changed.

For this iteration the changes are:

* Finally switched to the current recommended method of defining tasks.
  * There are things that don't work with the current system(although the Gulp maintainers say they should) so I will bite the bullet and change it.
* Moved from the almost unsupported Imagemin plugin go gulp-libsquoosh
  * It has the advantages that supported formats are implemented as WASM libraries so they'll work everywhere
  * The codecs are also bundled with libsquoosh so there's no need to install additional plugins to make it work
* Moved to markdown-it as the Markdown parser
  * Adding plugins still doesn't work, not sure why. Still researching the issue
* The syntax for gulp-exec changed so I moved the PDF generation code to the new syntax
* Another major and unexpected change is that node-sass is deprecated in favor of gulp-sass and the current dart-sass version
  * As a result the `sass` task has been  modified to run with the new gulp-sass in synchronous mode
  * **dart-sass is now the normative SASS version and the first one that will receive new features, updates and fixes**

## Dependencies

* [Prince XML](https://www.princexml.com/) to generate PDFs from HTML
  * Because it's a commericla product I cannot share it. You can download it for evaluation purposes from the website
* [libsquoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh) is used internally by gulp-libssquoosh to optimize images
* [markdown-it](https://markdown-it.github.io/) is used to parse Markdown files
