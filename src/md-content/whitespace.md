# Dealing with significant whitespace in HTML

For most of the web's content whitespace is not signficant. Browsers will collapse multiple spaces or tabs into a single space and will only insert line breaks when they encounter the `<br>` element or at the end of a paragraph (either with the `</p>` closing tag or when they encounter a new `<p>` element).

But there are times when whitespace is significant. Take poetry... depending on the type of poem you're typesetting you may find different indentations and characters in different columns and things like that

A summary of the ways to handle whitespace is shown below (taken from [CSS Tricks](https://css-tricks.com/almanac/properties/w/whitespace/))

  <table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>New lines</th>
        <th>Spaces and tabs</th>
        <th>Text wrapping</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>normal</th>
        <td>Collapse</td>
        <td>Collapse</td>
        <td>Wrap</td>
      </tr>
      <tr>
        <th>pre</th>
        <td>Preserve</td>
        <td>Preserve</td>
        <td>No wrap</td>
      </tr>
      <tr>
        <th>nowrap</th>
        <td>Collapse</td>
        <td>Collapse</td>
        <td>No wrap</td>
      </tr>
      <tr>
        <th>pre-wrap</th>
        <td>Preserve</td>
        <td>Preserve</td>
        <td>Wrap</td>
      </tr>
      <tr>
        <th>pre-line</th>
        <td>Preserve</td>
        <td>Collapse</td>
        <td>Wrap</td>
      </tr>
    </tbody>
  </table>

## Pre

The oldest and most backward-compatible option is to use the `pre` element. This will ignore all restrictions regarding whitespace in the text, except for line breaks.

By default it'll render the text in a monospaced font. You can override this by using `font-family` to declare a web font or another pre-defined font family.

## CSS: white-space: pre

using `white-space: pre` is the CSS equivalent of using the `pre` element except thaat it's not as widely supported for older browsers.

The main difference is that you can attach the rule to any element, not just `pre` and save yourself the font declaration.

## CSS: whitespace: no-wrap

The next whitespace variation is `no-wrap`. This option will remove all whitespaces in the text and newlines.

This is what we want, however it may be too much for our purpose of typesetting text while preserving whitespace; new lines and line breaks are ignored so you'll get long lines of text instead of the formatted text you're looking for.

## CSS: whitespace: pre-wrap

`pre-wrap` will preserve spaces and newlines but it will also wrap the text around to the next line. It's the closes to what we want when typesetting material where whitespace is significant.

## CSS: whitespace: pre-line

`pre-line` works similarly to `pre-wrap`; it will collapse spaces, preserve newlines and wrap text. The difference is that `pre-line` will collapse spaces and tabs in the text, making it less useful for typeseting.

## Another Alternative: Upcoming in CSS

In the forthcoming [CSS Text Level 4](https://www.w3.org/TR/css-text-4/) developers will be able to use a combination of [text-space-collapse](https://www.w3.org/TR/css-text-4/#white-space-collapsing), [text-space-trim](https://www.w3.org/TR/css-text-4/#white-space-trim) and [text-wrap](https://www.w3.org/TR/css-text-4/#text-wrap) to tell the browser how they want to handle whitespace.

Be careful if you implement these properties in modern browsers, according to caniuse.com entry on [CSS text-space-collapse property](https://caniuse.com/#search=text-space-collapse):

> This CSS property (formerly known as white-space-collapse or white-space-collapsing) is not supported in any modern browser, nor are there any known plans to support it.

Which is alarming because the only reference in the specification is in [section 3.1](https://drafts.csswg.org/css-text-4/#white-space-collapsing) where there is an outstanding issue:

> Issue 4: This section is still under discussion and may change in future drafts.

So take it with a grain of salt and test whatever solution you end up using.

## Links and Resources

* CSS Tricks Almanac: [white-space](https://css-tricks.com/almanac/properties/w/whitespace/)
* [CSS Text Level 4](https://www.w3.org/TR/css-text-4/)
