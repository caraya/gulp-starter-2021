# Using Counters in CSS

I've always wanted to avoid manually doing data replacement and numbering if I can avoid it.

We'll add counters for the following:

* Chapters defined by `<h2>` elements
* Sections defined by `<h3>` elements
* Figures will be tied to chapters
* Tables will be tied to chapters

We'll work with the headings first and then add whatever we need to so that figures and tables work as designed.

## Chapters, sections and subsection

The basic structure of the styles is the same: If needed we reset counters using `counter-reset` and increase the appropriate counters using `counter-increment`.

We then use the `::before` pseudo element to write the counter the way we want it to appear in the page.

```css
h2 {
  counter-reset: chapter, section, subsection;
  counter-increment: chapter;
}

h2::before {
  content: 'Chapter ' counter(chapter) ': ';
}

h3 {
  counter-reset: section, subsection;
  counter-increment: section;
}

h3::before {
  content: 'Section ' counter(chapter) '.' counter(section) ' ';
}
```

## Figures and tables

We only need to change one thing in our previous code to make it work with tables and figures.

In the `counte-reset` for chapters we need to add figures and tables

```css
h2 {
  counter-reset: chapter, section, subsection, figures, tables;
  counter-increment: chapter;
}
```

The figure and table rules are similar to what we already cover. The `figure` and `table` elements increate the counters and `figcaption` and `caption` use `::before` to display the counter text and values

```css
figure {
  counter-increment: figures;
}

figcaption::before {
  content: 'Figure ' counter(chapter) '-' counter(figures) ': ';
}

table {
  counter-increment: tables;
}

caption::before {
  content: 'Table ' counter(chapter) '-' counter(tables) ': ';
}
```

I realize that this is cumbersome but, as with many things in CSS, we trade complexity for Flexibility.

We can change the type of counters to uppercase roman characters by changing the declaration of the counter to make it match the numbering schema that we need.

In the example below we've changed the numbering schema to use an Arabic number for chapters and lowercase Roman numerals for the tables. The example would look `Table 2-A:`

```css
table {
  counter-increment: tables;
}

caption::before {
  content: 'Table ' counter(chapter) '-' counter(tables, upper-alpha) ': ';
}
```
