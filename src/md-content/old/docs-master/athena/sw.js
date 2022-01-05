var CONTENT_CACHE_VERSION = 1;
var DATA_CACHE_VERSION = 1;
var CURRENT_CACHES = {
// This is one best practice that can be followed in general to keep track of
// multiple caches used by a given service worker, and keep them all versioned.
// It maps a shorthand identifier for a cache to a specific, versioned cache name.

// Note that since global state is discarded in between service worker restarts, these
// variables will be reinitialized each time the service worker handles an event, and you
// should not attempt to change their values inside an event handler. (Treat them as constants.)

// If at any point you want to force pages that use this service worker to
// start using a fresh cache, then increment the CACHE_VERSION value. It will
// kick off the service worker update flow and the old cache(s) will be purged
// as part of the activate event handler when the updated service worker is
// activated.
  content: 'content-cache-v' + CONTENT_CACHE_VERSION,
  data: 'data-cache-v' + DATA_CACHE_VERSION
  // Possibly cache images and media separately instead of data
};

self.addEventListener('activate', function(event) {
// Delete all caches that aren't named in CURRENT_CACHES.
// While there is only one cache in this example, the same logic will
// handle the case where there are multiple versioned caches.
var urlsToPrefetch = [
    './content/pre_fetched.txt',
    './content/pre_fetched.html',
    // This is an image that will be used in pre_fetched.html
    'https://www.chromium.org/_/rsrc/1302286216006/config/customLogo.gif'
  ];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to pre-fetch:', urlsToPrefetch);
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
  caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected"
            // cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
    caches.open(CURRENT_CACHES['prefetch']).then(function(cache) {
      cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
        // It's very important to use {mode: 'no-cors'} if there is any chance that
        // the resources being fetched are served off of a server that doesn't support
        // CORS (http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
        // In this example, www.chromium.org doesn't support CORS, and the fetch()
        // would fail if the default mode of 'cors' was used for the fetch() request.
        // The drawback of hardcoding {mode: 'no-cors'} is that the response from all
        // cross-origin hosts will always be opaque
        // (https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#cross-origin-resources)
        // and it is not possible to determine whether an opaque response represents a success or failure
        // (https://github.com/whatwg/fetch/issues/14).
        return new Request(urlToPrefetch, {mode: 'no-cors'});
      })).then(function() {
        console.log('All resources have been fetched and cached.');
      });
    }).catch(function(error) {
      // This catch() will handle any exceptions from the caches.open()/cache.addAll() steps.
      console.error('Pre-fetching failed:', error);
    });
  );

});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          // If there is an entry in the cache for event.request, then response will be defined
          // and we can just return it. Note that in this example, only font resources are cached.
          console.log(' Found response in cache:', response);

          return response;
        } else {
          // Otherwise, if there is no entry in the cache for event.request, response will be
          // undefined, and we need to fetch() the resource.
          console.log(' No response for %s found in cache. About to fetch from network...', event.request.url);

          // We call .clone() on the request since we might use it in a call to cache.put() later on.
          // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
          // (see https://fetch.spec.whatwg.org/#dom-request-clone)
          return fetch(event.request.clone()).then(function(response) {
            console.log('  Response for %s from network is: %O', event.request.url, response);

            if (response.status < 400 &&
                response.headers.has('content-type') &&
                response.headers.get('content-type').match(/^font\//i)) {
              // This avoids caching responses that we know are errors
              //(i.e. HTTP status code of 4xx or 5xx).
              // We also only want to cache responses that correspond
              // to fonts, i.e. have a Content-Type response header
              //that starts with "font/".
              // Note that for opaque filtered responses
              // (https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)
              // can't access to the response headers, so this
              // check will always fail and the font won't be cached.
              //All of the Google Web Fonts are served off of a domain that
              //supports CORS, so that isn't an issue here.
              // It is something to keep in mind if you're attempting to
              // cache other resources from a cross-origin domain
              // that doesn't support CORS, though!
              // We call .clone() on the response to save a copy of it to the cache.
              // By doing so, we get to keep the original response object which
              // we will return back to the controlled page.
              // (see https://fetch.spec.whatwg.org/#dom-response-clone)
              console.log('  Caching the response to', event.request.url);
              cache.put(event.request, response.clone());
            } else {
              console.log('  Not caching the response to', event.request.url)
            }

            // Return the original response object, which will be used to fulfill the resource request.
            return response;
          });
        }
      }).catch(function(error) {
        // This catch() will handle exceptions that arise from the match() or fetch() operations.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('  Error in fetch handler:', error);

        throw error;
      });
    })
  );
});
