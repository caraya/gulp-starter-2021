# Interesting things you can do with the console

Most of the work I've seen done in the console is limited to `console.log`. There is a lot more that you can do with the console. There's even a living standard hosted at WHATWG.

Most of the time we just use `console.log` to print something to the DevTools console. And that's enough, but sometimes we can do more.

I was surprised to find out that there is a [specification for console](https://console.spec.whatwg.org) that shows some amazing things you can do with the console. 

Caveats:

* The console specification is an early work that documents existing functionality in browsers
* I will not cover all command listed in the specification, only the ones I find most useful
* Some of these commands will work on Node.js and the browser
* I haven't tested all of them in Node
* I expect some of these commands not to have the same effect in Node than they do in the browser

## Severity levels on the console

In addition to `console.log`, you can also log info, warning and error type messages to the console using `console.info`, `console.warn` and `console.error`.

The difference is in the output each command produces.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1670800429/publishing-project.rivendellweb.net/console-info/console-info.png?_i=AA' width='800'>
  <figcaption><code>console.info</code> and the resulting display message</figcaption>
</figure>

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1670800439/publishing-project.rivendellweb.net/console-warn/console-warn.png?_i=AA' width='800'>
  <figcaption><code>console.warn</code> and the resulting display message</figcaption>
</figure>

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1670800438/publishing-project.rivendellweb.net/console-error/console-error.png?_i=AA' width='800'>
  <figcaption><code>console.error</code> and the resulting display message</figcaption>
</figure>

Chrome DevTools allows you to filter the display based on levels so you could list only info, warn or error level messages.

## Laying out content in a table

Depending on the type of content you may want to display it as a table. `console.table` will display array and array-like data in a tabular layout.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1670814914/publishing-project.rivendellweb.net/console-table/console-table.png?_i=AA' width='800'>
  <figcaption>Listing data in a table using <code>console.table</code></figcaption>
</figure>

## Listing data in JSON format

`console.dir` displays the given data in JSON format.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1670814923/publishing-project.rivendellweb.net/console-dir/console-dir.png?_i=AA' width='8000'>
  <figcaption><code>console.dir</code> showing the header of a web page in JSON format</figcaption>
</figure>

Google Developer's [Console API reference](https://developer.chrome.com/docs/devtools/console/api/) contains additional API methods available in Chrome DevTools.
