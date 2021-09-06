# Caching individual pages for offline use



## Caching individual pages by hand

Most of the examples use a hand-coded service worker with a customized version of the registration event

```js
// This registers the service worker and sets
// up the files to cache for the particular
// page.
if ('serviceWorker' in navigator) {
  // Attempt to register it
  navigator.serviceWorker.register('/sw.js').then(function() {
    // Success
    console.log('ServiceWorker registration successful');
  }).catch(function(err) {
    // Fail
    console.log('ServiceWorker registration failed: ', err);
  });

  // Set variables for use in the event listener
  var currentPath = window.location.pathname;
  var cacheButton = document.querySelector('.offline-btn');

  // Event listener
  if(cacheButton) {
    cacheButton.addEventListener('click', function(event) {
        event.preventDefault();

        const urlsToCache = [
          currentPath,
          ...performance.getEntriesByType('resource').map((r) => r.name),
        ];

      // Open the unique cache for this URL
      caches.open('offline-' + currentPath).then(function(cache) {
        var updateCache = cache.addAll(urlsToCache);

        // Update UI to indicate success
        // Or catch any errors if it doesn't succeed
        updateCache.then(function() {
          console.log('Article is now available offline.');
        }).catch(function (error) {
          console.log('Article could not be saved offline.');
        });
      });
    });
  }
}
```

## Links and Resources

* [Implementing "Save For Offline" with Service Workers](https://una.im/save-offline/)
* [Service Worker Cache Script](https://gist.github.com/dgrijuela/38cde675b70ed097dbbe)
* [Jake Archibald’s Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/)
* [Mozilla Service Worker Cookbook](https://serviceworke.rs/)
* [CSS Tricks Service Worker for Offline](https://css-tricks.com/serviceworker-for-offline/)
