# Quick Note: Loading images using javascript

I'm not a fan of doing this but there are use cases when we need to retrieve an image from the network and place it in the page. One case that comes to mind is the need to retrieve generated images from a real time application to display in web pages or other parts of a web application.

In the example below I've added comments to the specific lines to discuss.

```javascript
fetch('https://rivendellweb.net/blog/wp-content/uploads/2016/10/IMG_0813.jpg')
// 1
	.then(response => {
	  return response.blob(); // 2
	})
	.then(imageBlob => {
    let img = document.createElement(img); // 3
    img.src = window.URL.createObjectURL(imageBlob); // 4
	})
  // 5  Place the image
  .catch(err => { // 6
    console.log('There was an error loading the image ', err);
  });
```

1. Fetch the image
1. Return the response as a blob (binary object)
1. Create and image
1. Create a src attribute by using URL.createObjectURL with the imageBlob as the parameter
1. Place the image in the page. Left intentionally blank because it depends on usage
1. Catch any errors and log them to console


## Links and Resources

* [Fetch Living Standaard - WHATWG](https://fetch.spec.whatwg.org/)
* [Using Fetch - CSS Tricks](https://css-tricks.com/using-fetch/)
* [Fetch API - David Walsh](https://davidwalsh.name/fetch)
