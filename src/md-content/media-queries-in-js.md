# CSS Media Queries in Javascript

Since a lot of work we do in CSS we actually do in Javascript, I thought it would be good to research how we can do media queries in JS too.

There are two ways to work with media queries. The first one is do something with the condition when the script first loads. In this example, create a media query using [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to determine if the document matched the specified media query.

```js
// Define the query
const mediaQuery = window.matchMedia("(max-width: 768px)");

// Create a media condition that 
// targets smaller than 768px wide
const mediumSizeQuery = window.matchMedia("(max-width: 768px)");

if (mediumSizeQuery.matches) {
  console.log("MediumSizeQuery Matched!");
} else {
  // If the query doesn't match, bail
  console.error("Media Query Didn' Match!");
}
```

This will only happen once; the query will not be evaluated when the dimensions of the screen change.

To make the media query responsive to we need to add an event listener

The version that adds an event listener to listen for changes the media query is a little more complex but not very much so.

1. The first step is to define the media query that we want to use
2. We then define the function we will use as the handler for our event listener. In this case we console log whether the query matched or not
3. We run the handler once before we add it to the event handler to have the results when the script first loads
4. The final step is to attach a listener to the media query we built. We then use the function defined earlier as the handler.

```js
const mediaQuery = window.matchMedia("(max-width: 768px)");

// Define a handler function for the event listener.
function handleSizeChange(mq) {
  if (mediaQuery.matches) {
    console.log("MediumSizeQuery Matched!");
  } else {
    // If the query doesn't match, bail
    console.error("Media Query Didn' Match!");
  }
}

// Run the handler once.
handleSizeChange(mediaQuery);

// Add the callback function as the
// callback to the event listener
mediaQuery.addListener(handleSizeChange);
```

I need to do more testing to see what are the limitations of `matchMedia` and how complex can the queries we use with it be.

For more information see the [window.matchMedia method](https://drafts.csswg.org/cssom-view/#dom-window-matchmedia) as defined in the [CSSOM (CSS Object Model) View Module](https://drafts.csswg.org/cssom-view/) specification.
