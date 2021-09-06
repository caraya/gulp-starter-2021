<?xml version="1.0" encoding="utf-8"?>
<!--
<?xml-stylesheet href="http://www.w3.org/StyleSheets/base.css" type="text/css"?>
<?xml-stylesheet href="http://www.w3.org/2002/02/style-xsl.css" type="text/css"?>
<?xml-stylesheet href="http://www.w3.org/2002/07/01-style-xsl.xsl" type="application/xml"?>
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  version="2.0" xmlns:contact="http://www.w3.org/2000/10/swap/pim/contact#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:h="http://www.w3.org/1999/xhtml" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rec="http://www.w3.org/2001/02pd/rec54#" xmlns="http://www.w3.org/1999/xhtml" xmlns:date="http://www.w3.org/2001/08/date-util.xslt" xmlns:str="http://www.w3.org/2001/10/str-util.xsl" xmlns:doc="http://www.w3.org/2000/10/swap/pim/doc#" xmlns:org="http://www.w3.org/2001/04/roadmap/org#" xmlns:tra="http://www.w3.org/2002/01/tr-automation/process#" exclude-result-prefixes="contact dc rec rdf date str doc org tra">
  <xsl:import href="http://www.w3.org/2001/08/date-util.xslt"/>
  <xsl:import href="http://www.w3.org/2001/10/str-util.xsl"/>
  <xsl:output method="xml" indent='yes' encoding="utf-8"/>
  <xsl:param name="format" select="'xhtml'"/>
  <xsl:param name="uris"/>
  <xsl:param name="labels" select="0"/>
  <xsl:variable name="trdata" select="document('http://www.w3.org/2002/01/tr-automation/tr.rdf')"/>
  <xsl:variable name="body" select="document('http://www.w3.org/2002/01/tr-automation/tr-biblio-ui.html')"/>

  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Bibliography generator</title>
    </head>
    <body>
      <h1>Bibliography generator</h1>
      <p>This XSLT allows to get an XHTML formatted data for our TR publications, embedded in a &lt;dd> element. You can test it using the XSLT servlet by passing the (dated or not) URI(s) of the document(s) you want bibliographic data on:</p>
      <form action="http://services.w3.org/xslt" method="GET">
        <div>
          <input type="hidden" name="xslfile" value="http://www.w3.org/2002/01/tr-biblio.xsl" />

          <input type="hidden" name="xmlfile" value="http://www.w3.org/2002/01/tr-automation/tr-logs.rdf"/>
          <p><label>URI(s): <textarea name="uris" cols="100" rows="6"></textarea> (one URI per line if several)</label></p>
          <p>If you want a bibliography with labels to be generated, provide the said labels before their URIs (separating them with a space), and <label title="Check this if you provided labels in the preceding control">check this <input type="checkbox" name="labels" /></label>.</p>

          <input type="submit" value="Go" />
        </div>

      </form>
      <address><a href="http://www.w3.org/People/Dom/">Dominique Hazael-Massieux</a> - $Id: tr-biblio.xsl,v 1.44 2014-02-05 22:21:13 ijacobs Exp $</address>
    </body>
  </html>

  <xsl:template match="/">
    <xsl:apply-templates select="$body" mode="insert"/>
  </xsl:template>

  <xsl:template match="h:form[contains(@action,'xslt')]" mode="insert">
    <xsl:if test="normalize-space($uris)!=''">
      <h2>Results</h2>
      <dl class="lmargin tmargin">
	<xsl:call-template name="dispatch">
	  <xsl:with-param name="uris" select="$uris"/>
	</xsl:call-template>
      </dl>
    </xsl:if>
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" mode="insert"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="h:textarea" mode="insert">
    <xsl:copy>
      <xsl:apply-templates select="@*" mode="insert"/>
      <xsl:for-each select="$uris">
	<xsl:value-of select="."/><xsl:text>
</xsl:text>
      </xsl:for-each>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@*|node()" mode="insert">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*" mode="insert"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template name="dispatch">
    <xsl:param name="uris"/>    
    <xsl:if test="normalize-space($uris)">
      <xsl:variable name="uri">
        <xsl:choose>
          <xsl:when test="$labels">
            <xsl:value-of select="substring-before(concat(substring-after(normalize-space($uris),' '),' '),' ')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="substring-before(concat(normalize-space($uris),' '),' ')"/>                  
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <xsl:variable name="log">
        <xsl:variable name="dated_uri_log">
          <xsl:choose>
            <xsl:when test="$trdata//rdf:RDF/*[replace(@rdf:about,'/$','')=replace($uri,'/$','') and doc:versionOf]">
              <xsl:text>http://www.w3.org/2002/01/tr-automation/tr.rdf</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="/rdf:RDF/tra:Log[1]" mode="findLog">
                <xsl:with-param name="uri" select="$uri"/>
              </xsl:apply-templates>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>
        <xsl:choose>
          <xsl:when test="normalize-space($dated_uri_log)">
            <xsl:value-of select="$dated_uri_log"/>
          </xsl:when>
          <xsl:when test="$trdata//rdf:RDF/*/doc:versionOf[replace(@rdf:resource,'/$','')=replace($uri,'/$','')]">
            <xsl:text>http://www.w3.org/2002/01/tr-automation/tr.rdf</xsl:text>
          </xsl:when>
        </xsl:choose>
      </xsl:variable>
      <xsl:variable name="label">
        <xsl:if test="$labels">
          <xsl:value-of select="substring-before(normalize-space($uris),' ')"/>
        </xsl:if>
      </xsl:variable>
      <xsl:call-template name="entry">
        <xsl:with-param name="label" select="$label"/>
        <xsl:with-param name="log" select="$log"/>
        <xsl:with-param name="uri">
          <!-- Needs to extract the dated URI if the original URI wasn't so -->
          <xsl:variable name="_uri" select="$uri"/>
          <xsl:choose>
            <xsl:when test="document($log)/rdf:RDF/*[replace(@rdf:about,'/$','')=replace($_uri,'/$','') and doc:versionOf]">
              <xsl:value-of select="$_uri"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="document($log)/rdf:RDF/*[replace(doc:versionOf/@rdf:resource,'/$','')=replace($_uri,'/$','') and not(local-name()='FirstEdition' or rdf:type/@rdf:resource='http://www.w3.org/2001/02pd/rec54#FirstEdition')][last()]/@rdf:about"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:with-param>
      </xsl:call-template>
      <xsl:if test="normalize-space(substring-after(normalize-space($uris),' '))">
        <xsl:call-template name="dispatch">
          <xsl:with-param name="uris">
            <xsl:choose>
              <xsl:when test="$labels">
                <xsl:value-of select="substring-after(substring-after(normalize-space($uris),' '),' ')"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="substring-after(normalize-space($uris),' ')"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:with-param>            
        </xsl:call-template>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <xsl:template name="entry">
    <xsl:param name="uri"/>
    <xsl:param name="log"/>
    <xsl:param name="label"/>
    <xsl:variable name="trRecord" select="document(normalize-space($log))/rdf:RDF/*[replace(@rdf:about,'/$','')=replace($uri,'/$','')]"/>
    <dt class="tmargin">

      <xsl:variable name="computedLabel">
        <xsl:choose>
          <xsl:when test="$labels and normalize-space($label)">
            <xsl:value-of select="$label"/>
          </xsl:when>
          <xsl:otherwise>
            <!-- compute the label from the latest version URI -->
            <xsl:value-of select="translate(substring-after($trRecord/doc:versionOf/@rdf:resource,'http://www.w3.org/TR/'),'abcdefghijklmnopqrstuvwxyz+/','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <a name="{$computedLabel}" id="{$computedLabel}"><xsl:value-of select="$computedLabel"/></a>
    </dt>
    <dd><cite><a
    href="{$uri}"><xsl:value-of select="$trRecord/dc:title"/></a></cite>, <xsl:call-template name="formatEditors"><xsl:with-param name="trRecord" select="$trRecord"/></xsl:call-template> Editor<xsl:if test="count($trRecord/rec:editor) &gt; 1">s</xsl:if>, W3C <xsl:call-template name="status"><xsl:with-param name="trRecord" select="$trRecord"/></xsl:call-template>, <xsl:call-template name="date:makeDateFriendly"><xsl:with-param name="date" select="translate($trRecord/dc:date,'-','')"/></xsl:call-template>, <xsl:value-of select="$uri"/> . <a href="{$trRecord/doc:versionOf/@rdf:resource}" title="Latest version of {$trRecord/dc:title}">Latest version</a> available at <xsl:value-of select="$trRecord/doc:versionOf/@rdf:resource"/> .</dd>
  </xsl:template>

  <xsl:template name="formatEditors">
    <xsl:param name="trRecord"/>
    <xsl:for-each select="$trRecord/rec:editor/contact:fullName">
      <xsl:variable name="firstNameStart" select="substring-before(.,' ')"/>
      <xsl:variable name="lastNameEnd">
        <xsl:variable name="before">
          <xsl:call-template name="str:keep-before-last">
            <xsl:with-param name="string" select="."/>
            <xsl:with-param name="delimiter" select="' '"/>
          </xsl:call-template>
        </xsl:variable>
        <xsl:value-of select="normalize-space(substring-after(.,$before))"/>
      </xsl:variable>
      <xsl:choose>
        <!-- Special casing for when we have the name in Original Script (e.g. in Japanese);  currently assume that the order is inversed in this case... -->
        <xsl:when test="document('http://www.w3.org/2002/01/tr-automation/known-tr-editors.rdf')/rdf:RDF/*[contact:lastNameInOriginalScript=substring-before(current(),' ')]">
          <xsl:value-of select="substring-before(.,' ')"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="substring($firstNameStart,1,1)"/>
          <xsl:text>. </xsl:text>
          <xsl:if test="document('http://www.w3.org/2002/01/tr-automation/known-tr-editors.rdf')/rdf:RDF/*[contains(contact:lastName,$lastNameEnd) and not(normalize-space(substring-after(contact:lastName,$lastNameEnd))) and (starts-with(contact:firstName,$firstNameStart) or starts-with(contact:firstNameInitial,substring($firstNameStart,1,1)))]/contact:middleNameInitial">
            <xsl:value-of select="document('http://www.w3.org/2002/01/tr-automation/known-tr-editors.rdf')/rdf:RDF/*[contains(contact:lastName,$lastNameEnd) and not(normalize-space(substring-after(contact:lastName,$lastNameEnd))) and (starts-with(contact:firstName,$firstNameStart) or starts-with(contact:firstNameInitial,substring($firstNameStart,1,1)))]/contact:middleNameInitial"/>        
            <xsl:text> </xsl:text>
          </xsl:if>
          <xsl:value-of select="document('http://www.w3.org/2002/01/tr-automation/known-tr-editors.rdf')/rdf:RDF/*[contains(contact:lastName,$lastNameEnd) and not(normalize-space(substring-after(contact:lastName,$lastNameEnd))) and (starts-with(contact:firstName,$firstNameStart) or starts-with(contact:firstNameInitial,substring($firstNameStart,1,1)))]/contact:lastName"/>          
        </xsl:otherwise>
      </xsl:choose>
      <xsl:text>, </xsl:text>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="status">
    <xsl:param name="trRecord"/>
    <xsl:value-of select="document('http://www.w3.org/2001/07/pubrules-copyright.xml')/h:html/h:body/h:div[@id='status']/h:ul/h:li/h:abbr[normalize-space()=substring-after($trRecord/rdf:type/@rdf:resource,'http://www.w3.org/2001/02pd/rec54#') or normalize-space()=local-name($trRecord)]/@title"/>
    <xsl:if test="not(substring-after($trRecord/rdf:type/@rdf:resource,'http://www.w3.org/2001/02pd/rec54#')='REC' or local-name($trRecord)='REC' or substring-after($trRecord/rdf:type/@rdf:resource,'http://www.w3.org/2001/02pd/rec54#')='NOTE' or local-name($trRecord)='NOTE' or substring-after($trRecord/rdf:type/@rdf:resource,'http://www.w3.org/2001/02pd/rec54#')='RSCND' or local-name($trRecord)='RSCND')">
      <xsl:text> (work in progress)</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="tra:Log" mode="findLog">
    <xsl:param name="uri"/>
    <xsl:choose>
      <xsl:when test="document(@rdf:about)/rdf:RDF/*[@rdf:about=$uri and doc:versionOf]">
        <xsl:value-of select="@rdf:about"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="following-sibling::tra:Log[1]" mode="findLog"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
