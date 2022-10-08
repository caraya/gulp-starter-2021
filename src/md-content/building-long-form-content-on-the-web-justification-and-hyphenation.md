# Building long-form content on the web: Justification and hyphenation

I had justification and hyphenation together because they have a similar impact on how we read online.

Hyphenation is the use of a hyphen (&hyphen;) to break up a word when it reaches the edge of a document or container.

At its most basic, hyphenation consists of two steps:

1. Set the language in the HTML element
2. Enable hyphenation in your CSS

To set the language use the HTML `lang` attribute with the appropriate [ISO Language Tag](https://www.w3.org/International/articles/language-tags/)

```html
<html lang="en">
  <!-- . . . -->
</html>
```

To enable hyphenation use the following code:

```css
.container {
  -ms-hyphens: auto; /* Old Edge */
  -webkit-hyphens: auto; /* Safari */
  hyphens: auto; /* Everyone else */
}
```

This will enable the default hyphenation settings for the browser but there are additional settings to control details about hyphenation so that, where they work, designers have similar controls to authors using InDesign and other DTP software.

Rather than bore you with the details, I will refer you to [All you need to know about hyphenation in CSS](https://medium.com/clear-left-thinking/all-you-need-to-know-about-hyphenation-in-css-2baee2d89179)

Justification tries to fill each line with as much text as possible. In CSS, justification is controlled by the following values of the `text-align` property (definitions taken from [CSS Text Module Level 3](https://drafts.csswg.org/css-text/))

justify
: Text is justified according to the method specified by the [text-justify](https://drafts.csswg.org/css-text/#propdef-text-justify) property, in order to exactly fill the line box. Unless otherwise specified by [text-align-last](https://drafts.csswg.org/css-text/#propdef-text-align-last), the last line before a forced break or the end of the block is [start](https://drafts.csswg.org/css-text/#valdef-text-align-start)-aligned.

justify-all
: Sets both [text-align-all](https://drafts.csswg.org/css-text/#propdef-text-align-all) and [text-align-last](https://drafts.csswg.org/css-text/#propdef-text-align-last) to [justify](https://drafts.csswg.org/css-text/#valdef-text-align-justify), forcing the last line to justify as well.

Using the property would look like this:

```css
p {
   text-align: justify;
}
```

See the following Codepen to compare how ragged (left/start aligned) and justified text look like:

<iframe height="550.7933959960938" style="width: 100%;" scrolling="no" title="Justified Text" src="https://codepen.io/caraya/embed/poVyKjY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/caraya/pen/poVyKjY">
  Justified Text</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

In the end, it should be up to the user whether to enable hyphenation and justification and the values will depend on the text we're working with.
