# XSL-FO instead of CSS

When I first conceptualized my [XML workflow](http://publishing-project.rivendellweb.net/category/xml-workflow/) I purposefully stayed away from XSL-FO as I considered it too cumbersome and it requires too much XML and XSLT to work with converted XML.

Recently I started thinking that keeping the entire process in XML may not be such a bad idea after all. As much as I like CSS Paged Media, it is one more set of CSS style sheets to maintain and there is another set of vendor prefixes to track and use (one set for Prince XML and one set for Antenna House.) While two vendors may not sound too problematic you have to remember that this is in addition to all the vendor prefixes you handle in your regular CSS. 

It is also worth noting that the tools that handle prefixes in regular CSS do not work with Paged Media or Paged Media extensions (you will only learn the pain if you have to do PDF bookmarks using Paged Media extensions.)

XSL-FO is not without drawbacks. The language is hard to work with and is XML-based which means that it uses a lot of the same restrictions as XHTML does and more. To get the best result from your XML document you have to create an XSLT style sheet that generates the correct XSL-FO output and then run that through your XSL-FO processor (we'll discuss options when we talk about XSL-FO processors later in this post.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:axf="http://www.antennahouse.com/names/XSL/Extensions">
  <fo:layout-master-set>
    <fo:simple-page-master 
         margin="25mm 25mm 25mm 25mm" 
         master-name="PageMaster-TOC" 
         page-height="8in" page-width="11in">
          <fo:region-body margin="0mm 0mm 0mm 0mm"/>
      </fo:simple-page-master>
      <fo:simple-page-master 
         margin="25mm 25mm 25mm 25mm" 
         master-name="PageMaster-Cover"
         page-height="8in" page-width="11in">
          <fo:region-body margin="0mm 0mm 0mm 0mm"/>
      </fo:simple-page-master>
      <fo:simple-page-master 
         margin="10mm 00mm 10mm 00mm" 
         master-name="PageMaster-Body" 
         page-height="8in" page-width="11in">
          <fo:region-body margin="15mm 25mm 15mm 25mm"/>
          <fo:region-before region-name="header" 
            extent="10mm" 
            display-align="after"/>
          <fo:region-after region-name="footer" extent="10mm" display-align="before"/>
          <fo:region-start region-name="start" extent="20mm"/>
          <fo:region-end region-name="end" extent="20mm"/>
      </fo:simple-page-master>
      <fo:simple-page-master 
         margin="10mm 00mm 10mm 00mm" 
         master-name="PageMaster-Blank" 
         page-height="8in" page-width="11in">
          <fo:region-body region-name="body-blank" margin="15mm 25mm 15mm 25mm"/>
          <fo:region-before region-name="blank-header" extent="10mm" display-align="after"/>
      </fo:simple-page-master>
      <fo:page-sequence-master master-name="PageMaster">
          <fo:repeatable-page-master-alternatives>
              <fo:conditional-page-master-reference master-reference="PageMaster-Body" blank-or-not-blank="not-blank"/>
              <fo:conditional-page-master-reference master-reference="PageMaster-Blank" blank-or-not-blank="blank"/>
          </fo:repeatable-page-master-alternatives>
      </fo:page-sequence-master>
  </fo:layout-master-set>
  <fo:page-sequence master-reference="PageMaster-Cover" force-page-count="no-force">
      <fo:flow flow-name="xsl-region-body" font-size="18pt">
          <fo:block space-before="25mm" space-before.conditionality="retain" space-after="60mm" font-size="24pt" font-family="Arial" display-align="center" text-align="center" text-align-last="center" start-indent="18mm" end-indent="18mm" width="130mm" height="20mm" background-color="#EEEEEE" border-style="outset" border-color="#888888" padding-top="5pt" padding-bottom="5pt">
              <fo:block>Page-sequence Sample for Book</fo:block>
          </fo:block>
          <fo:block-container space-after="5mm" font-size="14pt" font-family="Times New Roman" text-align="center" text-align-last="center" >
              <fo:block>Nov 2004</fo:block>
          </fo:block-container>
          <fo:block-container font-size="14pt" font-family="Times New Roman" text-align="center" text-align-last="center" >
              <fo:block>
                  <fo:block space-after="1em">
                      <fo:external-graphic src="img/ahlogo.png" content-width="41.54mm" content-height="8.73mm"/>
                  </fo:block>Based on code from Antenna House, Inc.</fo:block>
          </fo:block-container>
      </fo:flow>
  </fo:page-sequence>
</fo:root>
```
The example above, taken from Antenna House's [Sample Files of Formatting Objects](http://www.antennahouse.com/XSLsample/FOsample.htm) shows how to create master pages and how to incorporate content and styles into the formatting objects. This is not a complete example, check [the full version](http://www.antennahouse.com/XSLsample/FOsample.htm) and the [resulting PDF](http://www.antennahouse.com/XSLsample/pdf-v32/Sample-page-seq-book.pdf) for how it looks when ready to print.

## Content Driven or Layout Driven

The first thing to remember when working with XSL-FO (FO from here on) is that we'll work it in an XSLT stylesheet that will take the XML files as input and will produce a FO file suitable to convert to PDF.

Before we start working on our stylesheet(s) we need to make some decisions about the structure of our stylesheets. The first, and most important one, is which of the available content models we want to use. XSLT (and by extension FO) provides two content models: Content and Layout.

In a Content Driven document, we use the content as a template to generate containers and place the content in these newly generated containers. If you've looked at the source code for the XML workflow, you'll see that the stylesheet goes in document order and matches elements in the documents to templates in the stylesheet that have tags and other elements that are attached to the content.

Layout Driven documents match the content to the layout. If content in those documents does not fit in the required space, some of it is trimmed away until it does fit. XSL-FO does not easily handle the tight restrictions of layout driven documents; indeed, in many cases, it lacks the ability to express some forms of said layout. If this is the kind of document that you're wanting to create and print is your target format you may be better off working with tools like InDesign or other Desktop Publishing tools.


## Documents and Page Flows

The first thing we need to do is define our pages and the sequence that we will use them on. In this example, combined from the Antenna House example above with some basic XSLT, we create a template that will generate the `page-master-set`, the `simple-page-master` objects that define each page type and the `page-sequence-master` that defines what simple page master that the stylesheets will use if the page is blank and if it's not.

```xml
<xsl:template name="setup.pagemasters">
  <fo:layout-master-set>
    <fo:simple-page-master 
      master-name="PageMaster-Cover"
      margin="1in 1in 1in 1in" 
      page-height="11in" page-width="8.5in">
      <fo:region-body margin="0in 0in 0in 0in"/>
    </fo:simple-page-master>

    <fo:simple-page-master 
      master-name="PageMaster-Body" 
      margin="1in 1in 1in 1in"
      page-height="11in" page-width="8.5in">
      <fo:region-body margin="15mm 25mm 15mm 25mm"/>
      <fo:region-before region-name="header" 
        extent="10mm" 
        display-align="after"/>
      <fo:region-after region-name="footer" extent="10mm" display-align="before"/>
      <fo:region-start region-name="start" extent="20mm"/>
      <fo:region-end region-name="end" extent="20mm"/>
    </fo:simple-page-master>

    <fo:simple-page-master 
       master-name="PageMaster-Blank" 
       margin="10mm 00mm 10mm 00mm" 
       page-height="8in" page-width="11in">
        <fo:region-body region-name="body-blank" margin="15mm 25mm 15mm 25mm"/>
        <fo:region-before region-name="blank-header" extent="10mm" display-align="after"/>
    </fo:simple-page-master>

    <fo:page-sequence-master master-name="PageMaster">
        <fo:repeatable-page-master-alternatives>
            <fo:conditional-page-master-reference master-reference="PageMaster-Body" blank-or-not-blank="not-blank"/>
            <fo:conditional-page-master-reference master-reference="PageMaster-Blank" blank-or-not-blank="blank"/>
        </fo:repeatable-page-master-alternatives>
    </fo:page-sequence-master>
  </fo:layout-master-set>
</xsl:template>
```
### Regions in a FO document

Regions in FO are diffrent than the proposed region standard being debted in the CSS working group. FO has 5 predefined regions, as shown in the image below. It is also important to note that the regions will be placed differently in left-to-right and right-to-left layouts. This is an important consideration if your project involves right to left lanugages.

[caption id="attachment_786640" align="aligncenter" width="500"]<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/07/regions-lr-rl.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/07/regions-lr-rl.png" alt="Regions in XSL-FO, both right to left and left to right" width="500" height="340" class="size-full wp-image-786640" /></a> Regions in XSL-FO, both right to left and left to right[/caption]

### Working in sequences

Most of the time we want to do special things in the first page of a chapter (like a dropcap or maybe make the first paragraph slightly larger) or put page numbers in different places in odd and even pages. 

We can use multiple page masters for first page, even and odd pages and, in each page master we can set up different margins, place page number in different locations... any element we want to make different in neach of those pages (first, even, odd) we can add to the corresponding master.

[caption id="attachment_786639" align="aligncenter" width="500"]<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/07/masters.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2015/07/masters.png" alt="Multiple Page Master Sequence showing master for first, odd and even pages" width="500" height="222" class="size-full wp-image-786639" /></a> Multiple Page Master Sequence showing master for first, odd and even pages[/caption]

We can also create special masters for items that require special formatting. The theory is no different than what we did with CSS Paged Media, the difference is that, for FO, we do it in the XSLT rather than the CSS.

## XSLT attributes and attribute sets

Rather than type the same attributes over and over again we'll use XSLT attribute sets to reduce the code duplication (and possibility of errors.)

The attribute-set element looks something like this:

```xml
<xsl:attribute-set name='page-attributes'>
  <xsl:attribute name='margin'>1in 1in 1in 1in</xsl:attribute>
  <xsl:attribute name='page-height'>11in</xsl:attribute>
  <xsl:attribute name='page-width'>8.5in</xsl:attribute>
</xsl:attribute-set>
```

And then we can change then add the parameters when we're generating our  `simple-page-master` elements:

```xml
<xsl:template name='generate-page-master'>
  <fo:simple-page-master xsl:use-attribute-sets='page-attributes'>
    <!-- Cover content besides attributes go here -->
  </fo:simple-page-master>
</xsl:template>
```



## Blocks

We'll spend most of our time working in block elements as these are foundational to getting content on the page. I will do my best to provide the XSLT/FO template that creates the element.

### Paragraphs

```xml
<xsl:template match='para'>
  <fo:block></fo:block>
</xsl:template>
```

### Lists

### Images

## Inline elements

### Bold and Italics

# Miscelaneous Information

Information that, while  not strictly about XSL-FO code, it stil important to have :)

## Vendors

* Antenna House [XSL Formatter](http://www.antennahouse.com/antenna1/formatter/)
* RenderX [XEP Engine](http://www.renderx.com/tools/xep.html)
* Apache [FOP](http://xmlgraphics.apache.org/fop/)

## Resources and References

[XSL-FO](http://shop.oreilly.com/product/9780596003555.do) by Dave Pawson (O'Reilly)

[XSL FAQ](http://www.dpawson.co.uk/xsl/) particularly [XSL, XSL-FO FAQ](http://www.dpawson.co.uk/xsl/sect3/index.html) collected by Dave Pawson.

[Wikipedia Entry for XSL-FO](https://www.wikiwand.com/en/XSL_Formatting_Objects)

[ZVON.org's  XSL 1.1 reference](http://www.zvon.org/comp/r/ref-XSL_FO_1_1.html)

When in doubt, check the [specification](http://www.w3.org/TR/xsl/). Warning: **Not for the faint of heart**.

## Image Credits

[Page regions in XSL FO](http://inasmuch.as/2011/11/25/page-regions-in-xsl-fo/)
