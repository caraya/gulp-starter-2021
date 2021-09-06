---
title: Building a book collection in XML
date: 2015-03-15
category: Projects
status: draft
---

One of the reasons why I'm so interested in using XML as a source format for publishing projects is the idea of generating books and publishing them on demand in HTML, PDF, or ePub formats. THe makers of Exist-DB, an XML based database created a [demo application](http://exist-db.org/exist/apps/shakespeare/works/) that matches most of what I'd like to do for this project. 

The specific ideas are:

1. Build content in chapters
2. Provide a user interface to select what sections of what content to mix
3. Provide a UI to select the format to deliver the content in
3. Build the files for download
4. Provide an interface to download the files

## Build the content

One way to build the content is to use the [XML workflow](XML workflow) which currently provides (X)HTML and PDF outputs with current work in generating ePub3 and possibly Mobi using Kindlegen. Other options for content generation are Docbook (which already produces ePub and PDF through [XSL Formating Objects](http://www.w3.org/TR/2006/REC-xsl11-20061205/)), [DITA](http://dita.xml.org/) (which can also produce PDF and Docbook through the [DITA Open Toolkit](http://www.dita-ot.org/) using Docbook as the source for ePub) and the [Text Encoding Initiative (TEI)](http://www.tei-c.org/) using their [XSL stylesheets](http://www.tei-c.org/release/doc/tei-xsl/) that allow to convert to a variety of formats. 

The important thing is to select a format and remain consistent in its use. The problems begin when we mix documents and then expect the results to remain considtent. This means that we will have a limited selection of material to work from when the project starts and that the quantity of material will only increase as people contribute to the project.

Using an XML database makes it easier to host and query the content. They introduce new XML technologies that may not be familiar to people not working with them. The most important is [XQuery](http://www.w3.org/TR/2014/REC-xquery-30-20140408/) and its [companion spcifications](http://www.w3.org/blog/news/archives/3773)

There are many choices in the market, I've picked [Exist DB](http://exist-db.org/); an open source solution that provides access to XQuery, XSLT (the language we'll use to convert the XML to other formats) and, potentially, XSL (the language we'll use to conver the XML to Formatting objects which we will then transform to PDF.)


## Languages and Tools

Once we have chosen a format for our XML document and the database/application server we'll use we can start working on the code. 

For a first example we'll reuse most of the code already in place for the Shakespeare example from ExistDB and expand from there. As my level of comfort with XQuery and ExistDB grows the example will be further developed and the ideas will be fleshed out further. Of course, if you feel like contributing code you can always drop a pull request on the project's Github repository.

The first technical decision for our project is taken out of our hands, ExistDB is written in Java so that will be the underlying language for our application, all XML-related parsers are written in Java.

Beyond Java we will work with a variety of XML-related languages:

* XQuery to query the database and produce results
* XSLT to transform the XML into our target vocabulary(ies)
* XSL-FO to generate PDF versions of our content)
* XHTML5 (sorry purists but, because we're working in an XML environment, we have to use XHTML5 instead of plain HTML5. I consider the advantages worth the pain)

I've covered XSLT and XSL-FO when writing about my [XML publishing workflow](http://publishing-project.rivendellweb.net/category/xml-workflow/) and I believe it's a safe assumption that you already know how to create HTML5 and XHTML content

