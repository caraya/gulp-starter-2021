# Adding a Javascript table of contents to an exisiting file

Some web pages get insanely long and they become really hard to navigate. When I create a page that I expect to be long I usually create a table of content for those cases where I can’t I have create a Javascript project that allows me to insert the table of contents before the actual content. 

This is also an exercise on using traditional Javascript as opposed to using a framework like jQuery or Dojo. I love frameworks but I feel that, with modern browsers, the reasons to use such a framework (mainly browser quirk smoothing and support for older versions of Internet Explorer) is not there anymore or can be smoothed with additional Javascript that is not part of a framework. 

Inspiration, and some of the code, for this script comes from David Flannagan’s Javascript: The Definitive Guide.

##  Assumptions 

In Building this script I made the following assumptions:

* Each section has a heading (h1 to h3)
* We ignore headings deeper than h3
* We set up the table of content at the top of the document
* Create a link/button to make the table of content float to the right of the window
* The script is placed on the bottom of the document to avoid having to wait for onload events

## The Process



```javascript

```