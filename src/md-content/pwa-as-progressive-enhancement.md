# Progressive Web Apps as Progressive Enhancement

I attended a PWA workshop and I'm listening to PWA presentations today. They've prompted an interesting thought: Are PWAs a form of progressive enhancement?

The core APIs for progressive web app are:

* [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Web App Manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)

We can also enhance the app with near-native capabilities available as part of [Project Fugu 🐡](https://fugu-tracker.web.app/), either those that have shipped or those who are going through [origin trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md).

While this is all great, we need to think about what happens if these features are not available. Are PWAs a form of progressive enhancement?

This post will explore a different take on PWAs by asking what happens if a feature is not available? It will also look at Fugu APIs that are not available in non-Chromium browsers and whether a progressive enhancement in one browser is worth the effort.

## Before we start

If we want to make a progressive web app, we need to plan the application carefully before we write code.

Some of what we should plan for:

* What we want the user to see when they open the app?
* What we want the user to see when they navigate within the app?
* What experience will the app provide users if they are offline or loose connectivity when using the app?
* Is the app accessible? Do PWA enhancements improve or hinder accessibility?

## Looking at service workers

We assume that we have a PWA app that is already running and ready for users to visit.

One of the things I tend to forget that service workers are not available the first time you visit the app; the browser has to install the service worker and precache assets and cache pages you navigate while you're online.

It is only during your second and subsequent visits that the service worker will work at its full potential.

This also means that you won't be able to connect to a PWA for the first time if you're offline. Yes, it sound obvious but it's not. Another point related to this is that if you haven't visited all the content that you want to cache the service worker won't do it for you without some kind of user interaction. Some blogs I've
