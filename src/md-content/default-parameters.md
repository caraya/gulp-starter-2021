# Defensive Coding: Default Parameters

When working with Javascript we can add default values to our function parameters so they will work if we forget to pass them when declaring the function. In this post we'll discuss why we should and how give default values to our function parameters.

## Why give defaults to function parameters

The simplest reason, for me, is that I tend to forget to do so when using the function I just declared. Take the function below that, in theory, should just fetch the file at the given URL and display it inside the body of the page

```js
async function getFile(url) {
  try{
    const response = await fetch(url);
    document.body.innerHTML = await response.text();
  }
  catch {
    console.log('There was an error retrieving the file');
  }
}
```

But what happens if we forget to give it the URL to fetch?

```bash
getFile()
```

In my experiments `getFile()` without a URL gives the expected 404 error. How can I prevent this?

I think the best way is to assign a default value to the URL parameter so, if we forget to give it a URL it will go somewhere useful and not error out. The code now looks like this:

```js
async function getFile(url = 'https://my-site.com/') {
  try{
    const response = await fetch(url);
    document.body.innerHTML = await response.text();
  }
  catch {
    console.log('There was an error retrieving the file');
  }
}
```

Now, when we leave the URL blank, it will go to the root of my-site.com.

Now for the caveat:

**The request bey CORS and CORB restrictions so if you're pointing people to third party sites they may not work**
