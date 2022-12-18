# Locale aware string splitting

In Javascript, the [intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object provides several locale-aware tools to work with in Javascript.

One of those tools is the [segmenter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) object. The segmenter object enables locale-aware segmentation from a string with selectable granularity (grapheme, word and sentence).

a grapheme is a single character, regardless of how many codepoints it takes to display it. "🫵" is one grapheme, so is a space " "

Words and sentences are self-explainatory.

We first create a segmenter object with two parameters:

A valid language code and the granularity that we want to use. For this example, we're using `word` as the granularity.

```js
const segmenterEs = new Intl.Segmenter(
  'es', { 
  granularity: 'word'
});
```

Next we use the segmenter to create a list of all the segments and assign them to a constant that we'll use to do something with the segments.

```js
const segments = segmenterEs.segment(
  "Me gustas cuando callas porque estás como ausente"
);
```

Finally we do something with the segments. In this case I chose to use [array of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) to loop through the segments and log them to console.

```js
for (const segment of segments) {
  console.log(segment.segment);
}
```

It should be just as easy to append the segments to an existing element or search the segments for a given string.
