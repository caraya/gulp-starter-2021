# Center vertically and horizontally

I was working on typesetting poems when I thought what it would take to center a piece of content both vertically and horizontally?

For image and smaller blocks of text like poems, I choose to work with [flexbox](https://www.w3.org/TR/css-flexbox-1/) as it provides, in my opinion, the simplest way to center content on both axes without scripting.

The code looks like this:

```css
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

Some caveats:

* You must set an explicit height for the container, in this case 100vh. Otherwise there is no height to center to
* Because we're centering all the content it may be a good idea to create an inner container, otherwise paragraphs and other individual elements may be centered and cause unexpected results.

You can see working examples of this in my [poema 6](https://web-layout-experiments.firebaseapp.com/demo26.html) and [poema 19](https://web-layout-experiments.firebaseapp.com/demo27.html) demos. An [editable example of poema 6](https://codepen.io/caraya/pen/mzQjzV) is in Codepen.
