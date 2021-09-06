# Generating AMP content

Ever since I started working on a piece about AMP I started thinking how hard it would be to generate AMP HTML programmatically instead of doing it by hand; similar to what wp-amp does in the Wordpress side.

Because this wouldn't be end-user facing there is no problem using a Java or C-based processor to run the conversion. This could also be included in a Gulp build file or as an NPM task.

The best XSLT processor is Saxon from [Saxonica](http://saxonica.com/welcome/welcome.xml) and available as an open source package from [Sourceforge](https://sourceforge.net/projects/saxon/files/Saxon-HE/9.8/).


The idea is to start from scratch and create a set of one or more XSLT stylesheets to convert HTML to AMP-HTML.

It takes HTML as an input (this could be the HTML we generate from Markdown) and it converts it to valid amp-html with the proper boilerplate on the page.

## Quick review of XLST

XSLT is one of those "X" languages that allow you to process XML and derived languages. The base concept of XSLT is the template. The example below creates a default template that will flag anything that doesn't match any element, print text to screen, and then continue processing the templates.

```xml
<xsl:template match="*">
  <xsl:message terminate="no">
    WARNING: Unmatched element: <xsl:value-of select="name()"/>
  </xsl:message>

  <xsl:apply-templates/>
</xsl:template>
```

