---
title: ARIA and EPUB Semantics: how much is enough?
date: 2014-10-22
category: Technology
status: draft
---

# ARIA and EPUB Semantics: how much is enough?

I'm always researching how to incorporate accessibility elements into my digital content. One of the things we can do is to add semantic elements that will, in theory, make the content more accessible to screen readers.

There are 3 different approaches to semantic and structural emphasis to our web documents: ARIA provides structure and accessibility and ePub/eduPub provide semantical structure for book-like content. Using them together will help us make a richer experience for all the users.


## Epub / EduPub

[EPUB 3 Structural Semantics Vocabulary](http://www.idpf.org/epub/vocab/structure/)

[EduPub Structural Semantics Draft](https://docs.google.com/document/d/1_Tzeq5xwdwLhSdaHStvAthhOFu9UuT8yFmK787yw420/edit#)

Why are these two separate ones? Most of the edupub terms are generic enough that they should, IMO, be part of the default epub structure


## ARIA

<abbrev>ARIA</abbrev> (Accessible Rich Internet Applications) is the World Wide Web Consortium's Web Accessibility Initiative guidelines for making rich internet application (RIA) accessible. For the purposes of this document, we'll take a small portion of the ARIA specification: Landmarks and Roles for use in our digital content. 

[WAI-ARIA Authoring Practices](http://www.w3.org/TR/wai-aria-practices/) provides guidelines and examples for using the elements and attributes in the ARIA specification.

> This is an idependent and complementary process to adding epub-based roles to our documents, doing one doesn't excuse you from doing the other.

### ARIA Labels

Work with ARIA assumes a clean document structure or one where we've made the distinction clear for accessibility tools. There may be some instances where we may have to work around the difference between [nesting and headings](http://www.w3.org/TR/wai-aria-practices/#kbd_layout_nesting_vs_level) in a document to address instances like the following:

```html
<div role="main" aria-labelledby="page_title">
  <h1 id="page_title">Top News Stories</h1>
   … main page contents here …
</div>
```
```html
<img src="foo" alt="abbreviated name" aria-describedby="prose1">

<div id="prose1">
   The prose in this div describes the image foo in detail.
</div>
```

> The drawback of not providing a label is that users will not know the purpose of the region. By definition, regions would be included in a summary of a page. If an assistive technology were to summarize it would be unable to provide information about the section without a label.
After we've taken into account the difference between nesting and levels we can begin our accessibility work by labeling each region in our content to ensure screen readers can understand the structure of the document, particularly where the element on its own doesn't provide a completely accessible solution. For example the prose describing the image enhances  accessibility by providing additional explanation (something like the old longdesc tag used to do)


### ARIA Landmark roles



> Now that you labeled your regions, you need to assign them semantic navigation landmarks. Landmarks are a vast improvement over the rudimentary "skip to main content" technique employed prior to WAI-ARIA. If possible it is best to use these as landmarks. Skip to main content links may impact the placement of web application elements. This may be a consideration for developers that want to try to keep their web application in a specific visible area. Consequently, layout adjustments may need to be made to support skip to main content links. Also, skip to main content links are limited in that they only address only one main content area. WAI-ARIA provides a collection of landmarks which are applied to each of the regions you identified in step 2.

> The presence of common, semantic, navigation landmarks allows each site to support the same standard and allows your assistive technology to provide a consistent navigation experience - an important feature for screen readers and alternate input solutions. For users with cognitive and learning disabilities the landmark information could be used to expand and collapse these regions of your page to aid in simplifying the user experience by allowing the user to manage the amount of information processed at any one time.

> WAI-ARIA landmark roles that are applied to elements having strong native semantics are not mapped consistently to the platform accessibility API. An example is the TABLE element. For this reason, it is recommended that authors apply landmarks to DIV and SPAN containers.

> There are also mainstream benefits of providing navigation landmarks. Your browser may assign key sequences to move focus to these sections as they can be set on every site. Navigation to these landmarks is device independent. A personal digital assistant (PDA) could assign a device key to get to them in your document. The common landmarks in WAI-ARIA include:

List of structural landmarks

Taken from [https://www.drupal.org/node/1179668](https://www.drupal.org/node/1179668)

| Landmark Role  | Role Description 
| ------------- | ------------- 
| application  | A region declared as a web application, as opposed to a web document
| banner  | A region that contains mostly site-oriented content, rather than page-specific content. Site-oriented content typically includes things such as the logo or identity of the site sponsor, and site-specific search tool. A banner usually appears at the top of the page and typically spans the full width
| complementary  | A supporting section of the document, designed to be complementary to the main content at a similar level in the DOM hierarchy, but remains meaningful when separated from the main content. <br/><br/> There are various types of content that would appropriately have this role. For example, in the case of a portal, this may include but not be limited to show times, current weather, related articles, or stocks to watch. The complementary role indicates that contained content is relevant to the main content. If the complementary content is completely separable main content, it may be appropriate to use a more general role.
| contentinfo	  | A large perceivable region that contains information about the parent document.<br/><br/> Examples of information included in this region of the page are copyrights and links to privacy statements.zWithin any document or application, the author SHOULD mark no more than one element with the contentinfo role.
| form  | A landmark region that contains a collection of items and objects that, as a whole, combine to create a form.
| main  | The main content of a document.<br/><br/>This marks the content that is directly related to or expands upon the central topic of the document.<br/><br/>Within any document or application, the author SHOULD mark no more than one element with the main role.
| navigation  | A collection of navigational elements (usually links) for navigating the document or related documents.
| search  | A landmark region that contains a collection of items and objects that, as a whole,   combine to create a search facility.

### ARIA Role

We will only worry about the document structure roles as defined by the [w3c](http://www.w3.org/TR/wai-aria/roles#document_structure_roles) and defined in the later sections of the [same document](http://www.w3.org/TR/wai-aria/roles#role_definitions)

```html
<div role="main" aria-labelledby="page_title">
  <h1 id="page_title">Top News Stories</h1>
   … main page contents here …
</div>
```
