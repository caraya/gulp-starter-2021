# Paged Media Update

Ever since I wrote my [original research on paged media](http://publishing-project.rivendellweb.net/css-paged-media/) the specs have changed considerably. Here's an update based on the following specifications:

* [CSS Paged Media Level 3](http://www.w3.org/TR/css3-page/) Working Draft from 3/14/13
* [CSS Generated Content for Paged Media Module](http://dev.w3.org/csswg/css-gcpm/#propdef-footnote-policy) editor draft from 8/7/14
* [Antenna House Formatter Onine Manual](http://antennahouse.com/XSLsample/help/V62/AHFormatterV62.en.pdf) downloaded 8/17/14
* [Prince XML User Guide](http://www.princexml.com/doc/9.0/) last accessed 8/17/14

I've also tailored the project to work with Antenna House Formatter and Prince XML. Some of the idiosyncracies will come up while developing the stylesheet for this project.

## HTML to be used in these examples

The basic HTML  file that will be used throughout these examples is below. It's not a complete example by any stretch of the imagination but it will be enough to get us started.

```html
<html>
<head>
<title>My Awesome Book</title>
<meta charset="utf-8">
</head>
<body data-type='book'>
<section data-type='titlepage'>
<h1 class='title'>Lorem Ipsum</h1>
<h2 class='author'>Carlos Araya</h2>
</section>
<section data-type="toc">
  <!-- TO BE POPULATED LATER-->
</section>
<section data-type='chapter'>
  <p class="rh">Introduction</p>
  <h1>Introduction</h1>
  <p>Lórem ípsum dolór sít amet, vix graeco minímum no. Iudicó atomorum praesent cum éi. Méa quem accumsan adversárium ño, ut mea illum corpora. Vídit aperiri partieñdo iñ duo, vel dicta antiopam médiocrem ád. Et omnés dolorúm perpetua eúm, est át ália labore adversaríum.
  </p>
  <p>
 Usu et adhuc phaedrum philosophiá, nec posidónium mediocritatem et, dólorum euripidis mediocritátem per et. Vís harum adipiscing ei. Et eos qúañdo primis quodsi. Nullám accusata expetenda mel et. Facilisi deseruísse qui at, módo tritáñi legéndos id ius. Denique splendide dispútando ad sit, néc ex tale bonorum consulatu.
  </p>
  </section>
  </body>
  </html>
```
There are a few things to notice:

+ This is not a complete document. It lacks many of the features from the stylesheet
+ Each chapter title is set up twice
    +  First as a paragraph with <code>rh</code> class that we'll take out of the regular flow of text and  use as our running headder
    +  The second one, wrapped on h1 tags, will be shown as part of the flow of text
+ Instead of classes or ID attributes, we use data-type attributes to model after epub and the epub:type attributes

## Defining the base page

To define the base page we've used the following three elements

The first one defines our default page and attributes.  We reset the counter for every page and lay the footnotes at the bottom of every page spanning all pontential columns and allowing the height to take as much as it need to in order to fill the content.

```css
@page {
  size: 8.5in 11in;
  margin: 0.5in 1in;
  /* Footnote related attributes */
  counter-reset: footnote;
  @footnote {
    counter-increment: footnote;
    float: bottom;
    column-span: all;
    height: auto;
    }
  }
```

For the chapter page we set up the layout of a running footer but doesn't tell the page what the content of the footer is, just placement and content

```css
@page chapter {
  @bottom-center {
    vertical-align: middle;
    content: element(heading);
  }
}
```
For the body of our css, body tag where the data-type is book, we set up a [CMYK color](http://en.wikipedia.org/wiki/CMYK_color_model)  rather than RGB as CMYK is what printers use. We also setup automatic hyphenation for the entire document so we don't have to worry about it later.

```css
body[data-type="book"] {
  color: cmyk(0%,0%,100%,100%);
  hyphens: auto;
}
```
## Counters

```css
/* page counters  */
body[data-type="book"] > div[data-type="part"]:first-of-type,
body[data-type="book"] > section[data-type="chapter"]:first-of-type { counter-reset: page 1 }
body[data-type="book"] > section[data-type="chapter"]+div[data-type="part"] { counter-reset: none }
```

We are setting page counters up so that they'll reset when we want them to. We set the following scenarios:

* When there is a part element that is the first of type direct child of book <code>body[data-type="book"] > div[data-type="part"]:first-of-type</code> or
* There is a chapter child that is the first of type direct descendant of book <code>body[data-type="book"] > div[data-type="part"]:first-of-type</code>

Then reset the counters for page to 1. 

* if the first direct child of a book is a chapter that has a part siblibling <code>body[data-type="book"] > section[data-type="chapter"]+div[data-type="part"] { counter-reset: none }</code>

Do **not** reset the page counter

## Title Page

```css
/* Title Page*/
section[data-type="titlepage"] { page: titlepage }
section[data-type="titlepage"] * { text-align: center }

```

For the title page we made minimal customizations, we could definitely do more.  We have chosen to align all the content

## Front Matter

We define a series of pages to handle our front matter. We could define fewer pages but then we'd have to create them as we need them and that's work we don't need to do unless we really need to

### Copyright

```css
/* Copyright page */
section[data-type="copyright"] { page: copyright }
```

We define a page for copyright and other legal information.  We are leaving it empty by default. 

### Dedication

```css
/* Dedication */
section[data-type="dedication"] { page: dedication }
section[data-type="dedication"] p { font-style: italic }
section[data-type="dedication"] * { text-align: center }
```
For the dedication element we center all the content and we make all paragraphs italic. 

### Table of Content
```css
/* TOC */
nav[data-type="toc"] { page: toc }
nav[data-type="toc"] ol { list-style-type: none }
```
Make the nav containing our TOC have an ordered list without numbers. This is the best semantics for the TOC I've found. 

### Foreword and Preface

```css
/* Foreword  */
section[data-type="foreword"] { page: foreword }

/* Preface*/
section[data-type="preface"] { page: preface }
```

We mark both of these sections up but we don't do any particular styling for them, not yet 

### Front Matter Page Definition

```css
/* Comon Front Mater Page Numbering in lowercase ROMAN numerals*/
/* Right Side */
@page toc:right {
  @bottom-right-corner { content: counter(page, lower-roman) }
  @bottom-left-corner { content: normal }
}

@page foreword:right {
  @bottom-right-corner { content: counter(page, lower-roman) }
  @bottom-left-corner { content: normal }
}

@page preface:right {
  @bottom-right-corner { content: counter(page, lower-roman) }
  @bottom-left-corner { content: normal }
}

/* Left Side*/
@page toc:left  {
  @bottom-left-corner { content: counter(page, lower-roman) }
  @bottom-right-corner { content: normal }
}

@page foreword:left  {
  @bottom-left-corner { content: counter(page, lower-roman) }
  @bottom-right-corner { content: normal }
}

@page preface:left  {
  @bottom-left-corner { content: counter(page, lower-roman) }
  @bottom-right-corner { content: normal }
}
```

We define each set of pages (left and right) to allow setup of different elements on each facing page. On the left side pages we place the page number on the bottom left corner and we set it in the opposite corner for the right side. The page number is in addition to the running footer we set earlier

## Parts, Chapters and Appendices

```css
/* Part */
div[data-type="part"] { page: part }
```

Parts are the largest containers for our books, Right now they have no other definition but can be further extended 

```css
/* Chapter */
section[data-type="chapter"] {
  page: chapter;
  page-break-before: always;
}

/* Appendix */
section[data-type="appendix"] {
  page: appendix;
  page-break-before: always;
}
```

Chapters and Appendices always start at the top of a page by using the page-break-before selector set to always. 

## Back Matter

```css
/* Glossary */
section[data-type="glossary"] { page: glossary }

/* Bibliography */
section[data-type="bibliography"] { page: bibliography }

/* Index */
section[data-type="index"] { page: index }

/* Colophon */
section[data-type="colophon"] { page: colophon }
```

The glossary, bibliography, index and colophon (to which I refer to as back matter) are set up with their own pages which we can style later. 


## Content Sections and Page Numbering

```css
/* Common Content Page Numbering  in Arabic numerals 1... 199 */
@page titlepage{ /* Need this to clean up page numbers in titlepage in Prince*/
  @bottom-right-corner { content: normal }
  @bottom-left-corner { content: normal }
}

/* Right Side*/
@page chapter:right  {
  @bottom-right-corner { content: counter(page) }
  @bottom-left-corner { content: normal }
}

@page appendix:right  {
  @bottom-right-corner { content: counter(page) }
  @bottom-left-corner { content: normal }
}

@page glossary:right,  {
  @bottom-right-corner { content: counter(page) }
  @bottom-left-corner { content: normal }
}

@page bibliography:right  {
  @bottom-right-corner { content: counter(page) }
  @bottom-left-corner { content: normal }
}

@page index:right  {
  @bottom-right-corner { content: counter(page) }
  @bottom-left-corner { content: normal }
}

/* Left Side */
@page chapter:left {
  @bottom-left-corner { content: counter(page) }
  @bottom-right-corner { content: normal }
}

@page appendix:left {
  @bottom-left-corner { content: counter(page) }
  @bottom-right-corner { content: normal }
}

@page glossary:left, {
  @bottom-left-corner { content: counter(page) }
  @bottom-right-corner { content: normal }
}

@page bibliography:left {
  @bottom-left-corner { content: counter(page) }
  @bottom-right-corner { content: normal }
}

@page index:left {
  @bottom-left-corner { content: counter(page) }
  @bottom-right-corner { content: normal }
}
```

Like what we did with the front matter page numbering in roman numerals we do with our content and back matter pages using Arabic numerals

#Element Definitions

The following definitions are meant for the content.

##
```css
/*  Block Elements*/
h1, h2, h3, h4, h5, h6 {
  hyphens: none;
  text-align: left;
}

h1.bookTitle { font-size: 200%; }
h2.author {
  font-size: 150%;
  font-style: italic;
}

```

All our headings are aligned left and will not be hyphenated. If a word would be hyphenated it will be moved to the next line instead.

We also setup specific styles for headings in our title page. We make the title <code>h1.bookTitle</code> 2 times bigger than our standard text and the name of the author <code>h2.author</code> italics and 1.5 times larger than the standard text size. 

## Paragraphs

```css
p {
  orphans:4; /* min number of lines of a paragraph left at bottom of a page */
  widows:2; /* min number of lines of a paragraph that left at top of a page.*/
}

p.rh {
  position: running(heading);
  text-align: center;
  font-style: italic;

}
```

We set up orphans and widows for our paragraphs. Orphans and Widows are typographic terms that refer to hanging lines at the beginnig or end of a paragraph

Widows refer to:

* A paragraph-ending line that falls at the beginning of the following page/column, thus separated from the rest of the text.

Orphans refer to:

* A paragraph-opening line that appears by itself at the bottom of a page/column.
* A word, part of a word, or very short line that appears by itself at the end of a paragraph. Orphans result in too much white space between paragraphs or at the bottom of a page.

In our setup we don't want paragraphs shorter than 2 lines to appear at the top of the page or paragraphs shorter than 4 lines to appear at the bottom. If either of those conditions are met move the entire paragraph to the next page.

We also use a paragraph style to set the content of our running header. We take the paragraph with class rh (<code>p.rh</code> and make it the text of our running header defined earlier. We then center it and make it italic to distinguish it from any surrounding text. 

```css
img { max-width: 100% }

code { font-family: monospace }
```

We make sure that images will take the full width available to them and that code will be laid out in a monospaced font. 

## Footnotes


```css
/*
  Footnotes
*/
span.footnote {
  float: footnote;
}
```

The paged media and generated content for paged media specifications define a new value for the float attribute to be used with footnotes. 


```css
::footnote-marker {
  content: counter(footnote);
  list-style-position: inside;
}

::footnote-marker::after {
  content: '. ';
}

::footnote-call {
  content: counter(footnote);
  vertical-align: super;
  font-size: 65%;
}
```

We define three pseudoclasses  for footnotes. We create a footnote-marker with the footnote counter's current value as the content (<code>content: counter(footnote);</code>) and with a list stye position attribute. We then add a period (.) after it by using the after pseudo class <code>::footnote-marker::after</code>

To call the footnotes we use the footnote-call pseudoclass (<code>::footnote-call</code>) and style it as a smaller superscript for the footnote number. 

## PDF Bookmarks

```css
/*
  Bookmarks
*/
section[data-type="chapter"]  h1 {
  -ah-bookmark-level: 1;
  -ah-bookmark-state: open;
  -ah-bookmark-label: content();
  prince-bookmark-level: 1;
  prince-bookmark-state: closed;
  prince-bookmark-label: content();
  bookmark-level: 1;
  bookmark-state: closed;
  bookmark-label: content();}

section[data-type="chapter"]  h2 {
  -ah-bookmark-level: 2;
  -ah-bookmark-state: closed;
  -ah-bookmark-label: content();
  prince-bookmark-level: 2;
  prince-bookmark-state: closed;
  prince-bookmark-label: content();
  bookmark-level: 2;
  bookmark-state: closed;
  bookmark-label: content();}

section[data-type="chapter"]  h3 {
  -ah-bookmark-level: 3;
  -ah-bookmark-state: closed;
  -ah-bookmark-label: content();
  prince-bookmark-level: 3;
  prince-bookmark-state: closed;
  prince-bookmark-label: content();
  bookmark-leve: 3;
  bookmark-state: closed;
  bookmark-label: content();}

section[data-type="chapter"] h4 {
  -ah-bookmark-level: 4;
  prince-bookmark-level: 4;
  bookmark-level: 4;
}

section[data-type="chapter"] h5 {
  -ah-bookmark-level: 5;
  prince-bookmark-level: 5;
  bookmark-level: 5;
}

section[data-type="chapter"] h6 {
  -ah-bookmark-level: 6;
  prince-bookmark-level: 6;
  bookmark-level: 6;
}
```

One of the best features of the PDF generated from HTML/CSS is the ability to generate PDF bookmarks for the document content. Antenna 

In this particular case, we'll create bookmarks for chapters only. 

Level 1 boomarks are based on the <code>h1</code> element and it's created as level 1 PDF header that is open by default. The label for the bookmark is the content of the associated tag. 

Level 2 and level 3 are based on <code>h2</code> and <code>h3</code> respectively. They are linked to level 2 and level 3 bookmark levels and are closed by default to make the tree narrowers. 

Level 4 through 6 are only associated with a bookmark level, nothing else. 

**Note how we repeat the content for each bookmark level 3 times, once with the Antenna House prefix, once with Prince and one unprefixed (although I don't know if there is any vendor supporting the unprefixed properties)**

# Creating the PDF

Now that we have seen the CSS code needed to create the PDF, let's see how to use the tools to create the PDF. I've tested the code with both [Antenna House Formatter](http://www.antennahouse.com/) and [Prince XML](http://www.princexml.com/) 

## Antenna House Formatter

```bash
/usr/local/AHFormatterV62/run.sh -d \
        paged-media.html -s \
        paged-media.css \
        -o ahf-test.pdf
/usr/local/AHFormatterV62/bin/AHFCmd 
        -d paged-media.html 
        -s paged-media.css 
        -o ahf-test.pdf
AHFCmd : AH Formatter V6.2 MR3 Evaluation for MacOSX (x86) : 6.2.5.18171 (2014/08/04 16:28JST)
         Copyright (c) 1999-2014 Antenna House, Inc.
AHFCmd :Formatting finished normally :total 16 pages
```

So far Antenna House has provided the best solution for creating paged content from HTML. 

The main drawback of Antenna House is cost. Their evaluation version puts a page-sized watermark on every page of the output PDF and the watermark curs oer text, sometimes making it look like the text itself was not set or printed correctly. 

The price starts at $400 for a standard XSL or CSS processor to $560 for both CSS and XSL processors as a single-user standalone version. This includes support. 

## Prince XML

```bash
prince -s paged-media.css \
        --no-author-style \
        paged-media.html \
        -o prince-test.pdf
```

Prince XML is another commercial solution that provides a fairly decent level of support. The current stylesheet prints page number in the blank page before the first chapter and ignores the page numbering for the table of content. 

Cost is also a consideration with Prince although less so than with Antenna House. The $495 price tag includes all formats supported by the processor. 

## Other solutions

In earlier documents I mentioned open source solutions. I've tested the solutions mentioned in the [earlier article](http://publishing-project.rivendellweb.net/css-paged-media/) against the new stylesheet. The results are show below

### wkhtml2pdf

This product produced a bookmarked PDF but the result was less than optimal:

* It moved the running footer to the header
* It skipped page number altogether
* It ignored our orphans and widows setting

Even with all these shortcomings this is the best option so far for creating paged media (PDF) using open source tools. 

### xhtml2pdf

This program can capture HTML+CSS output but seems to have a problem with the CSS in our stylesheet. I ran the command below with the error show below it. There seems to be an issue with the CSS parsers this application uses. 

```bash
xhtml2pdf --css paged-media.css paged-media.html xhtml2pdft-test.pdf
Converting paged-media.html to /Users/carlos/code/css-paged-media/xhtml2pdft-test.pdf...
Traceback (most recent call last):
  File "/usr/local/bin/xhtml2pdf", line 9, in <module>
    load_entry_point('xhtml2pdf==0.0.5', 'console_scripts', 'xhtml2pdf')()
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/pisa.py", line 146, in command
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/pisa.py", line 363, in execute
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/document.py", line 89, in pisaDocument
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/document.py", line 57, in pisaStory
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/parser.py", line 673, in pisaParser
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/context.py", line 486, in parseCSS
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/w3c/cssParser.py", line 434, in parse
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/w3c/cssParser.py", line 533, in _parseStylesheet
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/w3c/cssParser.py", line 653, in _parseAtKeyword
  File "build/bdist.macosx-10.9-x86_64/egg/xhtml2pdf/w3c/cssParser.py", line 751, in _parseAtPage
TypeError: 'NotImplementedType' object is not iterable
```

### Phantom JS

Phantom completed the capture but it had the following issues:

* Ignored page breaks
* It used the font size specified for one element for all the text in the document
* No page numbers 
* No running footers (or headers)
* It did not create all the pages in the document

Phantom is not suited to this task. It'll capture basic pages and process them into PDF but the nature and structure of this particular document/style sheet combination make it ill suited for processing by Phantom. 
