<https://developer.mozilla.org/en-US/docs/Learn/Server-side/Configuring_server_MIME_types>

<h2 id="Background">Background</h2>

<p><abbr>MIME</abbr> types describe the media type of content either in email or served by web servers or web applications and are intended to help guide a web browser in how the content is to be processed and displayed.</p>

<p>Examples of MIME types:</p>

<ul>
 <li><code>text/html</code> for HTML documents</li>
 <li><code>text/plain</code> for plain text</li>
 <li><code>text/css</code> for Cascading Style Sheets</li>
 <li><code>text/javascript</code> for scripts</li>
 <li><code>text/markdown</code> for Markdown files</li>
 <li><code>application/octet-stream</code> for binary files where user action is expected</li>
</ul>

<p>The default configurations of servers vary wildly and will provide different default values if there is no default content type defined.</p>

<p>Versions of the Apache Web Server before <strong>before 2.2.7</strong> were configured to report a MIME type of <code>text/plain</code> or <code>application/octet-stream</code> for unknown content types. The current version of Apache reports <code>none</code> for files with unknown content types.</p>

<p><a class="external" href="https://nginx.org/">Nginx</a> will report <code>text/plain</code> if you don't define a default content type.</p>

<p>As new content types are invented or added to web servers, web administrators may fail to add the new MIME types to their web server's configuration. This is a major source of problems for users of browsers that respect the MIME types reported by web servers and applications.</p>

<h3 id="Why_are_correct_MIME_types_important.3F">Why are correct MIME types important?</h3>

<p><img alt="Example of an incorrect MIME type result" class="internal" src="/@api/deki/files/729/=Incorrect-mime-screen.jpg" style="float:right" /> According to the HTTP specification, If the web server or application reports an incorrect MIME type for content, a web browser has no way, of knowing the author's intentions and will serve the content with default MIME types that will work in unexpected ways.</p>

<p>Some web browsers, such as Internet Explorer, tries to <em><a class="external" href="https://support.microsoft.com/default.aspx?sd=msdn&amp;scid=kb;en-us;293336">guess</a></em> the correct MIME type, allowing misconfigured web servers and applications to continue working for Intenet Explorer but not other browsers that support the standard.</p>

<p>Serving content using the correct MIME type can also be important for security reasons; it's possible for malicious content to affect the user's computer by pretending to be a safe type of document when it is in fact something else that can put your computer at risk.</p>

<h3 id="Javascript_Legacy_MIME_Types">Javascript Legacy MIME Types</h3>

<p>When looking for information about Javascript MIME types, you may see several MIME types that reference Javascript. Some of these MIME Types include:

<ul>
  <li>application/javascript</li>
  <li>application/ecmascript</li>
  <li>application/x-ecmascript</li>
  <li>application/x-javascript</li>
  <li>text/ecmascript</li>
  <li>text/javascript1.0</li>
  <li>text/javascript1.1</li>
  <li>text/javascript1.2</li>
  <li>text/javascript1.3</li>
  <li>text/javascript1.4</li>
  <li>text/javascript1.5</li>
  <li>text/x-ecmascript</li>
  <li>text/x-javascript</li>
</ul>

<p>While browsers may support any, some, or all of these alternative MIME types, you should only use <code>text/javascript</code> to indicate the mimetype of Javascript files.</p>

<p>See <a href="/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types">MIME types (IANA media types)</a> for more information</p>

<h2 id="Why_browsers_should_not_guess_MIME_types">Why browsers should not guess MIME types</h2>

<p>Apart from violating the HTTP specification, it is a bad strategy for browsers to guess MIME types for the following reasons:</p>

<dl>
  <dt>Loss of control</dt>
    <dd>If the browser ignores the reported MIME type, web administrators and authors no longer have control over how their content is to be processed.</dd>
    <dd>For example, a web site oriented for web developers might wish to send certain example HTML documents as either <code>text/html</code> or <code>text/plain</code> in order to have the documents either processed and displayed as HTML or as source code. If the browser guesses the MIME type, this option is no longer available to the author.</dd>
  <dt>Security</dt>
    <dd>Some content types, such as executable programs, are inherently unsafe. For this reason these MIME types are usually restricted in terms of what actions a web browser will take when given content of that type. An executable program should not be executed on the user's computer and at most should cause a dialog to appear <strong>asking the user</strong> if they wish to download the file.</dd>
    <dd>MIME type guessing has led to security exploits in Internet Explorer which were based upon a malicious author incorrectly reporting a MIME type of a dangerous file as a safe type. This bypassed the normal download dialog resulting in Internet Explorer guessing that the content was an executable program and then running it on the user's computer.</dd>

<h2 id="How_to_determine_the_MIME_type_sent_by_a_server">How to determine the MIME type sent by a server</h2>

  <ul>
    <li>In Firefox</li>
    <ul>
      <li>Load the file and use <strong>go to Tools | Page Info to get the content type for the page you accessed</strong></li>
      <li>You can also go to <strong>Tools | Web Developer | Network</strong> and reload the page. The request tab gives you a list of all the resources the page loaded. Clicking on any resource will list all the information available, including <strong>Content-Type</strong></li>
    </ul>
    <li>In Chrome</li>
    <ul>
      <li>Load the file and go to <strong>View | Developer | Developer Tools</strong> and choose the network tab. Reload the page and select the resource you want to inspect. Under headers look for <strong>Content-Type</strong> and it will report the content type of the resource</li>
    </ul>
    <li>Look for a <code>meta</code> tag that gives the MIME type such as <code><span class="nowiki">&lt;meta http-equiv="Content-Type" content="text/html"&gt;</span></code></li>
    <li>According to the standards,  the <code>meta</code> tag that gives the MIME type should be ignored if there's a {{HTTPHeader("Content-Type")}} line in the header
  </ul>

  <p><a class="external" href="https://www.iana.org/">IANA</a> keeps a list of registered <a class="external" href="https://www.iana.org/assignments/media-types/index.html">MIME Media Types</a>. The <a class="external" href="https://www.w3.org/Protocols/HTTP/1.1/spec.html">HTTP specification</a> defines a superset of MIME which is used to describe the media types used on the web.</p>

<h2 id="How_to_determine_the_correct_MIME_type_for_your_content">How to determine the correct MIME type for your content</h2>

<p>There are several ways to determine the correct MIME type value to be used for your content.</p>

<ul>
 <li>If your content was created using commerical software, read the vendor's documentation to see what MIME types should be reported for the application</li>
 <li>Look in IANA's <a class="external" href="https://www.iana.org/assignments/media-types/index.html">MIME Media Types registry</a> which contains all registered MIME types</li>
 <li>Search for the file extension in <a class="external" href="https://filext.com/">FILExt</a> or <a class="external" href="https://www.file-extensions.org/">File extensions reference</a> to see what MIME types are associated with that extension. Pay close attention as the application may have multiple MIME types that are different in only one letter</li>
</ul>

<h2 id="How_to_set_up_your_server_to_send_the_correct_MIME_types">How to set up your server to send the correct MIME types</h2>

<p>The goal is to configure your server to send the correct {{HTTPHeader("Content-Type")}} HTTP header for each document.</p>

<ul>
 <li>If you're using the Apache web server, simply copy this <a href="/en/Sample_.htaccess_file" title="en/Sample_.htaccess_file">sample .htaccess file</a> to the directory that contains the files that you want to work with or the parent directory if there are many such directories.</li>
 <li>If you're using NGINX, look at the <a href="/en/NGINX_configuration_snipets" title="NGINX configuration snipets">NGINX configuration snipets</a>. NGINX does not have a .htaccess equivalent tool, so all changes will go into the main configuration file</li>
 <li>If you're using a server-side script or framework to generate content, the way to indicate the content type will depend on the tool you're using. Check the framework or library's documentation</li>
  </ul>
 </li>
</ul>

<h3 id="Related_Links" name="Related_Links">Related Links</h3>

<ul>
    <li><a href="/en-US/Incorrect_MIME_Type_for_CSS_Files" title="en/Incorrect_MIME_Type_for_CSS_Files">Incorrect MIME Type for CSS Files</a></li>
    <li><a class="external" href="https://www.iana.org/assignments/media-types/index.html">IANA | MIME Media Types</a></li>
    <li><a class="external" href="https://www.w3.org/Protocols/HTTP/1.1/spec.html">Hypertext Transfer Protocol — HTTP/1.1</a></li>
    <li><a href="/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types">MIME types (IANA media types)</a></li>
    <li><a class="external" href="https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations">Apache vs Nginx: Practical Considerations</a></li>
    <li><a class="external" href="https://barryvanveen.nl/blog/56-migrate-apache-htaccess-to-nginx-server-block">Migrate Apache .htaccess to NGINX server block</a></li>
    <li><a class="external" href="https://support.microsoft.com/default.aspx?sd=msdn&amp;scid=kb;en-us;293336">Microsoft - 293336 - INFO: WebCast: MIME Type Handling in Microsoft Internet Explorer</a></li>
</ul>

<div>{{QuickLinksWithSubpages("/en-US/docs/Web/Security")}}</div>
