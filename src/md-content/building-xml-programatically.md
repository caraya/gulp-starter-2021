# Building XML programatically

XML still hunts us. There are still XML vocabularies that are necessary for the web to work well. One of these vocabularies is [SVG](https://www.w3.org/TR/SVG11/), a means to create vector and mixed vector/raster graphics for the web.

Writing these elements by hand can be error prone and it's defnitely not fun. When researching another project (how to create a `content.opf` file for epub), I found the [xmlbuilder2](https://oozcitak.github.io/xmlbuilder2/) library and it was a huge help for creating basic XML, including nested elements. So I started looking at how to use `xmlbuilder` to create basic SVG elements that I can reuse in my projects.

The post will look at the basics of building XML with `xmlbuilder` and then at how to create SVG elements.

## The Basics

The basic routine is to use the `create()` method to create the XML document and then use one of these basic methods:

* `.ele` creates an element
* `.att` creates an attribute for the parent element
  * You can add multiple attributes by passing an array of attributes instead of a single one
* `.txt` insert the text as the text of the parent and forces a closing tag for the parent
* `.up` closes the current element

```js
const root = create()
  .ele('root')
    .ele('foo')
      .txt('foo has text and attributes')
      .att({
        att2: 'val2',
        att3: 'val3',
      })
    .up() // closes foo
    .ele('bar')
      .txt('Bar is a child of foo')
    .up() // Closes bar
    .ele('baz').up() // closes baz
  .up(); // closes root

// convert the XML tree to string
const xml = root.end({
  headless: true,
  prettyPrint: true
});
console.log(xml);
```

Now that we have a basic XML element, we'll look at how to create SVG elements.

## Creating SVG

Elements in SVG use the basic elements with new additions. They use [XML namespaces](https://www.w3.org/TR/xml-names/) in addition to the bacis elements discussed above.

The major change is the introduction of namespaces to separate the different vocabularies we use in our SVG.

Whe creating the root element of the SVG document, we add a default namespace ([SVG](https://w3.org/TR/SVG11)) and then we add attributes for any additional namespaces we use, in this case the [XLink](https://www.w3.org/TR/xlink).

Note that to make things easier and avoid repetitive typing we created constants for the namespaces we use.

When reading an SVG file, the browser assumes that any element without a namespace belongs in the default namespace for the document. Other namespaces need to be explicitly called for their elements or it will result in an error and be ignored.

```js
const svgNs = 'http://www.w3.org/2000/svg';
const xlinkNs = 'http://www.w3.org/1999/xlink';

.ele(svgNs, 'svg')
  .att('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', xlinkNs)
```

The complete basic SVG element creates a ricle with a set of dimensions, a fill and a stroke.

It adds multiple attributes using the attribute array method to add the element attributes:

* `cx`
* `cy`
* `r`
* `fill`
* `stroke`

```js
import { create } from 'xmlbuilder2';

const svgNs = 'http://www.w3.org/2000/svg';
const xlinkNs = 'http://www.w3.org/1999/xlink';

const doc = create()
  .ele(svgNs, 'svg')
    .att('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', xlinkNs)
  .ele(svgNS, 'circle')
    .att({
      cx: 50,
      cy: 50,
      r: 48,
      fill: 'none',
      stroke: '#000'
    })
  .up();

const xmlString = doc.end({
  headless: true,
  prettyPrint: true
});
// optional during development
console.log(xmlString);
```

Running the code will produce the following SVG output:

```xml
<svg xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="50"
          cy="50"
          r="48" 
          fill="none"
          stroke="#000"/>
</svg>
```

## Building complex SVG

We'll leverage the work we've done so far with a few more elements to make it interesting.

We createour root element and build the nested structure for the elements.

The `xlink:href` attribute could be built with `xmlbuild2` functionality but I haven't figured out how to do it yet.

```js
const root = create()
  .ele('svg')
  .att({
    width: 600,
    height: 450,
    viewbox: '0 0 600 450',
  })
  .ele('filter')
    .att('id', 'myFilter')
    .ele('feGaussianBlur')
      .att('stDeviation', 5)
    .up() // closes feGausianBlur
  .up() // closes filter
  .ele('image')
    .att('xlink:href', 'image.png')
    .att({
      width: '100%',
      height: '100%',
      x: 0,
      y: 0,
      filter: 'url(#myFilter)',
    })
.up(); // closes svg
const xml = root.end({ headless: true, prettyPrint: true });
console.log(xml);
```

The code will produce the following SVG code.

```xml
<svg  width="600"
      height="450"
      viewbox="0 0 600 450">
  <filter id="myFilter">
    <feGaussianBlur stDeviation="5"/>
  </filter>
  <image  xlink:href="image.png" 
          width="100%"
          height="100%"
          x="0"
          y="0"
          filter="url(#myFilter)"/>
</svg>
```

## Modularizing the code

The code in the previous section works but it's tedious to build and can lead to errors when inserting new elements or attributes.

We can create fragments and insert them into the root document. This will give us flexibility of what we import and where we place it in the root document

We need to import the `fragment` method. The import instruction looks like this:

```js
import {
  create,
  fragment
} from 'xmlbuilder2';
```

We use the fragment method to create a new fragment, in this case the fragment contains the instructions to creaate the filter portion of the SVG

```js
const filter1 = fragment()
  .ele('filter')
    .att('id', 'myFilter')
    .ele('feGaussianBlur')
      .att('stDeviation', 5)
    .up() // closes feGausianBlur
  .up(); // closes filter
```

In our root SVG element we use the `import` method refercing the variable holding our XML fragmet where want to place it in the root element code.

```js
const root = create()
  .ele('svg')
  .att({
    width: 600,
    height: 450,
    viewbox: '0 0 600 450',
  })
  .import(filter1)
  .ele('image')
  .att('xlink:href', 'image.png')
  .att({
    width: '100%',
    height: '100%',
    x: 0,
    y: 0,
    filter: 'url(#myFilter)',
  })
  .up(); // closes svg
const xml = root.end({ headless: true, prettyPrint: true });
console.log(xml);
```

With a setup like this, we can create as many fragments as we need and use them to build out the document as needed.

## Building more complex documents

Rather than rehashing it here, I'll direct you to [Creating epub3 content.opf file](https://publishing-project.rivendellweb.net/creating-epub3-content-opf-file/) for an example of how to build more complex XML files using techniques like the ones discussed in this post.
