---
title: XML workflows: From XML to PDF and how to get there
date: 2014-10-22
category: Technology
status: draft
---

# XML workflows: From XML to PDF and how to get there

One of the biggest limitations of markup languages, in my opinion, is how limiting they are. Even large vocabularies like [Docbook](http://docbook.org) are limited in what they can do out of the box. HTML4 is non-extensible and HTML5 is limited in how you can extend it (web components are the only way to extend HTML5 I'm aware of that doesn't require a new version of the HTML specification to be updated.)

By creating our own markup vocabulary we can be as expressive as we need to be without adding additional complexity for writers and users and without adding unecessary complexity for the developers building the tools to interact with the markup.

## Why create our own markup

I have a few answers to that question:

In creating your own xml-based markup you enforce separation of content and style. The XML document provides the basic content of the document and the hints to use elsewhere. XSLT stylesheets allow you to structure the base document and associated hints into any number of formats (for the purposes of this document we'll concentrate on XHTML, PDF created through Paged Media CSS and PDF created using XSL formatting Objects)

Creating a domain specific markup vocabulary allows you think about structure and complexity for yourself as the editor/typesetter and for your authors. It makes you think about elements and attributes and which one is better for the given experience you want and what, if any, restrictions you want to impose on your makeup.

By creating our own vocabulary we make it easier for authors to write clean and simple content. XML provides a host of validation tools to enforce the structure and format of the XML document.

## Options for defining the markup

For the rest of this post, we'll use a ***book-like*** structure. It'll look something like this:

```xml
<book 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="xsd/book-schema-draft.xsd">
  <metadata>
    <isbn>0123456789</isbn>
    <edition>1</edition>
    <title>title0</title>
    <author>
      <first-name>first-name0</first-name
      <surname>surname0</surname>
    </author>
    </metadata>
  <section type="chapter">
    <para></para>
    <para></para>
  </section>
</book>
```

```

### XML Schema

```xml
--Text goes here 
```


## Converting our content into HTML

One of the biggest advantages of working with XML 

## Is HTML the only option?

