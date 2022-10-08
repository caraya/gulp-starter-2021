# Sanitizing HTML content

One of the biggest security issues with web applications is Cross Site Scripting (XSS). In an XSS attack, malicious code is added to HTML that we expect the browser to parse, thus rendering and executing the malicious code on the page.

```js
foreach(review in reviews) {
    <div class="review">
      <h4>${review.title}</h4>
      <p>${review.text}</p>
    </div>
}
```

## third-party libraries DOMPurify

[DOMPurify](https://github.com/cure53/DOMPurify#readme)

## Sanitizer API

[Safe DOM manipulation with the Sanitizer API](https://web.dev/sanitizer/)

## Trusted types

[Securing SPAs with Trusted Types](https://auth0.com/blog/securing-spa-with-trusted-types/)

[Trusted Types](https://web.dev/trusted-types/)

## Links and Resources

<https://auth0.com/blog/securing-spa-with-trusted-types/>
