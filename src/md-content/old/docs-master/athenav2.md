---
title: Athena Framework Version 2: improvements and more questions
date: 2014-4-
category: Technology
status: draft
---

Since I wrote the original [Athena Proof of Concept blog post](http://publishing-project.rivendellweb.net/athena-what-an-ofline-web-reading-experience-may-look-like/) and proof of concept [application](https://caraya.github.io/athena-framework/) things have changed and I have learned.

This is both an update to the blog post and an new version of the application.

## Building a book as a single page application

[Single Page Applications](https://www.wikiwand.com/en/Single-page_application) provide a different level of abstraction and  now we can build an entire publication as as a SPA.

[more-routing component](https://github.com/Polymore/more-routing) provides a component-based way to route content within the SPA individually and also nesting routes to arbitrary levels.

## Pageable text and offline apps

Jeff Posnick created both the [pageable-text interface](https://github.com/jeffposnick/pageable-text) and a full [offline reader](http://jeffy.info/offline-ereader/index.html) using web components. It is both a source of inspiration and a technical source of ideas to pull from. I've chosen not to use pagination for this project but have kept the libraries in mind for future development.

Media Queries may also provide a solution to paginating content but they pose, to me, an interesting challenge on building navigation interfaces. 

## Push and offline notification

ServiceWorkers have gained new capabilities. Using Chrome's version of ServiceWorkers (as of version 42) you can build push messaging and notification into your offline applications.

Google Chrome (version 42 and later) implement push and background notification. However, they are tied to other Chrome/Google technologies such as Google Cloud Messaging or technologies still in the draft stage such as the [web manifest](https://w3c.github.io/manifest/) (see [Firefox Tracking Bug](https://bugzilla.mozilla.org/show_bug.cgi?id=997779) and [Chrome Tracking Bug](https://code.google.com/p/chromium/issues/detail?id=366145).) 

Because of these limitations it may be a good idea to use only basic capabilities like offline caching until the open web equivalents work their way through WHATWG / W3C specification path

## An example application

We will take some of our content from the original Athena project
