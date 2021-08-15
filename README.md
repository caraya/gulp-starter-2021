# Gulp Starter 2021

Every so often I review my build process and look for ways to improve it.

The biggest change this year is that I've switched to using gulp-libsquoossh instead of imagemin for image optimization. As a result there are now two Gulp tasks for image optimization: `image:resize` and `image:compress`.

Another major and unexpected change is that node-sass is deprecated in favor of gulp-sass and the current dart-sass supported version. As a result the `sass` task has been  modified to run with the new gulp-sass in synchronous mode.

## Dependencies

* [Prince XML](https://www.princexml.com/) to generate PDFs from HTML
* [libsquoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh) is used internally by gulp-libssquoosh to optimize images
