# Inserting meta tags in the head of the page

When researching client hints, I came accross an interesting use case for dynamically inserting `meta` tags on a Handlebars template based on the route I'm accessing.

The different pages of the experiment ue different sets of client hints so each needs to request the different hints from the server, an Express application in this case. I wasn't able to do it within Express or Handlebars so I had to hack my way through getting it done with Javascript.

We also use local storage to set up a variable when we successfully add the meta tag. If the variable exists then we don't need to add the tag again.

While this solution works in the context of an Express/Handlebars solution, it should also work on regular pages.

The script block does the following:

1. Define the check for the local storage variable `addedTag`
2. Creates an empty meta element
3. Adds the `http-equiv` attribute with `Accept-CH` as the value
4. Sets the client hints we want to use as the value of the content attribute
5. Appends the link we created to the first (and only) `head` element on the page. You can trim it to add as many or as few of the hints you need to meet your needs
6. Follow the same steps to add the `Accept-CH-Lifetime` meta tag
7. Set up the `addedTag` local storage variable
8. If the tags exist log a message to console and end. There's no need to add the tags every time

The code to add the meta tags now looks like this:

```js
let metaTagExists = localStorage.getItem('addedTag');// 1

if (!metaTagExists) {
  const link = document.createElement('meta'); // 2
  link.setAttribute('http-equiv', 'Accept-CH'); // 3
  link.content = 'Width, Viewport-Width, DPR, Device-Memory, RTT, Downlink, ECT, Sec-CH-UA-Full-Version, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Model, Sec-CH-UA-Mobile' // 4
  document.getElementsByTagName('head')[0].appendChild(link); // 5
  
  const link2 = document.createElement('meta');  // 6
  link2.setAttribute('http-equiv', 'Accept-CH-Lifetime');
  link2.content = '86400'
  document.getElementsByTagName('head')[0].appendChild(link2); 
  
  localStorage.setItem('addedTag', '🤡'); // 7 
} else {
  console.log('meta tag already exists, no need to add it again'); // 8
}
```

The code produces the following HTML without the formating:

```html
<meta http-equiv="Accept-CH" 
content="Width, 
        Viewport-Width, 
        DPR, Device-Memory,
        RTT,
        Downlink,
        ECT,
        Sec-CH-UA-Full-Version,
        Sec-CH-UA-Platform, 
        Sec-CH-UA-Platform-Version, 
        Sec-CH-UA-Arch, Sec-CH-UA-Model, 
        Sec-CH-UA-Mobile">

<meta http-equiv="Accept-CH-Lifetime" 
content="86400">
```
