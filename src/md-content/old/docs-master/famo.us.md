---
title: Famo.us: A different approach to developing web apps
date: 2014-10-22
category: Technology
status: draft
---

## Introduction

I've been tracking Famo.us since it first launched and through its development and growing pains. I consider myself a smart developer but it has taken a while for the whole Famo.us metaphor to make sense (I'm not fully convinced it does). This is my attempt at making sense of the technology and to understand why it has created such a passionate userbase. 

## What Famo.us is and isn't

This is one of the first examples Famo.us offers in their [Famo.us University](http://famo.us/university/) education site. It took me a while to get wrap my brain and developer philosophy around some of the biggest pieces of the framework.

```javascript
var Engine = require('famous/core/Engine');
var Surface = require('famous/core/Surface');

var mainContext = Engine.createContext();

var firstSurface = new Surface({
  content: "<h3>Hi!</h3><p>I'm a surface!<br>
  I live inside a context.</p>
  <p>You can add <strong>HTML</strong> content 
  and style me with <b>CSS!</b></p>",
  size: [200, 200],
  properties: {
    backgroundColor: 'rgb(240, 238, 233)',
    textAlign: 'center',
    padding: '5px',
    border: '2px solid rgb(210, 208, 203)',
    marginTop: '50px',
    marginLeft: '50px'
  }
});
```

mainContext.add(firstSurface);

The first thing that caught my attention was the need to create and initiallize a surface. Why a surface and not use a canvas like everyone else? They do it like this because their framework unifies DOM and WebGL on one unified toolkit. 

This is harder than it looks; WebGL uses a center coordinate system (the center center of a canvas is at coordinate 0,0) where the DOM uses a top left (0, 0 coordinates are on the top left of the display area). Famo.us streamlines the process by using one coordinate system.

QUESTION: WHAT ELEMENTS OTHER THAN PHYSICS AND WEBGL ENGINES ARE UNIFIED IN THE FAMO.US PLATFORM? 

QUESTION: WHAT ARE OTHER REASONS WHY I SHOULD PICK FAMO.US INSTEAD OF A NATIVE APPROACH?
QUESTION: WHO DO YOU SEE AS FAMO.US DIRECT COMPETITION?

Famo.us ***is not front end framework***, however will work with one. Famo.us already offers a version of the current AngularJS framework that integrates Famo.us into the Angular workflow.

QUESTION: IS THE ANGULAR INTEGRATION OF FAMO.US ADAPTED TO WORK WITH ANGULAR OR VICEVERSA?


Famo.us doesn't compete with any of the existing web platforms. It competes with high end native frameworks such as Cocoa touch and android. When you compare Famo.us to that type of naive frameworks some of the decisions Famo.us made start making more sense. 

For example, the Objective C code below scales and image down to half its size. This code just accomplishes the scaling task. We are not dealing with how to incorporate it to an application.

```Objective-C
CATransform3D transform = CATransform3DMakeScale(0.5f, 0.5f, 0.5f);
[layer setTransform:transform];
```

The snippet is hosted at [http://www.cimgf.com/cocoa-code-snippets/core-animation-snippets/](http://www.cimgf.com/cocoa-code-snippets/core-animation-snippets/)


And the same task for Android devices using Java. Again, this is the minimal code to accomplish the task. 

```java
// First scale the bitmap to fit into the view. 
 // Use either scale factor for width and height, 
 // whichever is the smallest.
 float s1x = vw / bw;
 float s1y = vh / bh;
 float s1 = (s1x < s1y) ? s1x : s1y;
 matrix.postScale (s1, s1);
 ```
the full code is at [dzone.com](http://java.dzone.com/articles/android-rotate-and-scale)

And let's not forget that if we want to develop apps for multiple devices we will be using one or both of these languages unless developers choose to create apps using the Phonegap / Apache Cordoba toolkit which adds development time and requires developers to add and learn another tool.

Inforworld makes a different claim, that Famo.us is trying to [replace Phonegap](http://www.infoworld.com/article/2610596/mobile-development/famo-us--we-re-building-a-better-phonegap.html). Don't know how much weight to put on this article as it's clear to me that even the people at Famo.us are not clear what they are supposed to be. 

The other part that I found very interesting is that Famo.us bundles both a WebGL runtime and a physics engine. This also took me a while to digest until I thought about how we do animations on the web.

* There are the propietary formats (Flash/AIR/Silverlight) that rely on plugins and that may not always be installed
* There's CSS3 animations and transformations that work fairly well if you have a pretty recent browser
* WebGL pushes the work to the GPU and therefore should be faster than 3D animations in most cases as it pushes all the graphic generation work to the computers GPU. However it requires developers to write more and different JavaScript 

Famo.us takes the third approach and bundles a the WebGL rendering engine with the framework to make the WebGL portions of the code transparent to authors. 

The physics engine provides a built-in and browser independent way to produce smooth animations. CSS can become a real bottleneck and most people shy away from working with plugin-based animations. 

QUESTION: WHAT BROWSER VERSIONS ARE SUPPORTED? EVERGREEN ONLY?

## Who uses Famo.us

[Famo.us Case Studies](http://famo.us/blog/tag/case-study/). Take these with a grain of salt as these are people who have, essentially, bet companies and careers on Famo.us and for whom moving to a different development model would be prohibitively costly both in terms of time and resources. 

QUESTION: WHAT OTHER USE CASES DO YOU HAVE? WHAT OTHER COMPANIES USE FAMO.US

## Who integrates with Famo.us

I will not make a claim as to quality and usefulness of the integrations below, although I will point out that the Angular integration is maintained by Famo.us. 

[Angular JS](http://famo.us/integrations/angular/) and an [explanation of the project](https://github.com/Famous/famous-angular/blob/master/famous-angular-deck.pdf) available as a PDF on Github

[Firebase](https://www.firebase.com/blog/2013-12-12-firebase-famous-event.html)

[d3.js](https://github.com/sghall/famous-chart-demos)

[Meteor](https://github.com/gadicc/meteor-famous-components)

[React.js](https://github.com/petehunt/famous-react)

[Maps](https://github.com/IjzerenHein/famous-map)

## where is it going moving forward

QUESTION: WHAT IS NEXT?