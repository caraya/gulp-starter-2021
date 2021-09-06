var stream = new ReadableStream({
start(controller) {
  // Get promises for response objects for each page part
  // The start and end come from a cache
  var startFetch = caches.match('/page-start.inc');
  var endFetch = caches.match('/page-end.inc');
  // The middle comes from the network, with a fallback
  var middleFetch = fetch('/page-middle.inc')
    .catch(() => caches.match('/page-offline-middle.inc'));

  function pushStream(stream) {
    // Get a lock on the stream
    var reader = stream.getReader();

    return reader.read().then(function process(result) {
      if (result.done) return;
      // Push the value to the combined stream
      controller.enqueue(result.value);
      // Read more & process
      return reader.read().then(process);
    });
  }

  // Get the start response
  startFetch
    // Push its contents to the combined stream
    .then(response => pushStream(response.body))
    // Get the middle response
    .then(() => middleFetch)
    // Push its contents to the combined stream
    .then(response => pushStream(response.body))
    // Get the end response
    .then(() => endFetch)
    // Push its contents to the combined stream
    .then(response => pushStream(response.body))
    // Close our stream, we're done!
    .then(() => controller.close());
}
