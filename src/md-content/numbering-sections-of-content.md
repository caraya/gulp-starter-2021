# Numbering sections of content

There ar times when we need to number things that are not ordered list.

The best example, from my experience is numbering sections of content in the `h1` element serving as the title for each section of content.

The idea is to turn this heading:

```html
<section>
  <h2>This is the first chapter</h2>
</section>
```

Into this text:

```text
Chapter 1: This is the first chapter.
```

Without adding additional markup to the document.

## One solution: Counters and generated content

Just like we did in a previous post to add content for figure captions, we'll leverage generated content and counters to insert text into the heading and automatically increase the numbering of our chapters.

The first thing we need to do is create a larger container to use as the base of the document where we will reset the counter for chapters. In this case I will use the `body` element.

```css
body {
  /* Whatever else you need */
  counter-reset: chapter-counter;
}
```

We then increment the counter for every `section` element since they will contain our chapters.

```css
section {
  counter-increment: chapter-counter;
}
```

Finally, we generate and add the text to the chapter's `h2` element using the `::before` pseudo-element.

```css
section h2::before {
  content: "Chapter " counter(chapter-counter) ": "
}
```

For the first chapter, this will insert the string: ***Chapter 1:*** before the text in the `h2` element.

As with any application of generated content you need to keep accessibility in mind.

The generated content may not work well with assistive technology. It may not work well with some screen readers or it may not work at all.

See [Accessible CSS Generated Content](https://yatil.net/blog/accessible-css-generated-content) for an example of why this is important.

## Full example

<p class="codepen" data-height="498.11138916015625" data-default-tab="html,result" data-slug-hash="oNqEbvY" data-user="caraya" style="height: 498.11138916015625px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/caraya/pen/oNqEbvY">
  Untitled</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
