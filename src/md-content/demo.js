self.addEventListener('fetch', event => {
  let requestURL = new URL(event.request.url);

  // Is this an HTML file?
  if (requestURL.endsWith('.html')) {
    // If we don't have a match in the caches?
    if (!caches.match(requestURL)) {

      let stream = new ReadableStream({

        let contentFetch = fetch(requestURL)
          .catch(() => caches.match('/page-offline.html'))

        function pushStream(stream) {
          // Get a lock on the stream
          let reader = stream.getReader();

          return reader.read().then(function process(result) {
            if (result.done) return;
            // Push the value to the combined stream
            controller.enqueue(result.value);
            // Read more & process
            return reader.read().then(process);
          })
        }
      }

    } // if (caches.match(requestURL))

  } //if (requestURL.endsWith('text/html'))

  // Get the response
  contentFetch // 1
    // Push its contents to the combined stream
    .then(response => pushStream(response.body))
    .then(() => controller.close());
});
