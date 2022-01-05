---
title: 3D Web and WebVR: Page as an Object and Crazy Thoughts
date: 2015-02-20 
category: Technology
status: draft
---

The dream of a 3D metaverse has come a long way from the early VRML and Web3D days of the mid '90s. While what we have is awesome in and of itself (who would have thought 5 years agon that we'd be able to pick 3D objects with our hands and throw them on screen?) it is now time to start thinking forward to what's next. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/lciYKwVLTuk" frameborder="0" allowfullscreen></iframe>

## 3D on The Web: WebGL, Three.js and Leap Motion

The techology to create 3D scenes in the browser has been around for a while but it may not be familiar to many people. We start with the low level [WebGL API](https://www.khronos.org/webgl/).

> WebGL (Web Graphics Library) is a JavaScript API for rendering interactive 3D computer graphics and 2D graphics within any compatible web browser without the use of plug-ins.[2] WebGL is integrated completely into all the web standards of the browser allowing GPU accelerated usage of physics and image processing and effects as part of the web page canvas. WebGL elements can be mixed with other HTML elements and composited with other parts of the page or page background.[3] WebGL programs consist of control code written in JavaScript and shader code that is executed on a computer's Graphics Processing Unit (GPU). WebGL is designed and maintained by the non-profit Khronos Group.[4]
> 
> From: [Wikipedia](http://en.wikipedia.org/wiki/WebGL)

One of the advantages of WebGL is that is part of the browser; it can interact with other elements on the page without having to do additional coding. 

[This example](http://labs.rivendellweb.net/webgl/demo08.html) incorporates video from a a video element into a 3D environment. 

[In this demo](http://labs.rivendellweb.net/webgl/demo09.html) we use [WebRTC](http://www.webrtc.org/) to capture the user's webcam (using [getUserMedia](http://www.html5rocks.com/en/tutorials/getusermedia/intro/)) to display. 

For additional examples, check the [Kronos Group Demo Repository](https://www.khronos.org/webgl/wiki/Demo_Repository)

## Making WebGL easier to use

Although it's necessary to know about WebGL and, eventually, about shaders, what they do and how you can use them to make awesome effects, it is too low level for me and for most front end developers. There are many libraries that sit on top of WebGL and provide abstractions for the WebGL primitives. 

I've chosen to work with [Three.js](http://threejs.org)  a javascript library/API that abstracts most, if not all,  WebGL complexity into Javascript that it's easier to understand.

For examples using Three.js check the [Three.js homepage](http://threejs.org/) for a look at the breadth of uses out in the wild.

## Adding The Human Touch

The interfaces for 3D are early in their development cycle but one of the most intriguing tools is [Leap Motion](https://www.leapmotion.com/) a small device that sits in front of your computer (Mac, PC or Linux) and creates a spaces where you can use your hands to interact with your application. 

![Grabbing and Throwing Small Object Ragdoll Style with Leap Morion](https://raw.githubusercontent.com/caraya/docs/711099b71baff48778f5f3a099d112f9d6327172/images/ragdoll_screenshot_800_600.png "Grabbing and throwing small objects")

The idea is that we can build a gestural interface in addition to a traditional mouse and keyboard. The classic example is the interface used in [Minority Report](http://www.wikiwand.com/en/Minority_Report_(film))

<iframe width="560" height="315" src="https://www.youtube.com/embed/7SFeCgoep1c" frameborder="0" allowfullscreen></iframe>

We are not there but the technology keeps improving and I don't think it's going to be too long before we experience interfaces like the one described in the video from the movie or the current technology based on the movie

<iframe src="https://embed-ssl.ted.com/talks/lang/en/john_underkoffler_drive_3d_data_with_a_gesture.html" width="560" height="315" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

In the book [Make It So: Interaction Design Lessons from Science Fiction](http://rosenfeldmedia.com/books/make-it-so/) the authors provide a set of guidelines for for gestural interfaces that we are familiar with from Science Fiction.

Why these and not others? Because these are the ones people are familiar with. We've seen then in more than one place and it will not take long for users to learn the gestures and the proper way to interact with your 3D world.


>1. Wave to Activate
>
>The first gesture is waving to activate a technology, as if to wake it up or gain its attention. To activate his spaceship’s interfaces, Klaatu passes a flat hand above their translucent controls. In another example, Johnny Mnemonic waves to turn on a faucet in a bathroom, years before it became common in the real world (Figure 5.9).
>
>From: "Make It So: Interaction Design Lessons From Science Fiction."



>2. Push to Move
>
>To move an object, you interact with it in much the same way as you would in the physical world: fingers manipulate; palms and arms push. Virtual objects tend to have the resistance and stiffness of their real-world counterparts for these actions. Virtual gravity and momentum may be “turned on” for the duration of these gestures, even when they’re normally absent. Anderton does this in Minority Report as discussed above, and we see it again in Iron Man 2 as Tony moves a projection of his father’s theme park design (Figure 5.10).”
>
>From: “Make It So: Interaction Design Lessons From Science Fiction.”



>3. Turn to Rotate
>
>To turn objects, the user also interacts with the virtual thing as one would in the real world. Hands push opposite sides of an object in different directions around an axis and the object rotates. Dr. Simon Tam uses this gesture to examine the volumetric scan of his sister’s brain in an episode of Firefly (Figure 5.11).”
>
>From: “Make It So: Interaction Design Lessons From Science Fiction.”



>4. Swipe to Dismiss
>
>Dismissing objects involves swiping the hands away from the body, either forcefully or without looking in the direction of the push. In Johnny Mnemonic, Takahashi dismisses the videophone on his desk with an angry backhanded swipe of his hand (Figure 5.12). In Iron Man 2, Tony Stark also dismisses uninteresting designs from his workspace with a forehanded swipe.”
>
>From: “Make It So: Interaction Design Lessons From Science Fiction.”



>5. Point or Touch to Select
>Users indicate options or objects with which they want to work by pointing a fingertip or touching them. District 9 shows the alien Christopher Johnson touching items in a volumetric display to select them (Figure 5.13a). In Chrysalis, Dr. Brügen must touch the organ to select it in her telesurgery interface (Figure 5.13b).”
>
>“Make It So: Interaction Design Lessons From Science Fiction.”



>6. Extend the Hand to Shoot
>Anyone who played cowboys and Indians as a child will recognize this gesture. To shoot with a gestural interface, one extends the fingers, hand, and/or arm toward the target. (Making the pow-pow sound is optional.) Examples of this gesture include Will’s telecombat interface in Lost in Space (see Figure 5.8c), Syndrome’s zero-point energy beam in The Incredibles (Figure 5.14a), and Tony Stark’s repulsor beams in Iron Man (Figure 5.14b).”
>
>From: “Make It So: Interaction Design Lessons From Science Fiction.”



>7. Pinch and Spread to Scale
>Given that there is no physical analogue to this action, its consistency across movies comes from the physical semantics: to make a thing bigger, indicate the opposite edges of a thing and drag the hands apart. Likewise, pinching the fingers together or bringing the hands together shrinks virtual objects. Tony Stark uses both of these gestures when examining models of molecules in Iron Man 2 (Figure 5.15).
>
>From: “Make It So: Interaction Design Lessons From Science Fiction.”




## Enter WebVR: Immersive 3D spaces

[WebVR](http://webvr.info) provides extensions to CSS, Javascript and WebGL to work with 3D VR hardware like the [Oculus Rift](https://www.oculus.com/), [Google Cardboard](https://www.google.com/get/cardboard/), [SamsungVR](https://www.oculus.com/gear-vr/) among others. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/32DwPB15a0M" frameborder="0" allowfullscreen></iframe>

Although primarily intended for games we can build entire interfaces using combination of 2D and 3D scripts and APIs. I like Josh Carpenter's ([@joshcarpenter](https://twitter.com/joshcarpenter)) approach where he builds a HUD-like interface for moving from site to site without having to convert the web into virtual objects (although that's always )

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZOaOYTOpwyM?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

The biggest question is how do we translate 2D movements into a 3D environment. Are they equivalent?  Considering the current limitations I'd say

## Some of the current limitations

***Resolution for text***

[Closing the gap between html and webgl](http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/)



***It's still tethered***

## The components are all here. What's next?

![Oculus Rift with Leap Motion controller attached](https://di4564baj7skl.cloudfront.net/assets/vr/mount-940-a05ed7984163c49d3809b0d8386e9ed3.gif)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Mg-zZXeWyJU?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>



Perhaps adding a voice interface would make the VR experience even more compelling. Tools like [api.ai](http://api.ai/) would make the VR experience easier to handle by removing the needs for hands altogether.  

### Links, Resources and Demos


All quotes from Make It So: Interaction Design Lessons From Science Fiction taken from The printed book of the same name by Nathan Shedroff and Christopher Noessel and published by Rosenfeld Media.

Take primarily from [The Web Ahead Episode 96](http://thewebahead.net/96)

* [mozvr.com](http://mozvr.com)
* [github.com/mozvr](https://github.com/mozvr)
* [Download VR-enabled Firefox Nightly and Add-On (plus configuration instructions)](http://mozvr.com/downloads/)





* ["Project Syria: An Immersive Journalism Experience", a video on YouTube](https://www.youtube.com/watch?v=jN_nbHnHDi4)


* [Post: WebVR in Nightly (how to get it, install it, and what our platform roadmap is)](http://mozvr.com/posts/webvr-lands-in-nightly/)
* [Tutorial: Quick VR Prototypes](http://mozvr.com/posts/quick-vr-prototypes/)
* [Presentation from October on the design and tech of web VR](https://air.mozilla.org/virtual-reality-the-web-next-steps/)
* [eleVR](http://elevr.com/)
* ["Video Feature: Signs That Virtual Reality Is on the Verge of Taking Off" by Molly Wood, New York Times](http://www.nytimes.com/2015/01/29/technology/personaltech/video-feature-signs-that-virtual-reality-is-on-the-verge-of-taking-off.html)
* [Sundance Channel short on VR Films at Sundance 2015](https://www.youtube.com/watch?v=-2ynQQl3c7c&amp;feature=youtu.be)
* ["How virtual reality ate the Sundance Film Festival", The Verge](http://www.theverge.com/2015/1/24/7882339/sundance-film-festival-2015-virtual-reality)
* [Oculus Connect — developer conference, with videos from last year's conference](https://www.oculus.com/connect/)
* [Oculus Development Kit (DK2)](https://www.oculus.com/dk2/)
* [Magic Leap](http://en.wikipedia.org/wiki/Magic_Leap)
* [Microsoft HaloLens](http://www.microsoft.com/microsoft-hololens/en-us)
* ["Google's Cardboard turns your Android device into a VR headset", The Verge](http://www.theverge.com/2014/6/25/5842188/googles-cardboard-turns-your-android-device-into-a-vr-headset)
* [Cardboard on Google Developers](https://developers.google.com/cardboard/) 
* [Current state of WebGL support, on Can I Use](http://caniuse.com/#feat=webgl)


* [The Web Ahead Episode 52: eBooks with NellieMcKesson, where we talk about using CSS to style printed pages](http://thewebahead.net/52)
