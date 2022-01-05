# Athena Service Worker

When building a service worker we have to decide two things:

* Are we building an offline first application/site?
* What are we hoping to get out of the app/site

For an Athena publication we are hoping to get offline access to the content. In the future, once Push API and Background Synchronization, it should be easy to add the functionality to the scripts below. 

Athena seeks to provide native app equivalency to web applications without loosing all the things that make the web such a great experience: Not having to download different applications based on the devices you own or even having to download the same application more than once because you own both an iPhone and an iPad... this will give us one application that can run everywhere

Jake Archibald from Google explains it best in his SFHTML5 presentation: ServiceWorker is coming, look busy.

[![ServiceWorker is coming, look busy](http://img.youtube.com/vi/Rr2vXDIVerI/0.jpg)](https://www.youtube.com/watch?v=Rr2vXDIVerI)


## The scripts

The serviceworker works with 2 scripts (3 if you include the polyfill dependency). You add one to the initial page of your site and it calls the actual serviceworker script. 

The registration script used in the Athena demo does the following:

* Tests if the browser supports serviceworker registration
* If it does then we register the serviceworker script and give it a scope so it won't work on the full domain (caraya.github.io). The registration returns a promise
  * If the promise fullfills (it worked), we log success to console
  * If the promise rejects (it didn't work), we log to the error to console. We may want to pop an alert or other notification
* If the browser does not support service workers, we log it to the console. We may also want to signal the user in some other way too

```javascript
// Register Serviceworker
if (navigator.serviceWorker.register) {
  // If Serviceworker is supported then register it
  // and log to console whether the promise fulfilled or rejected
  //
  // move the serviceworker to the root of the app to comply with
  // https://github.com/slightlyoff/ServiceWorker/issues/468
  navigator.serviceWorker.register('sw.js', {
    // Scope the serviceworker to match our application path
    scope: '/athena-framework/'
  }).then(function(reg) {
    // Promise fullfilled
    console.log('success', reg);
  }, function (err){
    // Promise rejected
    console.log('oh sh*t', err);
  });
} else {
  // Serviceworker is not supported. We may want to
  // write something to screen in addition to logging it
  console.log('serviceWorker not supported');
}
```

The second part is the ServiceWorker script itself. The script performs three actions:

* It configures what happens when we first load the cache in a supported browser, including the files that we will install and cache
* It sets up the actions when the cache is activated: In this case we delete older caches to conserve storage space
* It decides what to do when we fetch a resource from our ServiceWorker enabled application
  * If the resource is in the cache then serve it from there
  * If it's not in the cache, fetch it from the network, put it on the cache and serve it to the user
  * If it's an opaque resource (something that cannot be parsed) then log a warning and fail
  
That's a lot of functionality for a few lines of JavaScript :-)

```javascript
//
// ATHENA DEMO SERVICE WORKER
//
// @author Carlos Araya
// @email carlos.araya@gmail.com
//
// Based on Paul Lewis' Chrome Dev Summit serviceworker. 

importScripts('js/serviceworker-cache-polyfill.js');

// If at any point you want to force pages that use this service 
// worker to start using a fresh cache, then increment the 
// CACHE_VERSION value. It will kick off the service worker 
// update flow and the old cache(s) will be purged as part of 
// the activate event handler when the updated service worker 
// is activated.

// In this demo, we also cache two links from O'Reilly. Normally 
// I wouldn't do this but it's mean to illustrate a point later 
// in the rationale document
var CACHE_NAME = 'athena-demo';
var CACHE_VERSION = 8;

self.oninstall = function(event) {

  event.waitUntil(
    caches.open(CACHE_NAME + '-v' + CACHE_VERSION).then(function(cache) {

      return cache.addAll([
        '/athena-framework/',
        '/athena-framework/bower_components/',
        '/athena-framework/css/',
        '/athena-framework/js/',
        '/athena-framework/layouts/',

        '/athena-framework/content/',
        '/athena-framework/index.html',
        '/athena-framework/notes.html',

        'http://chimera.labs.oreilly.com/books/1230000000345/ch12.html',
        'http//chimera.labs.oreilly.com/books/1230000000345/apa.html'
      ]);
    })
  );
};

self.onactivate = function(event) {

  var currentCacheName = CACHE_NAME + '-v' + CACHE_VERSION;
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheName.indexOf(CACHE_NAME) == -1) {
          return;
        }

        if (cacheName != currentCacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  });

};

self.onfetch = function(event) {
  var request = event.request;
  var requestURL = new URL(event.request.url);

  event.respondWith(

    // Check the cache for a hit.
    caches.match(request).then(function(response) {

      // If we have a response return it.
      if (response)
        return response;

      // Otherwise fetch it, store and respond.
      return fetch(request).then(function(response) {

        var responseToCache = response.clone();

        caches.open(CACHE_NAME + '-v' + CACHE_VERSION).then(
          function(cache) {
            cache.put(request, responseToCache).catch(function(err) {
              // Likely we got an opaque response which the polyfill
              // can't deal with, so log out a warning.
              console.warn(requestURL + ': ' + err.message);
            });
          });

        return response;
      });

    })
  );
};
```
## How to make this work differently.

Right now the ServiceWorker fetches all the content on installation. For a first attempt that's acceptable but it's not an idel situation for content that updates frequently or content that we want to update on a different schedule. 


# References

* [Offline cookbook](http://jakearchibald.com/2014/offline-cookbook/) by Jake Archibald
