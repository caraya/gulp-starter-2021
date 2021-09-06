When a server receives the Accept-CH header or meta tag, if properly configured, it appends Client Hint headers that match the advertised field-values.

For example, based on the previous `Accept-CH` example, the client will send `Width`, `Viewport-Width`, and `Downlink` headers, with values that match the client, to all subsequent requests.



This will lead to cleaner code. In servers and browsers that support client hints, you can write code like this:

```html
<img src="img.jpg" width="160" alt="I'm a DPR and width aware image!">
```

And the browser will send both `width` and DPR`
